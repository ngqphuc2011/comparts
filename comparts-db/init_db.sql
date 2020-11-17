-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: comparts
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.2

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
-- Table structure for table `tbl_case`
--

DROP TABLE IF EXISTS `tbl_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_case` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `eatx_support` bit(1) NOT NULL,
  `atx_support` bit(1) NOT NULL,
  `matx_support` bit(1) NOT NULL,
  `itx_support` bit(1) NOT NULL,
  `hdd_slot_num` int DEFAULT NULL,
  `ssd_slot_num` int DEFAULT NULL,
  `supported_top_fan` varchar(255) DEFAULT NULL,
  `supported_rear_fan` varchar(255) DEFAULT NULL,
  `supported_front_fan` varchar(255) DEFAULT NULL,
  `supported_side_fan` varchar(255) DEFAULT NULL,
  `supported_psu_size` varchar(255) DEFAULT NULL,
  `supported_vga_length` int DEFAULT NULL,
  `supported_cpu_cooler_height` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_case`
--

LOCK TABLES `tbl_case` WRITE;
/*!40000 ALTER TABLE `tbl_case` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_case` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cpu`
--

DROP TABLE IF EXISTS `tbl_cpu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cpu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `core_num` int NOT NULL,
  `thread_num` int NOT NULL,
  `base_frequency` float NOT NULL,
  `turbo_frequency` float DEFAULT NULL,
  `cache` float NOT NULL,
  `socket` varchar(255) NOT NULL,
  `tdp` int NOT NULL,
  `memory_type` varchar(255) NOT NULL,
  `memory_frequency` int NOT NULL,
  `process` int NOT NULL,
  `graphics` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `img` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cpu`
--

LOCK TABLES `tbl_cpu` WRITE;
/*!40000 ALTER TABLE `tbl_cpu` DISABLE KEYS */;
INSERT INTO `tbl_cpu` VALUES (1,'Core i3-10100F','Intel',4,8,3.6,4.3,8,'LGA1200',65,'DDR4',2666,14,NULL,2299000,'i3-10100f.jpg'),(2,'Core i9-10850K Avengers Edition','Intel',10,20,3.6,5.2,20,'LGA1200',95,'DDR4',2933,14,'Intel UHD Graphics 630',12599000,'i9-10850ka.jpg'),(3,'Ryzen 9 5950X','AMD',16,32,3.4,4.9,64,'AM4',105,'DDR4',3200,7,NULL,20899000,'r9-5950x.jpg'),(5,'Ryzen 3 3200G','AMD',4,4,3.6,4,4,'AM4',65,'DDR4',2933,12,'Radeon Vega 8 Graphics',2599000,'r3-3200g.jpg'),(6,'Core i5-9400F','Intel',6,6,2.9,4.1,9,'LGA1151v2',65,'DDR4',2666,14,NULL,3699000,'i5-9400f.jpg'),(10,'Pentium G5400','Intel',2,4,3.7,NULL,35,'LGA1151v2',4,'DDR4',2400,14,'Intel UHD Graphics 610',1559000,'p-g5400.jpg'),(11,'Ryzen 5 3600','AMD',6,12,3.6,4.2,35,'AM4',65,'DDR4',3200,7,NULL,5199000,'r5-3600.jpg'),(20,'Athlon 3000G','AMD',2,4,3.5,NULL,5,'AM4',35,'DDR4',2666,14,'Radeon Vega 3 Graphics',1259000,'a-3000g.jpg'),(25,'Core i5-10400F','Intel',6,12,2.9,4.3,12,'LGA1200',65,'DDR4',2666,14,NULL,4199000,'i5-10400f.jpg'),(26,'Core i7-8700K','Intel',6,12,3.7,4.7,12,'LGA1151v2',95,'DDR4',2666,14,'Intel UHD Graphics 630',9599000,'i7-8700k.jpg'),(27,'Core i5-8400','Intel',6,6,2.8,4,9,'LGA1151v2',65,'DDR4',2666,14,'Intel UHD Graphics 630',4999000,'i5-8400.jpg'),(28,'Ryzen 5 2600','AMD',6,12,3.4,3.9,19,'AM4',65,'DDR4',2933,12,'',3399000,'r5-2600.jpg'),(29,'Ryzen 7 2700','AMD',8,16,3.2,4.1,20,'AM4',65,'DDR4',2933,12,'',4599000,'r7-2700.jpg'),(30,'Core i9-9900K','Intel',8,16,3.6,5,16,'LGA1151v2',95,'DDR4',2666,14,'Intel UHD Graphics 630',10599000,'i9-9900k.jpg'),(32,'Core i9-9900X','Intel',10,20,3.5,4.5,19,'LGA2066',165,'DDR4',2666,14,'',14399000,'i9-9900x.jpg'),(34,'Ryzen Threadripper 3990X','AMD',64,128,2.9,4.3,292,'sTRX4',280,'DDR4',3200,7,'',102899000,'rt-3990x.jpg'),(36,'Core i9-9980XE Extreme Edition','Intel',18,36,3,4.5,24.75,'LGA2066',165,'DDR4',2666,14,NULL,26699000,'i9-9980xe.jpg'),(37,'Xeon Platinum 8180','Intel',28,56,2.5,3.8,205,'LGA3647',205,'DDR4',2666,14,NULL,319989000,'x-p8180.jpg'),(38,'Xeon Gold 6154','Intel',18,36,3,3.7,24.75,'LGA3647',200,'DDR4',2666,14,NULL,119089000,'x-g6154.jpg'),(39,'Core i9-10900K','Intel',10,20,3.7,5.3,20,'LGA1200',125,'DDR4',2933,14,'Intel UHD Graphics 630',13999000,'i9-10900k.jpg'),(51,'EPYC 7F32','AMD',8,16,3.7,3.9,128,'SP3',180,'DDR4',3200,7,'',65199000,'img-1605642973881.jpg');
/*!40000 ALTER TABLE `tbl_cpu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_gpu`
--

DROP TABLE IF EXISTS `tbl_gpu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_gpu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `engine` varchar(255) DEFAULT NULL,
  `memory_size` int DEFAULT NULL,
  `memory_type` varchar(255) DEFAULT NULL,
  `cuda` int DEFAULT NULL,
  `interface` varchar(255) DEFAULT NULL,
  `dp_port_num` int DEFAULT NULL,
  `hdmi_port_num` int DEFAULT NULL,
  `dvi_port_num` int DEFAULT NULL,
  `vga_port_num` int DEFAULT NULL,
  `tdp` int DEFAULT NULL,
  `recommended_psu_wattage` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_gpu`
--

LOCK TABLES `tbl_gpu` WRITE;
/*!40000 ALTER TABLE `tbl_gpu` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_gpu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hdd`
--

DROP TABLE IF EXISTS `tbl_hdd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hdd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `interface` varchar(255) DEFAULT NULL,
  `cache` int DEFAULT NULL,
  `rpm` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hdd`
--

LOCK TABLES `tbl_hdd` WRITE;
/*!40000 ALTER TABLE `tbl_hdd` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_hdd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_mb`
--

DROP TABLE IF EXISTS `tbl_mb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_mb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `chipset` varchar(255) DEFAULT NULL,
  `socket` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `supported_memory_type` varchar(255) DEFAULT NULL,
  `supported_memory_frequency` int DEFAULT NULL,
  `memory_slots_num` int DEFAULT NULL,
  `pcie_x16_slots_num` int DEFAULT NULL,
  `pcie_x8_slots_num` int DEFAULT NULL,
  `pcie_x4_slots_num` int DEFAULT NULL,
  `pcie_x2_slots_num` int DEFAULT NULL,
  `pcie_x1_slots_num` int DEFAULT NULL,
  `sata_slots_num` int DEFAULT NULL,
  `m2_slots_num` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_mb`
--

LOCK TABLES `tbl_mb` WRITE;
/*!40000 ALTER TABLE `tbl_mb` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_mb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_psu`
--

DROP TABLE IF EXISTS `tbl_psu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_psu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `input_voltage` int DEFAULT NULL,
  `wattage` int DEFAULT NULL,
  `fan_size` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_psu`
--

LOCK TABLES `tbl_psu` WRITE;
/*!40000 ALTER TABLE `tbl_psu` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_psu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ram`
--

DROP TABLE IF EXISTS `tbl_ram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ram` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `cas_latency` int DEFAULT NULL,
  `voltage` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ram`
--

LOCK TABLES `tbl_ram` WRITE;
/*!40000 ALTER TABLE `tbl_ram` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_ram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ssd`
--

DROP TABLE IF EXISTS `tbl_ssd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ssd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `interface` varchar(255) DEFAULT NULL,
  `max_read_speed` int DEFAULT NULL,
  `max_write_speed` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ssd`
--

LOCK TABLES `tbl_ssd` WRITE;
/*!40000 ALTER TABLE `tbl_ssd` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_ssd` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-18  3:26:47
