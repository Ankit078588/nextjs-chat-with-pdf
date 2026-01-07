import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";                          
import { connectDB } from "../../../../lib/db";
import { DocumentModel } from "../../../../models/document.model";
import { UserModel } from "../../../../models/user.model";   
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { getPineconeClient } from "@/lib/pinecone";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});



export async function POST(req: NextRequest) {
  try {
    // 1. get session
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Connect to DB
    await connectDB();

    // 3. find user
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    // 4. Rcv data from frontend
    const body = await req.json();
    const { name, fileKey, size } = body;

    // Validate input
    if (!name || !fileKey || !size) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 5. Create Doc
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    const newDoc = await DocumentModel.create({
      userId: user._id, 
      name,
      fileKey,
      fileUrl,
      size,
    });

    console.log('------ Document Saved for user -----');
    console.log('------ Starting vectorization ------');

    // RAG LOGIC
    // Step-1: download PDF
    const s3Params = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileKey };
    const data = await s3.send(new GetObjectCommand(s3Params));
    
    // convert stream to ByteArray -> Blob
    const byteArray = await data.Body?.transformToByteArray();
    if (!byteArray) throw new Error("Failed to download file from S3");
    
    const arrayBuffer = byteArray.buffer.slice(byteArray.byteOffset, byteArray.byteOffset + byteArray.byteLength);
    // @ts-ignore
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    
    // Step-2: Load PDF
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    // Step-3: Split Text
    const splitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 1000, 
        chunkOverlap: 200 
    });
    const splitDocs = await splitter.splitDocuments(docs);

    // Step-4: Initialize Google Gemini Embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: process.env.GOOGLE_API_KEY
    });

    // Step-5: Store in Pinecone 
    const pinecone = getPineconeClient();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    // docs with metadata 
    const docsWithMetadata = splitDocs.map(doc => ({
        ...doc,
        metadata: {
            ...doc.metadata,
            fileKey: fileKey, 
            docId: newDoc._id.toString()
        }
    }));

    // save in pinecone DB
    await PineconeStore.fromDocuments(docsWithMetadata, embeddings, {
        pineconeIndex,
        maxConcurrency: 5,
    });

    console.log("Vectors stored in Pinecone!");

    return NextResponse.json({ success: true, doc: newDoc });

  } catch (error: any) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}