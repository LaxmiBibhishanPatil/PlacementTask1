const express = require('express');
const app = express(); 
const port =process.env.PORT ||5000;
const mongoose=require('mongoose');
mongoose.connect('mongoose://localhost/placement_db', {useNewUrlParser: true,useUnifiedTopology: true});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'mongodb connection error:'));                                                                          

const DataModel = mongoose.model('Data', {
    timestamp: Date,
    value: Number
});

app.get('/', (req, res) => {
    res.send('hello from express');
});

app.get('api/data', (req, res) => {
   res.json({message: 'data fetched successfully '}); 
   try {
     const data = await DataModel.find();
    res.json(data);
} catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
};

});
app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
    });