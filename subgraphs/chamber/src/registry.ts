import { createId } from "../../../helpers/utils"
import {
    ChamberDeployed as ChamberDeployedEvent,
    OwnershipTransferred as OwnershipTransferredEvent
  } from "../generated/Registry/Registry"
  import {
    ChamberDeployed,
    OwnershipTransferred
  } from "../generated/schema"

  import { Chamber } from "../generated/templates"
  
  export function handleChamberDeployed(event: ChamberDeployedEvent): void {
    const id = createId(event.transaction.hash, event.logIndex);
    const chamberDeployedTx = new ChamberDeployed(id);
    chamberDeployedTx.chamber = event.params.chamber
    chamberDeployedTx.serial = event.params.serial
    chamberDeployedTx.deployer = event.params.deployer
    chamberDeployedTx.memberToken = event.params.memberToken
    chamberDeployedTx.govToken = event.params.govToken

    chamberDeployedTx.blockNumber = event.block.number
    chamberDeployedTx.blockTimestamp = event.block.timestamp
    chamberDeployedTx.transactionHash = event.transaction.hash

    chamberDeployedTx.save()
    
    Chamber.create(event.params.chamber)
  }
  
  export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
    const id = createId(event.transaction.hash, event.logIndex);
    const ownershipTransferredTx = new OwnershipTransferred(id);
    ownershipTransferredTx.previousOwner = event.params.previousOwner
    ownershipTransferredTx.newOwner = event.params.newOwner
  
    ownershipTransferredTx.blockNumber = event.block.number
    ownershipTransferredTx.blockTimestamp = event.block.timestamp
    ownershipTransferredTx.transactionHash = event.transaction.hash
  
    ownershipTransferredTx.save()
  }
  