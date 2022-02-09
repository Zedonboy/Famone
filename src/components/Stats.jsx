/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline'

const stats = [
  { id: 1, name: 'Estate Stakes as NFTs', stat: 'coming soon', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Investment', stat: 'coming soon', icon: MailOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Investment Stake Amount', stat: 'coming soon', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Stats() {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-2 flex items-baseline sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
             
              {/* <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div> */}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
