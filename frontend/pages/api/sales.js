// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

const urls = {
  development: "http://localhost:3000/",
  production: process.env.API_URL || "http://localhost:3000/",
};

const baseUrl = urls[process.env.NODE_ENV];
console.log("baseUrl", baseUrl);

export default async function (req, res) {
  let url = `${baseUrl}reports/sales`;
  if (req.method === "POST") {
    try {
      const { body } = req;
      const chunk = JSON.parse(body);
      const { data: msg } = await axios.post(url, chunk);
      console.log(msg);
      res.json({ msg });
    } catch (error) {
      console.log(error.message);
      res.json({ msg: error.message });
    }
  } else {
    try {
      console.log('fetching');
      url = `${url}?page=${req.query.page}`;
      const { data } = await axios.get(url);
      res.json(data);
    } catch (error) {
      console.log(error.message);
      res.json({ msg: error.message });
    }
  }
}
