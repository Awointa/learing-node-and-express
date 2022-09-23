const express = require("express");
const tourControllers = require("./../controllers/tourControllers");

const router = express.Router();


router
    .route('/')
    .get(tourControllers.getAllTours)
    .post(tourControllers.createNewTour);

router
    .route('/:id')
    .get(tourControllers.getSingleTour)
    .patch(tourControllers.updateTour)
    .delete(tourControllers.deleteTour);

module.exports = router