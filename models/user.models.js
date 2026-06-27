import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['Merchant', 'Rider'],
        message: '{VALUE} is not a valid system role',
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", 
  async function (next)
  {
  if (!this.isModified("password")) {
    return next();
  }
  else {
    const Genratesalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, Genratesalt);
    this.password = hashedPassword;
    next();
  }
}
)

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}
const User = mongoose.model('User', userSchema);

export default User;