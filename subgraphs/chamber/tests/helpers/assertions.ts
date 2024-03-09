import {
  ChamberDeployed as ChamberDeployedTx,
  OwnershipTransferred as OwnershipTransferredTx,
  ChangedGuard as ChangedGuardTx,
  Demotion as DemotionTx,
  Initialized as InitializeTx,
  Promotion as PromotionTx,
  ApprovedProposal as ApprovedProposalTx,
  CreatedProposal as CreatedProposalTx,
  ExecutedProposal as ExecutedProposalTx,
  CanceledProposal as CanceledProposalTx,
  ReceivedEther as ReceivedEtherTx,
  ReceivedFallback as ReceivedFallbackTX,
} from "../../generated/schema";

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

import { assert } from "matchstick-as";
import { Address } from "@graphprotocol/graph-ts";
import { createId } from "../../../../helpers/utils";

export const expectChamberDeployedAdded = (event: ChamberDeployed): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const chamberDeployedTx = ChamberDeployedTx.load(id);
  assert.assertNotNull(chamberDeployedTx);
  if (!chamberDeployedTx) return;
  assert.bytesEquals(event.params.chamber, chamberDeployedTx.chamber);
  assert.bigIntEquals(event.params.serial, chamberDeployedTx.serial);
  assert.bytesEquals(event.params.deployer, chamberDeployedTx.deployer);
  assert.bytesEquals(event.params.govToken, chamberDeployedTx.govToken);
  assert.bytesEquals(event.params.memberToken, chamberDeployedTx.memberToken);
};

export const expectOwnershipTransferredAdded = (event: OwnershipTransferred): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const ownershipTransferredTx = OwnershipTransferredTx.load(id);
  assert.assertNotNull(ownershipTransferredTx);
  if (!ownershipTransferredTx) return;
  assert.bytesEquals(event.params.previousOwner, ownershipTransferredTx.previousOwner);
  assert.bytesEquals(event.params.newOwner, ownershipTransferredTx.newOwner);
};

export const expectChangedGuardAdded = (event: ChangedGuard): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const changedGuardTx = ChangedGuardTx.load(id);
  assert.assertNotNull(changedGuardTx);
  if (!changedGuardTx) return;
  assert.bytesEquals(event.params.guard, changedGuardTx.guard);
};

export const expectDemotionAdded = (event: Demotion): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const demotionTx = DemotionTx.load(id);
  assert.assertNotNull(demotionTx);
  if (!demotionTx) return;
  assert.bytesEquals(event.params.demoter, demotionTx.demoter);
  assert.bigIntEquals(event.params.amt, demotionTx.amt);
  assert.bigIntEquals(event.params.tokenId, demotionTx.tokenId);
};

export const expectInitializedAdded = (event: Initialized): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const initializedTx = InitializeTx.load(id);
  assert.assertNotNull(initializedTx);
  if (!initializedTx) return;
  assert.i32Equals(event.params.version, initializedTx.version);
};

export const expectPromotionAdded = (event: Promotion): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const promotionTx = PromotionTx.load(id);
  assert.assertNotNull(promotionTx);
  if (!promotionTx) return;
  assert.bytesEquals(event.params.promoter, promotionTx.promoter);
  assert.bigIntEquals(event.params.amt, promotionTx.amt);
  assert.bigIntEquals(event.params.tokenId, promotionTx.tokenId);
};

export const expectApprovedProposalAdded = (event: ApprovedProposal): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const approvedProposalTx = ApprovedProposalTx.load(id);
  assert.assertNotNull(approvedProposalTx);
  if (!approvedProposalTx) return;
  assert.bigIntEquals(event.params.proposalId, approvedProposalTx.proposalId);
  assert.bigIntEquals(event.params.tokenId, approvedProposalTx.tokenId);
  assert.bigIntEquals(event.params.approvals, approvedProposalTx.approvals);
};

export const expectCreatedProposalAdded = (event: CreatedProposal): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const createdProposalTx = CreatedProposalTx.load(id);
  assert.assertNotNull(createdProposalTx);
  if (!createdProposalTx) return;
  assert.bytesEquals(changetype<Address>(event.params.target), changetype<Address>(createdProposalTx.target));
};

export const expectExecutedProposalAdded = (event: ExecutedProposal): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const executedProposalTx = ExecutedProposalTx.load(id);
  assert.assertNotNull(executedProposalTx);
  if (!executedProposalTx) return;
  assert.bigIntEquals(event.params.proposalId, executedProposalTx.proposalId);
};

export const expectCanceledProposalAdded = (event: CanceledProposal): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const canceledProposalTx = CanceledProposalTx.load(id);
  assert.assertNotNull(canceledProposalTx);
  if (!canceledProposalTx) return;
  assert.bigIntEquals(event.params.proposalId, canceledProposalTx.proposalId);
};

export const expectReceivedEtherAdded = (event: ReceivedEther): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const receivedEtherTx = ReceivedEtherTx.load(id);
  assert.assertNotNull(receivedEtherTx);
  if (!receivedEtherTx) return;
  assert.bytesEquals(event.params.sender, receivedEtherTx.sender);
  assert.bigIntEquals(event.params.value, receivedEtherTx.value);
};

export const expectReceivedFallbackAdded = (event: ReceivedFallback): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const receivedFallbackTx = ReceivedFallbackTX.load(id);
  assert.assertNotNull(receivedFallbackTx);
  if (!receivedFallbackTx) return;
  assert.bytesEquals(event.params.sender, receivedFallbackTx.sender);
  assert.bigIntEquals(event.params.value, receivedFallbackTx.value);
};
