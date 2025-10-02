import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const userSchema = new Schema({
	name: {type:String, required:true,unique:true},
	password:String,
	email:String,
	phone:String,
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

export function UserModel() {
	return mongoose.models.User || mongoose.model('User', userSchema);
}