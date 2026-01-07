// import mongoose, { Schema, model, models } from "mongoose";

// const MessageSchema = new Schema({
//   docId: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   text: { type: String, required: true },
//   role: { type: String, enum: ['user', 'ai'], required: true },
//   createdAt: { type: Date, default: Date.now }
// });


// export const MessageModel = models.Message || model("Message", MessageSchema);




import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },     // specific chat session
  text: { type: String, required: true },
  role: { type: String, enum: ['user', 'ai'], required: true },
}, { timestamps: true });

MessageSchema.index({ chatId: 1 });

export const MessageModel = models.Message || model("Message", MessageSchema);