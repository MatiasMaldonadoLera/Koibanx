const mongoose = require('mongoose');

const db= mongoose.connection;
const url= 'mongodb://localhost/koibanx';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .catch(err => console.log(err));


db.on('open', _ =>{
    console.log("database esta conectada a ", url);
})
db.on("error", err => {
    console.log(err);
  });
