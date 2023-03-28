import { Router } from 'express';
import { userLogin, userSignUp, userProfile, userLogout } from "../controllers/userController.js";
const router = Router();

router.post('/user/login', userLogin);
router.post('/user/register', userSignUp);
router.get('/user/profile', userProfile);
router.get('/user/logout', userLogout);


export default router;