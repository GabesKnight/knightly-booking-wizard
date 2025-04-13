
import { QuoteSummary as QuoteSummaryType } from "@/types/booking-types";
import { formatCurrency } from "@/utils/quote-calculator";
import { CreditCard } from "lucide-react";

interface QuoteSummaryProps {
  quote: QuoteSummaryType | null;
}

const QuoteSummary = ({ quote }: QuoteSummaryProps) => {
  if (!quote) {
    return (
      <div className="text-center py-10">
        <CreditCard className="mx-auto text-gray-300 mb-4" size={48} />
        <p className="text-gray-500">Select a package to see your quote</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <div className="flex justify-between mb-1">
          <span>Base Package:</span>
          <span className="font-medium">{quote.packageName}</span>
        </div>
        <div className="flex justify-between">
          <span></span>
          <span className="font-semibold">{formatCurrency(quote.packagePrice)}</span>
        </div>
      </div>

      {quote.extraHoursCount > 0 && (
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <span>Extra Hours:</span>
            <span className="font-medium">{quote.extraHoursCount} {quote.extraHoursCount === 1 ? 'hour' : 'hours'}</span>
          </div>
          <div className="flex justify-between">
            <span></span>
            <span className="font-semibold">{formatCurrency(quote.extraHoursPrice)}</span>
          </div>
        </div>
      )}

      {quote.addOns.length > 0 && (
        <div className="border-b pb-2">
          <div className="mb-1">
            <span>Add-Ons:</span>
          </div>
          {quote.addOns.map((addon, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{addon.name}</span>
              <span>{formatCurrency(addon.price)}</span>
            </div>
          ))}
          
          {quote.addOnsDiscount > 0 && (
            <div className="flex justify-between mt-2 text-green-600">
              <span>Discount:</span>
              <span>-{formatCurrency(quote.addOnsDiscount)}</span>
            </div>
          )}
        </div>
      )}

      <div className="pt-2">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span className="text-knightly-gold">{formatCurrency(quote.finalTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;
