import React from 'react';
import { Truck, Headphones, RotateCcw, CreditCard } from 'lucide-react';
import { SERVICE_FEATURES } from '../data/storeData';

export const ServiceFeatures: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'truck':
        return <Truck className="w-8 h-8 stroke-[1.25] text-[#232323]" />;
      case 'headset':
        return <Headphones className="w-8 h-8 stroke-[1.25] text-[#232323]" />;
      case 'refresh-cw':
        return <RotateCcw className="w-8 h-8 stroke-[1.25] text-[#232323]" />;
      case 'credit-card':
        return <CreditCard className="w-8 h-8 stroke-[1.25] text-[#232323]" />;
      default:
        return <Truck className="w-8 h-8 stroke-[1.25] text-[#232323]" />;
    }
  };

  return (
    <section className="bg-white py-10 sm:py-12 border-b border-[#F0EFEB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {SERVICE_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 sm:gap-5 justify-center sm:justify-start lg:justify-center p-2 group"
            >
              <div className="shrink-0 p-2.5 rounded-full bg-[#FEF8F5] transition-colors duration-300 group-hover:bg-[#FCDCC9]/40">
                {getIcon(feature.icon)}
              </div>
              <div className="flex flex-col">
                <h4 className="text-[14px] sm:text-[15px] font-bold text-[#232323] tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-[12px] sm:text-[13px] text-[#7A7A7A] mt-0.5">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
