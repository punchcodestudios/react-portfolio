const express = require("express");
const router = express.Router();

const skillController = require("../controllers/skill");
const skillMiddleware = require("../middleware/skill");
const experienceController = require("../controllers/experience");
const experienceMiddleware = require("../middleware/experience");

router.get(
  "/get-all-skills",
  skillController.getAllSkills,
  skillMiddleware.getAllSkills
);
router.get(
  "/get-skill/{id}",
  skillController.getSkillById,
  skillMiddleware.getSkillById
);
router.post("/add-skill", skillController.addSkills, skillMiddleware.addSkills);
router.post(
  "/update-skill",
  skillController.updateSkill,
  skillMiddleware.updateSkill
);
router.post(
  "/seed-skills",
  skillController.seedSkills,
  skillMiddleware.seedSkills
);
router.delete(
  "/delete-skill/{id}",
  skillController.deleteSkill,
  skillMiddleware.deleteSkill
);

router.get(
  "/get-all-experience",
  experienceController.getAllExperience,
  experienceMiddleware.getAllExperience
);
router.get(
  "/get-experience/{id}",
  experienceController.getExperienceById,
  experienceMiddleware.getExperienceById
);
router.post(
  "/add-experience",
  experienceController.addExperience,
  experienceMiddleware.addExperience
);
router.post(
  "/update-experience",
  experienceController.updateExperience,
  experienceMiddleware.updateExperience
);
router.delete(
  "/delete-experience/{id}",
  experienceController.deleteExperience,
  experienceMiddleware.deleteExperience
);
router.post(
  "/seed-experience",
  experienceController.seedExperience,
  experienceMiddleware.seedExperience
);

module.exports = router;
