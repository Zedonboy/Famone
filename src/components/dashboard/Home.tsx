import {
  BellIcon,
  MenuIcon,
  XIcon,
  CloudUploadIcon,
  LockClosedIcon,
  RefreshIcon,
} from "@heroicons/react/outline";

import Cover from "../Cover";
import Stats from "../../components/Stats";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { API_URL } from "../../../config/config";
import { fetcher } from "../../utils/funcs";
import Proposal from "../Proposal";
import ActiveProposal from "../ActiveProposal";
export default function Home() {
  const navigate = useNavigate();
  const activeProposal = useSWR(
    `${API_URL}/api/fund-proposals?status=active`,
    fetcher
  );

  const voteProposal = useSWR(
    `${API_URL}/api/fund-proposals?status=pending`,
    fetcher
  );
  return (
    <>
      <div className="p-4">
        <Stats />
      </div>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Active Investing Condos
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              These are currently approved condo good for investing in canada
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {(function () {
              if (activeProposal.data && activeProposal.data.data.length > 0) {
                return activeProposal.data.data.map((v) => (
                  <ActiveProposal data={v} />
                ));
              } else null
            })()}
          </div>
        </div>
      </div>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Condos Under Election
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Members are allowed to vote for Condo with $Choice tokens
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {(function () {
              if (voteProposal.data && voteProposal.data.data.length > 0) {
                return voteProposal.data.data.map((v) => <Proposal data={v} />);
              } else return null
            })()}
          </div>
        </div>
      </div>
      {/* <Cover /> */}
    </>
  );
}
