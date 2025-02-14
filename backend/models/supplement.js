import mongoose from "mongoose";

const SupplementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  supplements: [
    {
      name: String,
      description: String,
      image: String,
      price: String,
      amazonLink: String,
      category: String,
      recommendedFor: String,
    },
  ],
});

const Supplement = mongoose.model("Supplement", SupplementSchema);

export default Supplement;
