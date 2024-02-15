import { describe, test } from "matchstick-as";

import { ChamberDeployed, OwnershipTransferred } from "../generated/Registry/Registry";

import { handleChamberDeployed, handleOwnershipTransferred } from "../src/registry";

import { createChamberDeployedEvent, createOwnershipTransferredEvent } from "./helpers/utils";

import { expectChamberDeployedAdded, expectOwnershipTransferredAdded } from "./helpers/assertions";

describe("Registry Test", () => {
  describe("Test ChamberDeployed", () => {
    const createMockChamberDeployedEvent = (
      chamber: string = "0x66905a82fb9e3e267f5be6b30a4ac7794f70763f",
      serial: i32 = 1,
      deployer: string = "0x8e1aa1674d9fc9f0dca4a4d31db85e65d216666c",
      memberToken: string = "0x699ADd01337F25E538EB060D97c70d1BeC77dA57",
      govToken: string = "0xf8234C14Eb6B34AA23172111CB407fb5361f95f2"
    ): ChamberDeployed => {
      const event = createChamberDeployedEvent(chamber, serial, deployer, memberToken, govToken);
      return event;
    };
    test("Handel ChamberDeployed Tx", () => {
      const event = createMockChamberDeployedEvent();
      handleChamberDeployed(event);
      expectChamberDeployedAdded(event);
    });
  });

  describe("Test OwnershipTransferred", () => {
    const createMockOwnershipTransferredEvent = (
      previousOwner: string = "0x0000000000000000000000000000000000000000",
      newOwner: string = "0x8e1aa1674d9fc9f0dca4a4d31db85e65d216666c"
    ): OwnershipTransferred => {
      const event = createOwnershipTransferredEvent(previousOwner, newOwner);
      return event;
    };
    test("Handel OwnershipTransferred Tx", () => {
      const event = createMockOwnershipTransferredEvent();
      handleOwnershipTransferred(event);
      expectOwnershipTransferredAdded(event);
    });
  });
});
