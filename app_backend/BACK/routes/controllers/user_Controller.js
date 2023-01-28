import asyncHandler from "express-async-handler"
import generate_Token from "../../middleware/utils/generate_Token.js"
import User from "../../models/user_Models.js"

export const auth_User = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generate_Token(user._id),
        })
    } else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})
export const register_User = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}
	const user = await User.create({
		name,
		email,
		password,
	})
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generate_Token(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})
export const getUser_Profile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})
export const updateUser_Profile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generate_Token(user._id),
		})
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})
export const get_Users = asyncHandler(async (req, res) => {
	const users = await User.find()
	res.json(users)
})
export const delete_User = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'User removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})
export const get_User_ById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})
export const update_User = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})