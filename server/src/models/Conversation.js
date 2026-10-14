import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    lastMessage: {
      type: String,
      default: '',
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    relatedBrief: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreativeBrief',
    },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model('Conversation', conversationSchema);
