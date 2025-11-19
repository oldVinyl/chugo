import { useRef, useState } from "react";
import { CediIcon, TickLightIcon, UploadIcon } from "../assets/Icons"; 
import type { MenuItem } from "../types";
import placeholderImg from "../assets/foodPlaceholder1.png";

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

function NewItemUpload() {
const fileInputRef = useRef<HTMLInputElement>(null);

const [name, setName] = useState("");
const [details, setDetails] = useState("");
const [newPrice, setNewPrice] = useState("");
const [actualPrice, setActualPrice] = useState("");
const [features, setFeatures] = useState<string[]>([""]);
const [previewImage, setPreviewImage] = useState<string>(placeholderImg);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (!e.target.files || e.target.files.length === 0) return;
const file = e.target.files[0];
const url = URL.createObjectURL(file);
setPreviewImage(url);
};

const handleAddFeature = () => setFeatures(prev => [...prev, ""]);

const handleSubmit = () => {
const newItem: MenuItem = {
id: Date.now().toString(),
name,
description: details,
pricePes: Number(newPrice),
discountPerc: Number(newPrice) * 100 / Number(actualPrice),
features,
previewImage,
};
console.log("New item uploaded:", newItem);
};

return ( 
  <div className="h-full w-full pl-2"> 
    <div className="w-full h-full flex gap-3">
      <div className="w-2/3 h-[80vh] bg-white rounded-3xl p-6 overflow-y-auto"> <h2 className="text-xl font-semibold mb-4">Upload New Food Item</h2>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col items-center gap-1">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="h-24 w-24 rounded-xl object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-xl bg-gray-200 flex items-center justify-center">
                No image
              </div>
            )}

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

          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm">Food Title</label>
            <input
              className="w-full border rounded-xl p-2"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <label className="text-sm">Add Details</label>
            <textarea
              className="w-full border rounded-xl p-2"
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-sm">New Price</label>
            <input
              className="w-full border rounded-xl p-2"
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Actual Price</label>
            <input
              className="w-full border rounded-xl p-2"
              value={actualPrice}
              onChange={e => setActualPrice(e.target.value)}
            />
          </div>
        </div>

        <label className="text-sm">Features</label>
        {features.map((f, idx) => (
          <input
            key={idx}
            className="w-full border rounded-xl p-2 mb-2"
            value={f}
            onChange={e => {
              const updated = [...features];
              updated[idx] = e.target.value;
              setFeatures(updated);
            }}
          />
        ))}

        <button className="text-blue-700 mb-4" onClick={handleAddFeature}>
          Add slot
        </button>

        <button
          className="bg-black text-white w-full p-3 rounded-xl transition hover:scale-95 hover:opacity-85 active:105"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>

      <div className="relative w-1/3 h-[80vh] bg-white rounded-3xl p-4 flex flex-col gap-2 overflow-auto no-scrollbar">
        <h3 className="mb-2">Preview</h3>
        <div className="w-full flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="h-20 w-20 rounded-xl object-cover mb-4"
            />
          ) : (
            <div className="h-48 w-48 bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
              Image Preview
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-sm">{name || "Food Name"}</p>
          <p className="flex gap-4 items-center">
            <span className="inline-flex items-center">
              <CediIcon className="inline h-3"/>
              {newPrice ? `${newPrice}` : "00.00"}{" "}
            </span>
            <s className="inline-flex items-center">
              <CediIcon className="inline h-3"/>
              {actualPrice ? `${actualPrice}` : "00.00"}
            </s>
          </p>
          <p className="text-gray-500 mb-2 text-sm">{details || lorem}</p>
          <div>
            {features[0] !== "" && features.map((f, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-500">
                <TickLightIcon />
                <p>{f}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-4 left-1 flex items-center justify-center w-full">
          <button className="bg-black rounded-xl w-4/5 p-2 transition hover:scale-95 active:105 hover:opacity-85">
            <p className="text-white">Upload</p>
          </button>
        </div>
      </div>
    </div>
  </div>

);
}

export default NewItemUpload;
