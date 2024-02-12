import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/Chamber/Chamber"

export function createChangedGuardEvent(guard: Address): ChangedGuard {
  let changedGuardEvent = changetype<ChangedGuard>(newMockEvent())

  changedGuardEvent.parameters = new Array()

  changedGuardEvent.parameters.push(
    new ethereum.EventParam("guard", ethereum.Value.fromAddress(guard))
  )

  return changedGuardEvent
}

export function createDemotedEvent(
  demoter: Address,
  amt: BigInt,
  tokenId: BigInt
): Demoted {
  let demotedEvent = changetype<Demoted>(newMockEvent())

  demotedEvent.parameters = new Array()

  demotedEvent.parameters.push(
    new ethereum.EventParam("demoter", ethereum.Value.fromAddress(demoter))
  )
  demotedEvent.parameters.push(
    new ethereum.EventParam("amt", ethereum.Value.fromUnsignedBigInt(amt))
  )
  demotedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return demotedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createPromotedEvent(
  promoter: Address,
  amt: BigInt,
  tokenId: BigInt
): Promoted {
  let promotedEvent = changetype<Promoted>(newMockEvent())

  promotedEvent.parameters = new Array()

  promotedEvent.parameters.push(
    new ethereum.EventParam("promoter", ethereum.Value.fromAddress(promoter))
  )
  promotedEvent.parameters.push(
    new ethereum.EventParam("amt", ethereum.Value.fromUnsignedBigInt(amt))
  )
  promotedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return promotedEvent
}

export function createProposalApprovedEvent(
  proposalId: BigInt,
  tokenId: BigInt,
  approvals: BigInt
): ProposalApproved {
  let proposalApprovedEvent = changetype<ProposalApproved>(newMockEvent())

  proposalApprovedEvent.parameters = new Array()

  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "approvals",
      ethereum.Value.fromUnsignedBigInt(approvals)
    )
  )

  return proposalApprovedEvent
}

export function createProposalCreatedEvent(
  proposalId: BigInt,
  target: Array<Address>,
  value: Array<BigInt>,
  data: Array<Bytes>,
  voters: Array<BigInt>,
  nonce: BigInt
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddressArray(target))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "value",
      ethereum.Value.fromUnsignedBigIntArray(value)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytesArray(data))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "voters",
      ethereum.Value.fromUnsignedBigIntArray(voters)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )

  return proposalCreatedEvent
}

export function createProposalExecutedEvent(
  proposalId: BigInt
): ProposalExecuted {
  let proposalExecutedEvent = changetype<ProposalExecuted>(newMockEvent())

  proposalExecutedEvent.parameters = new Array()

  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )

  return proposalExecutedEvent
}

export function createReceivedEtherEvent(
  sender: Address,
  value: BigInt
): ReceivedEther {
  let receivedEtherEvent = changetype<ReceivedEther>(newMockEvent())

  receivedEtherEvent.parameters = new Array()

  receivedEtherEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  receivedEtherEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return receivedEtherEvent
}

export function createReceivedFallbackEvent(
  sender: Address,
  value: BigInt
): ReceivedFallback {
  let receivedFallbackEvent = changetype<ReceivedFallback>(newMockEvent())

  receivedFallbackEvent.parameters = new Array()

  receivedFallbackEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  receivedFallbackEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return receivedFallbackEvent
}
