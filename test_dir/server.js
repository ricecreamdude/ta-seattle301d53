const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
let app = express();

// const dbData = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   // port: 5432,
//   host: 'postgres://localhost:5432'
// }


// console.log()

const client = new Client(process.env.DATABASE_URL);

client.on( 'error', err => console.error(err) );



//Database
// const client = new Client();

// client.connect()

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

//Middleware
app.use( express.static('src') );
app.use( cors() );

let errorHandler = (req, res) => {
  res.status(404).send('Nani?!? 404 Not Found.'); 
};

let todosHandler = (req, res) => {

  let todos = ['walk dog', 'eat breakfast', 'plan day'];

  let updatedList = todos.map( (value, index) => {
    return {content: value};
  });

  res.status(200).send(updatedList);
}

// let getNames = (req,res) => {
//   let SQL = `
//     SELECT * 
//     FROM todo
//   `;
  
//   console.log('SQL', SQL);

//   client.query( SQL ).then(data => {
//     console.log('GET REQUEST COMPLETED');
//     res.status(200).send(data);
//   }).catch(err => {
//     res.status(500).send({
//       status:'Internal Server Error:',
//       code: 500,
//       message: err
//     });
//   });


// }

// let postgresInsertHandler = (req, res) => {

//   const name = ['John', 'Cocoas'];

//   let SQL = `
//     insert into people (first_name, last_name) 
//     values($1,$2)
//   `

//   client.query( SQL, name );

// }

// app.get('/', (req, res) => {
//   res.status(200).json({message: 'Hello!'});
// })

//Routes
// app.get('/names', handleNames);
// app.get('/getNames', getNames);
// app.get('/todos', todosHandler);
// app.use('*', errorHandler);

//Initialize the Server


client.connect( err => {
  if (err){
    console.error('connection error', err.stack);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    })
  }
})
// .then( () => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
//   })
// });
