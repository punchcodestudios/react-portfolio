const { Skill, validate } = require("../models/skill");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// const skillController = require("../controllers/skill");
// const skillMiddleware = require("../middleware/skill");

// router.get("/", skillController.getAll, skillMiddleware.getAll);
// router.post(
//   "/add-skills",
//   skillController.addSkills,
//   skillMiddleware.addSkills
// );
// router.post("/", async (req, res) => {
//   req.body.forEach(async (item) => {
//     let { error } = validate(item);
//     if (error) return res.status(400).send(error.details[0].message);

//     try {
//       let skill = new Skill({
//         name: item.name,
//         description: item.description,
//         slug: item.slug,
//         image_url: item.image_url,
//         skill_types: item.skill_types,
//       });

//       skill = await skill.save();
//     } catch (ex) {
//       return res.send("An error has occurred");
//     }
//   });

//   res.send("OK");
// });

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const skill = await Skill.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       description: req.body.description,
//       slug: req.body.slug,
//       image_url: req.body.image_url,
//       skill_types: req.body.skill_types,
//     },
//     { new: true }
//   );

//   if (!skill)
//     return res.status(404).send("The skill with the given ID was not found.");

//   res.send(skill);
// });

// router.delete("/:id", async (req, res) => {
//   const skill = await Skill.findByIdAndRemove(req.params.id);

//   if (!skill)
//     return res.status(404).send("The skill with the given ID was not found.");

//   res.send(skill);
// });

// router.get("/:id", async (req, res) => {
//   const skill = await Skill.findById(req.params.id);

//   if (!skill)
//     return res.status(404).send("The skill with the given ID was not found.");

//   res.send(skill);
// });

// router.post("/seed", async (req, res) => {
//   req.body.forEach(async (item) => {
//     let { error } = validate(item);
//     if (error) return res.status(400).send(error.details[0].message);
//   });

//   try {
//     await mongoose.connection.db.dropCollection("skills");
//     await Skill.insertMany(req.body);

//     const currentSkills = await Skill.find().sort("name");
//     return res.status(200).send(currentSkills);
//   } catch {
//     (ex) => {
//       // todo log error messages
//       return res.status(500).send("an error has occurred");
//     };
//   }

//   return res.status(200).send("unexpected end of method");
// });

module.exports = router;
