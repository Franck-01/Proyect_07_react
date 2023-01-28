import jwt from 'jsonwebtoken'

const generate_Token = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generate_Token