import express from 'express'
import mongoose from 'mongoose'

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()


//----- NOTE: use this syntax to avoid issues
//----- we need to use .then in order to wait for the connection to be stablished
//----- before we use the models


// use this 'mongodb://nico:password@localhost:27017/miapp?authSource=admin' to connect to mongo image in docker using local code (no container)

// use this 'mongodb://nico:password@mongus:27017/miapp?authSource=admin' to connect to mongo image in docker using node image (container) --- MUST BE ON THE SAME DOCKER NETWORK --

mongoose.connect(
  'mongodb://nico:password@mongus:27017/miapp?authSource=admin')
.then(connection => {
  //connection was succesful
  console.log("connection stablished")
})
.catch(error => {

  //show the error after failing connection
  console.log({
      error : {
          name : error.name,
          message : error.message,
          errorCode: error.code,
          codeName: error.codeName
      }
  })
});

app.get('/', async (_req, res) => {
  
  console.log('changes...')
  const animales = await Animal.find().catch(err =>  console.log(err));;
  return res.send({
    "message": "sometheing",
    "data": animales})
  
})
app.get('/crear', async (_req, res) => {
 

  const n = new Animal({
    tipo: 'Chanchito',
    estado: 'Feliz'
  });

  n.save((err) => {
    if(err){
      console.log("Error, ", err.message);
    }else{
      console.log('creating...')
      return res.send('ok')
    }

   
  })



})

app.listen(3000, () => console.log('listening...'))
