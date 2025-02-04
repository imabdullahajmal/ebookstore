import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Successful get request')
})

app.use('/books', booksRoute)

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('Connection Successful')
    app.listen(PORT, () => {
        console.log(`Active on port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})