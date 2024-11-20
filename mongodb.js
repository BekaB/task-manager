//CRUD

const { MongoClient, ObjectID } = require('mongodb');
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true }) ;

// Database Name
const dbName = 'task-manager';

const id = new ObjectID()

async function main() {

    try{
    // Use connect method to connect to the server
    await client.connect({ useUnifiedTopology: true });
    //console.log('Connected successfully to server');
    const db = client.db(dbName);
    const userCollection = db.collection('users');
    const taskCollection = db.collection('task');

    //await createDocument(userCollection);
    //await createMultipleTaskDocuments(taskCollection);
    //await findOneDocument(userCollection);
    await updateDocument(userCollection);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
    }

async function createDocument(collection) {
    const result = await collection.insertOne({
      name: 'Bereket Negash', age: 31
        },(eroor, result) => {
          if(eroor){
            return console.log('unable to insert user')
          }

          console.log(result.opts)
        } );
    //Usage
    //await createDocument(collection);
  }
  
const createMultipleDocuments = async(collection) => {
    const result = await collection.insertMany([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 40 }
    ],(eroor, result) => {
      if(eroor){
        return console.log('unable to insert user')
      }

      console.log(result.opts)
    });
    //Usage
    //await createMultipleDocuments(collection);
  }

  const createMultipleTaskDocuments = async(collection) => {
    const result = await collection.insertMany([
      {description: 'Bible Study', completed: true},
      {description: 'Prayer', completed: false},
      {description: 'Node Js Study', completed: true}
    ],(eroor, result) => {
      if(eroor){
        return console.log('unable to insert user')
      }

      console.log(result.ops)
    })
  }
  
  const findOneDocument = async(collection) => {
    const result = await collection.findOne({ name: 'Bereket Negash' }); // Replace with your query
    if (result) {
      console.log('Found a document:', result);
    } else {
      console.log('No document matches the provided query');
    }
    // Usage
  //await findOneDocument(collection);
  }

  const readDocuments = async(collection) => {
    const cursor = collection.find({ age: 31 }); // Replace with your query
    const results = await cursor.toArray();
  
    if (results.length > 0) {
      console.log('Found documents:');
      results.forEach((result, i) => {
        console.log(`${i + 1}. ${result.name} - ${result.age} years old`);
      });
    } else {
      console.log('No documents found');
    }

      // Usage
  //await readDocuments(collection);
  }

  const updateDocument = async(collection) => {
    const filter = { _id: new ObjectID("6737ec8178618982340aa14a")
    }; // Replace with your filter
    const updateDoc = {
      $set: {
        name: 'Mahlet Assefa' // Replace with the fields you want to update
      },
    };
  
    const result = await collection.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s).`);
      
    // Usage
    //await updateDocument(collection);

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
