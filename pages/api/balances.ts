import Cors from "cors";
import initMiddleware from "../../lib/services/api-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "PATCH", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  res.json();
}
