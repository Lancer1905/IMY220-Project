//Pieter Venter u23896257
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../front_end/public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front_end/public/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server up and running on localhost:${PORT}`);
});