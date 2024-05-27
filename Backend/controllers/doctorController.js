import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Doctors from "../models/doctorModel.js";
import logger from "../utils/logger.js";

// export const getAllDoctors = catchAsyncError(async (req, res, next) => {
//   try {
//     const allDoctors = await Doctors.findAll();
//     if (!allDoctors) {
//       logger.info("No Doctors found");
//       return res
//         .status(404)
//         .json({ success: false, error: "Doctor not found" });
//     }
//     logger.info("All Doctors  :", allDoctors);
//     res.status(200).json({ success: true, Doctors: allDoctors });
//   } catch (error) {
//     logger.error("Error in fetching all doctors :", error);
//     res
//       .status(500)
//       .json({ success: false, error: "Error fetching Doctors", error });
//   }
// });
export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  try {
    const allDoctors = await Doctors.findAll({
      attributes: ['DoctorID', 'DoctorName', 'Speciality', 'Experience', 'Qualification', 'Designation', 'Email'],
    });

    if (!allDoctors.length) {
      logger.info('No doctors found');
      return res.status(404).json({ success: false, error: 'No doctors found' });
    }

    logger.info('All doctors:', allDoctors);
    res.status(200).json({ success: true, doctors: allDoctors });
  } catch (error) {
    logger.error('Error fetching all doctors:', error);
    res.status(500).json({ success: false, error: 'Error fetching doctors' });
  }
});

export const getDoctorById = catchAsyncError(async (req, res, next) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctors.findByPk(doctorId);

    if (!doctor) {
      logger.info("No Doctors found");
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }
    logger.info("Doctor by ID :", doctor);
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    logger.error("Error in fetching doctor by ID :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getDoctorByName = catchAsyncError(async (req, res, next) => {});

export const updateDoctorDetails = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { DoctorName,Speciality,Experience,Qualification, Designation,Email } = req.body;

    const doctor = await Doctors.findByPk(id);
    if (!doctor) {
      logger.info("No Doctors found");
      return res.status(404).json({ error: "Doctor not found" });
    }
    doctor.DoctorName = DoctorName;
    doctor.Speciality = Speciality;
    doctor.Experience = Experience;
    doctor.Qualification = Qualification;
    doctor.Designation = Designation;
    doctor.Email = Email;

    await doctor.save();
    logger.info("Doctor updated successfuly :", doctor);
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    logger.error("Error in updating doctor :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export const deleteDoctor = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await Doctors.findByPk(id);
    if (!doctor) {
      logger.info("No doctor found for deletion.");
      return res.status(404).json({ error: 'Doctor not found' });
    }
    await doctor.destroy();
    logger.info(`Doctor with ID ${id} deleted successfully.`);
    res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    logger.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});