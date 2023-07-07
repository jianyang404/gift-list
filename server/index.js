const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT =
  "ec754958be93b2cdad66784900b759ad490d18cd036d6eb28bdf0e6ba14df3b7";

app.post("/gift", (req, res) => {
  const { proof, name } = req.body;

  let isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
