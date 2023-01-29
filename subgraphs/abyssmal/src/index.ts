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
  approvalTx.owner = event.params.owner.toHex();
  approvalTx.approved = event.params.approved.toHex();
  approvalTx.tokenId = event.params.tokenId;
  approvalTx.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const approvalForAllTx = new ApprovalForAllTx(id);
  approvalForAllTx.owner = event.params.owner.toHex();
  approvalForAllTx.operator = event.params.operator.toHex();
  approvalForAllTx.approved = event.params.approved;
  approvalForAllTx.save();
}

export function handleMintCostUpdated(event: MintCostUpdated): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const mintCostUpdatedTx = new MintCostUpdatedTx(id);
  mintCostUpdatedTx.oldMintCost = event.params.oldMintCost;
  mintCostUpdatedTx.newMintCost = event.params.newMintCost;
  mintCostUpdatedTx.save();
}

export function handleNFTMinted(event: NFTMinted): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const nftMintedTx = new NFTMintedTx(id);
  nftMintedTx.mintedBy = event.params.mintedBy.toHex();
  nftMintedTx.tokenId = BigInt.fromI32(event.params.tokenId);
  nftMintedTx.cost = event.params.cost;
  nftMintedTx.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const ownershipTransferredTx = new OwnershipTransferredTx(id);
  ownershipTransferredTx.previousOwner = event.params.previousOwner.toHex();
  ownershipTransferredTx.newOwner = event.params.newOwner.toHex();
  ownershipTransferredTx.save();
}

export function handleTransfer(event: Transfer): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const transferTx = new TransferTx(id);
  transferTx.from = event.params.from.toHex();
  transferTx.to = event.params.to.toHex();
  transferTx.tokenId = event.params.tokenId;
  transferTx.save();
}
