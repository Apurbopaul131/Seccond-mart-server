import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import AppError from '../../error/AppError';
import { role } from './user.constant';
import { TUser, UserModel } from './user.interface';

//user schema
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Number is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: { values: role, message: '{VALUE} is not supported' },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
//This pre-middlewire hook used for convert user password before entry database
userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  //inject hash password to user document
  this.password = hashedPassword;
  //call to next middle wire
  next();
});

//This pre-middewire hook is used for prevent to entry duplicate email
userSchema.pre('save', async function (next) {
  const isUserAlreadyExistByEmailId = await User.findOne({ email: this.email });
  if (isUserAlreadyExistByEmailId) {
    throw new AppError(409, `${this.email} is Already registered.`);
  }
  next();
});

//This pre-middewire hook is used for prevent to entry duplicate phoneNumber
userSchema.pre('save', async function (next) {
  const isUserExistByPhoneNumber = await User.findOne({
    phoneNumber: this?.phoneNumber,
  });
  if (isUserExistByPhoneNumber) {
    throw new AppError(409, `${this.phoneNumber} is already registered.`);
  }
  next();
});
//This post-middewire hook is used for null the password save
userSchema.post('save', function (doc, next) {
  //set password null
  doc.password = '';
  next();
});

//Create a statics function that find user by default id
userSchema.statics.checkUserExistByEmailId = async function (email) {
  const isUserExist = await this.findOne({ email });
  return isUserExist;
};
//Create a statics function that check the equality of passwords
userSchema.statics.checkLoginPasswordMatch = async function (
  plainTextPassword,
  hashPassword,
) {
  const match = await bcrypt.compare(plainTextPassword, hashPassword);
  return match;
};
//export the model
export const User = model<TUser, UserModel>('User', userSchema);
