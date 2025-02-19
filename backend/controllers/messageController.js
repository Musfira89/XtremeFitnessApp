import Message from '../models/Message.js';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

// Controller to send a message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  // Validate and convert senderId and receiverId to ObjectId
  if (!Types.ObjectId.isValid(senderId) || !Types.ObjectId.isValid(receiverId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid senderId or receiverId.',
    });
  }

  try {
    const newMessage = new Message({
      sender: new Types.ObjectId(senderId),  // Instantiate with 'new'
      receiver: new Types.ObjectId(receiverId),  // Instantiate with 'new'
      content,
    });

    await newMessage.save();

    return res.status(StatusCodes.CREATED).json({
      message: 'Message sent successfully!',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to send message.',
    });
  }
};

// Controller to fetch messages for a specific user (both sent & received)
export const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch messages where user is either sender or receiver
    const userMessages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: 1 }) // Sorting messages by timestamp (oldest first)
      .populate('receiver', 'fullName')
      .populate('sender', 'fullName');

    return res.status(StatusCodes.OK).json({
      message: 'Messages fetched successfully!',
      data: userMessages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to fetch messages.',
    });
  }
};

