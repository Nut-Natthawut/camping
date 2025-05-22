import { createClient } from '@supabase/supabase-js'

const bucket = 'landmark-bucket'
const url = process.env.SUPABASE_URL as string
const key = process.env.SUPABASE_KEY as string


// Create Supabase client
const supabase = createClient(url, key)

// Function to sanitize filename
function sanitizeFilename(filename: string): string {
  // Remove file extension
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  const ext = filename.substring(filename.lastIndexOf('.'));
  
  // Convert to lowercase and replace spaces with hyphens
  const sanitized = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  return sanitized + ext;
}

// Upload file using standard upload
export async function uploadFile(image: File) {
    const timestamp = Date.now()
    const sanitizedName = sanitizeFilename(image.name)
    const newName = `Nuttill-${timestamp}-${sanitizedName}`

    console.log("Attempting to upload to bucket:", bucket);
    console.log("Original filename:", image.name);
    console.log("Sanitized filename:", newName);

    const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl:'3600',
    })

    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error(`Image upload failed: ${error.message}`);
    }

    if(!data) {
      console.error("No data returned from upload");
      throw new Error("Image upload failed: No data returned");
    }

    console.log("Upload successful, getting public URL");
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(newName);

    if (!urlData.publicUrl) {
      console.error("No public URL returned");
      throw new Error("Failed to get public URL: No URL returned");
    }

    console.log("Public URL:", urlData.publicUrl);
    return urlData.publicUrl;
}