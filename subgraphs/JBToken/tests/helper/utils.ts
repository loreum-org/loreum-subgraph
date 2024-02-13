import { Address, BigInt, Bytes, ethereum, Wrapped } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import {
    Approval,
    Transfer
} from "../../generated/Token/Token"

const addressEventParam = (key: string, value: string): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromAddress(Address.fromString(value)));

const uintEventParam = (key: string, value: i32): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(value)));


export function createApprovalEvent(
    owner: string,
    spender: string,
    value: i32
) : Approval {
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
    approvalEvent.parameters.push(addressEventParam("owner",owner))
    approvalEvent.parameters.push(addressEventParam("spender",spender))
    approvalEvent.parameters.push(uintEventParam("value",value))
    return approvalEvent;
}

export function createTransferEvent(
    from: string,
    to: string,
    value: i32
) : Transfer {
    const mockEvent = newMockEvent();
    const transferEvent = new Transfer(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    transferEvent.parameters.push(addressEventParam("from",from))
    transferEvent.parameters.push(addressEventParam("to",to))
    transferEvent.parameters.push(uintEventParam("value",value))

    return transferEvent
}