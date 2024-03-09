import { createId } from "../../../helpers/utils";
import { Bytes } from "@graphprotocol/graph-ts";

import {
  ChangedGuard as ChangedGuardEvent,
  Demotion as DemotionEvent,
  Initialized as InitializedEvent,
  Promotion as PromotionEvent,
  ApprovedProposal as ApprovedProposalEvent,
  CreatedProposal as CreatedProposalEvent,
  ExecutedProposal as ExecutedProposalEvent,
  CanceledProposal as CanceledProposalEvent,
  ReceivedEther as ReceivedEtherEvent,
  ReceivedFallback as ReceivedFallbackEvent,
} from "../generated/templates/Chamber/Chamber";

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

export function handleDemotion(event: DemotionEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const demotionTx = new Demotion(id);
  demotionTx.demoter = event.params.demoter;
  demotionTx.amt = event.params.amt;
  demotionTx.tokenId = event.params.tokenId;
  demotionTx.contractAddress = changetype<Bytes>(event.transaction.to);

  demotionTx.blockNumber = event.block.number;
  demotionTx.blockTimestamp = event.block.timestamp;
  demotionTx.transactionHash = event.transaction.hash;

  demotionTx.save();
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

export function handlePromotion(event: PromotionEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const promotionTx = new Promotion(id);
  promotionTx.promoter = event.params.promoter;
  promotionTx.amt = event.params.amt;
  promotionTx.tokenId = event.params.tokenId;
  promotionTx.contractAddress = changetype<Bytes>(event.transaction.to);

  promotionTx.blockNumber = event.block.number;
  promotionTx.blockTimestamp = event.block.timestamp;
  promotionTx.transactionHash = event.transaction.hash;

  promotionTx.save();
}

export function handleApprovedProposal(event: ApprovedProposalEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const approvedProposalTx = new ApprovedProposal(id);
  approvedProposalTx.proposalId = event.params.proposalId;
  approvedProposalTx.tokenId = event.params.tokenId;
  approvedProposalTx.approvals = event.params.approvals;
  approvedProposalTx.contractAddress = changetype<Bytes>(event.transaction.to);

  approvedProposalTx.blockNumber = event.block.number;
  approvedProposalTx.blockTimestamp = event.block.timestamp;
  approvedProposalTx.transactionHash = event.transaction.hash;

  approvedProposalTx.save();
}

export function handleCreatedProposal(event: CreatedProposalEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const createdProposalTx = new CreatedProposal(id);
  createdProposalTx.proposalId = event.params.proposalId;
  createdProposalTx.target = changetype<Bytes[]>(event.params.target);
  createdProposalTx.value = event.params.value;
  createdProposalTx.data = event.params.data;
  createdProposalTx.voters = event.params.voters;
  createdProposalTx.nonce = event.params.nonce;
  createdProposalTx.contractAddress = changetype<Bytes>(event.transaction.to);

  createdProposalTx.blockNumber = event.block.number;
  createdProposalTx.blockTimestamp = event.block.timestamp;
  createdProposalTx.transactionHash = event.transaction.hash;

  createdProposalTx.save();
}

export function handleExecutedProposal(event: ExecutedProposalEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const executedProposalTx = new ExecutedProposal(id);
  executedProposalTx.proposalId = event.params.proposalId;
  executedProposalTx.contractAddress = changetype<Bytes>(event.transaction.to);

  executedProposalTx.blockNumber = event.block.number;
  executedProposalTx.blockTimestamp = event.block.timestamp;
  executedProposalTx.transactionHash = event.transaction.hash;

  executedProposalTx.save();
}

export function handleCanceledProposal(event: CanceledProposalEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const canceledProposalTx = new CanceledProposal(id);
  canceledProposalTx.proposalId = event.params.proposalId;
  canceledProposalTx.contractAddress = changetype<Bytes>(event.transaction.to);

  canceledProposalTx.blockNumber = event.block.number;
  canceledProposalTx.blockTimestamp = event.block.timestamp;
  canceledProposalTx.transactionHash = event.transaction.hash;

  canceledProposalTx.save();
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
