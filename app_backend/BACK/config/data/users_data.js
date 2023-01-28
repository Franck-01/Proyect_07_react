import bcrypt from "bcryptjs"

const users = [{
    name: "Franco Acuña",
    email: "franco@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true
}, {
    name: "Lucia Acuña",
    email: "lucia@gmail.com",
    password: bcrypt.hashSync("12345", 10)
}, {
    name: "Mariana Juarez Almaraz",
    email: "marian@gmail.com",
    password: bcrypt.hashSync("12345", 10)
}]

export default users