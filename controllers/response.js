const sendSuccessResponse = (req, res, next) => {
  //   console.log("req.data: ", req.data);
  //   console.log("req.meta: ", req.meta || {});
  try {
    const data = req.data || [];
    const meta = req.meta || {};
    const metaData = {
      total: data.length || 0,
      success: true,
      ...meta,
    };
    // console.log("metaData: ", metaData);
    return res.status(200).json({
      content: {
        target: data,
        meta: metaData,
        error: {},
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  sendSuccessResponse,
};
