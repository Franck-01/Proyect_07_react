import asyncHandler from "express-async-handler"
import Product from "../../models/product_Models"

export const get_Products = asyncHandler(async (req, res) => {
    const page_Size = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            },
        } : {}
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(page_Size)
        .skip(page_Size * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / page_Size)})
})
export const get_ProductBy_Id = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
export const delete_Product = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		await product.remove()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
export const create_Product = asyncHandler(async (req, res) => {
	const product = new Product({
		user: req.user._id,
        name: 'Sample name',
        model: 'Sample model',
        faction: 'Sample faction',
        description: 'Sample description',
        url: '/images/sample.jpg',
        price: 0,
        stock: 0,
        numReviews: 0,
	})

	const created_Product = await product.save()
	res.status(201).json(created_Product)
})
export const update_Product = asyncHandler(async (req, res) => {
	const {name, model, faction, description, url, price, stock} = req.body
	const product = await Product.findById(req.params.id)
	if (product) {
		product.name = name
        product.model = model || product.model
		product.faction = faction || product.faction
        product.description = description || product.description
		product.url = url || product.url
		product.price = price
		product.stock = stock

		const updatedProduct = await product.save()
		res.status(201).json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
export const create_ProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body
	const product = await Product.findById(req.params.id)
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)
		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already reviewed')
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}
		product.reviews.push(review)
		product.numReviews = product.reviews.length
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length
		await product.save()
		res.status(201).json({ message: 'Review added' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
export const get_TopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)
	res.json(products)
})