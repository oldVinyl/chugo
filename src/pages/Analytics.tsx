import { DownIcon } from "../assets/Icons";
import { AnalyticsBarChart, AnalyticsPieChart } from "../components/Charts";

const revenueData = [
  { month: "Jan", a: 4000, b: 2400 },
  { month: "Feb", a: 3000, b: 1398 },
  { month: "Mar", a: 2000, b: 9800 },
  { month: "Apr", a: 2780, b: 3908 },
  { month: "May", a: 1890, b: 4800 },
  { month: "Jun", a: 2390, b: 3800 },
  { month: "Jul", a: 3490, b: 4300 },
];
const pieData = [
  { name: "Green Sales", value: 78 },
  { name: "Black Sales", value: 22 },
];

function Analytics() {
  return (
    <div className="h-full w-full flex flex-col gap-4 overflow-auto pr-4 no-scrollbar">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full flex-1">
        
        <div className="lg:col-span-2 rounded-3xl">
          
          <div className=" bg-white rounded-3xl mb-4 w-full">
            <p className="pl-4 pt-4 font-semibold text-gray-600">Site Stats</p>
            <div className="items-center grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Views */}
            <div className="p-6">
              <div className="flex flex-col items-center justify-between gap-2">
                <button className="bg-gray-100 text-sm px-3 py-1 rounded-lg">
                  <span>Show by</span> 
                  &nbsp;
                  <DownIcon className="inline" />
                </button>
                <h2 className="text-gray-500 font-medium">Total Views</h2>
                <p className="text-4xl font-semibold">12.6k</p>
              </div>
            </div>

            {/* Orders */}
            <div className="p-6">
              <div className="flex flex-col items-center justify-between gap-2">
                <button className="bg-gray-100 text-sm px-3 py-1 rounded-lg">
                  <span>Show by</span> 
                  &nbsp;
                  <DownIcon className="inline" />
                </button>
                <h2 className="text-gray-500 font-medium">Total Orders</h2>
                <p className="text-4xl font-semibold">12.6k</p>
              </div>
            </div>

            {/* Users */}
            <div className="p-6">
              <div className="flex flex-col items-center justify-between gap-2">
                <button className="bg-gray-100 text-sm px-3 py-1 rounded-lg">
                  <span>Show by</span> 
                  &nbsp;
                  <DownIcon className="inline" />
                </button>
                <h2 className="text-gray-500 font-medium">Total Users</h2>
                <p className="text-4xl font-semibold">12.6k</p>
              </div>
            </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-3">
            <div className="flex gap-4 items-center mb-4">
              <h2 className="font-semibold text-gray-600 text-lg">
                Revenue stats
              </h2>
              <button className="bg-gray-100 text-sm px-3 py-1 rounded-lg">
                <span>Show by</span> 
                &nbsp;
                <DownIcon className="inline" />
              </button>
            </div>

            
            <div className="w-full h-[300px] rounded-xl flex items-center justify-center">
              <AnalyticsBarChart data={revenueData} />
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h2 className="font-semibold text-gray-600">Overall revenue</h2>
            <p className="text-sm text-gray-400">2/11/25</p>
          </div>

          
          <div className="w-full flex justify-center my-6">
            <div className="w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <AnalyticsPieChart data={pieData} />
            </div>
          </div>

          
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--acc)]"></span>
              <p>435,000,000.30</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-900"></span>
              <p>5647.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
