import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Approval, Transfer } from "../generated/Token/Token"
import { handleTransfer } from "../src/token"

const addressEventParam = (key: string, value: string): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromAddress(Address.fromString(value)));

const uintEventParam = (key: string, value: i32): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(value)));



export function createApprovalEvent(owner: string, approved: string, tokenId: i32): Approval {
  const mockEvent = newMockEvent();
  const approvalEvent = new Approval(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    [],
    mockEvent.receipt
  );
  approvalEvent.parameters.push(addressEventParam("owner", owner));
  approvalEvent.parameters.push(addressEventParam("approved", approved));
  approvalEvent.parameters.push(uintEventParam("tokenId", tokenId));
  return approvalEvent;
}

export function createTransferEvent(
  from: string,
  to: string,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(changetype<Address>(from)))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(changetype<Address>(to)))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}