DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Auto increment unique id',
  `advisor_id` varchar(98) NOT NULL COMMENT 'It is mix of characters which is unique (firstname(45)-lastname(45)-six_digits_random_numbers(6) = 98 characters including two dash(-))',
  `user_role_id` int NOT NULL DEFAULT '1' COMMENT 'It is id of the user_role table',
  `firstname` varchar(45) DEFAULT NULL COMMENT 'First name of registered user',
  `lastname` varchar(45) DEFAULT NULL COMMENT 'Last name of registered user',
  `email` varchar(150) NOT NULL COMMENT 'Email address valid up to 150 characters ',
  `mobile_phone` bigint DEFAULT NULL COMMENT 'User’s phone number',
  `password` varchar(200) NOT NULL COMMENT 'Encrypted password',
  `advisor_unique_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `advisor_unique_id_UNIQUE` (`advisor_unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Auto increment role id which is unique and not null',
  `role` varchar(45) NOT NULL COMMENT 'Define role which is not null',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_UNIQUE` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `user_role` VALUES (2,'ADMIN_USER'),(1,'USER');


DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `advisor_id` int NOT NULL,
  `contact_uid` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` bigint DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `contact_type` varchar(15) DEFAULT NULL,
  `source` varchar(45) DEFAULT NULL,
  `address` varchar(150) NOT NULL,
  `apt` varchar(10) DEFAULT NULL,
  `city` varchar(80) DEFAULT NULL,
  `state` varchar(80) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `case_id` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  UNIQUE KEY `contact_id_UNIQUE` (`contact_id`),
  UNIQUE KEY `contact_uid_UNIQUE` (`contact_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



DROP TABLE IF EXISTS `case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `case` (
  `id` int NOT NULL AUTO_INCREMENT,
  `case_id` varchar(25) NOT NULL COMMENT 'Unique case id',
  `req_help` json DEFAULT NULL,
  `referral` varchar(45) DEFAULT NULL,
  `lead_detail` varchar(250) DEFAULT NULL,
  `for_who` varchar(45) DEFAULT NULL,
  `case_name` varchar(150) DEFAULT NULL,
  `case_stage` varchar(45) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `case_details` varchar(250) DEFAULT NULL,
  `if_lead` tinyint DEFAULT '0' COMMENT '0 = false\n1 = true\nDefault is 0',
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `contact_uid_UNIQUE` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



DROP TABLE IF EXISTS `patient_to_payer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_to_payer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_uid` varchar(45) NOT NULL,
  `payer_uid` varchar(45) NOT NULL,
  `case_id` varchar(25) DEFAULT NULL,
  `is_current_payer` tinyint DEFAULT '1' COMMENT '1 = true\n0 = false\nWhen new record insert, it by default enable',
  `add_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;