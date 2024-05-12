"use strict";

//express app for backend

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

//import routes
import itemsRoutes from './routes/items.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

//use routes
app.use('/items', itemsRoutes);




/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

export default app;