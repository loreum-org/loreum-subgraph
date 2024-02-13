import { createId } from "../../../helpers/utils"
import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent
} from "../generated/Token/Token"
import { Approval, Transfer } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const approvalTx = new Approval(id);
  approvalTx.owner = event.params.owner
  approvalTx.spender = event.params.spender
  approvalTx.value = event.params.value
  approvalTx.blockNumber = event.block.number
  approvalTx.blockTimestamp = event.block.timestamp
  approvalTx.transactionHash = event.transaction.hash

  approvalTx.save()
}

export function handleTransfer(event: TransferEvent): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const transferTx = new Transfer(id);
  transferTx.from = event.params.from
  transferTx.to = event.params.to
  transferTx.value = event.params.value
  transferTx.blockNumber = event.block.number
  transferTx.blockTimestamp = event.block.timestamp
  transferTx.transactionHash = event.transaction.hash

  transferTx.save()
}
