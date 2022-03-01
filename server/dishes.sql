DROP SCHEMA IF EXISTS dishes;

CREATE SCHEMA `dishes`;

CREATE TABLE `dishes`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  
  PRIMARY KEY (`id`)
);

CREATE TABLE `dishes`.`dish` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `meal` VARCHAR(45) NOT NULL,
  `cuisine` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `dishes`.`review` (
  `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
  `userId` VARCHAR(45) NOT NULL,
  `dishId` INT NOT NULL,
  `restaurantId` VARCHAR(255) NOT NULL,
  
  `dateCreated` TIMESTAMP NOT NULL DEFAULT current_timestamp,

  `body` VARCHAR(255) NULL,

  PRIMARY KEY (`id`),

  FOREIGN KEY (`userId`)
        REFERENCES `user`(`id`),
  FOREIGN KEY (`dishId`)
        REFERENCES `dish`(`id`)
);



INSERT INTO
  `dishes`.`dish` (`id`, `name`, `meal`, `cuisine`)
VALUES
  (1, 'burger', 'entrees', 'american'),
  (2, 'sushi', 'entrees', 'asian'),
  (3, 'ramen', 'entrees', 'asian'),
  (4, 'salad', 'entrees', 'american'),
  (5, 'wings', 'entrees', 'american'),
  (6, 'fish', 'entrees', 'seafood'),
  (7, 'tacos', 'entrees', 'mexican'),
  (8, 'pancakes', 'breakfast', ''),
  (9, 'french toast', 'breakfast', ''),
  (10, 'eggs', 'breakfast', ''),
  (11, 'waffles', 'breakfast', ''),
  (12, 'nachos', 'entrees', 'mexican'),
  (13, 'brownies', 'dessert', ''),
  (14, 'cookies', 'dessert', ''),
  (15, 'donuts', 'dessert', ''),
  (16, 'cake', 'dessert', ''),
  (17, 'ice cream', 'dessert', ''),
  (18, 'milkshake', 'dessert', ''),
  (19, 'fried chicken', 'entrees', 'american'),
  (20, 'steak', 'entrees', 'american'),
  (21, 'burrito', 'entrees', 'mexican'),
  (22, 'pizza', 'entrees', 'italian'),
  (23, 'sub sandwich', 'entrees', 'american'),
  (24, 'coffee', 'drinks', ''),
  (25, 'smoothie', 'drinks', ''),
  (26, 'muffins', 'breakfast', ''),
  (27, 'pie', 'dessert', ''),
  (28, 'oysters', 'entrees', 'seafood'),
  (29, 'crab', 'entrees', 'seafood'),
  (30, 'lobster', 'entrees', 'seafood'),
  (31, 'shrimp', 'entrees', 'seafood'),
  (32, 'pad thai', 'entrees', 'asian'),
  (33, 'pho', 'entrees', 'asian'),
  (34, 'chicken tikka', 'entrees', 'indian'),
  (35, 'hushpuppies', 'appetizers', 'american'),
  (36, 'bagel', 'breakfast', ''),
  (37, 'biscuits & gravy', 'breakfast', ''),
  (38, 'fish & chips', 'entrees', 'seafood'),
  (39, 'dumplings', 'appetizers', 'asian'),
  (40, 'tapas', 'appetizers', ''),
  (41, 'mac & cheese', 'appetizers', 'american'),
  (42, 'french fries', 'appetizers', 'american'),
  (43, 'onion rings', 'appetizers', 'american'),
  (44, 'poke', 'entrees', 'american'),
  (45, 'falafel', 'entrees', 'mediterranean'),
  (46, 'bbq', 'entrees', 'american');

