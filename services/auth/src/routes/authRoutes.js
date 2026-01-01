import {Router} from "express";

const router = Router();

// CREATE A NEW USER
router.post("/signup", createUser); 

// LOGIN A USER
router.post("/login", login);

// LOGOUT A USER
//router.post("/logout", logout);

// REFRESH TOKEN
//router.post("/refresh-token", refreshToken);

// FORGOT PASSWORD
//router.post("/forgot-password", forgotPassword);

// RESET PASSWORD
//router.post("/reset-password", resetPassword);

// VALIDATE TOKEN
//router.get("/validate-token", validateToken);

export default router;