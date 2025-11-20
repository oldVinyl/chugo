import { useEffect, useState } from "react";
import { AddIcon, BackIcon, CediIcon, ForwardIcon } from "../assets/Icons";
import { orders } from "../api/mock/Orders";
import { menuItems } from "../api/mock/MenuItems";
import type { MenuItem, Order } from "../types";
import { OrderDetails } from "../components/OrderDetails";
import { Refund } from "../components/Refund";

const orderCategories = (() => {
  const map = new Map<string, number>();

  orders.forEach((order) => {
    order.menu.forEach((item) => {
      map.set(item.menuItem.name, (map.get(item.menuItem.name) || 0) + 1);
    });
  });

  return Array.from(map, ([name, count]) => ({ name, count }));
})();

function formatOrderTime(time: Date | string) {
  const t = new Date(time);
  const diff = (Date.now() - t.getTime()) / 1000; // seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [basket, setBasket] = useState<MenuItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders[0] ?? null,
  );
  const [isRefunding, setIsRefunding] = useState(false);

  const handleAddToBasket = (item: MenuItem) => {
    setBasket((prev) => [...prev, item]);
    console.log("Basket:", [...basket, item]);
  };

  useEffect(() => {
    const container = document.getElementById("order-scroll");
    if (!container) return;

    const handler = () => {
      setShowLeftScroll(container.scrollLeft > 0);
    };

    container.addEventListener("scroll", handler);
    handler(); // initialize on mount

    return () => container.removeEventListener("scroll", handler);
  }, []);

  const filteredOrders = selectedCategory
    ? orders.filter((order) =>
        order.menu.some((item) => item.menuItem.name === selectedCategory),
      )
    : orders;

  return (
    <div className="h-full w-full">
      <div className="w-full flex gap-2 h-full">
        <div className="w-3/5 h-full flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <div className="relative rounded-3xl w-full min-h-1/3 p-2 bg-white flex flex-col gap-2 pr-8">
            {showLeftScroll && (
              <button
                className="absolute left-3 top-1/2 hover:scale-95 transition z-10 bg-white p-2 rounded-full"
                onClick={() => {
                  const container = document.getElementById("order-scroll");
                  if (container)
                    container.scrollBy({ left: -220, behavior: "smooth" });
                }}
              >
                <BackIcon />
              </button>
            )}
            <button
              className="absolute right-3 top-1/2 hover:scale-95 transition z-10"
              onClick={() => {
                const container = document.getElementById("order-scroll");
                if (container)
                  container.scrollBy({ left: 220, behavior: "smooth" });
              }}
            >
              <ForwardIcon />
            </button>

            <div className="flex gap-3 items-center">
              <p className="whitespace-nowrap">Order Line</p>

              <div className="flex gap-2 justify-start items-center overflow-auto no-scrollbar">
                <div
                  onClick={() => setSelectedCategory(null)}
                  className={`px-2 py-1 rounded-full text-xs inline-flex justify-center items-center gap-2 cursor-pointer 
                    ${selectedCategory === null ? "bg-gray-300" : "bg-[var(--bg)]"}`}
                >
                  <p className="inline whitespace-nowrap">Show All</p>
                  <div
                    className={`rounded-full h-5 w-5 flex items-center justify-center
                    ${selectedCategory === null ? "bg-black text-white" : "bg-black text-white"}`}
                  >
                    <p>{orders.length}</p>
                  </div>
                </div>

                {orderCategories.map((cat) => {
                  const active = selectedCategory === cat.name;
                  return (
                    <div
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-2 py-1 rounded-full text-xs inline-flex justify-center items-center gap-2 cursor-pointer
                        ${active ? "bg-gray-300" : "bg-[var(--bg)]"}`}
                    >
                      <p className="inline whitespace-nowrap">{cat.name}</p>

                      <div
                        className={`rounded-full h-5 w-5 flex items-center justify-center
                        ${active ? "bg-black text-white" : "bg-[var(--green)] text-black"}`}
                      >
                        <p>{cat.count}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full overflow-hidden">
              <div
                id="order-scroll"
                className="w-full flex flex-row gap-2 pt-3 overflow-x-auto no-scrollbar scroll-smooth"
              >
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[var(--bg)] p-2 w-[40vw] max-w-[195px] min-w-[150px] h-[185px] rounded-3xl flex flex-col items-center justify-center flex-shrink-0 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-sm md:text-base">{order.name}</p>
                      <p className="text-sm md:text-base">
                        Order #{order.orderId}
                      </p>

                      <p className="text-[10px] text-gray-400 py-0.5">
                        {formatOrderTime(order.time)}
                      </p>
                    </div>

                    <div>
                      <img
                        className="h-[100px]"
                        src={order.image}
                        alt={order.name}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-3xl min-h-2/3 w-full bg-white p-2 flex flex-col gap-2">
            <div>
              <div className="px-6 flex items-center justify-between">
                <p>Food Menu</p>

                <div className="flex gap-2">
                  <button
                    className="bg-[var(--bg)] p-2 rounded-full hover:scale-95 transition"
                    onClick={() => {
                      const box = document.getElementById("food-scroll");
                      if (box) box.scrollBy({ left: -220, behavior: "smooth" });
                    }}
                  >
                    <BackIcon />
                  </button>

                  <button
                    className="bg-[var(--bg)] p-2 rounded-full hover:scale-95 transition"
                    onClick={() => {
                      const box = document.getElementById("food-scroll");
                      if (box) box.scrollBy({ left: 220, behavior: "smooth" });
                    }}
                  >
                    <ForwardIcon />
                  </button>
                </div>
              </div>

              <div className="w-full overflow-hidden">
                <div
                  id="food-scroll"
                  className="w-full grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto no-scrollbar scroll-smooth px-6 py-3"
                >
                  {menuItems.map((item) => {
                    const priceCedi = (item.pricePes / 100).toFixed(2);
                    const discountPrice = item.discountPerc
                      ? (
                          (item.pricePes * (1 - item.discountPerc / 100)) /
                          100
                        ).toFixed(2)
                      : null;

                    return (
                      <div
                        key={item.id}
                        className="relative bg-[var(--bg)] p-2 w-[40vw] max-w-[200px] min-w-[150px] h-[40vw] min-h-full max-h-[200px] rounded-3xl flex flex-col items-center justify-center flex-shrink-0"
                      >
                        <div
                          className="absolute bottom-2 right-2"
                          onClick={() => handleAddToBasket(item)}
                        >
                          <AddIcon className="hover:scale-95 hover:opacity-85 active:105 transition cursor-pointer" />
                        </div>

                        <div>
                          <img
                            className="h-[100px]"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm md:text-base px-10 text-center">
                            {item.name}
                          </p>

                          <p className="text-sm md:text-base flex items-center justify-center text-gray-500">
                            <span>
                              <CediIcon className="inline h-2 w-2 text-gray-300" />
                            </span>
                            <span className="text-xs">
                              {discountPrice ?? priceCedi}
                            </span>
                          </p>

                          <p className="text-sm md:text-base flex gap-1 items-center justify-center text-gray-500">
                            {discountPrice && (
                              <>
                                <CediIcon className="inline h-2 w-2 text-gray-300" />
                                <s className="text-xs text-str">{priceCedi}</s>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 max-h-screen rounded-3xl bg-white h-full p-2 flex flex-col items-center justify-evenly overflow-y-auto gap-2 pb-4 no-scrollbar">
          {selectedOrder ? (
            isRefunding ? (
              <Refund
                order={selectedOrder}
                onBack={() => setIsRefunding(false)}
              />
            ) : (
              <OrderDetails
                onRefund={() => setIsRefunding(true)}
                order={selectedOrder}
              />
            )
          ) : (
            <p className="text-gray-500 text-center text-lg mt-10">
              lease select an order
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
