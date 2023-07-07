const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const readline = require("readline/promises");

const serverUrl = "http://localhost:1225";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const name = await rl.question("Input your name: ");

  rl.close();

  const trie = new MerkleTree(niceList);
  const index = niceList.indexOf(name);
  const proof = trie.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();
