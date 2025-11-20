import { useState } from "react";
import {
  CediIcon,
  BackIcon,
  VISAIcon,
  TickLightIcon,
  RefundIcon,
} from "../assets/Icons";
import type { Order } from "../types";

interface RefundProps {
  order: Order;
  onBack: () => void;
}

export const Refund: React.FC<RefundProps> = ({ order, onBack }) => {
  const [refundQuantities, setRefundQuantities] = useState(
    order.menu.map(() => 0),
  );

  const refundTotal = order.menu.reduce((acc, item, idx) => {
    const priceCedi = item.menuItem.discountPerc
      ? (item.menuItem.pricePes * (1 - item.menuItem.discountPerc / 100)) / 100
      : item.menuItem.pricePes / 100;
    return acc + priceCedi * refundQuantities[idx];
  }, 0);

  return (
    <div className="w-full max-h-screen rounded-3xl bg-white h-full p-2 flex flex-col items-center gap-2">
      <div className="relative w-full">
        <div className="absolute top-6 right-6 cursor-pointer" onClick={onBack}>
          <BackIcon />
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

          <div className="bg-white rounded-2xl py-2 px-4">
            <p>Queue Order Refund</p>
            <div className="py-2 flex flex-col gap-2">
              {order.menu.map((item, idx) => {
                const priceCedi = item.menuItem.discountPerc
                  ? (item.menuItem.pricePes *
                      (1 - item.menuItem.discountPerc / 100)) /
                    100
                  : item.menuItem.pricePes / 100;

                return (
                  <p key={idx} className="flex justify-between items-center">
                    <span className="flex gap-1 items-center">
                      <input
                        type="number"
                        min={0}
                        max={item.quantity}
                        value={refundQuantities[idx]}
                        onChange={(e) => {
                          let val = parseInt(e.target.value);
                          if (isNaN(val)) val = 0;
                          if (val > item.quantity) val = item.quantity;
                          if (val < 0) val = 0;

                          setRefundQuantities((prev) => {
                            const newQuantities = [...prev];
                            newQuantities[idx] = val;
                            return newQuantities;
                          });
                        }}
                        className="w-10 h-8 text-center text-[1.25vw] border border-black rounded-lg p-0.5"
                      />
                      <span className="w-8 h-8 text-[1.25vw] text-center border rounded-lg p-0.5 flex items-center justify-center">
                        {item.quantity}x
                      </span>
                      <span className="text-[1.25vw] ml-1">
                        {item.menuItem.name}
                      </span>
                    </span>
                    <span className="flex items-center text-[1.25vw] justify-center">
                      <CediIcon className="inline h-2.5" />
                      <span>
                        &nbsp;{(priceCedi * refundQuantities[idx]).toFixed(2)}
                      </span>
                    </span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="py-1 px-4">
            <p>Payment Account</p>
            <div className="py-2 flex justify-center items-center">
              <div className="bg-white rounded-xl py-2 px-4 flex justify-between items-center w-full">
                <span>
                  <VISAIcon className="inline" />
                </span>
                <span>**** **** **** 5633</span>
                &nbsp;&nbsp;&nbsp;
                <span>
                  <TickLightIcon />
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-2 flex justify-end">
            <p className="inline">
              Refund amount: &nbsp;
              <span className="inline-flex items-center justify-center">
                <CediIcon className="inline h-3" />
                <span>{refundTotal.toFixed(2)}</span>
              </span>
            </p>
          </div>

          <div className="w-full flex justify-center mt-4">
            <button className="bg-black rounded-xl h-full p-2 flex gap-3 items-center hover:scale-95 hover:bg-gray-900 active:scale-105 transition">
              <div className="bg-white rounded-full p-2">
                <RefundIcon />
              </div>
              <span className="text-white">Pay Refund</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
