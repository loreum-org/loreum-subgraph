import { ApprovalTx, ApprovalForAllTx, MintCostUpdatedTx } from "../generated/schema";
import { Approval, ApprovalForAll, MintCostUpdated } from "../generated/Abyssmal/Abyssmal";

export function handleApproval(event: Approval): void {
  const logIndex = event.logIndex;
  const transactionHash = event.transaction.hash;

  const approvalId = `${transactionHash}-${logIndex.toString()}`;
  const approvalTx = new ApprovalTx(approvalId);

  approvalTx.owner = event.params.owner.toHex();
  approvalTx.approved = event.params.approved.toHex();
  approvalTx.tokenId = event.params.tokenId.toI32();
  approvalTx.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  const logIndex = event.logIndex;
  const transactionHash = event.transaction.hash;

  const id = `${transactionHash}-${logIndex.toString()}`;
  const approvalForAllTx = new ApprovalForAllTx(id);

  approvalForAllTx.owner = event.params.owner.toHex();
  approvalForAllTx.operator = event.params.operator.toHex();
  approvalForAllTx.approved = event.params.approved;
  approvalForAllTx.save();
}

export function handleMintCostUpdated(event: MintCostUpdated): void {
  const logIndex = event.logIndex;
  const transactionHash = event.transaction.hash;

  const id = `${transactionHash}-${logIndex.toString()}`;
  const mintCostUpdatedTx = new MintCostUpdatedTx(id);

  mintCostUpdatedTx.oldMintCost = event.params.oldMintCost;
  mintCostUpdatedTx.newMintCost = event.params.newMintCost;
  mintCostUpdatedTx.save();
}
