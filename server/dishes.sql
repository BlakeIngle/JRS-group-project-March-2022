DROP SCHEMA IF EXISTS dishes;
CREATE SCHEMA `dishes` ;

CREATE TABLE `dishes`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(32) NOT NULL,
  
  PRIMARY KEY (`id`));

CREATE TABLE `dishes`.`dish` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `meal` VARCHAR(45) NOT NULL,
  `cuisine` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (1,'burger','entrees','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (2,'sushi','entrees','asian');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (3,'ramen','entrees','asian');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (4,'salad','entrees','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (5,'wings','entrees','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (6,'fish','entrees','seafood');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (7,'tacos','entrees','mexican');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (8,'pancakes','breakfast','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (9,'french toast','breakfast','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (10,'eggs','breakfast','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (11,'waffles','breakfast','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (12,'nachos','entrees','mexican');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (13,'brownies','dessert','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (14,'cookies','dessert','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (15,'donuts','dessert','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (16,'cake','dessert','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (17,'ice cream','dessert','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (18,'milkshake','dessert','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (19,'fried chicken','entrees','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (20,'steak','entrees','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (21,'burrito','entrees','mexican');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (22,'pizza','entrees','italian');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (23,'sub sandwich','entrees','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (24,'coffee','drinks','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (25,'smoothie','drinks','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (26,'muffins','breakfast','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (27,'pie','dessert','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (28,'oysters','entrees','seafood');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (29,'crab','entrees','seafood');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (30,'lobster','entrees','seafood');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (31,'shrimp','entrees','seafood');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (32,'pad thai','entrees','asian');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (33,'pho','entrees','asian');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (34,'chicken tikka','entrees','indian');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (35,'hushpuppies','appetizers','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (36,'bagel','breakfast','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (37,'biscuits and gravy','breakfast','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (38,'fish & chips','entrees','seafood');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (39,'dumplings','appetizers','asian');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (40,'tapas','appetizers','');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (41,'mac and cheese','appetizers','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (42,'french fries','appetizers','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (43,'onion rings','appetizers','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (44,'poke','entrees','american');
INSERT INTO `` (`id`,`name`,`meal`,`cuisine`) VALUES (45,'falafel','entrees','mediterranean');
