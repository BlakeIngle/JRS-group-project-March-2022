module.exports = (app) => {
    const dishes = require('../controllers/dish.controller');

    app.get('/api/dishes', dishes.getAllDishes);

    app.get('/api/dishes/search', dishes.getDishesByQuery);
    app.get('/api/dishes/:dishId', dishes.getDishById);
    
    //app.get('/api/dishes/:location', dishes.getDishByLocation);

    app.post('/api/dishes', dishes.addNewDish);

    app.put('/api/dishes', dishes.updateDish);

    app.delete('/api/dishes/:dishId', dishes.deleteDishById);
}