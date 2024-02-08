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
