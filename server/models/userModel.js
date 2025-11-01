import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Default new users to NOT be admins
    },
  },
  {
    timestamps: true,
  }
);

// --- BEST PRACTICE: Password Hashing ---
// This function will run *before* a user is saved ('.pre('save', ...)')
userSchema.pre('save', async function (next) {
  // Only hash the password if it's new or has been modified
  if (!this.isModified('password')) {
    next();
  }

  // 'genSalt' creates a "salt" to make the hash more secure
  const salt = await bcrypt.genSalt(10);
  // This 'this' refers to the user document
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;