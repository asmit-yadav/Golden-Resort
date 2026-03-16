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

interface GalleryItem {
  id: string
  title: string
  category: string
  description: string
  imageUrl: string
  order: number
}

const CATEGORIES = [
  "wedding",
  "corporate",
  "birthday",
  "anniversary",
  "haldi",
  "engagement",
  "decor",
  "social",
  "charity",
  "graduation",
]

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterCat, setFilterCat] = useState("all")

  // Form state
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("wedding")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [orderNum, setOrderNum] = useState(0)

  const fetchItems = async () => {
    try {
      const q = query(collection(db, "gallery"), orderBy("order", "asc"))
      const snap = await getDocs(q)
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem))
      setItems(data)
    } catch (err) {
      console.error("Error fetching gallery:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const resetForm = () => {
    setTitle("")
    setCategory("wedding")
    setDescription("")
    setImageFile(null)
    setImagePreview("")
    setOrderNum(items.length + 1)
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

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile)
      }

      if (editingId) {
        await updateDoc(doc(db, "gallery", editingId), {
          title,
          category,
          description,
          imageUrl,
          order: orderNum,
        })
      } else {
        await addDoc(collection(db, "gallery"), {
          title,
          category,
          description,
          imageUrl,
          order: orderNum,
          createdAt: serverTimestamp(),
        })
      }

      resetForm()
      await fetchItems()
    } catch (err) {
      console.error("Error saving gallery item:", err)
      alert("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id)
    setTitle(item.title)
    setCategory(item.category)
    setDescription(item.description)
    setImagePreview(item.imageUrl)
    setOrderNum(item.order)
    setImageFile(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return
    try {
      await deleteDoc(doc(db, "gallery", id))
      await fetchItems()
    } catch (err) {
      console.error("Error deleting gallery item:", err)
    }
  }

  const filteredItems =
    filterCat === "all" ? items : items.filter((i) => i.category === filterCat)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Manage Gallery</h1>

      {/* Add/Edit Form */}
      <Card className="border border-gray-800 bg-gray-800/50 shadow-lg mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingId ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Garden Wedding"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-700 bg-gray-800 text-white px-3 text-sm"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
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
                placeholder="A short description of this photo..."
                rows={2}
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
                {saving ? "Uploading & Saving..." : editingId ? "Update Item" : "Add to Gallery"}
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

      {/* Filter & Gallery List */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-white mr-4">
          Gallery Items ({filteredItems.length})
        </h2>
        <Button
          size="sm"
          variant={filterCat === "all" ? "default" : "outline"}
          onClick={() => setFilterCat("all")}
          className={filterCat === "all" ? "bg-rose-600 hover:bg-rose-700" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
        >
          All
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={filterCat === cat ? "default" : "outline"}
            onClick={() => setFilterCat(cat)}
            className={filterCat === cat ? "bg-rose-600 hover:bg-rose-700" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading gallery...</p>
      ) : filteredItems.length === 0 ? (
        <Card className="border border-gray-800 bg-gray-800/50 shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400 mb-4">No gallery items found.</p>
            <p className="text-sm text-gray-500">Use the form above to add photos to your gallery.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border border-gray-800 bg-gray-800/50 shadow-sm overflow-hidden">
              <img
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-rose-900/40 text-rose-400 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">#{item.order}</span>
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{item.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="border-gray-700 text-gray-300 hover:bg-gray-700">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 border-red-900 hover:bg-red-900/30"
                    onClick={() => handleDelete(item.id)}
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
