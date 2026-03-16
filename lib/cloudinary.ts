const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Upload an image file to Cloudinary using an unsigned upload preset.
 * Returns the secure URL of the uploaded image.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Cloudinary error:", errorData);
    throw new Error(errorData?.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
}

/**
 * Generate a Cloudinary thumbnail URL from a full image URL.
 * Applies auto-format, auto-quality, crop fill at specified dimensions.
 */
export function getCloudinaryThumbnail(
  url: string,
  width = 400,
  height = 300
): string {
  if (!url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/c_fill,w_${width},h_${height},f_auto,q_auto/`);
}
