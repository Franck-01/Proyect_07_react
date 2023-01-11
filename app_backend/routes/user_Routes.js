import express from "express"
import {auth_User, register_User, getUser_Profile, updateUser_Profile, get_Users, delete_User, get_User_ById, update_User} from "./controllers/user_Controller"
import {protect, admin} from "../middleware/auth_middle"

const router = express.Router()

router.route("/")
    .post(register_User)
    .get(protect, admin, get_Users)
router.post("/login", auth_User)
router.route("/profile")
    .get(protect, getUser_Profile)
    .put(protect, updateUser_Profile)
router.route("/:id")
    .delete(protect, admin, delete_User)
    .get(protect, admin, get_User_ById)
    .put(protect, admin, update_User)

export default router
