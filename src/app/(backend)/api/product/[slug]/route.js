import {NextResponse} from "next/server";
import {getProductByIdServices, updateProductService, deleteProductService} from '@/app/(backend)/_services/ProductServices';

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const product = await getProductByIdServices(id);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        const result = getPlainObject(product);
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const productData = await request.json();
        const updatedProduct = await updateProductService(id, productData);
        if (!updatedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        const result = getPlainObject(updatedProduct);
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const deletedProduct = await deleteProductService(id);
        if (!deletedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}