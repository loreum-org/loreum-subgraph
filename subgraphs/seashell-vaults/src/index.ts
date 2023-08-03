import { TransferTx } from "../generated/schema";
import { Transfer } from "../generated/GLPLeveragedVault/GLPLeveragedVault";
import { createId } from "../../../helpers/utils";

export function handleTransfer(event: Transfer): void {
  const id = createId(event.transaction.hash, event.logIndex);
  const transferTx: TransferTx = new TransferTx(id);

  transferTx.contract = event.address;
  transferTx.from = event.params.from;
  transferTx.to = event.params.to;
  transferTx.value = event.params.value;
  transferTx.timestamp = event.block.timestamp;
  transferTx.save();
}
