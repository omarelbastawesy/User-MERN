import reteLimit from "../config/upstash.js";

const reteLimiter = async (req, res, next) => {
  try {
    const userId = req.ip;
    const { success } = await reteLimit.limit(userId);
    if (!success) {
      return res.status(429).json({
        success: false,
        message: "Too meny requests, Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.log("rete limit error", error);
    next(error);
  }
};

export default reteLimiter;
