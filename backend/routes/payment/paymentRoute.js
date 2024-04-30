import express from "express";
import controller from "../../controllers/payment/paymentController.js";

const router = express.Router();

router.post('/', controller.payment);
router.get('/handle-payment', controller.handlePayment);

export default router;