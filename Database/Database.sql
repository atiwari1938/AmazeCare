-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: amazecare
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `AdminID` int NOT NULL AUTO_INCREMENT,
  `UserRole` enum('Admin') NOT NULL,
  `Email` varchar(20) NOT NULL,
  `Passwordd` varchar(100) NOT NULL,
  `AdminName` varchar(40) NOT NULL,
  PRIMARY KEY (`AdminID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (3,'Admin','sandeep@gmail.com','$2b$10$cryJuirNDrjsuSYUIJ7NH.6wHuL02IP7WpB6nVvPwZ909b4HbNm0O','Sandeep Mishra'),(5,'Admin','madhu@gmail.com','$2b$10$sC41jGb7CnW.6/DORdQL7uijApXwybOK4kA5nCPSu8YySDGQAKL3C','Madhu Mishra');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `AppointmentID` int NOT NULL AUTO_INCREMENT,
  `DoctorID` int NOT NULL,
  `PatientID` int NOT NULL,
  `AppointmentDate` datetime NOT NULL,
  `Symptoms` text NOT NULL,
  `AppointmentStatus` enum('completed','pending') NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`AppointmentID`),
  KEY `DoctorID` (`DoctorID`),
  KEY `PatientID` (`PatientID`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`DoctorID`) REFERENCES `doctors` (`DoctorID`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`PatientID`) REFERENCES `patients` (`PatientID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,3,1,'2024-06-01 10:00:00','Headache','completed','2024-05-23 11:14:37',NULL),(2,3,1,'2024-03-29 00:00:00','Headache','completed',NULL,NULL),(6,3,1,'2024-05-25 10:00:00','Fever, cough','completed','2024-05-26 04:17:38','2024-05-20 04:53:20'),(7,19,1,'2024-05-21 00:00:00','sad','completed','2024-05-26 04:12:18','2024-05-20 06:46:33'),(8,13,10,'2024-05-22 00:00:00','sad','pending','2024-05-22 06:16:39','2024-05-22 06:16:39'),(9,13,10,'2024-05-22 00:00:00','sad','pending','2024-05-22 06:24:17','2024-05-22 06:24:17'),(11,22,10,'2024-05-22 00:00:00','saas','pending','2024-05-22 06:26:28','2024-05-22 06:26:28'),(12,21,13,'2024-05-23 00:00:00','Throat pain','pending','2024-05-22 11:22:26','2024-05-22 11:22:26'),(13,13,1,'2024-05-22 00:00:00','throat pain','pending','2024-05-22 11:59:01','2024-05-22 11:59:01'),(14,3,1,'2024-05-30 15:09:00','sdasdas','completed','2024-05-26 04:30:15','2024-05-23 07:14:20'),(15,19,14,'2024-05-31 18:07:00','high fever , anxiety','pending','2024-05-23 12:07:51','2024-05-23 11:27:43'),(16,3,13,'2024-05-24 00:00:00','high fever','completed','2024-05-26 05:06:07','2024-05-24 14:21:24'),(17,3,1,'2024-05-05 18:30:00','Test symptoms','completed','2024-05-27 04:17:00','2024-05-27 04:17:00'),(18,3,1,'2024-05-05 18:30:00','Test symptoms','completed','2024-05-27 04:19:12','2024-05-27 04:19:12'),(19,3,1,'2024-05-05 18:30:00','Test symptoms','completed','2024-05-27 09:47:34','2024-05-27 09:47:34'),(20,3,1,'2024-05-05 18:30:00','Test symptoms','completed','2024-05-27 09:48:51','2024-05-27 09:48:51'),(21,3,1,'2024-05-05 18:30:00','Test symptoms','completed','2024-05-27 09:49:56','2024-05-27 09:49:56'),(22,23,28,'2024-05-29 10:26:00','High fever','pending','2024-05-27 10:27:00','2024-05-27 10:26:38');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `DoctorID` int NOT NULL AUTO_INCREMENT,
  `DoctorName` varchar(30) NOT NULL,
  `Speciality` varchar(50) NOT NULL,
  `Experience` int NOT NULL,
  `Qualification` text NOT NULL,
  `Designation` varchar(40) NOT NULL,
  `UserRole` varchar(10) NOT NULL,
  `Passwordd` varchar(70) NOT NULL,
  `Email` varchar(20) NOT NULL,
  PRIMARY KEY (`DoctorID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (3,'Suyukti','surgeon',5,'mbbs','Senior Doctor','Doctor','$2b$10$bdTfuQgCv13XHQXeWELgUeBnQGI8AAgaJS9YxNh93AnC4QzWu00W6','suyukti@gmail.com'),(13,'Manish Singh','cardio',6,'Mbbbbs','junior Doctor','Doctor','$2b$10$qVsC1xfENJe33Sgt4HwPIuI73Iln4rG7Yn/QOYIsiP.lp8G4zFWIS','manis@gmail.com'),(19,'Poorti Shukla','cardio',3,'Mbbbbs','junior assitant Doctor','Doctor','$2b$10$VrsveE3Awh9vnYV3TZXX9O8WgjynXaeF2yJc1jmCYECcvAl1uAC5y','poortii@gmail.com'),(20,'Poorti Shukla','cardio',3,'Mbbbbs','junior assitant Doctor','Doctor','$2b$10$sdhFXe14Xj1NwnOM2wuPF.kRNtM672.yz5LN7/iLTowGCXRbbkEcq','poortiii@gmail.com'),(21,'Anany Shukla','cardiology',5,'Mbbbbs','junior assitant Doctor','Doctor','$2b$10$8NY7YgKJ.8.Nl5tYLqSmNejAqzf6478LOHEO4oDMEF6CjiL52Oxji','anany@gmail.com'),(22,'Anany Shukla','cardiology',8,'Mbbbbs','junior assitant doctor Doctor','Doctor','$2b$10$c46PNdThU13uKpQJWSIqPejzXVGsq6Di1VTyxmHraIkXRetyRfcaK','ananyi@gmail.com'),(23,'Ankit Tiwari','Ortho',2,'MBBS','Sr','Doctor','$2b$10$FfsFG3.tZwVPWKR0dv8zieQfl5NaMZINGkkrkOXhPOfIqtZ.wnq9K','Ankit@gmail.com'),(25,'Renu Singh','Dentist',6,'MBBS','Sr','Doctor','$2b$10$c2qSDwmI2Td.ezjB8i834eD/i9UFtexgZ1bQc1jGwJvtUbwMr9NPi','Renu@gmail.com'),(29,'Priyanshu','eye',3,'mbbs','sr','Doctor','$2b$10$ns4L2k6st/8PA/MhW55cQuXtALIaS4yDAoU28.A95Juh/UCLxIueK','Priyanshu@gmail.com');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalrecords`
--

DROP TABLE IF EXISTS `medicalrecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalrecords` (
  `RecordID` int NOT NULL AUTO_INCREMENT,
  `CurrentSymptoms` varchar(60) NOT NULL,
  `PhysicalExamination` varchar(60) NOT NULL,
  `TreatmentPlan` varchar(100) NOT NULL,
  `RecommendedTests` varchar(80) NOT NULL,
  `AppointmentID` int NOT NULL,
  PRIMARY KEY (`RecordID`),
  KEY `AppointmentID` (`AppointmentID`),
  CONSTRAINT `medicalrecords_ibfk_1` FOREIGN KEY (`AppointmentID`) REFERENCES `appointments` (`AppointmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalrecords`
--

LOCK TABLES `medicalrecords` WRITE;
/*!40000 ALTER TABLE `medicalrecords` DISABLE KEYS */;
INSERT INTO `medicalrecords` VALUES (1,'nose bleeding','something something something','don\'t breate  sometime ,take rest','something something something something',1),(6,'Test symptoms','Test examination','Test treatment','Test tests',1),(7,'high fever','high body temp ','take rest ','blood test',16),(8,'heart beating fast','high bp','take rest','bp test',16);
/*!40000 ALTER TABLE `medicalrecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `PatientID` int NOT NULL AUTO_INCREMENT,
  `PatientName` varchar(30) NOT NULL,
  `Age` int NOT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT NULL,
  `ContactNumber` varchar(12) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `UserRole` varchar(10) NOT NULL,
  `Passwordd` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`PatientID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'Anmol',34,'Male','7233042957','anmol@gmail.com','Patient','$2b$10$BKyawWHPbIEn/5mYvLg8BONqgPbf.wX3zzhtezlGA7fvafaftZ.o.'),(3,'Ayush',25,'Male','7233045624','ayush@gmail.com','Patient','$2b$10$AdTDWCRZVRNnGIanb7m8o.BIbu58rGYu1J7PdTiTafrL1qk8sMPNy'),(5,'Sankalp',25,'Male','7233045689','sankalp@gmail.com','Patient','$2b$10$5VaV1mU5I8mXCFjBYewtV.EWqLvsIQ8oBZAR5ww/TjUlVnFk1kCnW'),(6,'Aslam',76,'Male','7566908865','aslam@gmail.com','Patient','$2b$10$1CNEQCXp1ijemChAdWZKZ.ERa2t4Uxv3I/fVyJI7IDTU/cBVNxhXC'),(9,'Ajay Sharma',21,'Male','7878787878','ajay@gmail.com','Patient','$2b$10$YXSrTRfD5DLXCBSB.rkD4.uZlTJF8glM7qHs1hWcJtiY/Ps729yV2'),(10,'Sam Rana',23,'Male','9898989898','Sam@gmail.com','Patient','$2b$10$4z9yFzKaYcSpdW5JXR5m9eAuoZIt6N2.i77Fm78M9j78zA8WlP1w.'),(13,'Renu Singh',30,'Female','9899887898','Renu@gmail.com','Patient','$2b$10$m/0oqBj/ol1VvVdUD4a5uO5pzLCQ4nweTWfRlJLCgXYQbUbd0/eNG'),(14,'Amit Garkoti',22,'Male','9865457575','Amit@gmail.com','Patient','$2b$10$NJj89kqD.Gn6UgtZgiT6GeRAKfyx342U.jHVucfU7Moh3Hq0nq8YW'),(20,'Priyanshu',22,'Female','9878787878','Priyanshu@gmail.com','Patient','$2b$10$7cPuMQmE8GF8yYOnxPgG3.5vbGUW8fcfP893ah/DpZmJT.EjdoXRi'),(28,'Shyam',23,'Male','9878987898','Shyam@gmail.com','Patient','$2b$10$RMe2owE0Vv.4/QbALCF7IOf799p3QRxBjoQn4JBw8kTVC4PYkvQ5a');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `PrescriptionID` int NOT NULL AUTO_INCREMENT,
  `RecordID` int NOT NULL,
  `Medicine` varchar(60) NOT NULL,
  `Instructions` varchar(100) NOT NULL,
  `Dosage` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PrescriptionID`),
  KEY `RecordID` (`RecordID`),
  CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`RecordID`) REFERENCES `medicalrecords` (`RecordID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (2,1,'Calpol','something something something something','2 times in a day','2024-04-18 16:43:31','2024-04-18 16:43:31'),(3,1,'Test Medicine','Test Instructions','Test Dosage','2024-05-18 05:53:53','2024-05-18 05:53:53'),(4,7,'Paracetamol, Anitbiotic ','dont eat fried food','after lucnch and dinner ','2024-05-26 04:44:53','2024-05-26 04:44:53'),(5,7,'paracetamol','dont drink cold water','3 times day after meals','2024-05-26 17:56:17','2024-05-26 17:56:17'),(6,7,' paracetamol','Take rest','After lunch','2024-05-27 10:29:23','2024-05-27 10:29:23');
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-27 17:48:01
