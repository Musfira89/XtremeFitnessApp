import express from "express";
import { subscribeUser ,startFreeTrial, createCheckoutSession} from "../controllers/subscriptionController.js";
import { handleStripeWebhook, checkPaymentStatus } from "../controllers/webhooks.js";

const router = express.Router();

// User subscribes to a plan
router.post("/subscribe", subscribeUser);
router.post("/start-trial", startFreeTrial);
router.post("/checkout-session", createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);
router.get("/payment-status/:session_id", checkPaymentStatus);

export default router;
