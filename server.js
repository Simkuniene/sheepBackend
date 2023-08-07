const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const path = require("path");
const fs = require("fs");

const app = express();

const ObjectID = require("mongodb").ObjectId;

require("dotenv").config();
//const DBURL = "mongodb+srv://Daiva:admin@cluster0.bbvmzaf.mongodb.net/";
const DBURL = process.env.DBURL_;
app.use(cors());
app.use(express.json()); //pasakom, kad per post bus siunciamas json

app.use(express.static(path.join(__dirname, "front"))); // su situo uzimam GET, todel GET'e turim naudoti

// i index.html galima kreipti localhost:3000
// o i add.html jau reik kreipti localhost::3000/add.html

////
//const port = process.env.PORT || 8080;
const port = process.env.PORT;
/////

/// is db ///

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
  //console.log(req.body);
  await connectDb.db("farm").collection("sheep").insertOne(
    newSheep
    // {
    //   "number": "GB22454","gender":"2","birth_date":new Date("2023-02-04"), "mother":"JG14526", "father":"JG14526", "registration_date":new Date("2023-03-04"), "breed":"Skudų"}
  );
  //db.farm.createIndex({ "email": 1 }, { unique: true })
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
  //console.log(req.body);
  await connectDb.db("farm").collection("medicines").insertOne(
    newMeds
    // {
    //   "name": "aaa","description":"Nuo kirminu","dosage":"0,5g 1kg svoriui "}
  );
  connectDb.close();
  res.json("Medicines added");
});

app.post("/addBirth", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  const newBirth = req.body;
  //console.log(req.body);
  await connectDb.db("farm").collection("births").insertOne(
    newBirth
    // {
    //   "number": "LF12345","date":new Date("2023-02-04"), "lambs_number":2, "notes":"ne iskarto atleido piena"}
  );
  connectDb.close();
  res.json("Birth added");
});

app.post("/addTreatment", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  const newTreatment = req.body;
  //console.log(req.body);
  await connectDb.db("farm").collection("treatment").insertOne(
    newTreatment
    // {
    //   "number": "LF12378","start":new Date("2023-04-08"), "finish":new Date("2023-04-08"), "medicine":"bbb", "dosage":"3ml", "notes":"nuo kirminu"}
  );
  connectDb.close();
  res.json("Treatment added");
});

app.delete("/deleteSheep/:id", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  // const deleteProduct = ObjectIDreq.params.id;
  //console.log(ObjectId("6465148b1fb0b609f78480b7") + "obJJJ");
  //console.log(req.params.number + " obJJJ");
  await connectDb.db("farm").collection("sheep").deleteOne(
    { _id: new ObjectID(req.params.id) }

    //{ number: req.params.number }
  );
  connectDb.close();
  res.json("Sheep deleted");
});

///////////////////////////

app.delete("/deleteMed/:id", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  // const deleteProduct = ObjectIDreq.params.id;
  //console.log(ObjectId("6465148b1fb0b609f78480b7") + "obJJJ");
  //console.log(req.params.number + " obJJJ");
  await connectDb.db("farm").collection("medicines").deleteOne(
    { _id: new ObjectID(req.params.id) }

    // { number: req.params.number }
  );
  connectDb.close();
  res.json("Med deleted");
});

////////////////////////////////////////

app.put("/sheepupdate/:number", async (req, res) => {
  const connectDb = new MongoClient(DBURL);
  //const documentId = req.params.number;
  const newData = req.body;

  await connectDb
    .db("farm")
    .collection("sheep")
    .updateOne({ number: req.params.number }, { $set: newData });
  connectDb.close();
  res.json("Sheep update");
});



/////
//dar reiks prideti kitus deletus
//////

app.listen(port, () => console.log(`Server is running on port ${port}`));
