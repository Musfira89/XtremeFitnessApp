import express from "express";
import { subscribeUser, changeSubscription ,createCheckoutSession ,checkPaymentStatus} from "../controllers/subscriptionController.js";

const router = express.Router();

// User subscribes to a plan
router.post("/subscribe", subscribeUser);

// User changes plan (upgrade/downgrade)
router.post("/change", changeSubscription);


router.post("/checkout-session", createCheckoutSession);
router.get("/payment-status/:sessionId", checkPaymentStatus); // New endpoint to check payment status

export default router;
