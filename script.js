const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://jew:2MYxkfffwYzIvB2E@cluster0.bl6agnk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

  const mongoose = require('mongoose');

// з'єднання з базою даних MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// створення схеми для даних
const dataSchema = new mongoose.Schema({
  nodeId: String,
  value: Number,
  date: Date
});

// створення моделі для даних
const Data = mongoose.model('Data', dataSchema);

// отримання даних за період по id датчика
Data.find({ nodeId: 'yourNodeId', date: { $gte: new Date('2022-01-01'), $lte: new Date('2022-01-31') } }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
