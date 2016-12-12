/*
SQLyog Community v12.3.2 (64 bit)
MySQL - 10.1.18-MariaDB : Database - travel
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`travel` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `travel`;

/*Table structure for table `scenery` */

DROP TABLE IF EXISTS `scenery`;

CREATE TABLE `scenery` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL COMMENT '类别',
  `region_id` int(10) unsigned NOT NULL COMMENT '地区',
  `season` varchar(20) NOT NULL COMMENT '季节',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `location` varchar(50) DEFAULT NULL COMMENT '位置',
  `intro` varchar(1000) DEFAULT NULL COMMENT '简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
