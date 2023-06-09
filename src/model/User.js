import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
export default userModel;