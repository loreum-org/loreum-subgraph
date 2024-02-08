import {
  ChamberDeployed as ChamberDeployedEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/MultiProxy/MultiProxy"
import {
  ChamberDeployed,
  Initialized,
  OwnershipTransferred
} from "../generated/schema"

import { Chamber } from "../generated/templates"

import {
  ChangedGuard as ChangedGuardEvent,
  Demoted as DemotedEvent,
  Promoted as PromotedEvent,
  ProposalApproved as ProposalApprovedEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  ReceivedEther as ReceivedEtherEvent,
  ReceivedFallback as ReceivedFallbackEvent
} from "../generated/templates/Chamber/Chamber"

import {
  ChangedGuard,
  Demoted,
  Promoted,
  ProposalApproved,
  ProposalCreated,
  ProposalExecuted,
  ReceivedEther,
  ReceivedFallback
} from "../generated/schema"
import { Bytes } from "@graphprotocol/graph-ts"

export function handleChamberDeployed(event: ChamberDeployedEvent): void {
  let entity = new ChamberDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.chamber = event.params.chamber
  entity.serial = event.params.serial
  entity.deployer = event.params.deployer
  entity.memberToken = event.params.memberToken
  entity.govToken = event.params.govToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  Chamber.create(event.params.chamber)
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

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangedGuard(event: ChangedGuardEvent): void {
  let entity = new ChangedGuard(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guard = event.params.guard
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

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
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

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
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

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
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

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
  entity.target = changetype<Bytes[]>(event.params.target)
  entity.value = event.params.value
  entity.data = event.params.data
  entity.voters = event.params.voters
  entity.nonce = event.params.nonce
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

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
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

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
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

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
  entity.chamberAddress = changetype<Bytes>(event.transaction.to)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

