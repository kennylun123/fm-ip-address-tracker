// This API route is used to hide secret from client side.
export default async function handler(req, res) {
  let API_URL = `${process.env.IPIFY_API_HOST}/v2/country,city?apiKey=${process.env.IPIFY_API_KEY}`;
  if (req.body.type === "ipAddress") {
    API_URL += `&ipAddress=${req.body.value}`;
  }
  if (req.body.type === "domain") {
    API_URL += `&domain=${req.body.value}`;
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // send back the response as json.
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
  }

  //   res.status(200).json({
  //     message: "response success",
  //   });
}
