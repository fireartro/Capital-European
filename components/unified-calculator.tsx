"use client";

import { ConsultingPriceCalculator } from "@/components/consulting-price-calculator";

export function UnifiedCalculator({
  consultingBasePriceRon,
  adminBasePriceRon
}: {
  consultingBasePriceRon: number;
  adminBasePriceRon: number;
}) {
  return (
    <div className="unified-calculator">
      <div className="calculator-mode-panel">
        <ConsultingPriceCalculator
          consultingBasePriceRon={consultingBasePriceRon}
          adminBasePriceRon={adminBasePriceRon}
        />
      </div>
    </div>
  );
}
