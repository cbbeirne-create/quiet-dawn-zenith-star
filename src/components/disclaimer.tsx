import { Link } from "@tanstack/react-router";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p className="text-xs leading-relaxed text-subtle">
      {compact ? "" : "T4 is not LEO, Enterprise Ireland, Revenue or SEAI. "}
      “Eligible” means T4 found no knockout in its current rules — not a decision. Amounts and win rates are a T4 model.
      Confirm every scheme on the official page before you apply.{" "}
      <Link to="/terms" className="text-pine hover:underline">
        Terms
      </Link>
    </p>
  );
}
