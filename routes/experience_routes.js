const { Experience, validate } = require("../models/experience");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const experiences = await Experience.find();
  res.send({ count: experiences.length, results: experiences });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let experience = new Experience({
    company_name: req.body.company_name,
    refid: req.body.refid,
    date_range: req.body.date_range,
    position: req.body.position,
    skills: req.body.skills,
    experience_line_items: req.body.experience_line_items,
    slug: req.body.slug,
  });
  experience = await experience.save();

  res.send(experience);
});

router.put("/:refid", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const record = await Experience.findOne({ refid: req.params.refid });
  const experience = await Experience.findByIdAndUpdate(
    record.id,
    {
      company_name: req.body.company_name,
      refid: req.body.refid,
      date_range: req.body.date_range,
      position: req.body.position,
      skills: req.body.skills,
      experience_line_items: req.body.experience_line_items,
      slug: req.body.slug,
    },
    { new: true }
  );

  if (!experience)
    return res
      .status(404)
      .send("The experience with the given ID was not found.");

  res.send(experience);
});

router.delete("/:refid", async (req, res) => {
  const record = await Experience.findOne({ refid: req.params.refid });
  const experience = await Experience.findByIdAndRemove(record.id);

  if (!experience)
    return res
      .status(404)
      .send("The experience with the given ID was not found.");

  res.send(experience);
});

router.get("/:refid", async (req, res) => {
  const experience = await Experience.findOne({ refid: req.params.refid });

  if (!experience)
    return res
      .status(404)
      .send("The experience with the given ID was not found.");

  res.send(experience);
});

router.post("/seed", async (req, res) => {
  req.body.forEach(async (item) => {
    let { error } = validate(item);
    if (error) return res.status(400).send(error.details[0].message);
  });

  try {
    console.log("here");
    await mongoose.connection.db.dropCollection("experiences");
    console.log(req.body);
    await Experience.insertMany(req.body).catch((err) => console.log(err));
    console.log("here again");
    const currentExperience = await Experience.find();
    return res.status(200).send(currentExperience);
  } catch {
    (ex) => {
      // todo log error messages
      return res.status(500).send("an error has occurred");
    };
  }

  return res.status(200).send("OK");
});

module.exports = router;
