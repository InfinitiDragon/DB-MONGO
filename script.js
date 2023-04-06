const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const IP = 'localhost';
const PORT = 3000;

const url = "mongodb+srv://romanroketskiy05:Roman080805MLP@reynes.73bphty.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'myProject';
const client = new MongoClient(url);

async function connectToDb() {
  await client.connect();
  console.log('Connected to MongoDB server');
}

connectToDb().catch(console.error);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
}) 

app.get('/base/:_id?', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('temperatureData');

  try {
      if (req.params.id) {
          const document = await collection.findOne({ _id: req.params.id });
          if (document) {
              res.json(document);
          } else {
              res.status(404).send('There is no information');
          }
      } else {
          const documents = await collection.find().toArray();
          res.status(201).json(documents);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
  }
});

const filter = {
  sensorId: { $in: ['sensor1', 'sensor2'] },
  timestamp: { $gte: new Date('2022-01-01'), $lt: new Date('2022-02-01') }
};

const cursor = collection.find(filter);

cursor.toArray(function(err, docs) {
  console.log(docs);
  client.close();
});

app.listen(3000, () => {
  console.log(`Server listening on http://${IP}:${PORT}/`);
});