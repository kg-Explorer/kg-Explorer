const express =  require('express');
const app =  express();
const router = require('./routes');
const cors = require('cors')

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(cors({
    origin:true,
    credentials:true
}))

app.use(router)

app.listen(3500, () => {
    console.log('http://localhost:3500')
});