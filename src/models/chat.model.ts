import mongoose, { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    docId: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
    title: { type: String, required: true, default: 'Conversation 1' },
}, { timestamps: true });


// Compound index 
ChatSchema.index({ userId: 1, docId: 1 });



export const ChatModel = models.Chat || model('Chat', ChatSchema);