import express from "express"
import path from "path"
import dotenv from "dotenv"
import morgan from "morgan"

import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/error_middle.js"
import user_Routes from "./routes/user_Routes.js"
import product_Routes from "./routes/product_Routes.js"
import order_Routes from "./routes/order_Routes.js"
import upload_Routes from "./routes/upload_Routes.js"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
const __dirname = path.resolve()

const PORT = process.env.PORT || 8080

app.use('/api/users', user_Routes)
app.use('/api/products', product_Routes)
app.use('/api/orders', order_Routes)
app.use('/api/upload', upload_Routes)
app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/react-app/build')))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'react-app', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running...')
	})
}
app.listen(PORT, console.log(
	`Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`
))