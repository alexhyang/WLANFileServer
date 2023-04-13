const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/video/:name', (req, res) => {
  res.sendFile(`assets/${req.params.name}.mp4`, { root: __dirname });
})

app.listen(4000, () => {
  console.log('Listening on port 4000!')
  console.log(__dirname)
})