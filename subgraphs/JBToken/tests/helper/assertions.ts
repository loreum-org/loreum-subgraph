import {
    Approval as ApprovalTx,
    Transfer as TransferTx
} from "../../generated/schema"

import {
    Approval,
    Transfer
} from "../../generated/Token/Token";

import { assert } from "matchstick-as";
import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { createId } from "../../../../helpers/utils";

export const expectApprovalTxAdded = (event: Approval): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const approvalTx = ApprovalTx.load(id);
    assert.assertNotNull(approvalTx);
    if (!approvalTx) return;
    assert.bytesEquals(event.params.owner, approvalTx.owner);
    assert.bytesEquals(event.params.spender, approvalTx.spender);
    assert.bigIntEquals(event.params.value, approvalTx.value);
};

export const expectTransferTxAdded = (event: Transfer): void => {
    const id = createId(event.transaction.hash, event.transactionLogIndex);
    const transferTx = TransferTx.load(id);
    assert.assertNotNull(transferTx);
    if (!transferTx) return;
    assert.bytesEquals(event.params.from, transferTx.from);
    assert.bytesEquals(event.params.to, transferTx.to);
    assert.bigIntEquals(event.params.value, transferTx.value);
}