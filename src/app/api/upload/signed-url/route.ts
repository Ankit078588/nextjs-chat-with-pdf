import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// s3 configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});


export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType } = await req.json();

    // Generate Uunique File Key
    const s3Key = `uploads/${Date.now()}_${fileName.replace(/\s/g, "_")}`;

    // Create command 
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      ContentType: fileType
    });

    // Signed URL - 60 seconds validity
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return NextResponse.json({ signedUrl, s3Key });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}