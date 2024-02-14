import {
    ChamberDeployed as ChamberDeployedTx,
    OwnershipTransferred as OwnershipTransferredTx,
    ChangedGuard as ChangedGuardTx,
    Demoted as DemotedTx,
    Initialized as InitializeTx,
    Promoted as PromotedTx,
    ProposalApproved as ProposalApprovedTx,
    ProposalCreated as ProposalCreatedTx,
    ProposalExecuted as ProposalExecutedTx,
    ReceivedEther as ReceivedEtherTx,
    ReceivedFallback as ReceivedFallbackTX,
} from "../../generated/schema"

import {
    ChamberDeployed,
    OwnershipTransferred
} from "../../generated/Registry/Registry"

import {
    ChangedGuard,
    Demoted,
    Initialized,
    Promoted,
    ProposalApproved,
    ProposalCreated,
    ProposalExecuted,
    ReceivedEther,
    ReceivedFallback,
} from "../../generated/templates/Chamber/Chamber"

import { assert } from "matchstick-as";
import { Bytes , BigInt, Address } from "@graphprotocol/graph-ts";
import { createId } from "../../../../helpers/utils";

export const expectChamberDeployedAdded = (event : ChamberDeployed): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const chamberDeployedTx = ChamberDeployedTx.load(id);
    assert.assertNotNull(chamberDeployedTx);
    if (!chamberDeployedTx) return;
    assert.bytesEquals(event.params.chamber, chamberDeployedTx.chamber)
    assert.bigIntEquals(event.params.serial, chamberDeployedTx.serial)
    assert.bytesEquals(event.params.deployer, chamberDeployedTx.deployer)
    assert.bytesEquals(event.params.govToken, chamberDeployedTx.govToken)
    assert.bytesEquals(event.params.memberToken, chamberDeployedTx.memberToken)
}

export const expectOwnershipTransferredAdded = (event : OwnershipTransferred): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const ownershipTransferredTx = OwnershipTransferredTx.load(id);
    assert.assertNotNull(ownershipTransferredTx);
    if (!ownershipTransferredTx) return;
    assert.bytesEquals(event.params.previousOwner, ownershipTransferredTx.previousOwner)
    assert.bytesEquals(event.params.newOwner, ownershipTransferredTx.newOwner)
}

export const expectChangedGuardAdded = (event : ChangedGuard): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const changedGuardTx = ChangedGuardTx.load(id);
    assert.assertNotNull(changedGuardTx);
    if (!changedGuardTx) return;
    assert.bytesEquals(event.params.guard, changedGuardTx.guard)
}

export const expectDemotedAdded = (event : Demoted): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const demotedTx = DemotedTx.load(id);
    assert.assertNotNull(demotedTx);
    if (!demotedTx) return;
    assert.bytesEquals(event.params.demoter, demotedTx.demoter);
    assert.bigIntEquals(event.params.amt, demotedTx.amt);
    assert.bigIntEquals(event.params.tokenId, demotedTx.tokenId);
}

export const expectInitializedAdded = (event : Initialized): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const initializedTx = InitializeTx.load(id);
    assert.assertNotNull(initializedTx);
    if (!initializedTx) return;
    assert.i32Equals(event.params.version, initializedTx.version);
}

export const expectPromotedAdded = (event : Promoted): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const promotedTx = PromotedTx.load(id);
    assert.assertNotNull(promotedTx);
    if (!promotedTx) return;
    assert.bytesEquals(event.params.promoter, promotedTx.promoter);
    assert.bigIntEquals(event.params.amt, promotedTx.amt);
    assert.bigIntEquals(event.params.tokenId, promotedTx.tokenId);
}

export const expectProposalApprovedAdded = (event : ProposalApproved): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const proposalApprovedTx = ProposalApprovedTx.load(id);
    assert.assertNotNull(proposalApprovedTx);
    if (!proposalApprovedTx) return;
    assert.bigIntEquals(event.params.proposalId,proposalApprovedTx.proposalId);
    assert.bigIntEquals(event.params.tokenId,proposalApprovedTx.tokenId);
    assert.bigIntEquals(event.params.approvals,proposalApprovedTx.approvals);
}

export const expectProposalCreatedAdded = (event : ProposalCreated): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const proposalCreatedTx = ProposalCreatedTx.load(id);
    assert.assertNotNull(proposalCreatedTx);
    if (!proposalCreatedTx) return;
    assert.bytesEquals(changetype<Address>(event.params.target), changetype<Address>(proposalCreatedTx.target))
}

export const expectProposalExecutedAdded = (event : ProposalExecuted): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const proposalExecutedTx = ProposalExecutedTx.load(id);
    assert.assertNotNull(proposalExecutedTx);
    if (!proposalExecutedTx) return;
    assert.bigIntEquals(event.params.proposalId,proposalExecutedTx.proposalId);
}

export const expectReceivedEtherAdded = (event : ReceivedEther): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const receivedEtherTx = ReceivedEtherTx.load(id);
    assert.assertNotNull(receivedEtherTx);
    if (!receivedEtherTx) return;
    assert.bytesEquals(event.params.sender, receivedEtherTx.sender);
    assert.bigIntEquals(event.params.value, receivedEtherTx.value);
}

export const expectReceivedFallbackAdded = (event : ReceivedFallback): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const receivedFallbackTx = ReceivedFallbackTX.load(id);
    assert.assertNotNull(receivedFallbackTx);
    if (!receivedFallbackTx) return;
    assert.bytesEquals(event.params.sender, receivedFallbackTx.sender);
    assert.bigIntEquals(event.params.value, receivedFallbackTx.value);
}