import express  from "express";
import { get_Products, get_ProductBy_Id, delete_Product, create_Product, update_Product, create_ProductReview, get_TopProducts } from "./controllers/product_Controller";
import { protect, admin } from "../middleware/auth_middle";

const router = express.Router()

router.route("/")
    .get(get_Products)
    .post(protect, admin, create_Product)
router.route("/:id/reviews")
    .post(protect, create_ProductReview)
router.route("/top", get_TopProducts)
router.route("/:id")
    .get(get_ProductBy_Id)
    .delete(protect, admin, delete_Product)
    .put(protect, admin, update_Product)

export default router
