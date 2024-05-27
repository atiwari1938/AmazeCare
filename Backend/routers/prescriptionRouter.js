import express from "express";
import {
  createPrescription,
  deletePrescription,
  getAllPrescription,
  getAllPrescriptionByID,
  getAllPrescriptionByRecordID,
  updatePrescription,
  getCompletedConsultingByPatientID
} from "../controllers/prescriptionController.js";

import { isAdmin, isAuthorized, isDoctor, isPatient } from "../middlewares/auth.js";
import { prescriptionDataValidate } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/createprescription",
  isDoctor,
  prescriptionDataValidate,
  createPrescription
);
router.get("/getallprescription", isDoctor, getAllPrescription);
router.get("/getprescription/:id", isAuthorized, getAllPrescriptionByID);
router.get(
  "/getallprescriptionbyrecord/:id",
  isAuthorized,
  getAllPrescriptionByRecordID
);
router.get(
  "/getcompletedconsultingbypatientid/:patientId",
  isPatient,
  getCompletedConsultingByPatientID
);
router.put("/updateprescription/:id", isDoctor, updatePrescription);
router.delete("/deleteprescription/:id", isDoctor, deletePrescription);

export default router;
