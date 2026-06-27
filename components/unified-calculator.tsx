"use client";

import { Calculator, ClipboardCheck } from "lucide-react";
import { useState } from "react";
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
  const [mode, setMode] = useState<CalculatorMode>(initialMode);

  return (
    <div className="unified-calculator">
      <div className="calculator-mode-switch" role="tablist" aria-label="Alege tipul calculatorului">
        <button
          id="calculator-tab-eligibilitate"
          type="button"
          role="tab"
          aria-selected={mode === "eligibilitate"}
          aria-controls="calculator-panel-eligibilitate"
          onClick={() => setMode("eligibilitate")}
        >
          <ClipboardCheck aria-hidden="true" />
          <span><strong>Fonduri europene</strong><small>Verificare preliminară de eligibilitate</small></span>
        </button>
        <button
          id="calculator-tab-estimare"
          type="button"
          role="tab"
          aria-selected={mode === "estimare"}
          aria-controls="calculator-panel-estimare"
          onClick={() => setMode("estimare")}
        >
          <Calculator aria-hidden="true" />
          <span><strong>Consultanță sau administrare</strong><small>Complexitate și interval orientativ</small></span>
        </button>
      </div>

      <div
        id={mode === "eligibilitate" ? "calculator-panel-eligibilitate" : "calculator-panel-estimare"}
        role="tabpanel"
        aria-labelledby={mode === "eligibilitate" ? "calculator-tab-eligibilitate" : "calculator-tab-estimare"}
        className="calculator-mode-panel"
      >
        {mode === "eligibilitate"
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
