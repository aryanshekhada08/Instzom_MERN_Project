const mongose = require('mongoose');

function connectDB(){
    mongose.connect(process.env.mongoURI)
     .then(()=>{
        console.log('DataBase Connected');
    }).catch((err)=>{
        console.log('DataBase Not Connected', err);
    });
}

module.exports = connectDB;