const express = require('express')
const app = express()
const port = 4000 // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


app.get('/api', (req, res) => {
  res.send({ test : 'hello world!'})
})

app.post('/api2', (req, res) => {
    console.log(req.body)
    res.send(req.body.result)
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})