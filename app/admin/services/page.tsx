"use client"

import { useEffect, useState } from "react"
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Service {
  id: string
  title: string
  description: string
  imageUrl: string
  order: number
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [orderNum, setOrderNum] = useState(0)

  const fetchServices = async () => {
    try {
      const q = query(collection(db, "services"), orderBy("order", "asc"))
      const snap = await getDocs(q)
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service))
      setServices(data)
    } catch (err) {
      console.error("Error fetching services:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setImageFile(null)
    setImagePreview("")
    setOrderNum(services.length + 1)
    setEditingId(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let imageUrl = imagePreview

      // Upload to Cloudinary if new image selected
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile)
      }

      if (editingId) {
        // Update existing
        await updateDoc(doc(db, "services", editingId), {
          title,
          description,
          imageUrl,
          order: orderNum,
        })
      } else {
        // Create new
        await addDoc(collection(db, "services"), {
          title,
          description,
          imageUrl,
          order: orderNum,
          createdAt: serverTimestamp(),
        })
      }

      resetForm()
      await fetchServices()
    } catch (err) {
      console.error("Error saving service:", err)
      alert("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingId(service.id)
    setTitle(service.title)
    setDescription(service.description)
    setImagePreview(service.imageUrl)
    setOrderNum(service.order)
    setImageFile(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    try {
      await deleteDoc(doc(db, "services", id))
      await fetchServices()
    } catch (err) {
      console.error("Error deleting service:", err)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Manage Services</h1>

      {/* Add/Edit Form */}
      <Card className="border border-gray-800 bg-gray-800/50 shadow-lg mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingId ? "Edit Service" : "Add New Service"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Wedding Planning"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Order</label>
                <Input
                  type="number"
                  value={orderNum}
                  onChange={(e) => setOrderNum(Number(e.target.value))}
                  min={1}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the service..."
                rows={3}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Image</label>
              <Input type="file" accept="image/*" onChange={handleImageChange} className="bg-gray-800 border-gray-700 text-white file:text-gray-400" />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-40 h-28 object-cover rounded-lg border border-gray-700"
                />
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving} className="bg-rose-600 hover:bg-rose-700">
                {saving ? "Saving..." : editingId ? "Update Service" : "Add Service"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm} className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Services List */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Current Services ({services.length})
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading services...</p>
      ) : services.length === 0 ? (
        <Card className="border border-gray-800 bg-gray-800/50 shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400 mb-4">No services added yet.</p>
            <p className="text-sm text-gray-500">
              Use the form above to add your first service, or use the &quot;Seed Data&quot; button on the dashboard.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="border border-gray-800 bg-gray-800/50 shadow-sm">
              <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={service.imageUrl || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full sm:w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-rose-900/40 text-rose-400 px-2 py-0.5 rounded">
                      #{service.order}
                    </span>
                    <h3 className="font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(service)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-700"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 border-red-900 hover:bg-red-900/30"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
