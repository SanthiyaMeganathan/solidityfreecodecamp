const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:7545
  console.log("helo");
  const provider = new ethers.providers.JsonRpcProvider(
    "http://172.24.80.1:7545"
  );
  // console.log(provider);

  const wallet = new ethers.Wallet(
    "0xd612fb35a7ec98745aa3eef065b38c8c4363e5961836ff100c96304e5fcb803c",
    provider
  );
  //console.log(wallet);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  //console.log(contractFactory);
  const contract = await contractFactory.deploy();
  console.log(contract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
