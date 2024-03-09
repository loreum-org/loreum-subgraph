import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import { ChamberDeployed, OwnershipTransferred } from "../../generated/Registry/Registry";

import {
  ChangedGuard,
  Demotion,
  Initialized,
  Promotion,
  ApprovedProposal,
  CreatedProposal,
  ExecutedProposal,
  CanceledProposal,
  ReceivedEther,
  ReceivedFallback,
} from "../../generated/templates/Chamber/Chamber";

const addressEventParam = (key: string, value: string): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromAddress(Address.fromString(value)));

const uintEventParam = (key: string, value: i32): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(value)));

export function createChamberDeployedEvent(
  chamber: string,
  serial: i32,
  deployer: string,
  memberToken: string,
  govToken: string
): ChamberDeployed {
  const mockEvent = newMockEvent();
  const chamberDeployedEvent = new ChamberDeployed(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  chamberDeployedEvent.parameters.push(addressEventParam("chamber", chamber));
  chamberDeployedEvent.parameters.push(uintEventParam("serial", serial));
  chamberDeployedEvent.parameters.push(addressEventParam("deployer", deployer));
  chamberDeployedEvent.parameters.push(addressEventParam("memberToken", memberToken));
  chamberDeployedEvent.parameters.push(addressEventParam("govToken", govToken));
  return chamberDeployedEvent;
}

export function createOwnershipTransferredEvent(previousOwner: string, newOwner: string): OwnershipTransferred {
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
  ownershipTransferredEvent.parameters.push(addressEventParam("previousOwner", previousOwner));
  ownershipTransferredEvent.parameters.push(addressEventParam("newOwner", newOwner));
  return ownershipTransferredEvent;
}

export function createChangedGuardEvent(guard: string): ChangedGuard {
  const mockEvent = newMockEvent();
  const changedGuardEvent = new ChangedGuard(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  changedGuardEvent.parameters.push(addressEventParam("guard", guard));
  return changedGuardEvent;
}

export function createDemotionEvent(demoter: string, amt: i32, tokenId: i32): Demotion {
  const mockEvent = newMockEvent();
  const demotionEvent = new Demotion(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  demotionEvent.parameters.push(addressEventParam("demoter", demoter));
  demotionEvent.parameters.push(uintEventParam("amt", amt));
  demotionEvent.parameters.push(uintEventParam("tokenId", tokenId));
  return demotionEvent;
}

export function createInitializedEvent(version: i32): Initialized {
  const mockEvent = newMockEvent();
  const initializedEvent = new Initialized(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  initializedEvent.parameters.push(uintEventParam("version", version));
  return initializedEvent;
}

export function createPromotionEvent(promoter: string, amt: i32, tokenId: i32): Promotion {
  const mockEvent = newMockEvent();
  const promotionEvent = new Promotion(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  promotionEvent.parameters.push(addressEventParam("demoter", promoter));
  promotionEvent.parameters.push(uintEventParam("amt", amt));
  promotionEvent.parameters.push(uintEventParam("tokenId", tokenId));
  return promotionEvent;
}

export function createApprovedProposalEvent(proposalId: i32, tokenId: i32, approvals: i32): ApprovedProposal {
  const mockEvent = newMockEvent();
  const approvedProposalEvent = new ApprovedProposal(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  approvedProposalEvent.parameters.push(uintEventParam("proposalId", proposalId));
  approvedProposalEvent.parameters.push(uintEventParam("tokenId", tokenId));
  approvedProposalEvent.parameters.push(uintEventParam("approvals", approvals));
  return approvedProposalEvent;
}

export function createCreatedProposalEvent(
  proposalId: i32,
  target: string[],
  value: i32[],
  data: string[],
  voters: i32[],
  nonce: i32
): CreatedProposal {
  const mockEvent = newMockEvent();
  const createdProposalEvent = new CreatedProposal(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  createdProposalEvent.parameters.push(uintEventParam("proposalId", proposalId));
  createdProposalEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddressArray(changetype<Bytes[]>(target)))
  );
  createdProposalEvent.parameters.push(new ethereum.EventParam("value", ethereum.Value.fromI32Array(value)));
  createdProposalEvent.parameters.push(new ethereum.EventParam("data", ethereum.Value.fromStringArray(data)));
  createdProposalEvent.parameters.push(new ethereum.EventParam("voters", ethereum.Value.fromI32Array(voters)));
  createdProposalEvent.parameters.push(uintEventParam("nonce", nonce));
  return createdProposalEvent;
}

export function createExecutedProposalEvent(proposalId: i32): ExecutedProposal {
  const mockEvent = newMockEvent();
  const executedProposalEvent = new ExecutedProposal(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  executedProposalEvent.parameters.push(uintEventParam("proposalId", proposalId));
  return executedProposalEvent;
}

export function createCanceledProposalEvent(proposalId: i32): CanceledProposal {
  const mockEvent = newMockEvent();
  const canceledProposalEvent = new CanceledProposal(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  canceledProposalEvent.parameters.push(uintEventParam("proposalId", proposalId));
  return canceledProposalEvent;
}

export function createReceivedEtherEvent(sender: string, value: i32): ReceivedEther {
  const mockEvent = newMockEvent();
  const receivedEtherEvent = new ReceivedEther(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  receivedEtherEvent.parameters.push(addressEventParam("sender", sender));
  receivedEtherEvent.parameters.push(uintEventParam("value", value));
  return receivedEtherEvent;
}

export function createReceivedFallbackEvent(sender: string, value: i32): ReceivedFallback {
  const mockEvent = newMockEvent();
  const receivedFallbackEvent = new ReceivedFallback(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  receivedFallbackEvent.parameters.push(addressEventParam("sender", sender));
  receivedFallbackEvent.parameters.push(uintEventParam("value", value));
  return receivedFallbackEvent;
}
