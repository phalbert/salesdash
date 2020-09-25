// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

const urls = {
  development: "http://localhost:3000/",
  production: process.env.API_URL || "http://localhost:3000/",
};

const baseUrl = urls[process.env.NODE_ENV];

export default async function (req, res) {
  console.log("baseUrl", baseUrl);
  let url = `${baseUrl}reports/salesByDate`;
  try {
    console.log('fetching');
    url = `${url}?fromDate=${req.query.fromDate}&toDate=${req.query.toDate}`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.json({ msg: error.message });
  }
}
