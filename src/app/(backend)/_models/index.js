import UserModel from "./UserModel"; // تغییر از named import به default import
import {ProductModel} from "./ProductModel";

// UserModel دیگر یک تابع نیست، بلکه خود مدل است
export const User = UserModel;
export const Product = ProductModel;
