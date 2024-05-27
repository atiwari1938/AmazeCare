import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Prescription from "../models/prescriptionModel.js";
import Appointment from "../models/appointmentModel.js";
import Doctor from '../models/doctorModel.js';
import MedicalRecord from '../models/medicalRecordModel.js';
// import models from "../models/associations.js";
import logger from "../utils/logger.js";

export const createPrescription = catchAsyncError(async (req, res, next) => {
  const { RecordID, Medicine, Instructions, Dosage } = req.body;

  try {
    await Prescription.sync();
    const newPrescription = await Prescription.create({
      RecordID: RecordID,
      Medicine: Medicine,
      Instructions: Instructions,
      Dosage: Dosage,
    });
    logger.info("New prescription created :", newPrescription);
    res.status(200).json({
      success: true,
      message: "Prescription created successfully",
      newPrescription,
    });
  } catch (error) {
    logger.error("Error in creating prescription:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


export const getAllPrescription = catchAsyncError(async (req, res, next) => {
  try {
    const allPrescriptions = await Prescription.findAll();

    if (!allPrescriptions) {
      logger.info("No prescription found ");
      return res
        .status(404)
        .json({ success: false, error: "prescription not found" });
    }

    logger.info("All Prescriptions :", allPrescriptions);
    res.status(200).json({ success: true, Prescriptions: allPrescriptions });
  } catch (error) {
    logger.error("Error in fetching all prescriptions :", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching Prescriptions", error });
  }
});

export const getAllPrescriptionByID = catchAsyncError(
  async (req, res, next) => {
    const prescriptionId = req.params.id;

    try {
      const prescription = await Prescription.findByPk(prescriptionId);

      if (!prescription) {
        logger.info("No Prescription found");
        return res
          .status(404)
          .json({ success: false, error: "prescription not found" });
      }
      logger.info("Prescription by ID :", prescription);
      res.status(200).json({ success: true, Prescriptions: prescription });
    } catch (error) {
      logger.error("Error in fetching prescrption:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const getAllPrescriptionByRecordID = catchAsyncError(
  async (req, res, next) => {
    const recordId = req.params.id;

    try {
      const prescription = await Prescription.findAll({
        where: { RecordID: recordId },
      });

      if (!prescription) {
        logger.info("No Prescription found");
        return res
          .status(404)
          .json({ success: false, error: "prescription not found" });
      }
      logger.info("All Prescription by Medical record :", prescription);
      res.status(200).json({ success: true, prescription });
    } catch (error) {
      logger.error(
        "Error in fetching prescription by medical record ID:",
        error
      );
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const updatePrescription = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Medicine, Instructions, Dosage } = req.body;

    const prescription = await Prescription.findByPk(id);
    if (!prescription) {
      logger.info("No Prescription found");
      return res.status(404).json({ error: "Prescription not found" });
    }

    prescription.Medicine = Medicine;
    prescription.Instructions = Instructions;
    prescription.Dosage = Dosage;

    await prescription.save();
    logger.info("Prescription updated succesfully :", prescription);
    res.status(200).json({ success: true, prescription });
  } catch (error) {
    logger.error("Error in updating prescription :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const deletePrescription = catchAsyncError(async (req, res, next) => {
  const prescriptionId = req.params.id;

  try {
    const prescription = await Prescription.findByPk(prescriptionId);

    if (!prescription) {
      logger.info("No Prescription found");
      return res
        .status(404)
        .json({ success: false, error: "Prescription not found" });
    }

    await prescription.destroy();
    logger.info("Prescription deleted successfully:", prescription);
    res
      .status(200)
      .json({ success: true, message: "Prescription deleted succesfully" });
  } catch (error) {
    logger.error("Error in deleting prescription :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getCompletedConsultingByPatientID = catchAsyncError(async (req, res, next) => {
  const { patientId } = req.params;

  try {
    const completedConsultations = await Appointment.findAll({
      where: {
        PatientID: patientId,
        AppointmentStatus: 'Completed'
      },
      include: [
        {
          model: Doctor,
          attributes: ['DoctorName']
        },
        {
          model: MedicalRecord,
          include: [
            {
              model: Prescription,
              attributes: ['PrescriptionID', 'RecordID', 'Medicine', 'Instructions', 'Dosage']
            }
          ]
        }
      ]
    });

    if (!completedConsultations.length) {
      logger.info("No completed consultations found for patient ID:", patientId);
      return res.status(404).json({ success: false, error: "No completed consultations found" });
    }

    logger.info("Completed consultations:", completedConsultations);
    res.status(200).json({ success: true, completedConsulting: completedConsultations });
  } catch (error) {
    logger.error("Error fetching completed consulting details:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});