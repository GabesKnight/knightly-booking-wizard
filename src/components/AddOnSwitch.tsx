
import { AddOn, Package } from "@/types/booking-types";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/utils/quote-calculator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AddOnSwitchProps {
  addOn: AddOn;
  enabled: boolean;
  disabled?: boolean;
  onToggle: (id: string, enabled: boolean) => void;
  tooltipText?: string;
}

const AddOnSwitch = ({ addOn, enabled, disabled = false, onToggle, tooltipText }: AddOnSwitchProps) => {
  return (
    <div className={`flex justify-between items-center py-2 ${disabled ? 'opacity-50' : ''}`}>
      <div>
        <div className="flex items-center gap-1">
          <span className="font-medium">{addOn.name}</span>
          {tooltipText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {addOn.description && (
          <span className="text-sm text-gray-500 block">{addOn.description}</span>
        )}
        <div className="text-sm font-semibold">{formatCurrency(addOn.price, false)}</div>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={(checked) => !disabled && onToggle(addOn.id, checked)}
        disabled={disabled}
        className="switch-root"
      />
    </div>
  );
};

export default AddOnSwitch;
