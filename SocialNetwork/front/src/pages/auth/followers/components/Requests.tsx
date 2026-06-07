import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Http } from "../../../../config/api";
import { Image } from "../../../../components/Image";
import { icon } from "../../../../helpers/constants";

interface FollowRequest {
  id: number;
  sender: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
  };
}

export const Request = () => {
  const [requests, setRequests] = useState<FollowRequest[]>([]);

  useEffect(() => {
    Http.get(`/follow/requests`)
      .then((res) => {
        console.log(res.data);
        setRequests(res.data.requests);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleReject = (id: number) => {
    Http.patch(`/follow/requests/decline/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleAccept = (id: number) => {
    Http.patch(`/follow/requests/accept/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <section className="space-y-6">
      <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_35px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
              Follow Requests
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Requests ({requests.length})
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            People who follow your profile
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/80 px-5 py-10 text-center text-slate-400">
            No follow requests yet
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <div
                key={request.sender.id}
                className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-900/90 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={request.sender.avatar || icon}
                    alt={request.sender.username}
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
                  />

                  <div>
                    <p className="text-lg font-semibold text-white">
                      {request.sender.firstName} {request.sender.lastName}
                    </p>
                    <p className="text-sm text-slate-400">
                      @{request.sender.username}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => handleReject(request.id)}
                    className="cursor-pointer rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-300 transition hover:border-red-400/60 hover:bg-red-500/15 hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="cursor-pointer rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  >
                    Accept
                  </button>
                </div>
                {/* <Link
                to={`/profile/view/${request.sender.username}`} 
                className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border px-7 py-3 text-sm font-semibold shadow-xl transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 sm:w-fit"
                >View Profile</Link> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
