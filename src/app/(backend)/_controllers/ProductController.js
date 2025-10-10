import {Product} from "@/app/(backend)/_models";
import dbConnect from "@/app/(backend)/_lib/dbConnect";

export async function getProductsController(filter) {
    await dbConnect()
    return await Product.find(filter)
}

export async function getProductByIdController(id) {
    await dbConnect();
    return await Product.findById(id);
}

export async function saveProductController(data) {
    await dbConnect()
    const newProduct = new Product(data)
    return await newProduct.save()
}

export async function updateProductController(id, data) {
    await dbConnect();
    // { new: true } returns the updated document
    return await Product.findByIdAndUpdate(id, data, {new: true, runValidators: true});
}

export async function deleteProductController(id) {
    await dbConnect();
    return await Product.findByIdAndDelete(id);
}
