const mongose = require('mongoose');

function connectDB(){
    mongose.connect('mongodb://localhost:27017/instzomdb')
     .then(()=>{
        console.log('DataBase Connected');
    }).catch((err)=>{
        console.log('DataBase Not Connected', err);
    });
}

module.exports = connectDB;