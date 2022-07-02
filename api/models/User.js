import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    State : {
      type: String,
      
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      
    },
    phone: {
      type: String,
      
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);