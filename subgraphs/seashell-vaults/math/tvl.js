require("dotenv").config("./env");
const bn = require("big-number");
const ethers = require("ethers");

const fetch = require("graphql-fetch");

const zero = "0x0000000000000000000000000000000000000000";
const subgraph = "https://api.thegraph.com/subgraphs/name/xhad/seashell-vaults";

const query = offset => `
  {
    transferTxes(skip: ${offset}) {
      from
      to
      contract
      value
      timestamp
    }
  }
`;

async function glpPrice() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const contract = new ethers.Contract(
    "0x3963FfC9dff443c2A94f21b129D429891E32ec18",
    ["function getPrice(bool) external view returns (uint256)"],
    provider
  );

  return await contract.getPrice(true);
}

// main function to get the burger stats
async function main() {
  let transfers = [];

  const fetcher = async () => {
    let transferTxes = [];
    let totalCount = 0;
    while (totalCount % 100 == 0) {
      let { data } = await fetch(subgraph)(query(totalCount));
      transferTxes = transferTxes.concat(data.transferTxes);
      totalCount += data.transferTxes.length;
      console.log(totalCount);
      await new Promise(r => setTimeout(r, 100));
    }
    return transferTxes;
  };

  transfers = transfers.concat(await fetcher());

  const results = {
    "0x699332b18605907c14d70463d47358783c91bf55": {
      minted: 0,
      burned: 0,
      transfers: 0,
      total: 0
    },
    "0x5bac5eefa13696cf815388021235b215587263ea": {
      minted: 0,
      burned: 0,
      transfers: 0,
      total: 0
    },
    "0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc": {
      minted: 0,
      burned: 0,
      transfers: 0,
      total: 0
    },
    wallets: {},
    transactions: 0
  };

  transfers.forEach(tx => {
    results.wallets[tx.to] = 0;
    ++results.transactions;

    if (tx.from === zero) {
      results[tx.contract].minted = bn(results[tx.contract].minted).add(bn(tx.value));
      results[tx.contract].total = bn(results[tx.contract].total).add(bn(tx.value));
    } else if (tx.to === zero) {
      results[tx.contract].burned = bn(results[tx.contract].burned).add(bn(tx.value));
      results[tx.contract].total = bn(results[tx.contract].total).subtract(bn(tx.value));
    } else {
      results[tx.contract].transfers = bn(results[tx.contract].transfers).add(bn(tx.value));
    }
  });

  const glpPriceUsd = String(await glpPrice());

  console.log(glpPriceUsd);

  const bvnGLP = results["0x5bac5eefa13696cf815388021235b215587263ea"].total.toString();
  const bvlGLP = results["0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc"].total.toString();
  const bvUSDC = results["0x699332b18605907c14d70463d47358783c91bf55"].total.toString();

  const bvnGLPinUsd = bn(bvnGLP)
    .div(new bn(10).pow(18))
    .mult(bn(glpPriceUsd).div(new bn(10).pow(30)))
    .toString();
  const bvlGLPinUsd = bn(bvlGLP)
    .div(new bn(10).pow(18))
    .mult(bn(glpPriceUsd).div(new bn(10).pow(30)))
    .toString();
  const bvUSDCinUSD = bn(bvUSDC)
    .div(new bn(10).pow(6))
    .toString();

  console.log("bvnGLP:\t\t", "0x5bac5eefa13696cf815388021235b215587263ea");
  console.log(
    "Minted:\t\t",
    ethers.formatEther(results["0x5bac5eefa13696cf815388021235b215587263ea"].minted.toString())
  );
  console.log(
    "Burned:\t\t",
    ethers.formatEther(results["0x5bac5eefa13696cf815388021235b215587263ea"].burned.toString())
  );
  console.log(
    "Transfers:\t",
    ethers.formatEther(results["0x5bac5eefa13696cf815388021235b215587263ea"].transfers.toString())
  );
  console.log("Net:\t\t", ethers.formatEther(results["0x5bac5eefa13696cf815388021235b215587263ea"].total.toString()));
  console.log("Net USDC:\t", bvnGLPinUsd);
  console.log("\r");

  console.log("bvlGLP:\t\t", "0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc");
  console.log(
    "Minted:\t\t",
    ethers.formatEther(results["0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc"].minted.toString())
  );
  console.log(
    "Burned:\t\t",
    ethers.formatEther(results["0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc"].burned.toString())
  );
  console.log(
    "Transfers:\t",
    ethers.formatEther(results["0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc"].transfers.toString())
  );
  console.log("Net:\t\t", ethers.formatEther(results["0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc"].total.toString()));
  console.log("Net USDC:\t", bvlGLPinUsd);
  console.log("\r");

  console.log("bvlUSDC:\t\t", "0x699332b18605907c14d70463d47358783c91bf55");
  console.log(
    "Minted:\t\t",
    ethers.formatUnits(results["0x699332b18605907c14d70463d47358783c91bf55"].minted.toString(), 6)
  );
  console.log(
    "Burned:\t\t",
    ethers.formatUnits(results["0x699332b18605907c14d70463d47358783c91bf55"].burned.toString(), 6)
  );
  console.log(
    "Transfers:\t",
    ethers.formatUnits(results["0x699332b18605907c14d70463d47358783c91bf55"].transfers.toString(), 6)
  );
  console.log(
    "net:\t\t",
    ethers.formatUnits(results["0x699332b18605907c14d70463d47358783c91bf55"].total.toString(), 6)
  );
  console.log("\r");

  console.log("Total Wallets:", Object.keys(results.wallets).length);
  console.log("Transactions:", results.transactions);
  console.log(
    "TVL:",
    bn(bvnGLPinUsd)
      .add(bvlGLPinUsd)
      .add(bvUSDCinUSD)
      .toString(),
    "USD"
  );
}

main();
