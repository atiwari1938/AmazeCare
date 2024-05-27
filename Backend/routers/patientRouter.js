import express from "express";
import {
  getPatientByName,
  getAllPatients,
  getPatientById,
  updatePatientDetails,
  getPatientInfo
} from "../controllers/patientController.js";

import { isAuthorized, isDoctor, isPatient } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getallpatients", isAuthorized, getAllPatients);
router.get("/getpatientbyid/:id", isAuthorized, getPatientById);
router.get("/getpatientbyname", isAuthorized, getPatientByName);
router.put("/updatepatient/:id", isAuthorized, updatePatientDetails);
router.get('/patientinfo', isPatient, getPatientInfo);

export default router;
