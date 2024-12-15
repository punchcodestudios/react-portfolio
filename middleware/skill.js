const getAllSkills = async (req, res, next) => {
  try {
    const data = req.data;
    const meta = {
      total: data.length,
      success: true,
    };
    return res.status(200).json({
      content: {
        target: data,
        meta: meta,
        error: {},
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getSkillById = async (req, res, next) => {
  try {
    const data = req.data;
    const meta = {
      total: data.length,
      success: true,
    };
    return res.status(200).json({
      content: {
        target: data,
        meta: meta,
        error: {},
      },
    });
  } catch (error) {
    return next(error);
  }
};

const addSkills = async (req, res, next) => {
  try {
    const data = req.data;
    const meta = {
      total: data.length,
      success: true,
    };
    return res.status(200).json({
      content: {
        target: data,
        meta: meta,
        error: {},
      },
    });
  } catch (error) {
    return next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const data = req.data;
    const meta = {
      total: data.length,
      success: true,
    };
    return res.status(200).json({
      content: {
        target: data,
        meta: meta,
        error: {},
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const data = req.data;
    const meta = {
      total: data.length,
      success: true,
    };
    return res.status(200).json({
      content: {
        target: data,
        meta: meta,
        error: {},
      },
    });
  } catch (error) {
    return next(error);
  }
};

const seedSkills = async (req, res, next) => {
  try {
    const data = req.data;
    const meta = {
      total: data.length,
      success: true,
    };
    return res.status(200).json({
      content: {
        target: data,
        meta: meta,
        error: {},
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllSkills,
  getSkillById,
  deleteSkill,
  addSkills,
  updateSkill,
  seedSkills,
};
