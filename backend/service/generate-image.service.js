/**
 * Submits image generation request to Stable Horde API and gets tracking ID
 * @param {*} payload - image generation configuration
 * @returns promise that resolves with response containing generation ID
 */
const generateID = async (payload) => {
  const submitResponse = await fetch(
    "https://stablehorde.net/api/v2/generate/async",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY,
      },
      body: JSON.stringify(payload),
    }
  );
  return await submitResponse.json();
};
module.exports.generateID = generateID;

/**
 * Polls Stable Horde API for image completion status and retrieves generated image
 * @param {*} generatedId - unique ID from the initial generation request
 * @returns promise that resolves with queue info and base64 image data
 */
const getImage = async (generatedId) => {
  let imageBase64 = null;
  let pollData = null;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 3000)); // wait 3 seconds
    const pollRes = await fetch(
      `https://stablehorde.net/api/v2/generate/status/${generatedId}`,
      {
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );
    pollData = await pollRes.json();
    // console.log(pollData);
    if (pollData.done && pollData.finished == 1) {
      imageBase64 = pollData.generations[0].img;
      break;
    } else {
      console.log(`Generating... (${i + 1})`);
    }
  }

  return {
    queuePosition: pollData.queue_position,
    waitTime: pollData.wait_time,
    imageBase64,
  };
};
module.exports.getImage = getImage;
