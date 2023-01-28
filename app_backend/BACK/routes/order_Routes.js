import express  from "express";
import { addOrder_Items, get_OrderBy_Id, update_OrderTo_Paid, get_MyOrders, get_Orders, update_OrderTo_Delivered } from "./controllers/order_Controller.js";
import { protect, admin } from "../middleware/auth_middle.js";

const router = express.Router()

router.route("/")
    .post(protect, addOrder_Items)
    .get(protect, admin, get_Orders)
router.route("/myorders")
    .get(protect, get_MyOrders)
router.route("/:id")
    .get(protect, get_OrderBy_Id)
router.route("/:id/pay")
    .put(protect, update_OrderTo_Paid)
router.route("/:id/deliver")
    .put(protect, admin, update_OrderTo_Delivered)

export default router