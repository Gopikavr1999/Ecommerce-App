import express from "express";
import { registerontroller, loginController, testController, forgotPasswordController, updateProfileController, getAllOrdersController, getOrdersController, orderStatusController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//route object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerontroller);

//LOGIN || POST
router.post("/login", loginController);

//FORGOT PASSWORD || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test",requireSignIn, isAdmin, testController)

//Protected User route auth
router.get("/user-auth",requireSignIn, (req,res) => {
    res.status(200).send({ok: true});
})

//Protected Admin route auth
router.get("/admin-auth",requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok: true});
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
