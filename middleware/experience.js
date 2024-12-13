const getAllExperience = async (req, res, next) => {
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

const getExperienceById = async (req, res, next) => {
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

const addExperience = async (req, res, next) => {
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

const updateExperience = async (req, res, next) => {
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

const deleteExperience = async (req, res, next) => {
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

const seedExperience = async (req, res, next) => {
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
  getAllExperience,
  getExperienceById,
  addExperience,
  updateExperience,
  deleteExperience,
  seedExperience,
};
