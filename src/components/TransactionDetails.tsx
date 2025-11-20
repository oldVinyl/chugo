import { WalletIcon, CardIcon, TickDarkIcon } from "../assets/Icons"; 
import type { Transaction } from "../types";

function TransactionDetails({
  selectedTransaction,
  selectedPayment,
  setSelectedPayment,
}: {
  selectedTransaction: Transaction;
  selectedPayment: "cash" | "card" | string | null;
  setSelectedPayment: (value: "cash" | "card") => void;
}) {
  return (
    <div>
      <div className="space-y-1 text-lg flex flex-col">
        <div className="flex justify-between gap-20 text-gray-600">
          <p className="text-right w-full">Tax</p>
          <p className="text-left w-full">{selectedTransaction.taxPerc.toFixed(2)}</p>
        </div>

        <div className="flex justify-between gap-20 text-gray-600">
          <p className="text-right w-full">Expenses</p>
          <p className="text-left w-full">{selectedTransaction.expensesPes.toFixed(2)}</p>
        </div>

        <div className="flex justify-between gap-20 text-gray-600">
          <p className="text-right w-full">Orders</p>
          <p className="text-left w-full">{selectedTransaction.ordersPes.toFixed(2)}</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="text-center">
        <p className="text-gray-500 text-lg">Net Total(₵)</p>
        <p className="text-4xl font-semibold mt-1">{selectedTransaction.amount.toFixed(2)}</p>
      </div>

      <div className="w-full mt-4">
        <div className="bg-[var(--bg)] h-full rounded-2xl grid grid-cols-2 w-full items-center justify-evenly p-4 gap-4">
          <div
            onClick={() => setSelectedPayment("cash")}
            className="relative bg-white py-4 h-full w-full rounded-2xl px-4 flex items-center justify-center flex-col cursor-pointer"
          >
            <WalletIcon className="h-10 w-10" />
            <p>Cash</p>
            {selectedPayment === "cash" && <TickDarkIcon className="absolute top-3 right-3" />}
          </div>

          <div
            onClick={() => setSelectedPayment("card")}
            className="relative bg-white flex py-4 h-full w-full rounded-2xl px-4 items-center justify-center flex-col cursor-pointer"
          >
            <CardIcon className="w-10 h-10" />
            <p>Card</p>
            {selectedPayment === "card" && <TickDarkIcon className="absolute top-3 right-3" />}
          </div>
        </div>
      </div>

      <button className="mt-3 bg-black text-white flex items-center justify-center gap-6 py-4 max-lg:py-5 rounded-2xl w-full hover:scale-95 active:scale-105 hover:opacity-85 transition">
        <div className="bg-white p-1 max-lg:p-2 rounded-full">
          <WalletIcon className="h-7 max-lg:h-12" />
        </div>
        <p className="inline text-lg max-lg:text-2xl">Make payment</p>
      </button>
    </div>
  );
}

export default TransactionDetails;
