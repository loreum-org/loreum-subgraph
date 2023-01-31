import {
  ApprovalForAllTx,
  ApprovalTx,
  MintCostUpdatedTx,
  NFTMintedTx,
  OwnershipTransferredTx,
  TransferTx,
} from "../../generated/schema";
import {
  Approval,
  ApprovalForAll,
  MintCostUpdated,
  NFTMinted,
  OwnershipTransferred,
  Transfer,
} from "../../generated/LoreumNFT/LoreumNFT";
import { assert } from "matchstick-as";
import { BigInt } from "@graphprotocol/graph-ts";
import { createId } from "../../../../helpers/utils";

export const expectApprovalTxAdded = (event: Approval): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const approvalTx = ApprovalTx.load(id);
  assert.assertNotNull(approvalTx);
  if (!approvalTx) return;
  assert.stringEquals(event.params.owner.toHexString(), approvalTx.owner);
  assert.stringEquals(event.params.approved.toHexString(), approvalTx.approved);
  assert.bigIntEquals(event.params.tokenId, approvalTx.tokenId);
  assert.assertNotNull(approvalTx.timestamp.toI32());
};

export const expectApprovalForAllTxAdded = (event: ApprovalForAll): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const approvalForAllTx = ApprovalForAllTx.load(id);
  assert.assertNotNull(approvalForAllTx);
  if (!approvalForAllTx) return;
  assert.stringEquals(event.params.owner.toHexString(), approvalForAllTx.owner);
  assert.stringEquals(event.params.operator.toHexString(), approvalForAllTx.operator);
  assert.booleanEquals(event.params.approved, approvalForAllTx.approved);
  assert.assertNotNull(approvalForAllTx.timestamp.toI32());
};

export const expectMintCostTxAdded = (event: MintCostUpdated): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const mintCostUpdatedTx = MintCostUpdatedTx.load(id);
  assert.assertNotNull(mintCostUpdatedTx);
  if (!mintCostUpdatedTx) return;
  assert.bigIntEquals(event.params.oldMintCost, mintCostUpdatedTx.oldMintCost);
  assert.bigIntEquals(event.params.newMintCost, mintCostUpdatedTx.newMintCost);
  assert.assertNotNull(mintCostUpdatedTx.timestamp.toI32());
};

export const expectNFTMintedTxAdded = (event: NFTMinted): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const nftMintedTx = NFTMintedTx.load(id);
  assert.assertNotNull(nftMintedTx);
  if (!nftMintedTx) return;
  assert.stringEquals(event.params.mintedBy.toHexString(), nftMintedTx.mintedBy);
  assert.bigIntEquals(BigInt.fromI32(event.params.tokenId), nftMintedTx.tokenId);
  assert.assertTrue(event.params.cost == nftMintedTx.cost);
  assert.assertNotNull(nftMintedTx.timestamp.toI32());
};

export const expectOwnershipTransferredAdded = (event: OwnershipTransferred): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const ownershipTransferredTx = OwnershipTransferredTx.load(id);
  assert.assertNotNull(ownershipTransferredTx);
  if (!ownershipTransferredTx) return;
  assert.stringEquals(event.params.previousOwner.toHexString(), ownershipTransferredTx.previousOwner);
  assert.stringEquals(event.params.newOwner.toHexString(), ownershipTransferredTx.newOwner);
  assert.assertNotNull(ownershipTransferredTx.timestamp.toI32());
};

export const expectTransferAdded = (event: Transfer): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const transferTx = TransferTx.load(id);
  assert.assertNotNull(transferTx);
  if (!transferTx) return;
  assert.stringEquals(event.params.from.toHexString(), transferTx.from);
  assert.stringEquals(event.params.to.toHexString(), transferTx.to);
  assert.assertNotNull(transferTx.timestamp.toI32());
};
