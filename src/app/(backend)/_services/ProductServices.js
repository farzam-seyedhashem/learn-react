import {getProductsController, saveProductController, deleteProductController, getProductByIdController, updateProductController} from "@/app/(backend)/_controllers/ProductController";


export async function getProductByIdServices(id) {
    return await getProductByIdController(id);
}

export async function createProductService(data) {
    return await saveProductController(data);
}

export async function updateProductService(id, data) {
    return await updateProductController(id, data);
}

export async function deleteProductService(id) {
    return await deleteProductController(id);
}

export async function getAllProductServices() {
    return await getProductsController({});
}