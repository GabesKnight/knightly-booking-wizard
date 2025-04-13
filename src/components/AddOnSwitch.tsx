
import { AddOn } from "@/types/booking-types";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/utils/quote-calculator";

interface AddOnSwitchProps {
  addOn: AddOn;
  enabled: boolean;
  onToggle: (id: string, enabled: boolean) => void;
}

const AddOnSwitch = ({ addOn, enabled, onToggle }: AddOnSwitchProps) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <div className="flex items-center">
          <span className="font-medium">{addOn.name}</span>
          {addOn.description && (
            <span className="text-sm text-gray-500 ml-1">- {addOn.description}</span>
          )}
        </div>
        <div className="text-sm font-semibold text-knightly-gold">{formatCurrency(addOn.price)}</div>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={(checked) => onToggle(addOn.id, checked)}
        className="switch-root"
      />
    </div>
  );
};

export default AddOnSwitch;
