import { NextResponse } from 'next/server';
import {getAllProductServices, createProductService} from '@/app/(backend)/_services/ProductServices';
import { getPlainObject } from '@/app/(backend)/_lib/PlainObject';

export async function GET() {
    try {
        const products = await getAllProductServices();
        const result = getPlainObject(products);
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const productData = await request.json();
        const newProduct = await createProductService(productData);
        const result = getPlainObject(newProduct);
        return NextResponse.json(result, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
