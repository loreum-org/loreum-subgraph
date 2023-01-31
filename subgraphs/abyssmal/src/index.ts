import {
  ApprovalTx,
  ApprovalForAllTx,
  MintCostUpdatedTx,
  NFTMintedTx,
  OwnershipTransferredTx,
  TransferTx,
} from "../generated/schema";
import {
  Approval,
  ApprovalForAll,
  MintCostUpdated,
  NFTMinted,
  OwnershipTransferred,
  Transfer,
} from "../generated/Abyssmal/Abyssmal";
import { BigInt } from "@graphprotocol/graph-ts";
import { createId } from "../../../helpers/utils";

export function handleApproval(event: Approval): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const approvalTx = new ApprovalTx(id);
  approvalTx.owner = event.params.owner.toHexString();
  approvalTx.approved = event.params.approved.toHexString();
  approvalTx.tokenId = event.params.tokenId;
  approvalTx.timestamp = event.block.timestamp;
  approvalTx.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const approvalForAllTx = new ApprovalForAllTx(id);
  approvalForAllTx.owner = event.params.owner.toHexString();
  approvalForAllTx.operator = event.params.operator.toHexString();
  approvalForAllTx.approved = event.params.approved;
  approvalForAllTx.timestamp = event.block.timestamp;
  approvalForAllTx.save();
}

export function handleMintCostUpdated(event: MintCostUpdated): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const mintCostUpdatedTx = new MintCostUpdatedTx(id);
  mintCostUpdatedTx.oldMintCost = event.params.oldMintCost;
  mintCostUpdatedTx.newMintCost = event.params.newMintCost;
  mintCostUpdatedTx.timestamp = event.block.timestamp;
  mintCostUpdatedTx.save();
}

export function handleNFTMinted(event: NFTMinted): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const nftMintedTx = new NFTMintedTx(id);
  nftMintedTx.mintedBy = event.params.mintedBy.toHexString();
  nftMintedTx.tokenId = BigInt.fromI32(event.params.tokenId);
  nftMintedTx.cost = event.params.cost;
  nftMintedTx.timestamp = event.block.timestamp;
  nftMintedTx.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const ownershipTransferredTx = new OwnershipTransferredTx(id);
  ownershipTransferredTx.previousOwner = event.params.previousOwner.toHexString();
  ownershipTransferredTx.newOwner = event.params.newOwner.toHexString();
  ownershipTransferredTx.timestamp = event.block.timestamp;
  ownershipTransferredTx.save();
}

export function handleTransfer(event: Transfer): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const transferTx = new TransferTx(id);
  transferTx.from = event.params.from.toHexString();
  transferTx.to = event.params.to.toHexString();
  transferTx.tokenId = event.params.tokenId;
  transferTx.timestamp = event.block.timestamp;
  transferTx.save();
}
