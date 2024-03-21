import express from "express";
import passport from "passport";
import * as authController from "../../controllers/user/authController.js";
import user from "../../models/user.js";

const router = express.Router();

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/google/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
})
router.get("/login/google/success", async (req, res) => {
    if (req.user) {
        const findEmail = req.user.emails[0].value;
        const userExistWithEmail = await user.findOne({email: findEmail});
        res.status(200).json({ 
            success: true, 
            message: "successful", 
            user: userExistWithEmail,
        })
    }
})

router.get("/login/facebook/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
})
router.get("/login/facebook/success", async (req, res) => {
    if (req.user) {
        const findEmail = req.user.emails[0].value;
        const userExistWithEmail = await user.findOne({email: findEmail});
        res.status(200).json({ 
            success: true, 
            message: "successful", 
            user: userExistWithEmail,
        })
    }
})

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/login",
    failureRedirect: "http://localhost:3000/login/handle-message"
}));

router.get("/facebook", passport.authenticate("facebook", {scope: ["profile", "email"]}));
router.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/login",
    failureRedirect: "http://localhost:3000/login/handle-message"
}));

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
})

export default router;