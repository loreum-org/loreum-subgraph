import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ChamberDeployed,
  Initialized,
  OwnershipTransferred
} from "../generated/MultiProxy/MultiProxy"

export function createChamberDeployedEvent(
  chamber: Address,
  serial: BigInt,
  deployer: Address,
  memberToken: Address,
  govToken: Address
): ChamberDeployed {
  let chamberDeployedEvent = changetype<ChamberDeployed>(newMockEvent())

  chamberDeployedEvent.parameters = new Array()

  chamberDeployedEvent.parameters.push(
    new ethereum.EventParam("chamber", ethereum.Value.fromAddress(chamber))
  )
  chamberDeployedEvent.parameters.push(
    new ethereum.EventParam("serial", ethereum.Value.fromUnsignedBigInt(serial))
  )
  chamberDeployedEvent.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  )
  chamberDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "memberToken",
      ethereum.Value.fromAddress(memberToken)
    )
  )
  chamberDeployedEvent.parameters.push(
    new ethereum.EventParam("govToken", ethereum.Value.fromAddress(govToken))
  )

  return chamberDeployedEvent
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

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
