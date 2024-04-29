import express from "express";
import controller from "../../controllers/user/cartController.js";

const router = express.Router();

router.post('/', controller.cart);
router.post('/add-to-cart', controller.addToCart);
router.post('/remove-from-cart', controller.removeFromCart);

export default router;