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
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
          Who we are
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Famone Insurance
        </p>
        <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
          A Dao Insurance + Investment(Staking) Platform to protect Humans from
          CrytoPrice volatility risks. To participate you must at least be one
          of these participant
        </p>
        <div className="mt-12">
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
                      Connect Wallet
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
