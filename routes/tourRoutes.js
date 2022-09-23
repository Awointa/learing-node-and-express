const express = require("express");
const tourControllers = require("./../controllers/tourControllers");

const router = express.Router();

router.param('id', tourControllers.checkID);

router
    .route('/')
    .get(tourControllers.getAllTours)
    .post(tourControllers.checkBody, tourControllers.createNewTour);

router
    .route('/:id')
    .get(tourControllers.getSingleTour)
    .patch(tourControllers.updateTour)
    .delete(tourControllers.deleteTour);

module.exports = router