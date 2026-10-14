import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { User } from '../models/User.js';

// @desc    Get user conversations
// @route   GET /api/conversations
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .sort({ updatedAt: -1 })
      .populate('participants', 'name companyName avatar role')
      .populate('relatedBrief', 'title');

    res.status(200).json({ success: true, count: conversations.length, conversations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get or create conversation between two users
// @route   POST /api/conversations
export const getOrCreateConversation = async (req, res, next) => {
  try {
    const { recipientId, briefId } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] },
    }).populate('participants', 'name companyName avatar role');

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, recipientId],
        relatedBrief: briefId,
        lastMessage: 'Conversation started',
        lastMessageAt: new Date(),
      });
      conversation = await conversation.populate('participants', 'name companyName avatar role');
    }

    res.status(200).json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
};

// @desc    Get messages in conversation
// @route   GET /api/conversations/:id/messages
export const getMessages = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation || !conversation.participants.some(p => p.toString() === req.user._id.toString())) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to conversation' });
    }

    const messages = await Message.find({ conversation: req.params.id })
      .sort({ createdAt: 1 })
      .populate('sender', 'name avatar role');

    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    next(error);
  }
};

// @desc    Send a message
// @route   POST /api/conversations/:id/messages
export const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message content cannot be empty' });
    }

    const conversation = await Conversation.findById(req.params.id);
    if (!conversation || !conversation.participants.some(p => p.toString() === req.user._id.toString())) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const message = await Message.create({
      conversation: req.params.id,
      sender: req.user._id,
      content,
      readBy: [req.user._id],
    });

    conversation.lastMessage = content;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    await message.populate('sender', 'name avatar role');

    res.status(201).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};
