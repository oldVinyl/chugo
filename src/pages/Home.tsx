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
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [basket, setBasket] = useState<MenuItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders[0] ?? null,
  );
  const [mobileSelectedOrder, setMobileSelectedOrder] = useState<Order | null>(null);

  const [isRefunding, setIsRefunding] = useState(false);

  const handleAddToBasket = (item: MenuItem) => {
    setBasket((prev) => [...prev, item]);
    console.log("Basket:", [...basket, item]);
  };

  useEffect(() => {
    const container = document.getElementById("order-scroll");
    if (!container) return;

    const handler = () => {
      const atLeft = container.scrollLeft <= 0;
      const atRight =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

      setShowLeftScroll(!atLeft);
      setShowRightScroll(!atRight);
    };

    container.addEventListener("scroll", handler);

    const resizeObserver = new ResizeObserver(handler);
    resizeObserver.observe(container);

    Array.from(container.children).forEach((child) =>
      resizeObserver.observe(child)
    );

    requestAnimationFrame(handler);

    return () => {
      container.removeEventListener("scroll", handler);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = document.getElementById("order-scroll");
    if (!container) return;

    requestAnimationFrame(() => {
      const atLeft = container.scrollLeft <= 0;
      const atRight =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 1;

      setShowLeftScroll(!atLeft);
      setShowRightScroll(!atRight);
    });
  }, [selectedCategory]);

  const filteredOrders = selectedCategory
    ? orders.filter((order) =>
        order.menu.some((item) => item.menuItem.name === selectedCategory),
      )
    : orders;

  return (
    <div className="lg:h-full w-full max-md:overflow-auto max-md:h-[93vh]">
      <div className="w-full flex max-lg:flex-col max-lg:bg-white gap-2 h-full max-lg:h-fit">
        <div className="lg:w-3/5 max-lg:w-screen h-full flex flex-col gap-2 lg:overflow-y-auto no-scrollbar">
          <div className="relative lg:rounded-3xl w-full min-h-1/3 p-2 lg:bg-white flex flex-col max-lg:flex-nowrap gap-2 lg:pr-8">
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
            {showRightScroll && (
              <button
                className="absolute right-3 top-1/2 hover:scale-95 transition z-10 max-lg:bg-white max-lg:p-2 max-lg:rounded-full"
                onClick={() => {
                  const container = document.getElementById("order-scroll");
                  if (container)
                    container.scrollBy({ left: 220, behavior: "smooth" });
                }}
              >
                <ForwardIcon />
              </button>
            )}


            <div className="flex gap-3 max-md:gap-10 items-center max-md:px-2">
              <p className="whitespace-nowrap">Order Line</p>

              {/* < md */}
              <div className="md:hidden w-4/5">
                <select
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg)] border text-sm focus:outline-none"
                  value={selectedCategory ?? ""}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value === "" ? null : e.target.value)
                  }
                >
                  <option className="text-xl" value="All">Show All ({orders.length})</option>

                  {orderCategories.map((cat) => (
                    <option className="text-xl" key={cat.name} value={cat.name}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* md+ */}
              <div className="hidden md:flex gap-2 justify-start items-center overflow-auto no-scrollbar">
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
                        ${active ? "bg-gray-300" : "bg-[var(--bg)] max-lg:bg-white"}`}
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
                    className="bg-[var(--bg)] p-2 w-[40vw] max-w-[195px] min-w-[150px] h-[185px] rounded-3xl flex flex-col items-center justify-center flex-shrink-0 cursor-pointer max-lg:bg-[var(--bg)] max-lg:shadow-sm"
                    onClick={() => { 
                      setSelectedOrder(order);
                      setMobileSelectedOrder(order)
                    }}
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
          <div className="lg:rounded-3xl min-h-2/3 w-full lg:bg-white lg:p-2 flex flex-col gap-2">
            <div>
              <div className="px-6 max-lg:px-4 flex items-center justify-between">
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
                  className="w-full grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto no-scrollbar scroll-smooth px-6 max-lg:px-2 py-3"
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
                        className="relative bg-[var(--bg)] p-2 w-[40vw] max-w-[200px] min-w-[150px] lg:h-[40vw] min-h-full lg:max-h-[200px] max-lg:py-2 rounded-3xl flex flex-col items-center justify-center flex-shrink-0"
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
        <div className="lg:w-2/5 max-h-screen lg:rounded-3xl bg-white max-lg:bg-white h-full p-2 flex flex-col items-center justify-evenly overflow-y-auto gap-2 pb-4 no-scrollbar">
          <p className="hidden max-lg:block">Select an Order to View Reciept</p>
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
              Please select an order to view details
            </p>
          )}
        </div>

        {/* >lg */}
        {mobileSelectedOrder && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              onClick={() => {
                setMobileSelectedOrder(null);
                setIsRefunding(false);
              }}
            />

            <div className="absolute bottom-0 w-full bg-[var(--bg)] rounded-t-3xl p-4 max-h-[90vh] overflow-y-auto shadow-lg animate-slide-up">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <button
                  onClick={() => {
                    setMobileSelectedOrder(null);
                    setIsRefunding(false);
                  }}
                  className="font-bold text-5xl rotate-45 hover:text-gray-700"
                >
                  +
                </button>
              </div>
              {mobileSelectedOrder ? (
                isRefunding ? (
                  <Refund
                    order={mobileSelectedOrder}
                    onBack={() => setIsRefunding(false)}
                  />
                ) : (
                  <OrderDetails
                    onRefund={() => setIsRefunding(true)}
                    order={mobileSelectedOrder}
                  />
                )
              ) : (
                <p className="text-gray-500 text-center text-lg mt-10">
                  Please select an order to view details
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
