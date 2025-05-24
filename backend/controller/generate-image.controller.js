const GenerateImageService = require("../service/generate-image.service");
/**
 * Handles AI image generation request from user prompt
 * @param {*} req
 * @param {*} res
 * @returns promise with pending status with ID or completed image
 */
const generateImage = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res
      .status(400)
      .json({ status: "error", message: "Prompt is required" });
  }

  try {
    const requestPayload = {
      prompt,
      params: {
        n: 1,
        width: 512,
        height: 512,
        steps: 20,
        sampler_name: "k_euler_a",
        cfg_scale: 7,
      },
      nsfw: false,
      censor_nsfw: true,
      models: ["stable_diffusion"],
    };
    const submitData = await GenerateImageService.generateID(requestPayload);
    if (!submitData.id) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to get generation ID" });
    }

    const requestId = submitData.id;
    console.log(`Generation ID: ${requestId}`);

    const poolData = await GenerateImageService.getImage(requestId);
    if (!poolData.imageBase64) {
      return res.status(202).json({
        status: "pending",
        message: "Image is still being generated. Try again shortly.",
        generatedId: requestId,
        queuePosition: poolData.queuePosition,
        waitTime: poolData.waitTime,
      });
    }
    return res.status(200).json({
      status: "success",
      image: poolData.imageBase64,
    });
  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};
module.exports.generateImage = generateImage;

/**
 * Checks the status of an ongoing image generation process
 * @param {*} req
 * @param {*} res
 * @returns promise that resolves the completed image
 */
const checkStatus = async (req, res) => {
  const generatedId = req.params && req.params.id;
  if (!generatedId) {
    return res
      .status(400)
      .json({ status: "error", message: "Generated Id is required" });
  }

  try {
    const poolData = await GenerateImageService.getImage(generatedId);
    if (!poolData.imageBase64) {
      return res.status(202).json({
        status: "pending",
        message: "Image is still being generated. Try again shortly.",
        generatedId,
        queuePosition: poolData.queuePosition,
        waitTime: poolData.waitTime,
      });
    }
    return res.status(200).json({
      status: "success",
      image: poolData.imageBase64,
    });
  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};
module.exports.checkStatus = checkStatus;
