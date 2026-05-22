import { useState } from "react";
import { ChangePassword } from "./changePassword";
import { PrivacyControl } from "./privacyControl";
import { AccountDetails } from "./AccountDetails";

export const Settings = () => {
  const [mode, setMode] = useState(false);
  

  const handleModeChange = () => {
    mode === false ? setMode(true) : setMode(false);
  };
  return (
    <div className="space-y-8">
      <AccountDetails/>

      <PrivacyControl/>

      <section
        onClick={handleModeChange}
        className="cursor-pointer rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.6)] backdrop-blur-xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
              Account
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Change the Password
            </h3>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-slate-300 shadow-sm shadow-slate-950/20 transition hover:bg-slate-700"
            aria-label="Add Change Password component"
          >
            <span className="text-2xl">⇣</span>
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Clicking this button to open the form
        </p>
      </section>

      {mode && <ChangePassword />}
    </div>
  );
};
