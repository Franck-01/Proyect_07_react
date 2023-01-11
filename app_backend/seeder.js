import dotenv from "dotenv"
import users_data from "./config/data/users_data"
import products_data from "./config/data/products_data"
import User from "./models/user_Models"
import Product from "./models/product_Models"
import Order from "./models/order_Models"
import connect_data from "./config/db"

dotenv.config()
connect_data()

const import_Data = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const created_Users = await User.insertMany(users_data)
        const admin_User = created_Users[0]._id
        const sample_Products = products_data.map((product) => {
            return { ...product, user: admin_User}
        })
        await Product.insertMany(sample_Products)

        console.log('Data imported!'.green.inverse)
		process.exit()
    } catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}
const destroy_Data = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data destroyed!'.red.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}
if (process.argv[2] === '-d') {
	destroy_Data()
} else {
	import_Data()
}