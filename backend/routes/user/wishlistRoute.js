import express from "express";
import controller from "../../controllers/user/wishlistController.js";

const router = express.Router();

router.post('/', controller.wishlist);
router.post('/add-to-wishlist', controller.addToWishlist);
router.post('/remove-from-wishlist', controller.removeFromWishlist);

export default router;