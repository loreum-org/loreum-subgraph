import { Address, BigInt, Bytes, ethereum, Wrapped } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

import { 
    ChamberDeployed,  
    OwnershipTransferred,
} from "../../generated/Registry/Registry"

import {
    ChangedGuard,
    Demoted,
    Initialized,
    Promoted,
    ProposalApproved,
    ProposalCreated,
    ProposalExecuted,
    ReceivedEther,
    ReceivedFallback,
} from "../../generated/templates/Chamber/Chamber"


const addressEventParam = (key: string, value: string): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromAddress(Address.fromString(value)));

const uintEventParam = (key: string, value: i32): ethereum.EventParam =>
  new ethereum.EventParam(key, ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(value)));

export function createChamberDeployedEvent(
    chamber: string,
    serial: i32,
    deployer: string,
    memberToken: string,
    govToken: string,
): ChamberDeployed {
    const mockEvent = newMockEvent();
    const chamberDeployedEvent = new ChamberDeployed(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    chamberDeployedEvent.parameters.push(addressEventParam("chamber",chamber))
    chamberDeployedEvent.parameters.push(uintEventParam("serial",serial))
    chamberDeployedEvent.parameters.push(addressEventParam("deployer",deployer))
    chamberDeployedEvent.parameters.push(addressEventParam("memberToken", memberToken))
    chamberDeployedEvent.parameters.push(addressEventParam("govToken",govToken))
    return chamberDeployedEvent;
}

export function createOwnershipTransferredEvent (
    previousOwner: string,
    newOwner: string,
): OwnershipTransferred {
    const mockEvent = newMockEvent();
    const ownershipTransferredEvent = new OwnershipTransferred (
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    ownershipTransferredEvent.parameters.push(addressEventParam("previousOwner",previousOwner));
    ownershipTransferredEvent.parameters.push(addressEventParam("newOwner",newOwner));
    return ownershipTransferredEvent;
}

export function createChangedGuardEvent (
    guard: string,
) : ChangedGuard {
    const mockEvent = newMockEvent();
    const changedGuardEvent = new ChangedGuard (
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    changedGuardEvent.parameters.push(addressEventParam("guard",guard));
    return changedGuardEvent;
}

export function createDemotedEvent (
    demoter : string,
    amt : i32,
    tokenId : i32,
) : Demoted {
    const mockEvent = newMockEvent();
    const demotedEvent = new Demoted (
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    demotedEvent.parameters.push(addressEventParam("demoter",demoter));
    demotedEvent.parameters.push(uintEventParam("amt",amt));
    demotedEvent.parameters.push(uintEventParam("tokenId",tokenId));
    return demotedEvent;
}

export function createInitializedEvent (
    version: i32,
) : Initialized {
    const mockEvent = newMockEvent();
    const initializedEvent = new Initialized (
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    initializedEvent.parameters.push(uintEventParam("version",version));
    return initializedEvent;
}

export function createPromotedEvent (
    promoter : string,
    amt : i32,
    tokenId : i32,
) : Promoted {
    const mockEvent = newMockEvent();
    const promotedEvent = new Promoted (
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    promotedEvent.parameters.push(addressEventParam("demoter",promoter));
    promotedEvent.parameters.push(uintEventParam("amt",amt));
    promotedEvent.parameters.push(uintEventParam("tokenId",tokenId));
    return promotedEvent;
}

export function createProposalApprovedEvent(
    proposalId: i32,
    tokenId: i32,
    approvals: i32,
) : ProposalApproved {
    const mockEvent = newMockEvent();
    const proposalApprovedEvent = new ProposalApproved(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    proposalApprovedEvent.parameters.push(uintEventParam("proposalId",proposalId));
    proposalApprovedEvent.parameters.push(uintEventParam("tokenId",tokenId));
    proposalApprovedEvent.parameters.push(uintEventParam("approvals",approvals));
    return proposalApprovedEvent;
}

export function createProposalCreatedEvent(
    proposalId: i32 ,
    target: string[],
    value: i32[],
    data: string[],
    voters: i32[],
    nonce: i32 ,
) : ProposalCreated {
    const mockEvent = newMockEvent();
    const proposalCreatedEvent = new ProposalCreated (
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    proposalCreatedEvent.parameters.push(uintEventParam("proposalId",proposalId));
    proposalCreatedEvent.parameters.push((new ethereum.EventParam("target", ethereum.Value.fromAddressArray(changetype<Bytes[]>(target)))));
    proposalCreatedEvent.parameters.push((new ethereum.EventParam("value", ethereum.Value.fromI32Array(value))));
    proposalCreatedEvent.parameters.push((new ethereum.EventParam("data", ethereum.Value.fromStringArray(data))));
    proposalCreatedEvent.parameters.push((new ethereum.EventParam("voters", ethereum.Value.fromI32Array(voters))));
    proposalCreatedEvent.parameters.push(uintEventParam("nonce",nonce));
    return proposalCreatedEvent
}

export function createProposalExecutedEvent(
    proposalId: i32,
) : ProposalExecuted {
    const mockEvent = newMockEvent();
    const proposalExecutedEvent = new ProposalExecuted(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    proposalExecutedEvent.parameters.push(uintEventParam("proposalId",proposalId));
    return proposalExecutedEvent;
}

export function createReceivedEtherEvent(
    sender: string,
    value: i32,
) : ReceivedEther {
    const mockEvent = newMockEvent();
    const receivedEtherEvent = new ReceivedEther(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    receivedEtherEvent.parameters.push(addressEventParam("sender",sender));
    receivedEtherEvent.parameters.push(uintEventParam("value",value));
    return receivedEtherEvent;
}

export function createReceivedFallbackEvent(
    sender: string,
    value: i32,
) : ReceivedFallback {
    const mockEvent = newMockEvent();
    const receivedFallbackEvent = new ReceivedFallback(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        [],
        mockEvent.receipt
    );
    receivedFallbackEvent.parameters.push(addressEventParam("sender",sender));
    receivedFallbackEvent.parameters.push(uintEventParam("value",value));
    return receivedFallbackEvent;
}