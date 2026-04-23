// app/api/upload/route.js
import cloudinary from "@/app/lib/cloudinary/clodinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "song4u/photos" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return Response.json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}