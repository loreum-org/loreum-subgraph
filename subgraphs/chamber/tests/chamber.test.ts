import { describe, test } from "matchstick-as";

import {
  ChangedGuard,
  Demoted,
  Initialized,
  Promoted,
  ProposalApproved,
  // ProposalCreated,
  ProposalExecuted,
  ProposalCanceled,
  ReceivedEther,
  ReceivedFallback,
} from "../generated/templates/Chamber/Chamber";

import {
  handleChangedGuard,
  handleDemoted,
  handleInitialized,
  handlePromoted,
  handleProposalApproved,
  // handleProposalCreated,
  handleProposalExecuted,
  handleProposalCanceled,
  handleReceivedEther,
  handleReceivedFallback,
} from "../src/chamber";

import {
  createChangedGuardEvent,
  createDemotedEvent,
  createInitializedEvent,
  createPromotedEvent,
  createProposalApprovedEvent,
  // createProposalCreatedEvent,
  createProposalExecutedEvent,
  createProposalCanceledEvent,
  createReceivedEtherEvent,
  createReceivedFallbackEvent,
} from "./helpers/utils";

import {
  expectChangedGuardAdded,
  expectDemotedAdded,
  expectInitializedAdded,
  expectPromotedAdded,
  expectProposalApprovedAdded,
  // expectProposalCreatedAdded,
  expectProposalExecutedAdded,
  expectProposalCanceledAdded,
  expectReceivedEtherAdded,
  expectReceivedFallbackAdded,
} from "./helpers/assertions";

describe("Chamber Test", () => {
  describe("Test ChangedGuard", () => {
    const createMockChangedGuardEvent = (
      guard: string = "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf"
    ): ChangedGuard => {
      const event = createChangedGuardEvent(guard);
      return event;
    };
    test("Handel ChangedGuard Tx", () => {
      const event = createMockChangedGuardEvent();
      handleChangedGuard(event);
      expectChangedGuardAdded(event);
    });
  });

  describe("Test Demoted", () => {
    const createMockDemotedEvent = (
      demoter: string = "0x8e1aa1674d9fc9f0dca4a4d31db85e65d216666c",
      amt: i32 = 100,
      tokenId: i32 = 1
    ): Demoted => {
      const event = createDemotedEvent(demoter, amt, tokenId);
      return event;
    };
    test("Handel Demoted Tx", () => {
      const event = createMockDemotedEvent();
      handleDemoted(event);
      expectDemotedAdded(event);
    });
  });

  describe("Test Initialized", () => {
    const createMockInitializedEvent = (version: i32 = 1): Initialized => {
      const event = createInitializedEvent(version);
      return event;
    };
    test("Handel Initialized Tx", () => {
      const event = createMockInitializedEvent();
      handleInitialized(event);
      expectInitializedAdded(event);
    });
  });

  describe("Test Promoted", () => {
    const createMockPromotedEvent = (
      promoter: string = "0x8e1aa1674d9fc9f0dca4a4d31db85e65d216666c",
      amt: i32 = 100,
      tokenId: i32 = 1
    ): Promoted => {
      const event = createPromotedEvent(promoter, amt, tokenId);
      return event;
    };
    test("Handel Promoted Tx", () => {
      const event = createMockPromotedEvent();
      handlePromoted(event);
      expectPromotedAdded(event);
    });
  });

  describe("Test ProposalApproved", () => {
    const createMockProposalApprovedEvent = (
      proposalId: i32 = 1,
      tokenId: i32 = 1,
      approvals: i32 = 1
    ): ProposalApproved => {
      const event = createProposalApprovedEvent(proposalId, tokenId, approvals);
      return event;
    };
    test("Handel ProposalApproved Tx", () => {
      const event = createMockProposalApprovedEvent();
      handleProposalApproved(event);
      expectProposalApprovedAdded(event);
    });
  });

  // describe ("Test ProposalCreated", () => {
  //     const createMockProposalCreatedEvent = (
  //         proposalId: i32 = 1,
  //         target: string[] = ['0x2e0049b05217290087BA613290BaCC761d7adD04','0x8E1aA1674D9Fc9f0dca4a4D31db85E65D216666c'] ,
  //         value: i32[] = [1,1],
  //         data: string[] = ['',''],
  //         voters: i32[] = [1,2,3,4,5],
  //         nonce: i32 = 1,
  //     ) : ProposalCreated => {
  //         const event = createProposalCreatedEvent(
  //             proposalId,
  //             target,
  //             value,
  //             data,
  //             voters,
  //             nonce,
  //         );
  //         return event;
  //     };
  //     test ("Handel ProposalCreated Tx", () => {
  //         const event = createMockProposalCreatedEvent();
  //         handleProposalCreated(event);
  //         expectProposalCreatedAdded(event);
  //     })
  // })

  describe("Test ProposalExecuted", () => {
    const createMockProposalExecutedEvent = (proposalId: i32 = 1): ProposalExecuted => {
      const event = createProposalExecutedEvent(proposalId);
      return event;
    };
    test("Handel ProposalExecuted Tx", () => {
      const event = createMockProposalExecutedEvent();
      handleProposalExecuted(event);
      expectProposalExecutedAdded(event);
    });
  });

  describe("Test ProposalCanceled", () => {
    const createMockProposalCanceledEvent = (proposalId: i32 = 1): ProposalCanceled => {
      const event = createProposalCanceledEvent(proposalId);
      return event;
    };
    test("Handel ProposalCanceled Tx", () => {
      const event = createMockProposalCanceledEvent();
      handleProposalCanceled(event);
      expectProposalCanceledAdded(event);
    });
  });

  describe("Test ReceivedEther", () => {
    const createMockReceivedEtherEvent = (
      sender: string = "0x8E1aA1674D9Fc9f0dca4a4D31db85E65D216666c",
      value: i32 = 1000
    ): ReceivedEther => {
      const event = createReceivedEtherEvent(sender, value);
      return event;
    };
    test("Handel ReceivedEther Tx", () => {
      const event = createMockReceivedEtherEvent();
      handleReceivedEther(event);
      expectReceivedEtherAdded(event);
    });
  });

  describe("Test ReceivedFallback", () => {
    const createMockReceivedFallbackEvent = (
      sender: string = "0x8E1aA1674D9Fc9f0dca4a4D31db85E65D216666c",
      value: i32 = 1000
    ): ReceivedFallback => {
      const event = createReceivedFallbackEvent(sender, value);
      return event;
    };
    test("Handel ReceivedFallback Tx", () => {
      const event = createMockReceivedFallbackEvent();
      handleReceivedFallback(event);
      expectReceivedFallbackAdded(event);
    });
  });
});
