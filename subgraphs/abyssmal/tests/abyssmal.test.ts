import { describe, test } from "matchstick-as/assembly/index";
import {
  handleApproval,
  handleApprovalForAll,
  handleMintCostUpdated,
  handleNFTMinted,
  handleOwnershipTransferred,
  handleTransfer,
} from "../src/index";

import {
  Approval,
  ApprovalForAll,
  MintCostUpdated,
  NFTMinted,
  OwnershipTransferred,
  Transfer,
} from "../generated/Abyssmal/Abyssmal";

import {
  createApprovalEvent,
  createApprovalForAllEvent,
  createMintCostUpdatedEvent,
  createNFTMintedEvent,
  createOwnershipTransferredEvent,
  createTransferEvent,
} from "./helpers/utils";
import {
  expectApprovalTxAdded,
  expectApprovalForAllTxAdded,
  expectMintCostTxAdded,
  expectNFTMintedTxAdded,
  expectOwnershipTransferredAdded,
  expectTransferAdded,
} from "./helpers/assertions";

describe("Abyssmal", () => {
  describe("Approval", () => {
    const createMockApprovalEvent = (
      owner: string = "0x60bb1e2aa1c9acafb4d34f71585d7e959f387769",
      approved: string = "0x0C6F86b338417B3b7FCB9B344DECC51d072919c9",
      tokenId: i32 = 1333
    ): Approval => {
      const event = createApprovalEvent(owner, approved, tokenId, 1667474207);
      return event;
    };

    test("Handle Approval Tx", () => {
      const event = createMockApprovalEvent();
      handleApproval(event);
      expectApprovalTxAdded(event);
    });
  });

  describe("ApprovalForAll", () => {
    const createMockApprovalForAllEvent = (
      owner: string = "0x60bb1e2aa1c9acafb4d34f71585d7e959f387769",
      operator: string = "0x0C6F86b338417B3b7FCB9B344DECC51d072919c9",
      approved: boolean = true,
      timestamp: i32 = 1667474207
    ): ApprovalForAll => {
      return createApprovalForAllEvent(owner, operator, approved, timestamp);
    };

    test("Handle ApprovalForAll Tx", () => {
      const event = createMockApprovalForAllEvent();
      handleApprovalForAll(event);
      expectApprovalForAllTxAdded(event);
    });
  });

  describe("MintCostUpdated", () => {
    const createMockMintCostUpdatedEvent = (
      oldMintCost: i32 = 5000,
      newMintCost: i32 = 6000,
      timestamp: i32 = 1667474207
    ): MintCostUpdated => {
      return createMintCostUpdatedEvent(oldMintCost, newMintCost, timestamp);
    };

    test("Handle MintCostUpdated Tx", () => {
      const event = createMockMintCostUpdatedEvent();
      handleMintCostUpdated(event);
      expectMintCostTxAdded(event);
    });
  });

  describe("Handle NFTMinted Tx", () => {
    const createMockNFTMintedEvent = (
      mintedBy: string = "0x60bb1e2aa1c9acafb4d34f71585d7e959f387769",
      tokenId: i32 = 33,
      cost: i32 = 5000,
      timestamp: i32 = 1667474207
    ): NFTMinted => {
      return createNFTMintedEvent(mintedBy, tokenId, cost, timestamp);
    };

    test("MintCostUpdated", () => {
      const event = createMockNFTMintedEvent();
      handleNFTMinted(event);
      expectNFTMintedTxAdded(event);
    });
  });

  describe("Handle Ownership Transfer Tx", () => {
    const createMockOwnershipTransferredEvent = (
      previousOwner: string = "0x60bb1e2aa1c9acafb4d34f71585d7e959f387769",
      newOwner: string = "0x0C6F86b338417B3b7FCB9B344DECC51d072919c9",
      timestamp: i32 = 1667474207
    ): OwnershipTransferred => {
      return createOwnershipTransferredEvent(previousOwner, newOwner, timestamp);
    };

    test("OwnershipTransferred", () => {
      const event = createMockOwnershipTransferredEvent();
      handleOwnershipTransferred(event);
      expectOwnershipTransferredAdded(event);
    });
  });

  describe("Handle Transfer Tx", () => {
    const createMockTransferEvent = (
      from: string = "0x60bb1e2aa1c9acafb4d34f71585d7e959f387769",
      to: string = "0x0C6F86b338417B3b7FCB9B344DECC51d072919c9",
      tokenId: i32 = 234,
      timestamp: i32 = 1667474207
    ): Transfer => {
      return createTransferEvent(from, to, tokenId, timestamp);
    };

    test("Transfer", () => {
      const event = createMockTransferEvent();
      handleTransfer(event);
      expectTransferAdded(event);
    });
  });
});
