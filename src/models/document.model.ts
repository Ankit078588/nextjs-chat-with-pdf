import mongoose, { model, Schema, models } from "mongoose";


const DocumentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    name: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },           // S3 Public URL
    fileKey: { type: String, required: true },           // AWS S3 Key (e.g. "uploads/170923_file.pdf")
    size: { type: String,  required: true }              // e.g., "2.5 MB"
}, { timestamps: true });



export const DocumentModel = models.Document || model('Document', DocumentSchema);