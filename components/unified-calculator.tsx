"use client";

import { ConsultingPriceCalculator } from "@/components/consulting-price-calculator";
import { EligibilityChecker } from "@/components/eligibility-checker";

export type CalculatorMode = "eligibilitate" | "estimare";

export function UnifiedCalculator({
  initialMode,
  consultingBasePriceRon,
  adminBasePriceRon
}: {
  initialMode: CalculatorMode;
  consultingBasePriceRon: number;
  adminBasePriceRon: number;
}) {
  return (
    <div className="unified-calculator">
      <div className="calculator-mode-panel">
        {initialMode === "eligibilitate"
          ? <EligibilityChecker standalone />
          : (
            <ConsultingPriceCalculator
              consultingBasePriceRon={consultingBasePriceRon}
              adminBasePriceRon={adminBasePriceRon}
            />
          )}
      </div>
    </div>
  );
}
