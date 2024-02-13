import {
  ChangedGuard as ChangedGuardEvent,
  Demoted as DemotedEvent,
  Initialized as InitializedEvent,
  Promoted as PromotedEvent,
  ProposalApproved as ProposalApprovedEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  ReceivedEther as ReceivedEtherEvent,
  ReceivedFallback as ReceivedFallbackEvent
} from "../generated/Chamber/Chamber"
import {
  ChangedGuard,
  Demoted,
  Initialized,
  Promoted,
  ProposalApproved,
  ProposalCreated,
  ProposalExecuted,
  ReceivedEther,
  ReceivedFallback
} from "../generated/schema"

export function handleChangedGuard(event: ChangedGuardEvent): void {
  let entity = new ChangedGuard(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guard = event.params.guard

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDemoted(event: DemotedEvent): void {
  let entity = new Demoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.demoter = event.params.demoter
  entity.amt = event.params.amt
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePromoted(event: PromotedEvent): void {
  let entity = new Promoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.promoter = event.params.promoter
  entity.amt = event.params.amt
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalApproved(event: ProposalApprovedEvent): void {
  let entity = new ProposalApproved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.tokenId = event.params.tokenId
  entity.approvals = event.params.approvals

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let entity = new ProposalCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.target = event.params.target
  entity.value = event.params.value
  entity.data = event.params.data
  entity.voters = event.params.voters
  entity.nonce = event.params.nonce

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  let entity = new ProposalExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReceivedEther(event: ReceivedEtherEvent): void {
  let entity = new ReceivedEther(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReceivedFallback(event: ReceivedFallbackEvent): void {
  let entity = new ReceivedFallback(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
