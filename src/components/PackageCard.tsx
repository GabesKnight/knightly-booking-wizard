
import { Package, PackageType } from "@/types/booking-types";
import { Check, X } from "lucide-react";
import { formatCurrency } from "@/utils/quote-calculator";

interface PackageCardProps {
  packageData: Package;
  selected: boolean;
  onSelect: (id: PackageType) => void;
}

const PackageCard = ({ packageData, selected, onSelect }: PackageCardProps) => {
  return (
    <div 
      className={`package-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(packageData.id)}
    >
      <h3 className="text-xl font-semibold text-knightly-green">{packageData.name}</h3>
      <p className="text-3xl font-bold mt-2">{formatCurrency(packageData.price, false)}</p>
      <p className="text-gray-500">{packageData.hours}</p>
      
      <ul className="feature-list">
        {packageData.features.map((feature, index) => (
          <li key={index} className="feature-item">
            {feature.included ? (
              <Check size={18} className="feature-check" />
            ) : (
              <X size={18} className="feature-x" />
            )}
            <span className="text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <button 
        className="package-button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(packageData.id);
        }}
      >
        Select Package
      </button>
    </div>
  );
};

export default PackageCard;
