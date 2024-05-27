import Appointments from "./appointmentModel.js";
import Doctors from "./doctorModel.js";
import MedicalRecord from "./medicalRecordModel.js";
import Prescriptions from "./prescriptionModel.js";
import Patients from "./patientModel.js";

// Appointments associations
Appointments.belongsTo(Doctors, { foreignKey: "DoctorID" });
Appointments.belongsTo(Patients, { foreignKey: "PatientID" });
Appointments.hasOne(MedicalRecord, { foreignKey: "AppointmentID" });

// MedicalRecord associations
MedicalRecord.belongsTo(Appointments, { foreignKey: "AppointmentID" });
MedicalRecord.hasMany(Prescriptions, { foreignKey: "RecordID" });

// Prescriptions associations
Prescriptions.belongsTo(MedicalRecord, { foreignKey: "RecordID" });

export { Appointments, Doctors, MedicalRecord, Prescriptions, Patients };