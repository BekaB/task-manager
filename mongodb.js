//CRUD

const { MongoClient } = require('mongodb');
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

async function main() {

    try{
    // Use connect method to connect to the server
    await client.connect({ useUnifiedTopology: true });
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');

    await createDocument(collection);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
    }

async function createDocument(collection) {
    const result = await collection.insertOne({ name: 'Bereket Negash', age: 31});
    //Usage
    //await createDocument(collection);

  }
  
async function createMultipleDocuments(collection) {
    const result = await collection.insertMany([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 40 }
    ]);
    //Usage
    //await createMultipleDocuments(collection);
  }
  
  
main();

////////////////////////////////////////////////////////////////
//////////// OLD FASHION WITH CALLBACKS ///////////////

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
//     if(error){
//         return console.log('unable to connect to Database')
//     }

//     const db = client.db(databaseName)

//     db.collection('users').insertOne({
//         name: 'Bereket',
//         age: 31
//     })
// })
