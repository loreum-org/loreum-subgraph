import {
  ApprovalForAllTx,
  ApprovalTx,
  MintCostUpdatedTx,
  NFTMintedTx,
  OwnershipTransferredTx,
  TransferTx
} from "../../generated/schema";
import {
  Approval,
  ApprovalForAll,
  MintCostUpdated,
  NFTMinted,
  OwnershipTransferred,
  Transfer
} from "../../generated/LoreumNFT/LoreumNFT";
import { assert } from "matchstick-as";
import { BigInt } from "@graphprotocol/graph-ts";
import { createId } from "../../../../helpers/utils";

export const expectApprovalTxAdded = (event: Approval): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const approvalTx = ApprovalTx.load(id);
  assert.assertNotNull(approvalTx);
  if (!approvalTx) return;
  assert.bytesEquals(event.params.owner, approvalTx.owner);
  assert.bytesEquals(event.params.approved, approvalTx.approved);
  assert.bigIntEquals(event.params.tokenId, approvalTx.tokenId);
  assert.assertNotNull(approvalTx.timestamp.toI32());
};

export const expectApprovalForAllTxAdded = (event: ApprovalForAll): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const approvalForAllTx = ApprovalForAllTx.load(id);
  assert.assertNotNull(approvalForAllTx);
  if (!approvalForAllTx) return;
  assert.bytesEquals(event.params.owner, approvalForAllTx.owner);
  assert.bytesEquals(event.params.operator, approvalForAllTx.operator);
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
  assert.bytesEquals(event.params.mintedBy, nftMintedTx.mintedBy);
  assert.bigIntEquals(BigInt.fromI32(event.params.tokenId), nftMintedTx.tokenId);
  assert.assertTrue(event.params.cost == nftMintedTx.cost);
  assert.assertNotNull(nftMintedTx.timestamp.toI32());
};

export const expectOwnershipTransferredAdded = (event: OwnershipTransferred): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const ownershipTransferredTx = OwnershipTransferredTx.load(id);
  assert.assertNotNull(ownershipTransferredTx);
  if (!ownershipTransferredTx) return;
  assert.bytesEquals(event.params.previousOwner, ownershipTransferredTx.previousOwner);
  assert.bytesEquals(event.params.newOwner, ownershipTransferredTx.newOwner);
  assert.assertNotNull(ownershipTransferredTx.timestamp.toI32());
};

export const expectTransferAdded = (event: Transfer): void => {
  const id = createId(event.transaction.hash, event.transactionLogIndex);
  const transferTx = TransferTx.load(id);
  assert.assertNotNull(transferTx);
  if (!transferTx) return;
  assert.bytesEquals(event.params.from, transferTx.from);
  assert.bytesEquals(event.params.to, transferTx.to);
  assert.assertNotNull(transferTx.timestamp.toI32());
};
