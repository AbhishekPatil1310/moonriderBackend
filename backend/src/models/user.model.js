import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const diaryEntrySchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ['happy', 'sad', 'angry', 'excited', 'neutral', 'anxious'],
      default: 'neutral',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { _id: false } // prevents separate ObjectId for each diary entry
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
      required: function () {
        // Password required only for non-Google users
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    upiId: {
      type: String,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
    },
    interests: {
      type: [String],
      enum: [
        'sports',
        'music',
        'movies',
        'travel',
        'gaming',
        'reading',
        'cooking',
        'art',
        'technology',
      ],
      default: [],
    },
    time: {
      type: [String],
      enum: ['morning', 'afternoon', 'evening', 'night'],
      default: [],
    },
    role: {
      type: String,
      enum: ['user', 'advertiser', 'admin'],
      default: 'user',
    },
    ban: {
      isBanned: { type: Boolean, default: false },
      bannedUntil: { type: Date, default: null },
    },
    credit: {
      type: Number,
      default: 0,
      min: 0, // Ensure credit cannot be negative
    },
    totalSpent: {
      type: Number,
      required: true,
      default: 0,
    },
    monthlySpent: {
      type: Number,
      default: 0,
    },
    lastSpentReset: {
      type: Date,
      default: Date.now,
    },
    companyName: { type: String },
    mobileNumber: { type: String },
    emailOTP: String, // hashed OTP
    otpExpires: Date,

    passreOTP: String,
    passreOTPExpires: Date,

    diaryEntries: [diaryEntrySchema],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Skip if password not modified
  if (!this.isModified('password')) return next();

  // Skip password hashing for Google OAuth users
  if (this.password === 'google-oauth-user') return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  // Clear reset OTPs on password save
  this.passreOTP = undefined;
  this.passreOTPExpires = undefined;

  next();
});

// Compare passwords
userSchema.methods.isPasswordMatch = function (plain) {
  return bcrypt.compare(plain, this.password);
};

const User = model('User', userSchema);

export default User;
