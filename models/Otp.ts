import mongoose, { Document, Model, Schema } from "mongoose";

interface IOtp extends Document {
  email: string;
  otp: string;
}

const otpSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
});

const Otp: Model<IOtp> = mongoose.model < IOtp > ("OTP", otpSchema);

export default Otp;
