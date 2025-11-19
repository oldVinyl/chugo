import { useEffect, useRef, useState } from "react";
import { menuItems as initialMenuItems } from "../api/mock/MenuItems";
import { AddIcon, CediIcon, UploadIcon } from "../assets/Icons";
import type { MenuItem } from "../types";


function calculateDiscount(
  originalPrice: number | string, 
  newPrice: number | string
) {
  const orig = Number(originalPrice);
  const newP = Number(newPrice);

  if (!orig || orig <= 0) return 0;
  if (!newP || newP < 0) return 0;

  const discount = ((orig - newP) / orig) * 100;
  return Math.max(0, Math.min(discount, 100));
}



function Basket() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [activeTab, setActiveTab] = useState<"food" | "active">("food");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [promoQuantity, setPromoQuantity] = useState(0);
  const [promoDuration, setPromoDuration] = useState({ hours: 0, minutes: 0 });
  const [quickEditItem, setQuickEditItem] = useState<MenuItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editFeatures, setEditFeatures] = useState<string[]>([""]);
  const [editNewPrice, setEditNewPrice] = useState("");
  const [editActualPrice, setEditActualPrice] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMenuItems(prev =>
        prev.map(item => {
          if (item.isActive && item.promoEndsAt && item.promoEndsAt < Date.now()) {
            return {
              ...item,
              isActive: false,
              promoQuantity: undefined,
              promoEndsAt: undefined
            };
          }
          return item;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);


const handleActivateItem = (item: MenuItem) => {
  setMenuItems(prev => {
    const now = Date.now(); // ✅ allowed here

    const durationMs =
      promoDuration.hours * 60 * 60 * 1000 +
      promoDuration.minutes * 60 * 1000;

    const promoEndsAt = now + durationMs;

    return prev.map(mi =>
      mi.id === item.id
        ? {
            ...mi,
            isActive: true,
            promoQuantity,
            promoEndsAt
          }
        : mi
    );
  });

  setSelectedItem(null);
  setPromoQuantity(1);
  setPromoDuration({ hours: 0, minutes: 0 });
};

const updateItem = (id: string) => {
  setMenuItems(prev =>
    prev.map(item =>
      item.id === id
        ? {
            ...item,
            name: editTitle,
            description: editDetails,
            pricePes: Math.round(Number(editActualPrice) * 100),
            discountPerc: calculateDiscount(editActualPrice, editNewPrice),
            features: editFeatures,
            image: quickEditItem?.previewImage || item.image
          }
        : item
    )
  );

  setQuickEditItem(null);
};


const handleQuickEditItem = (item: MenuItem) => {
 setQuickEditItem({
    ...item,
    previewImage: item.image
  });
  setEditTitle(item.name ?? "");
  setEditDetails(item.description ?? "");
  setEditFeatures(item.features ?? [""]);
  setEditNewPrice(((item.discountPerc ? item.pricePes * (1 - item.discountPerc/100) : item.pricePes) / 100).toFixed(2));
  setEditActualPrice((item.pricePes / 100).toFixed(2));
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setQuickEditItem(prev =>
      prev
        ? { ...prev, previewImage: reader.result as string }
        : prev
    );
  };

  reader.readAsDataURL(file);
};




  return (
    <div className="h-full w-full">
      <div className="bg-white w-full h-full min-h-[79vh] rounded-2xl p-2">
        
        <div className="flex gap-4 px-2">
          <button
            className={`p-2 rounded-full ${activeTab === "food" ? "bg-[var(--bg)]" : ""}`}
            onClick={() => setActiveTab("food")}
          >
            <span>Food Menu</span>
          </button>
          <button 
            className={`p-2 rounded-full ${activeTab === "active" ? "bg-[var(--bg)]" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            <span>Active Menu 🔥</span>
          </button>
        </div>

        <div className="mt-4">
          <div className="w-full">
            {activeTab === "food" && (
              <div className="flex flex-wrap gap-2 w-full justify-evenly">
                {menuItems.map((item: MenuItem) => {
                  const priceCedi = item.pricePes / 100;
                  const discountPrice = item.discountPerc
                    ? priceCedi * (1 - item.discountPerc / 100)
                    : null;

                  return (
                    <div
                      key={item.id}
                      className="
                        relative bg-[var(--bg)] p-2
                        flex flex-col items-center justify-center flex-1
                        min-w-[200px] max-w-[200px] flex-grow
                        rounded-3xl
                      "
                      >
                      <div className="absolute bottom-2 right-2">
                        {!item.isActive ? (
                          <div onClick={() => setSelectedItem(item)}>
                            <AddIcon className="hover:scale-95 hover:opacity-85 active:105 transition cursor-pointer" />
                          </div>
                        ) : (
                          <span className="text-3xl">🔥</span>
                        )}
                      </div>

                      <div>
                        <img className="h-[100px]" src={item.image} alt={item.name} />
                      </div>

                      <div className="flex flex-col items-center">
                        <p className="text-sm md:text-base px-10 text-center">{item.name}</p>

                        <p className="text-sm md:text-base flex items-center justify-center text-gray-500">
                          <span>
                            <CediIcon className="inline h-2 w-2 text-gray-300" />
                          </span>
                          <span className="text-xs">{discountPrice ? discountPrice.toFixed(2) : priceCedi.toFixed(2)}</span>
                        </p>

                        {discountPrice && (
                          <p className="text-sm md:text-base flex gap-1 items-center justify-center text-gray-500">
                            <CediIcon className="inline h-2 w-2 text-gray-300" />
                            <s className="text-xs text-str">{priceCedi.toFixed(2)}</s>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full">
            {activeTab === "active" && (
              <div className="flex flex-wrap gap-2 w-full justify-evenly">
                {menuItems
                  .filter((item: MenuItem) => item.isActive)
                  .map((item: MenuItem) => {
                    const priceCedi = item.pricePes / 100;
                    const discountPrice = item.discountPerc
                      ? priceCedi * (1 - item.discountPerc / 100)
                      : null;

                    return (
                      <div
                        key={item.id}
                        className="
                          relative bg-[var(--bg)] p-2
                          flex flex-col items-center justify-center
                          min-w-[150px] max-w-[200px] flex-grow
                          rounded-3xl
                        "
                        onClick={() => handleQuickEditItem(item)}
                      >
                        <div>
                          <img className="h-[100px]" src={item.image} alt={item.name} />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm md:text-base px-10 text-center">{item.name}</p>

                          <p className="text-sm md:text-base flex items-center justify-center text-gray-500">
                            <span>
                              <CediIcon className="inline h-2 w-2 text-gray-300" />
                            </span>
                            <span className="text-xs">{discountPrice ? discountPrice.toFixed(2) : priceCedi.toFixed(2)}</span>
                          </p>

                          {discountPrice && (
                            <p className="text-sm md:text-base flex gap-1 items-center justify-center text-gray-500">
                              <CediIcon className="inline h-2 w-2 text-gray-300" />
                              <s className="text-xs text-str">{priceCedi.toFixed(2)}</s>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="relative bg-white p-4 rounded-xl w-full max-w-sm flex flex-col items-center gap-2">
              <p>{selectedItem.name}</p>
              <div className="mt-2 flex flex-col items-center justify-center gap-2">
                <label className="block">
                  Order Number Availiable?
                </label>
                <div className="bg-[var(--bg)] flex justify-center items-center px-4 py-1 rounded-xl gap-2">
                <button
                  className="flex justify-center items-center font-bold text-xl pr-2"
                  onClick={() =>
                    setPromoQuantity(prev => Math.max(1, prev - 1))
                  }
                >
                  -
                </button>

                <input
                  className="bg-black text-white text-center rounded-lg h-10 w-10 text-xl"
                  type="number"
                  min={1}
                  max={selectedItem?.quantityAvailiable ?? 1}
                  value={promoQuantity}
                  onChange={e => {
                    const val = Number(e.target.value);
                    const max = selectedItem?.quantityAvailiable ?? 1;
                    if (val >= 1 && val <= max) setPromoQuantity(val);
                    else if (val < 1) setPromoQuantity(1);
                    else setPromoQuantity(max);
                  }}
                />

                <button
                  className="flex justify-center items-center font-bold text-xl"
                  onClick={() =>
                    setPromoQuantity(prev =>
                      Math.min(prev + 1, selectedItem?.quantityAvailiable ?? prev + 1)
                    )
                  }
                >
                  +
                </button>
              </div>

              </div>
              <div className="mt-2 flex flex-col items-center justify-center gap-2">
                <p>How long will this offer last?</p>
                <div className="relative flex border items-center justify-center rounded-xl px-2 py-4 gap-3 w-40">
                  <div className="flex gap-1">
                    <input
                      type="number"
                      className="text-center text-xl w-7 focus:outline-none"
                      min={0}
                      max={23}
                      value={promoDuration.hours}
                      onChange={e =>
                        setPromoDuration(prev => ({
                          ...prev,
                          hours: Number(e.target.value)
                        }))
                      }
                    />
                    <p className="inline text-gray-500 text-xl">
                      hrs
                    </p>
                  </div>
                  <div className="absolute left-[75px] bottom-1 h-4/5 w-[1px] bg-gray-300"/>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      className="text-center text-xl w-7 focus:outline-none"
                      min={0}
                      max={59}
                      value={promoDuration.minutes}
                      onChange={e =>
                        setPromoDuration(prev => ({
                          ...prev,
                          minutes: Number(e.target.value)
                        }))
                      }
                    />
                    <p className="inline text-gray-500 text-xl">
                      mins
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="mt-4 bg-black text-white w-full p-4 rounded-xl hover:scale-95 active:scale-105 transition"
                onClick={() => handleActivateItem(selectedItem)}
              >
                Make Active
              </button>
              <button
                className="absolute top-1 right-2 text-black font-bold rotate-45 text-5xl"
                onClick={() => setSelectedItem(null)}
              >
                +
              </button>
            </div>
          </div>
        )}
        {quickEditItem && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white p-4 rounded-2xl w-full max-w-lg relative">

              <h2 className="text-xl font-semibold mb-4">Edit food</h2>

              <div className="flex gap-4 mb-4">
                <div className="flex flex-col items-center gap-1">
                  <img 
                    src={quickEditItem.previewImage}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  {/* hidden input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  <button 
                    className="flex flex-col items-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadIcon />
                    <p className="text-xs">Cover Image</p>
                  </button>
                </div>

                <div className="flex-1">
                  <label className="text-sm">Food Title</label>
                  <input 
                    className="w-full border rounded-xl p-2"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                </div>
              </div>

              <label className="text-sm">Add details</label>
              <textarea 
                className="w-full border rounded-xl p-2 mb-3"
                value={editDetails}
                onChange={e => setEditDetails(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-sm">New price</label>
                  <input 
                    className="w-full border rounded-xl p-2"
                    value={editNewPrice}
                    onChange={e => setEditNewPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm">Actual price</label>
                  <input 
                    className="w-full border rounded-xl p-2"
                    value={editActualPrice}
                    onChange={e => setEditActualPrice(e.target.value)}
                  />
                </div>
              </div>

              <label className="text-sm">Features</label>
              {editFeatures.map((f, idx) => (
                <input 
                  key={idx}
                  className="w-full border rounded-xl p-2 mb-2"
                  value={f}
                  onChange={e => {
                    const updated = [...editFeatures];
                    updated[idx] = e.target.value;
                    setEditFeatures(updated);
                  }}
                />
              ))}

              <button 
                className="text-blue-700 mt-1"
                onClick={() => setEditFeatures(prev => [...prev, ""])}
              >
                Add slot
              </button>

              <button 
                className="bg-black text-white w-full p-3 rounded-xl mt-5"
                onClick={() => updateItem(quickEditItem.id)}
              >
                Update
              </button>

              <button 
                className="absolute top-2 right-3 text-3xl rotate-45"
                onClick={() => setQuickEditItem(null)}
              >
                +
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Basket;
