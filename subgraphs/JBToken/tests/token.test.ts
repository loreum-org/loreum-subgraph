import {
  describe,
  test,
} from "matchstick-as"

import { Approval, Transfer } from "../generated/Token/Token"

import { handleApproval, handleTransfer } from "../src/token"
import { createApprovalEvent , createTransferEvent} from "./helper/utils"
import { expectApprovalTxAdded, expectTransferTxAdded } from "./helper/assertions"

describe("Chamber",()=>{

  describe("Approval", () => {
    const createMockApprovalEvent = (
      owner: string = '0xbf960a7cadd3e58f7d5faaf3118d412a26fcb45a',
      spender: string = '0x89e9be103b6a3887da4887ab06fb21ad3112d030',
      value: i32 = 200,
    ): Approval => {
      const event = createApprovalEvent(owner, spender, value);
      return event;
    };
    test ("Handel Approval Tx", () => {
      const event = createMockApprovalEvent();
      handleApproval(event);
      expectApprovalTxAdded(event);
    })
  })

  describe("Transfer", () => {
    const createMockTransferEvent = (
      from: string = '0xbf960a7cadd3e58f7d5faaf3118d412a26fcb45a',
      to: string = '0x89e9be103b6a3887da4887ab06fb21ad3112d030',
      value: i32 = 200,
    ): Transfer => {
      const event = createTransferEvent(from, to, value);
      return event;
    };

    test("Handel Transfer Tx", () => {
      const event = createMockTransferEvent();
      handleTransfer(event);
      expectTransferTxAdded(event);
    })
  })
})

