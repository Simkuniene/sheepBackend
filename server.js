const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const path = require("path");
const fs = require("fs");

const app = express();

const ObjectID = require("mongodb").ObjectId;

require("dotenv").config();

const DBURL = process.env.DBURL_;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "front")));
const port = process.env.PORT;

app.get("/sheep", async (req, res) => {
  //grazina visus duomenis
  try {
    const connectDb = new MongoClient(DBURL);
    const data = await connectDb
      .db("farm")
      .collection("sheep")
      .find()
      .toArray();

    connectDb.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/sheep/:number", async (req, res) => {
  try {
    const connectDb = new MongoClient(DBURL);
    const data = await connectDb
      .db("farm")
      .collection("sheep")
      .find({ number: req.params.number })
      .toArray();

    connectDb.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/addSheep", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  const newSheep = req.body;

  await connectDb.db("farm").collection("sheep").insertOne(newSheep);
  connectDb.close();
  res.json("Sheep added");
});

app.get("/meds", async (req, res) => {
  try {
    const connectDb = new MongoClient(DBURL);
    const data = await connectDb
      .db("farm")
      .collection("medicines")
      .find()
      .toArray();
    connectDb.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/births/:number", async (req, res) => {
  try {
    const connectDb = new MongoClient(DBURL);
    const data = await connectDb
      .db("farm")
      .collection("births")
      .find({ number: req.params.number })
      .toArray();
    connectDb.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/treatment/:number", async (req, res) => {
  try {
    const connectDb = new MongoClient(DBURL);
    const data = await connectDb
      .db("farm")
      .collection("treatment")
      .find({ number: req.params.number })
      .toArray();
    connectDb.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/addMeds", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  const newMeds = req.body;
  await connectDb.db("farm").collection("medicines").insertOne(newMeds);
  connectDb.close();
  res.json("Medicines added");
});

app.post("/addBirth", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  const newBirth = req.body;
  await connectDb.db("farm").collection("births").insertOne(newBirth);
  connectDb.close();
  res.json("Birth added");
});

app.post("/addTreatment", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  const newTreatment = req.body;
  await connectDb.db("farm").collection("treatment").insertOne(newTreatment);
  connectDb.close();
  res.json("Treatment added");
});

app.delete("/deleteSheep/:id", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  await connectDb
    .db("farm")
    .collection("sheep")
    .deleteOne({ _id: new ObjectID(req.params.id) });
  connectDb.close();
  res.json("Sheep deleted");
});

app.delete("/deleteMed/:id", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  await connectDb
    .db("farm")
    .collection("medicines")
    .deleteOne({ _id: new ObjectID(req.params.id) });
  connectDb.close();
  res.json("Med deleted");
});

app.put("/sheepupdate/:number", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  const newData = req.body;
  await connectDb
    .db("farm")
    .collection("sheep")
    .updateOne({ number: req.params.number }, { $set: newData });
  connectDb.close();
  res.json("Sheep update");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
