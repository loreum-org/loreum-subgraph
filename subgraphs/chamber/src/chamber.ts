import { createId } from "../../../helpers/utils";
import { Bytes } from "@graphprotocol/graph-ts";

import {
  ChangedGuard as ChangedGuardEvent,
  Demoted as DemotedEvent,
  Initialized as InitializedEvent,
  Promoted as PromotedEvent,
  ProposalApproved as ProposalApprovedEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  ProposalCanceled as ProposalCanceledEvent,
  ReceivedEther as ReceivedEtherEvent,
  ReceivedFallback as ReceivedFallbackEvent,
} from "../generated/templates/Chamber/Chamber";

import {
  ChangedGuard,
  Demoted,
  Initialized,
  Promoted,
  ProposalApproved,
  ProposalCreated,
  ProposalExecuted,
  ProposalCanceled,
  ReceivedEther,
  ReceivedFallback,
} from "../generated/schema";

export function handleChangedGuard(event: ChangedGuardEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const changedGuardTx = new ChangedGuard(id);
  changedGuardTx.guard = event.params.guard;
  changedGuardTx.contractAddress = changetype<Bytes>(event.transaction.to);

  changedGuardTx.blockNumber = event.block.number;
  changedGuardTx.blockTimestamp = event.block.timestamp;
  changedGuardTx.transactionHash = event.transaction.hash;

  changedGuardTx.save();
}

export function handleDemoted(event: DemotedEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const demotedTx = new Demoted(id);
  demotedTx.demoter = event.params.demoter;
  demotedTx.amt = event.params.amt;
  demotedTx.tokenId = event.params.tokenId;
  demotedTx.contractAddress = changetype<Bytes>(event.transaction.to);

  demotedTx.blockNumber = event.block.number;
  demotedTx.blockTimestamp = event.block.timestamp;
  demotedTx.transactionHash = event.transaction.hash;

  demotedTx.save();
}

export function handleInitialized(event: InitializedEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const initializedTx = new Initialized(id);
  initializedTx.version = event.params.version;
  initializedTx.contractAddress = changetype<Bytes>(event.transaction.to);

  initializedTx.blockNumber = event.block.number;
  initializedTx.blockTimestamp = event.block.timestamp;
  initializedTx.transactionHash = event.transaction.hash;

  initializedTx.save();
}

export function handlePromoted(event: PromotedEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const promotedTx = new Promoted(id);
  promotedTx.promoter = event.params.promoter;
  promotedTx.amt = event.params.amt;
  promotedTx.tokenId = event.params.tokenId;
  promotedTx.contractAddress = changetype<Bytes>(event.transaction.to);

  promotedTx.blockNumber = event.block.number;
  promotedTx.blockTimestamp = event.block.timestamp;
  promotedTx.transactionHash = event.transaction.hash;

  promotedTx.save();
}

export function handleProposalApproved(event: ProposalApprovedEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const proposalApprovedTx = new ProposalApproved(id);
  proposalApprovedTx.proposalId = event.params.proposalId;
  proposalApprovedTx.tokenId = event.params.tokenId;
  proposalApprovedTx.approvals = event.params.approvals;
  proposalApprovedTx.contractAddress = changetype<Bytes>(event.transaction.to);

  proposalApprovedTx.blockNumber = event.block.number;
  proposalApprovedTx.blockTimestamp = event.block.timestamp;
  proposalApprovedTx.transactionHash = event.transaction.hash;

  proposalApprovedTx.save();
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const proposalCreatedTx = new ProposalCreated(id);
  proposalCreatedTx.proposalId = event.params.proposalId;
  proposalCreatedTx.target = changetype<Bytes[]>(event.params.target);
  proposalCreatedTx.value = event.params.value;
  proposalCreatedTx.data = event.params.data;
  proposalCreatedTx.voters = event.params.voters;
  proposalCreatedTx.nonce = event.params.nonce;
  proposalCreatedTx.contractAddress = changetype<Bytes>(event.transaction.to);

  proposalCreatedTx.blockNumber = event.block.number;
  proposalCreatedTx.blockTimestamp = event.block.timestamp;
  proposalCreatedTx.transactionHash = event.transaction.hash;

  proposalCreatedTx.save();
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const proposalExecutedTx = new ProposalExecuted(id);
  proposalExecutedTx.proposalId = event.params.proposalId;
  proposalExecutedTx.contractAddress = changetype<Bytes>(event.transaction.to);

  proposalExecutedTx.blockNumber = event.block.number;
  proposalExecutedTx.blockTimestamp = event.block.timestamp;
  proposalExecutedTx.transactionHash = event.transaction.hash;

  proposalExecutedTx.save();
}

export function handleProposalCanceled(event: ProposalCanceledEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const proposalCanceledTx = new ProposalCanceled(id);
  proposalCanceledTx.proposalId = event.params.proposalId;
  proposalCanceledTx.contractAddress = changetype<Bytes>(event.transaction.to);

  proposalCanceledTx.blockNumber = event.block.number;
  proposalCanceledTx.blockTimestamp = event.block.timestamp;
  proposalCanceledTx.transactionHash = event.transaction.hash;

  proposalCanceledTx.save();
}

export function handleReceivedEther(event: ReceivedEtherEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const receivedEtherTx = new ReceivedEther(id);
  receivedEtherTx.sender = event.params.sender;
  receivedEtherTx.value = event.params.value;
  receivedEtherTx.contractAddress = changetype<Bytes>(event.transaction.to);

  receivedEtherTx.blockNumber = event.block.number;
  receivedEtherTx.blockTimestamp = event.block.timestamp;
  receivedEtherTx.transactionHash = event.transaction.hash;

  receivedEtherTx.save();
}

export function handleReceivedFallback(event: ReceivedFallbackEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const receivedFallbackTx = new ReceivedFallback(id);
  receivedFallbackTx.sender = event.params.sender;
  receivedFallbackTx.value = event.params.value;
  receivedFallbackTx.contractAddress = changetype<Bytes>(event.transaction.to);

  receivedFallbackTx.blockNumber = event.block.number;
  receivedFallbackTx.blockTimestamp = event.block.timestamp;
  receivedFallbackTx.transactionHash = event.transaction.hash;

  receivedFallbackTx.save();
}
