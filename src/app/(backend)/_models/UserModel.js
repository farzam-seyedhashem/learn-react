import mongoose from 'mongoose'
const Schema = mongoose.Schema;

//===============================
// User Schema
//===============================
// اسناد تو در تو برای اطلاعات اضافی کاربر
/**
 * @typedef {object} IUserKid
 * @property {string} name - The name of the user's kid. This field is required.
 * @property {number} age - The age of the user's kid. This field is required.
 * @property {number} [profile] - Optional identifier for the profile associated with the user kid.
 * @property {number} [theme] - Optional identifier for the theme associated with the user kid.
 */
const userKidSchema = new Schema({
	name: { type: String, required: false },
	age: { type: Number, required: false },
	watchlist: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
	birthDayMonth:{type:String,required:false,enum:["farvardin","ordibehesht","khordad","tir","mordad","shahrivar","mehr","aban","azar","dey","bahman","esfand"]},
	profile: Number,
	theme: Number,
}, { _id: true });

/**
 * @typedef {object} ILoginInfo
 * @property {string} [deviceCode] - A unique identifier for the device.
 * @property {string} [deviceType] - The type of the device (e.g., 'mobile', 'tablet', 'desktop').
 * @property {string} [deviceModel] - The model name or identifier of the device.
 * @property {boolean} [isActive=true] - A flag indicating whether the device is currently considered active.
 * @property {Date} [lastLogin=Date.now] - The date and time of the last login from this device.
 */
const loginInfoSchema = new Schema({
	deviceCode: String,
	deviceType: String,
	deviceModel: String,
	isActive: { type: Boolean, default: true },
	lastLogin: { type: Date, default: Date.now }
}, { _id: false });

/**
 * Mongoose schema for the User entity.
 * Defines the structure of user documents in the database.
 *
 * @typedef {object} IUser
 * @property {string} [name] - The full name of the user.
 * @property {string} [username] - The unique username for the user. A sparse index allows multiple documents to have a null value.
 * @property {string} [email] - The user's email address. This field is not required and does not have to be unique.
 * @property {boolean} [isPasswordSet=false] - A flag indicating whether the user has set a password. Defaults to false.
 * @property {string} [password] - The user's hashed password. This field is not required.
 * @property {'male'|'female'|'other'} [gender] - The gender of the user.
 * @property {string} [role='user'] - The role of the user within the system (e.g., 'user', 'admin'). Defaults to 'user'.
 * @property {string} [phone] - The user's unique phone number. A sparse index allows multiple documents to have a null value.
 * @property {Date} [joinDate=Date.now] - The date the user registered. Defaults to the current date and time.
 * @property {boolean} [status=true] - The active status of the user's account. Defaults to true.
 * @property {IUserKid[]} [kids] - An array of child profiles associated with the user's account.
 * @property {number} [legacyId] - An optional numeric ID for mapping to a legacy system.
 * @property {ILoginInfo[]} [loginHistory] - A history of the user's login sessions from different devices.
 * @property {Date} createdAt - Automatically managed timestamp for when the document was created.
 * @property {Date} updatedAt - Automatically managed timestamp for when the document was last updated.
 */
const userSchema = new Schema({
	name: String,
	username: { type: String, unique: true, sparse: true }, // sparse allows multiple null values
	email: { type: String, required: false, unique: false },
	isPasswordSet: { type: Boolean, default: false },
	password: { type: String, required: false, select: false, },
	passcode: { type: String, required: false, select: false, },
	isPasscodeSet: { type: Boolean, default: false },
	gender: { type: String, enum: ['male', 'female', 'other'] },
	role: { type: String, default: 'user' },
	phone: { type: String, unique: true, sparse: true },
	joinDate: { type: Date, default: Date.now },
	status: { type: Boolean, default: true },
	kids: [userKidSchema],
	legacyId: { type: Number, required: false },
	loginHistory: [loginInfoSchema],
	timeLimit: {
		enabled: { type: Boolean, default: false }, // آیا قابلیت محدودیت زمانی فعال است؟
		minutes: { type: Number, default: 60 },     // مدت زمان مجاز به دقیقه
	},
	kidSessionExpiresAt: { type: Date },
	otp: String,
	otpExpires: Date,
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

export function UserModel() {
	return mongoose.models.User || mongoose.model('User', userSchema);
}