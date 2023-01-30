import { Address, BigInt, Bytes, ethereum, Wrapped } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import {
  Approval,
  ApprovalForAll,
  MintCostUpdated,
  NFTMinted,
  OwnershipTransferred,
  Transfer,
} from "../../generated/Abyssmal/Abyssmal";

// const stringEventParam = (key: string, value: string): ethereum.EventParam =>
//   new ethereum.EventParam(key, ethereum.Value.fromString(value));

const booleanEventParam = (key: string, value: boolean): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromBoolean(value));

const addressEventParam = (key: string, value: string): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromAddress(Address.fromString(value)));

const uintEventParam = (key: string, value: i32): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(value)));

const uint64EventParam = (key: string, value: i64): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromUnsignedBigInt(BigInt.fromI64(value)));

export function createApprovalEvent(owner: string, approved: string, tokenId: i32, timestamp: i32): Approval {
  const mockEvent = newMockEvent();
  const approvalEvent = new Approval(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  approvalEvent.block.timestamp = BigInt.fromI32(timestamp);
  approvalEvent.parameters.push(addressEventParam("owner", owner));
  approvalEvent.parameters.push(addressEventParam("approved", approved));
  approvalEvent.parameters.push(uintEventParam("tokenId", tokenId));
  return approvalEvent;
}

export function createApprovalForAllEvent(
  owner: string,
  operator: string,
  approved: boolean,
  timestamp: i32
): ApprovalForAll {
  const mockEvent = newMockEvent();
  const approvalForAllEvent = new ApprovalForAll(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  approvalForAllEvent.block.timestamp = BigInt.fromI32(timestamp);
  approvalForAllEvent.parameters.push(addressEventParam("owner", owner));
  approvalForAllEvent.parameters.push(addressEventParam("operator", operator));
  approvalForAllEvent.parameters.push(booleanEventParam("approved", approved));
  return approvalForAllEvent;
}

export function createMintCostUpdatedEvent(oldMintCost: i32, newMintCost: i32, timestamp: i32): MintCostUpdated {
  const mockEvent = newMockEvent();
  const mintCostUpdatedEvent = new MintCostUpdated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  mintCostUpdatedEvent.block.timestamp = BigInt.fromI32(timestamp);
  mintCostUpdatedEvent.parameters.push(uintEventParam("oldMintCost", oldMintCost));
  mintCostUpdatedEvent.parameters.push(uintEventParam("newMintCost", newMintCost));
  return mintCostUpdatedEvent;
}

export function createNFTMintedEvent(mintedBy: string, tokenId: i32, cost: i64, timestamp: i32): NFTMinted {
  const mockEvent = newMockEvent();
  const nftMintedEvent = new NFTMinted(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  nftMintedEvent.block.timestamp = BigInt.fromI32(timestamp);
  nftMintedEvent.parameters.push(addressEventParam("mintedBy", mintedBy));
  nftMintedEvent.parameters.push(uintEventParam("tokenId", tokenId));
  nftMintedEvent.parameters.push(uint64EventParam("cost", cost));
  return nftMintedEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: string,
  newOwner: string,
  timestamp: i32
): OwnershipTransferred {
  const mockEvent = newMockEvent();
  const ownershipTransferredEvent = new OwnershipTransferred(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  ownershipTransferredEvent.block.timestamp = BigInt.fromI32(timestamp);
  ownershipTransferredEvent.parameters.push(addressEventParam("previousOwner", previousOwner));
  ownershipTransferredEvent.parameters.push(addressEventParam("newOwner", newOwner));
  return ownershipTransferredEvent;
}

export function createTransferEvent(from: string, to: string, tokenId: i32, timestamp: i32): Transfer {
  const mockEvent = newMockEvent();
  const transferEvent = new Transfer(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  transferEvent.block.timestamp = BigInt.fromI32(timestamp);
  transferEvent.parameters.push(addressEventParam("from", from));
  transferEvent.parameters.push(addressEventParam("to", to));
  transferEvent.parameters.push(uintEventParam("tokenId", tokenId));
  return transferEvent;
}

export function newLog(address: Address, topics: Array<Bytes>, transactionLogIndex: BigInt): ethereum.Log {
  // Copied from https://github.com/LimeChain/matchstick-as/blob/886a3ff95bc760ccacec06d23c577d332ae03e4d/assembly/defaults.ts#L35
  const defaultAddress = Address.fromString("0xA16081F360e3847006dB660bae1c6d1b2e17eC2A");
  const defaultAddressBytes = defaultAddress as Bytes;
  const defaultBigInt = BigInt.fromI32(1);
  const defaultIntBytes = Bytes.fromI32(1);
  const defaultEventDataLogType = "default_log_type";

  return new ethereum.Log(
    address,
    topics,
    defaultAddressBytes, // data
    defaultAddressBytes, // blockHash
    defaultIntBytes, // blockNumber
    defaultAddressBytes, // transactionHash
    defaultBigInt, // transactionIndex
    defaultBigInt, // logIndex
    transactionLogIndex,
    defaultEventDataLogType, // logType
    new Wrapped(false) // removed
  );
}
