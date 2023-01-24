import { Approvals } from "../generated/schema";
import { Approval } from "../generated/Abyssmal/Abyssmal";

export function handleApproval(event: Approval): void {
  const logIndex = event.logIndex;
  const transactionHash = event.transaction.hash;

  const approvalId = `${transactionHash}-${logIndex.toString()}`;
  const approval = new Approvals(approvalId);

  approval.owner = event.params.owner.toHex();
  approval.approved = event.params.approved.toHex();
  approval.tokenId = event.params.tokenId.toI32();
  approval.save();
}
