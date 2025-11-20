import { DownIcon, PrintIcon } from "../assets/Icons";
import qrcode from "../assets/QRPlaceholder.png";

const status = [
  {
    id: "8789",
    status: "Success",
  },
  {
    id: "2345",
    status: "Success",
  },
  {
    id: "7689",
    status: "Failed",
  },
  {
    id: "0978",
    status: "Success",
  },
  {
    id: "1212",
    status: "Failed",
  },
  {
    id: "8076",
    status: "Failed",
  },
  {
    id: "4923",
    status: "Failed",
  },
  {
    id: "7688",
    status: "Success",
  },
  {
    id: "0192",
    status: "Failed",
  },
];

function Scan() {
  return (
    <div className="h-full w-full">
      <div className="w-full h-full flex gap-3">
        <div className="w-2/3 h-[85vh] bg-white rounded-3xl relative flex items-center justify-center">
          <img className=" -mt-20 h-3/5" src={qrcode} alt="qr code" />
          <div className="absolute bottom-7 w-full flex items-center justify-center">
            <button className="bg-black rounded-xl flex text-white items-center justify-center gap-4 p-2 transition hover:scale-95 active:scale-105 hover:opacity-95">
              <div className="bg-white p-2 rounded-full">
                <PrintIcon />
              </div>
              <p>Print QR Code</p>
            </button>
          </div>
        </div>

        <div className="w-1/3 h-[85vh] flex flex-col bg-white rounded-3xl overflow-hidden">
          <div className="flex justify-between items-center p-3">
            <h2 className="text-sm font-semibold">Status</h2>
            <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm">
              <p className="inline text-sm">Show All</p>
              <DownIcon />
            </button>
          </div>
          <div className="h-full overflow-auto no-scrollbar">
            <div className="p-3 flex flex-col w-full gap-1 overflow-auto">
              {status.map((t, idx) => (
                <div className="w-full hover:bg-gray-100 px-2 py-1 rounded-xl">
                  <p className="font-medium">
                    #{idx} - id:#{t.id}
                  </p>
                  <p>Pickup {t.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scan;
