import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getSpecificUser, updateUser } from "../controllers/user.controller.js";


const router = Router();


router.route('/users').get(getAllUsers);
router.route('/users').post(createUser);
router.route('/users/:id').get(getSpecificUser);
router.route('/users/:id').patch(updateUser);
router.route('/users/:id').delete(deleteUser);


export default router;