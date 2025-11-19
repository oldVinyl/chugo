import { useState } from "react";
import { BinIcon, CardIcon, DownIcon, MastercardIcon, TickDarkIcon, TickLightIcon, VISAIcon, WalletIcon } from "../assets/Icons";
import MomoIcon from "../assets/MomoIcon.png";
import type { Transaction } from "../types";
import { transactions } from "../api/mock/Transactions";

function Wallet() {
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);


  const paymentMethods = [
    {
      id: "visa",
      label: "**** **** **** 5633",
      icon: <VISAIcon />
    },
    {
      id: "momo",
      label: "055 289 2433",
      icon: <img src={MomoIcon} className="h-8 w-10" alt="momo" />
    },
    {
      id: "master",
      label: "**** **** **** 5633",
      icon: <MastercardIcon />
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="w-full h-full">
        <div className="p-2 grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* LEFT COLUMN */}
          <div className="bg-white rounded-3xl p-4 h-[85vh]">
            <h2 className="text-sm font-semibold">Payment details</h2>

            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl text-sm whitespace-nowrap">
                <span className="bg-[var(--acc)] text-black font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  +
                </span>
                Add Credit
              </button>

              <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl text-sm whitespace-nowrap">
                <span className="bg-[var(--acc)] text-black font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  +
                </span>
                Add Momo
              </button>
            </div>

            <p className="text-lg font-semibold mt-5">Payment method</p>

            <div className="mt-3 space-y-3">
              {paymentMethods.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between bg-gray-100 px-1.5 py-3 rounded-xl cursor-pointer"
                  onClick={() => setSelectedMethod(m.id)}
                >
                  <div className="flex items-center gap-3">
                    {m.icon}
                    <p className="text-sm whitespace-nowrap">{m.label}</p>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {selectedMethod === m.id && (
                      <TickLightIcon />
                    )}
                    <BinIcon className="h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="bg-white rounded-3xl p-4 h-[85vh]">
            <div className="w-full h-full overflow-hidden no-scrollbar">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold">Transactions</h2>
                <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm">
                  <p className="inline text-sm">Show All</p>
                  <DownIcon />
                </button>
              </div>

              <div className="mt-4 space-y-5 h-full overflow-y-auto text-sm">
                {transactions.map((t:Transaction, index:number) => (
                  <div 
                    className="transition hover:bg-gray-50 cursor-pointer rounded-xl p-0.5"
                    key={index}
                    onClick={() => setSelectedTransaction(t)}
                  >
                    <p className="font-semibold">
                      #{index + 1} – Payment id: {t.id}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Amount Paid into your wallet{" "}
                      <span className="font-semibold">
                        ₵{t.amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-white rounded-3xl p-6 flex flex-col justify-cnter h-[85vh]">

            {selectedTransaction ? (
              <>
                <div>
                  <div className="space-y-1 text-sm flex flex-col">
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
                    <p className="text-gray-500 text-sm">Net Total(₵)</p>
                    <p className="text-3xl font-semibold mt-1">
                      {selectedTransaction.amount.toFixed(2)}
                    </p>
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
                </div>

                <button className="mt-3 bg-black text-white flex items-center justify-center gap-6 py-4 rounded-2xl">
                  <div className="bg-white p-1 rounded-full">
                    <WalletIcon className="h-7" />
                  </div>
                  <p className="inline text-lg">
                    Make payment
                  </p>
                </button>
              </>
            ) : (
    <div className="text-center text-gray-500 py-20">
      Select a transaction to view details
    </div>
  )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Wallet;