import { Schema, model, models } from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "لطفا نام خود را وارد کنید"],
        maxlength: [60, "نام نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
    },
    email: {
        type: String,
        required: [true, "لطفا ایمیل خود را وارد کنید"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "لطفا یک ایمیل معتبر وارد کنید",
        ],
    },
    password: {
        type: String,
        required: [true, "لطفا رمز عبور خود را وارد کنید"],
        minlength: [6, "رمز عبور نمی‌تواند کمتر از ۶ کاراکتر باشد"],
        select: false, // ۱. مخفی کردن پسورد در کوئری‌ها
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true // ۲. مدیریت خودکار زمان ساخت و به‌روزرسانی
});

// هش کردن پسورد قبل از ذخیره
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// ۳. متد مقایسه پسورد
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ۴. استانداردسازی خروجی مدل
const UserModel = models.User || model('User', UserSchema);

export default UserModel;
