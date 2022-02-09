/* This example requires Tailwind CSS v2.0+ */
import {
    CloudUploadIcon,
    CogIcon,
    LockClosedIcon,
    RefreshIcon,
    ServerIcon,
    ShieldCheckIcon,
  } from "@heroicons/react/outline";
  
  const features = [
    { name: "Insurer", icon: CloudUploadIcon, desc: "An Insurer stakes money to the Inurance pool for risks" },
    { name: "Investor", icon: LockClosedIcon, desc: "An investor stakes money to the investment pool" },
    { name: "Insuree", icon: RefreshIcon, desc: "An insuree, buys covers and makes a claim, with proof of loss" },
  ];
  
  export default function Action() {
    return (
      <div className="relative bg-white">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          
          <div className="mt-2">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr]">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.desc}
                      </p>
                      <button
                        type="button"
                        className="inline-flex mt-4 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Request Membership
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  