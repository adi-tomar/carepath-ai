import { requiredDisclaimer } from "../lib/constants";

export function Disclaimer() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      {requiredDisclaimer}
    </div>
  );
}
