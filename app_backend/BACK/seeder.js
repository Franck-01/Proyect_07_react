const dotenv = require("dotenv")
const Product = require("./models/product_Models.js")
const products = require("./config/data/products_data.js")
const {connectDB} = require("./config/db.js")

dotenv.config()

const importData = async () => {
    try{
		await Product.deleteMany({})
		await Product.insertMany(products)
		console.log("Data Import SUCCESS")
		process.exit()
	} catch (error) {
		console.error('Error with data import', error)
    	process.exit(1)
	}
}

importData()