import express from "express";
import passport from "passport";
import * as authController from "../controllers/user/authController.js";

const router = express.Router();

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/google/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
})
router.get("/login/google/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
            //cookies: req.cookies,
        })
    }
})
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
})
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/google/failed",
}))

router.post("/signup", authController.signup);

export default router;