const generateID = async (payload) => {
  const submitResponse = await fetch(
    "https://stablehorde.net/api/v2/generate/async",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: CONFIG.api_key,
      },
      body: JSON.stringify(payload),
    }
  );
  return await submitResponse.json();
};
module.exports.generateID = generateID;

const getImage = async (generatedId) => {
  let imageBase64 = null;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 3000)); // wait 3 seconds
    const pollRes = await fetch(
      `https://stablehorde.net/api/v2/generate/status/${generatedId}`,
      {
        headers: {
          apikey: CONFIG.api_key,
        },
      }
    );
    const pollData = await pollRes.json();
    console.log(pollData);
    if (pollData.done && pollData.finished == 1) {
      imageBase64 = pollData.generations[0].img;
      break;
    } else {
      console.log(`Generating... (${i + 1})`);
    }
  }

  return {
    status: {
      queue_position: pollData.queue_position,
      wait_time: pollData.wait_time,
    },
    imageBase64,
  };
};
module.exports.getImage = getImage;
