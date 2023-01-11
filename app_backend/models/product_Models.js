import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'users_models'
    },
}, {
    timestamps: true,
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'users_models'
    },

    name: {type: String, required: true},
    model: {type: String, required: true},
    faction: { type: String, required: true },
    description: {type: String, required: true},
    url: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},

    reviews : [reviewSchema],
    rating: {type: Number, required: true, default: 0},
    numReviews: {type: Number, required: true, default: 0},
}, {
    timestamps: true,
})

const Product = mongoose.model('products_models', productSchema)

export default Product