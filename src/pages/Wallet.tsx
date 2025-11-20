import { useState } from "react";
import {
  BinIcon,
  DownIcon,
  MastercardIcon,
  TickLightIcon,
  VISAIcon,
} from "../assets/Icons";
import MomoIcon from "../assets/MomoIcon.png";
import type { Transaction } from "../types";
import { transactions } from "../api/mock/Transactions";
import TransactionDetails from "../components/TransactionDetails";

function Wallet() {
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [showPaymentDetails, setShowPaymentDetails] = useState<boolean>(false);

  const paymentMethods = [
    {
      id: "visa",
      label: "**** **** **** 5633",
      icon: <VISAIcon />,
    },
    {
      id: "momo",
      label: "055 289 2433",
      icon: <img src={MomoIcon} className="h-8 w-10" alt="momo" />,
    },
    {
      id: "master",
      label: "**** **** **** 5633",
      icon: <MastercardIcon />,
    },
  ];

  return (
    <div className="h-full w-full  max-lg:h-[93vh]">
      <div className="w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="bg-white rounded-3xl p-4 lg:h-[85vh] max-lg:hidden">
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
                    {selectedMethod === m.id && <TickLightIcon />}
                    <BinIcon className="h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <lg */}
          <div className="lg:hidden relative">
            
            <button
              className="w-full flex items-center gap-5 p-4 bg-white"
              onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            >
              <h2 className=" text-lg font-semibold inline">Payment details</h2>
              <DownIcon
                className={`inline transition-transform ${
                  showPaymentDetails ? "rotate-180" : ""
                }`}
              />
            </button>

            {showPaymentDetails && (
              <>
                <div
                  className="fixed inset-0 bg-black/30 z-10"
                  onClick={() => setShowPaymentDetails(false)}
                />

                <div className="fixed w-full bg-white p-4 max-h-[85vh] overflow-y-auto z-20 shadow-sm">
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
                          {selectedMethod === m.id && <TickLightIcon />}
                          <BinIcon className="h-5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-white  lg:rounded-3xl p-4 max-lg:mb-5 lg:h-[85vh] max-lg:h-[85vh]">
            <div className="w-full h-full overflow-hidden no-scrollbar">
              <div className="flex justify-between items-center">
                <h2 className="text-sm max-lg:text-lg font-semibold">
                  Transactions
                </h2>
                <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm">
                  <p className="inline text-sm">Show All</p>
                  <DownIcon />
                </button>
              </div>

              <div className="mt-4 space-y-5 h-full overflow-y-auto no-scrollbar text-sm">
                {transactions.map((t: Transaction, index: number) => (
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

          <div className="bg-white rounded-3xl px-6 py-10 flex flex-col justify-cnter lg:h-[85vh] max-lg:hidden">
            {selectedTransaction ? (
              <>
                <TransactionDetails selectedTransaction={selectedTransaction} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
              </>
            ) : (
              <div className="text-center text-gray-500 py-20">
                Select a transaction to view details
              </div>
            )}
          </div>
          {selectedTransaction && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-40"
                onClick={() => setSelectedTransaction(null)}
              />
              <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-4 max-h-[90vh] overflow-y-auto no-scrollbar shadow-lg animate-slide-up">
                <TransactionDetails
                  selectedTransaction={selectedTransaction}
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Wallet;
