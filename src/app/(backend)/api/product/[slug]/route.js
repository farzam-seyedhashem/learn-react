import {NextResponse} from "next/server";
import {getProductByIdServices, updateProductService, deleteProductService} from '@/app/(backend)/_services/ProductServices';
import {getPlainObject} from "@/app/(backend)/_lib/PlainObject";

export async function GET(request, { params }) {
    try {
        const { slug } = params;
        const product = await getProductByIdServices(slug);
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
        const { slug } = params;
        const productData = await request.json();
        const updatedProduct = await updateProductService(slug, productData);
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
        const { slug } = params;
        const deletedProduct = await deleteProductService(slug);
        if (!deletedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}