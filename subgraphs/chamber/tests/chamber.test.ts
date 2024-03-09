import { describe, test } from "matchstick-as";

import {
  ChangedGuard,
  Demotion,
  Initialized,
  Promotion,
  ApprovedProposal,
  // CreatedProposal,
  ExecutedProposal,
  CanceledProposal,
  ReceivedEther,
  ReceivedFallback,
} from "../generated/templates/Chamber/Chamber";

import {
  handleChangedGuard,
  handleDemotion,
  handleInitialized,
  handlePromotion,
  handleApprovedProposal,
  // handleCreatedProposal,
  handleExecutedProposal,
  handleCanceledProposal,
  handleReceivedEther,
  handleReceivedFallback,
} from "../src/chamber";

import {
  createChangedGuardEvent,
  createDemotionEvent,
  createInitializedEvent,
  createPromotionEvent,
  createApprovedProposalEvent,
  // createCreatedProposalEvent,
  createExecutedProposalEvent,
  createCanceledProposalEvent,
  createReceivedEtherEvent,
  createReceivedFallbackEvent,
} from "./helpers/utils";

import {
  expectChangedGuardAdded,
  expectDemotionAdded,
  expectInitializedAdded,
  expectPromotionAdded,
  expectApprovedProposalAdded,
  // expectCreatedProposalAdded,
  expectExecutedProposalAdded,
  expectCanceledProposalAdded,
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

  describe("Test Demotion", () => {
    const createMockDemotionEvent = (
      demoter: string = "0x8e1aa1674d9fc9f0dca4a4d31db85e65d216666c",
      amt: i32 = 100,
      tokenId: i32 = 1
    ): Demotion => {
      const event = createDemotionEvent(demoter, amt, tokenId);
      return event;
    };
    test("Handel Demotion Tx", () => {
      const event = createMockDemotionEvent();
      handleDemotion(event);
      expectDemotionAdded(event);
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

  describe("Test Promotion", () => {
    const createMockPromotionEvent = (
      promoter: string = "0x8e1aa1674d9fc9f0dca4a4d31db85e65d216666c",
      amt: i32 = 100,
      tokenId: i32 = 1
    ): Promotion => {
      const event = createPromotionEvent(promoter, amt, tokenId);
      return event;
    };
    test("Handel Promotion Tx", () => {
      const event = createMockPromotionEvent();
      handlePromotion(event);
      expectPromotionAdded(event);
    });
  });

  describe("Test ApprovedProposal", () => {
    const createMockApprovedProposalEvent = (
      proposalId: i32 = 1,
      tokenId: i32 = 1,
      approvals: i32 = 1
    ): ApprovedProposal => {
      const event = createApprovedProposalEvent(proposalId, tokenId, approvals);
      return event;
    };
    test("Handel ApprovedProposal Tx", () => {
      const event = createMockApprovedProposalEvent();
      handleApprovedProposal(event);
      expectApprovedProposalAdded(event);
    });
  });

  // describe ("Test CreatedProposal", () => {
  //     const createMockCreatedProposalEvent = (
  //         proposalId: i32 = 1,
  //         target: string[] = ['0x2e0049b05217290087BA613290BaCC761d7adD04','0x8E1aA1674D9Fc9f0dca4a4D31db85E65D216666c'] ,
  //         value: i32[] = [1,1],
  //         data: string[] = ['',''],
  //         voters: i32[] = [1,2,3,4,5],
  //         nonce: i32 = 1,
  //     ) : CreatedProposal => {
  //         const event = createCreatedProposalEvent(
  //             proposalId,
  //             target,
  //             value,
  //             data,
  //             voters,
  //             nonce,
  //         );
  //         return event;
  //     };
  //     test ("Handel CreatedProposal Tx", () => {
  //         const event = createMockCreatedProposalEvent();
  //         handleCreatedProposal(event);
  //         expectCreatedProposalAdded(event);
  //     })
  // })

  describe("Test ExecutedProposal", () => {
    const createMockExecutedProposalEvent = (proposalId: i32 = 1): ExecutedProposal => {
      const event = createExecutedProposalEvent(proposalId);
      return event;
    };
    test("Handel ExecutedProposal Tx", () => {
      const event = createMockExecutedProposalEvent();
      handleExecutedProposal(event);
      expectExecutedProposalAdded(event);
    });
  });

  describe("Test CanceledProposal", () => {
    const createMockCanceledProposalEvent = (proposalId: i32 = 1): CanceledProposal => {
      const event = createCanceledProposalEvent(proposalId);
      return event;
    };
    test("Handel CanceledProposal Tx", () => {
      const event = createMockCanceledProposalEvent();
      handleCanceledProposal(event);
      expectCanceledProposalAdded(event);
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
