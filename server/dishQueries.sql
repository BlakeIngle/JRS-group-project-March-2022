
INSERT INTO
  `dishes`.`user` (`id`, `firstName`, `email`, `password`)
VALUES
  (101, 'user1', 'user1@email', 'pass'),
  (102, 'user2', 'user2@email', 'pass'),
  (103, 'user3', 'user3@email', 'pass'),
  (104, 'user4', 'user4@email', 'pass'),
  (105, 'user5', 'user5@email', 'pass');
 
INSERT INTO
  `dishes`.`review` (`userId`, `dishId`, `restaurantId`)
VALUES
  (101, 1, 1),
  (101, 5, 2),
  (101, 7, 3),
  (102, 1, 1),
  (102, 5, 2),
  (102, 7, 3),
  (103, 1, 4),
  (103, 5, 5),
  (103, 7, 6),
  (104, 1, 4),
  (104, 5, 5),
  (104, 7, 6),
  (105, 1, 8),
  (105, 5, 9),
  (105, 7, 10);
  
  
SELECT dish.id, user.id, review.dishId, review.userId
FROM review
INNER JOIN user
  ON review.userId = user.id
INNER JOIN dish
  ON review.dishId = dish.id;


SELECT restaurantId, COUNT(*) AS total
FROM review
WHERE dishId=1
  AND restaurantId IN(1,4)
GROUP BY restaurantId
ORDER BY total DESC;