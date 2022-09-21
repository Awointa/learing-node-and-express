const fs = require("fs"); 
const express = require("express");

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.use((req, res, next) => {
    req.requestTime = new Date.toISOstring();

    next();
});

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            tours
        }
    });
};

const getSingleTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        res.status(404).json({
            "status": "failed",
            "message": "Invalid ID"
        });
    }

    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {
            tour
        }
    });
};

const createNewTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1] + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        });
    });
};
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: "failure",
            message: "Invalid ID"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            tour: "<updated tour here>...."
        }
    });
};

const deleteTour = (req, res) => {
    if (req.param.id * 1 > tours.length) {
        res.status(404).json({
            status: "failure",
            message: "Invalid ID"
        });
    }

    res.status(20).json({
        status: "success",
        data: null
    });
};
    

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createNewTour);

app.route('/api/v1/tours/:id')
    .get(getSingleTour)
    .delete(deleteTour);


const port = 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}...`)
});