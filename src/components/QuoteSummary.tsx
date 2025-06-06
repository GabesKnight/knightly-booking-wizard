
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
          <span>Selected Package:</span>
          <span className="font-medium">{quote.packageName}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Base Price:</span>
          <span className="font-semibold">{formatCurrency(quote.packagePrice, false)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Base Hours:</span>
          <span className="font-medium">{quote.baseHours} hours</span>
        </div>
      </div>

      <div className="border-b pb-2">
        <div className="flex justify-between mb-1">
          <span>Extra Hours:</span>
          <span className="font-medium">{formatCurrency(quote.extraHoursPrice, false)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Total Hours:</span>
          <span className="font-medium">{quote.baseHours} {quote.extraHoursCount > 0 ? `+ ${quote.extraHoursCount}` : ''} hours</span>
        </div>
      </div>

      {quote.addOns.length > 0 && (
        <div className="border-b pb-2">
          <div className="mb-1">
            <span>Add-Ons:</span>
          </div>
          {quote.addOns.map((addon, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{addon.name}</span>
              <span>{formatCurrency(addon.price, false)}</span>
            </div>
          ))}
          
          {quote.addOnsDiscount > 0 && (
            <div className="flex justify-between mt-2 text-green-600">
              <span>Discount:</span>
              <span>-{formatCurrency(quote.addOnsDiscount, false)}</span>
            </div>
          )}
        </div>
      )}

      <div className="pt-2">
        <div className="flex justify-between font-bold text-lg">
          <span>Total Price:</span>
          <span className="text-knightly-gold">{formatCurrency(quote.finalTotal, true)}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;
