import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(400).json({ error: "User not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    if (decoded.hasOwnProperty("PatientID")) {
      req.userId = decoded.PatientID;
    }
    if (decoded.hasOwnProperty("DoctorID")) {
      req.userId = decoded.DoctorID;
    }
    if (decoded.hasOwnProperty("AdminID")) {
      req.userId = decoded.AdminID;
    }

    next();
  });
});

export const isDoctor = catchAsyncError(async (req, res, next) => {
  // Check token in cookies or Authorization header
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: "User not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    if (decoded.UserRole !== "Doctor") {
      return res.status(403).json({
        error: "Patients and Admin are not allowed to use this functionality",
      });
    }

    req.userId = decoded.userId;
    next();
  });
});

// export const isPatient = catchAsyncError(async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res.status(401).json({ error: "User not authorized" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       console.error("Error verifying token:", err);
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     if (decoded.UserRole !== "Patient") {
//       return res.status(403).json({
//         error: "Doctors and Admins are not allowed to use this functionality",
//       });
//     }

//     req.userId = decoded.userId;
//     next();
//   });
// });
export const isPatient = catchAsyncError(async (req, res, next) => {
  // Get the token from cookies or Authorization header
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.error('Token is not available');
    return res.status(401).json({ error: 'User not authorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (decoded.UserRole !== 'Patient') {
      return res.status(403).json({
        error: 'Doctors and Admins are not allowed to use this functionality',
      });
    }

    req.patientId = decoded.patientId;
    console.log(`Patient ID from token: ${req.patientId}`);  // Debugging line
    next();
  });
});

export const isAdmin = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "User not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    if (decoded.UserRole !== "Admin") {
      return res.status(403).json({
        error: "Doctors and Patients are not allowed to use this functionality",
      });
    }

    req.userId = decoded.userId;
    next();
  });
});
