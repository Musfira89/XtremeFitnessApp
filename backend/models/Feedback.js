import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      fullName: { type: String, required: true },
      beforeImage: { type: String, required: true },
      afterImage: { type: String, required: true },
      feedback: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
    },
    { timestamps: true }
  );
  

export default mongoose.model('Feedback', feedbackSchema);
