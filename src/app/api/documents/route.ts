import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth"; 
import { connectDB } from "../../../lib/db";
import { DocumentModel } from "../../../models/document.model";
import { UserModel } from "../../../models/user.model"; 
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";


const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});



// 1. Get all documents
export async function GET(req: NextRequest) {
  try {
    // 1. Auth check
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    // 2. Find user 
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Find Documents for this user only
    const documents = await DocumentModel.find({ userId: user._id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, documents });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// 2. Delete document
export async function DELETE(req: NextRequest) {
    try {
      // 1. Auth Check
      const session = await auth();
      if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const { searchParams } = new URL(req.url);
      const docId = searchParams.get("id");
  
      if (!docId) {
        return NextResponse.json({ error: "Document ID required" }, { status: 400 });
      }
  
      await connectDB();
  
      // 2. Find doc
      const doc = await DocumentModel.findById(docId);
      if (!doc) {
        return NextResponse.json({ error: "Document not found" }, { status: 404 });
      }
  
      // 3. Delete from S3 
      try {
        await s3.send(new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: doc.fileKey, 
        }));
      } catch (s3Error) {
        console.error("S3 Delete Warning:", s3Error);
      }
  
      // 4. Delete from DB
      await DocumentModel.findByIdAndDelete(docId);
  
      return NextResponse.json({ success: true, message: "Deleted" });
      
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}