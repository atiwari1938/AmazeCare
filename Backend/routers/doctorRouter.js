import express from "express";
import {
  getDoctorByName,
  getAllDoctors,
  getDoctorById,
  updateDoctorDetails,
  deleteDoctor
} from "../controllers/doctorController.js";

import { isAdmin, isAuthorized, isDoctor, isPatient } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getalldoctors", isPatient, getAllDoctors);
router.get("/getdoctor",isAuthorized,getAllDoctors);
router.get("/doctorinfo", isAuthorized, getAllDoctors);
router.get("/getdoctorbyid/:id", isAuthorized , getDoctorById);
router.get("/getdoctorbyname", isAuthorized, getDoctorByName);
router.put("/updatedoctor/:id", isAuthorized, updateDoctorDetails);
router.delete('/deletedoctor/:id',isAuthorized ,deleteDoctor);
export default router;
