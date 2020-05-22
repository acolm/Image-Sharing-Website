-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `pots to users_idx` (`fk_userid`),
  CONSTRAINT `pots to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'sick owls','dope','public\\images\\uploads\\93bd2e43f0b64a3c229966258e7a805b01048c2359f5.png','public/images/uploads/thumbnail-93bd2e43f0b64a3c229966258e7a805b01048c2359f5.png',0,'2020-05-20 19:05:04',6),(3,'car','fast','public\\images\\uploads\\8412368fcc5061cc75505de6352f2dd43a260c70f8a8.jpeg','public/images/uploads/thumbnail-8412368fcc5061cc75505de6352f2dd43a260c70f8a8.jpeg',0,'2020-05-21 02:41:58',7),(4,'Frog','game','public\\images\\uploads\\d1e223ebc686ee1aa8d63eda5e172bd8b9cbff9a360b.png','public/images/uploads/thumbnail-d1e223ebc686ee1aa8d63eda5e172bd8b9cbff9a360b.png',0,'2020-05-21 22:54:44',7),(5,'logo','station','public\\images\\uploads\\a5fe7bfce381403f1862f7428801a29a9da630deabb5.png','public/images/uploads/thumbnail-a5fe7bfce381403f1862f7428801a29a9da630deabb5.png',0,'2020-05-21 22:54:59',7),(6,'Sneaky Sasquatch','Apple Arcade adventure game','public\\images\\uploads\\a0b15b8525183270da20dda4a4fc0f68e5975a9831c4.png','public/images/uploads/thumbnail-a0b15b8525183270da20dda4a4fc0f68e5975a9831c4.png',0,'2020-05-21 22:55:55',7);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-21 22:58:53
