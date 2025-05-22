-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: iccs
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin1','$2b$10$oEQD1PccwfRZCZmBI2hmUeuEBzeEIt6SkhBZipIulkspaS5IStXM.');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `student_number` bigint(20) NOT NULL,
  `student_name` varchar(50) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `course` varchar(50) DEFAULT NULL,
  `section` int(11) DEFAULT NULL,
  PRIMARY KEY (`student_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1230002183,'Patrick Lenard Guilalas',2,'BSCS',1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_log`
--

DROP TABLE IF EXISTS `student_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_num` bigint(20) NOT NULL,
  `subject_code` varchar(50) NOT NULL,
  `unit_num` int(11) NOT NULL,
  `log_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`log_id`),
  KEY `student_num` (`student_num`),
  KEY `subject_code` (`subject_code`),
  CONSTRAINT `student_log_ibfk_1` FOREIGN KEY (`student_num`) REFERENCES `student` (`student_number`),
  CONSTRAINT `student_log_ibfk_2` FOREIGN KEY (`subject_code`) REFERENCES `subject` (`subject_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_log`
--

LOCK TABLES `student_log` WRITE;
/*!40000 ALTER TABLE `student_log` DISABLE KEYS */;
INSERT INTO `student_log` VALUES (1,1230002183,'IMGT211',1,'2025-05-20 15:34:53');
/*!40000 ALTER TABLE `student_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `subject_code` varchar(50) NOT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`subject_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('IMGT211','Information Management'),('LFAD211','Linux Fundamentals and Administration'),('WBDV112','Web Development');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `teacher_id` bigint(20) NOT NULL,
  `teacher_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'test'),(2,'test2');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_log`
--

DROP TABLE IF EXISTS `teacher_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` bigint(20) NOT NULL,
  `subject_code` varchar(50) NOT NULL,
  `log_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`log_id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `subject_code` (`subject_code`),
  CONSTRAINT `teacher_log_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `teacher_log_ibfk_2` FOREIGN KEY (`subject_code`) REFERENCES `subject` (`subject_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_log`
--

LOCK TABLES `teacher_log` WRITE;
/*!40000 ALTER TABLE `teacher_log` DISABLE KEYS */;
INSERT INTO `teacher_log` VALUES (1,1,'IMGT211','2025-05-20 15:43:00');
/*!40000 ALTER TABLE `teacher_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_subject`
--

DROP TABLE IF EXISTS `teacher_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_subject` (
  `teacher_id` bigint(20) NOT NULL,
  `subject_code` varchar(50) NOT NULL,
  PRIMARY KEY (`teacher_id`,`subject_code`),
  KEY `subject_code` (`subject_code`),
  CONSTRAINT `teacher_subject_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `teacher_subject_ibfk_2` FOREIGN KEY (`subject_code`) REFERENCES `subject` (`subject_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_subject`
--

LOCK TABLES `teacher_subject` WRITE;
/*!40000 ALTER TABLE `teacher_subject` DISABLE KEYS */;
INSERT INTO `teacher_subject` VALUES (1,'LFAD211'),(1,'WBDV112'),(2,'IMGT211'),(2,'LFAD211'),(2,'WBDV112');
/*!40000 ALTER TABLE `teacher_subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-21  9:46:06
