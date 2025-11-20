import { useState } from "react";
import {
  CediIcon,
  TickDoubleIcon,
  WalletIcon,
  CardIcon,
  TickDarkIcon,
  PrintIcon,
  RefundIcon,
} from "../assets/Icons";
import type { Order } from "../types";

interface OrderDetailsProps {
  order: Order;
  onRefund?: () => void;
}
export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onRefund,
}) => {
  const [selected, setSelected] = useState<"cash" | "card">(
    order.modeOfPayment,
  );

  const totalPaid =
    (order.paymentSummary.subtotalPes +
      order.paymentSummary.taxPes +
      order.paymentSummary.serviceFeePes) /
    100;

  return (
    <div className="w-full max-h-screen rounded-3xl bg-white h-full p-2 flex flex-col items-center gap-2">
      <div className="relative w-full">
        <div className="absolute top-6 right-6">
          <TickDoubleIcon />
        </div>
        <div className="bg-[var(--bg)] rounded-3xl p-2 flex flex-col gap-1">
          <div>
            <p>
              <span className="font-medium text-[2vw]">#{order.id}</span>
              &nbsp;
              <span className="text-[1.5vw]">Order #{order.orderId}</span>
            </p>
            <p className="text-[1.3vw]">{order.name}</p>
          </div>

          <div className="bg-white rounded-2xl py-1 px-4">
            <p>Ordered Items ({order.menu.length})</p>
            <div className="pl-2 pt-2">
              {order.menu.map((item, idx) => {
                const priceCedi = item.menuItem.discountPerc
                  ? (item.menuItem.pricePes *
                      (1 - item.menuItem.discountPerc / 100)) /
                    100
                  : item.menuItem.pricePes / 100;

                return (
                  <p key={idx} className="flex justify-between">
                    <span>
                      <span>{item.quantity}x</span>
                      <span> {item.menuItem.name}</span>
                    </span>
                    <span className="flex items-center justify-center">
                      <CediIcon className="inline h-3" />
                      <span>
                        &nbsp;{(priceCedi * item.quantity).toFixed(2)}
                      </span>
                    </span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl py-1 px-4">
            <p>Payment Summary</p>
            <div className="pl-2 pt-2">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span className="flex items-center justify-center">
                  <CediIcon className="inline h-3" />
                  <span>
                    &nbsp;{(order.paymentSummary.subtotalPes / 100).toFixed(2)}
                  </span>
                </span>
              </p>
              <p className="flex justify-between">
                <span>Tax</span>
                <span className="flex items-center justify-center">
                  <CediIcon className="inline h-3" />
                  <span>
                    &nbsp;{(order.paymentSummary.taxPes / 100).toFixed(2)}
                  </span>
                </span>
              </p>
              <p className="flex justify-between">
                <span>Service Fee</span>
                <span className="flex items-center justify-center">
                  <CediIcon className="inline h-3" />
                  <span>
                    &nbsp;
                    {(order.paymentSummary.serviceFeePes / 100).toFixed(2)}
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <p className="inline">
              <span>Total Paid: </span>
              <span className="inline-flex items-center justify-center">
                <CediIcon className="inline h-3" />
                <span>&nbsp;{totalPaid.toFixed(2)}</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-1/3">
        <div className="bg-[var(--bg)] h-full rounded-2xl grid grid-cols-2 w-full items-center justify-evenly p-4 gap-4">
          <div
            onClick={() => setSelected("cash")}
            className="relative bg-white h-full w-full rounded-2xl p-2 flex items-center justify-center flex-col cursor-pointer"
          >
            <WalletIcon className="h-10 w-10" />
            <p>Cash</p>
            {selected === "cash" && (
              <TickDarkIcon className="absolute top-3 right-3" />
            )}
          </div>

          <div
            onClick={() => setSelected("card")}
            className="relative bg-white flex h-full w-full rounded-2xl p-2 items-center justify-center flex-col cursor-pointer"
          >
            <CardIcon className="w-10 h-10" />
            <p>Card</p>
            {selected === "card" && (
              <TickDarkIcon className="absolute top-3 right-3" />
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="h-full w-full flex items-center justify-evenly gap-10">
          <button className="bg-black w-full rounded-xl h-full p-2 flex gap-3 items-center hover:scale-95 hover:bg-gray-900 active:scale-105 transition">
            <div className="bg-gray-300 rounded-full p-2">
              <PrintIcon className="h-5 w-5" />
            </div>
            <p className="text-white">Print Reciept</p>
          </button>
          <button
            className="bg-black w-full rounded-xl h-full p-2 flex gap-3 items-center hover:scale-95 hover:bg-gray-900 active:scale-105 transition"
            onClick={onRefund}
          >
            <div className="bg-gray-300 rounded-full p-2">
              <RefundIcon className="h-5 w-5" />
            </div>
            <p className="text-white">Make Refund</p>
          </button>
        </div>
      </div>
    </div>
  );
};
