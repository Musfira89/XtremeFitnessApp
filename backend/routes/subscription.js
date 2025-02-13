import express from "express";
import { subscribeUser ,startFreeTrial, createCheckoutSession, checkActivePlan} from "../controllers/subscriptionController.js";
import { handleStripeWebhook, checkPaymentStatus } from "../controllers/webhooks.js";
import {getNewSubscriptions,getTotalRevenue,getTopSellingPlan, getActiveUsersCount} from "../controllers/sales.js"

const router = express.Router();

// User subscribes to a plan
router.post("/subscribe", subscribeUser);
router.post("/start-trial", startFreeTrial);
router.post("/checkout-session", createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);
router.get("/payment-status/:session_id", checkPaymentStatus);

router.get("/active-plan/:userId", checkActivePlan);
router.get("/new-subscriptions", getNewSubscriptions);
router.get("/total-revenue", getTotalRevenue);
router.get("/top-selling-plan", getTopSellingPlan);
router.get("/active-users", getActiveUsersCount);
router.get("/trial-users", getActiveUsersCount);

export default router;
