const express = require("express");
const Events = require("../Schema/events.schema");
const app = express.Router();

//------------- post event ---------
app.post("/", async (req, res) => {
  try {
    await Events.create(req.body);
    res.status(200).send({ message: "Event Added" });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- get events --------
app.get("/", async (req, res) => {
  try {
    const event = await Events.find().sort({ publish_date: -1 });
    res.status(200).send(event);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- get by event id --------
app.get("/:event_id", async (req, res) => {
  const { event_id } = req.params;
  try {
    const event = await Events.findOne({ _id: event_id }).populate(["user"]);
    res.status(200).send(event);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- filter by sport --------
app.get("/filter_sport/:sport", async (req, res) => {
  const { sport } = req.params;
  try {
    if (sport === "search") {
      const filtered = await Events.find().sort({ publish_date: -1 });
      return res.status(200).send(filtered);
    } else {
      const filtered = await Events.find({ sport_name: sport }).sort({
        publish_date: -1,
      });
      return res.status(200).send(filtered);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//--------- filter by city  --------
app.get("/filter_city/:city", async (req, res) => {
  const { city } = req.params;
  try {
    if (city === "search") {
      const filtered = await Events.find().sort({ publish_date: -1 });
      return res.status(200).send(filtered);
    } else {
      const filtered = await Events.find({ city }).sort({ publish_date: -1 });
      return res.status(200).send(filtered);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// ---------- (Search) -------------
app.get("/search/:findTitle", async (req, res) => {
  const { findTitle } = req.params;
  try {
    let filtered;
    filtered = await Events.find({
      sport_name: { $regex: ".*" + findTitle + ".*" },
    }).sort({ publish_date: -1 });
    filtered = await Events.find({
      city: { $regex: ".*" + findTitle + ".*" },
    }).sort({ publish_date: -1 });
    filtered = await Events.find({
      description: { $regex: ".*" + findTitle + ".*" },
    }).sort({ publish_date: -1 });
    res.send(filtered);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = app;
