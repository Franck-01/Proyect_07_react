const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const URL = 'mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/proyect_react?retryWrites=true&w=majority'

const connectDB = async () => {
	try {
		await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		},)
		console.log('DataBase Connection : Successful')
	} catch (error) {
		console.error('DataBase Connection : Failed')
		process.exit(1)
	}
}

module.exports = {connectDB}