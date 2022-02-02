DROP SCHEMA IF EXISTS dishes;
CREATE SCHEMA `dishes` ;

CREATE TABLE `dishes`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(32) NOT NULL,
  
  PRIMARY KEY (`id`));

CREATE TABLE `dishes`.`dish` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);
