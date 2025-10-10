import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // },
    // brand: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Brand',
    //     required: true
    // },
    // images: [{
    //     type: String,
    //     required: true
    // }],
    // thumbnail: {
    //     type: String,
    //     required: true
    // },
    // stock: {
    //     type: Number,
    //     required: true,
    //     min: 0
    // },
    // ratingsAverage: {
    //     type: Number,
    //     default: 0,
    //     min: 0,
    //     max: 5
    // },
    // ratingsQuantity: {
    //     type: Number,
    //     default: 0,
    //     min: 0
    // },
    // isAvailable: {
    //     type: Boolean,
    //     default: true
    // },
    // attributes: [{
    //     name: { type: String, required: true },
    //     value: { type: String, required: true }
    // }],
    // tags: [{
    //     type: String
    // }],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

productSchema.virtual('calculatedFinalPrice').get(function () {
    return this.price * (1 - this.discountPercentage / 100);
});

productSchema.pre('save', function (next) {
    if (this.isModified('price') || this.isModified('discountPercentage')) {
        this.finalPrice = this.price * (1 - this.discountPercentage / 100);
    }
    next();
});

export function ProductModel() {
    return mongoose.models.Product || mongoose.model('Product', productSchema);
}