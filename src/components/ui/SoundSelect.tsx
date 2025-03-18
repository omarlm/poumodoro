import { useState, useEffect, useRef } from "react";
import { AmbientSound } from "../../hooks/useAmbientSound";

import EarOffIcon from "../../svg/EarOffIcon";
import RainIcon from "../../svg/RainIcon";
import OceanIcon from "../../svg/OceanIcon";
import FireplaceIcon from "../../svg/FireplaceIcon";
import CoffeeIcon from "../../svg/CoffeeIcon";
import NatureIcon from "../../svg/NatureIcon";

interface SoundOption {
  value: AmbientSound;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const soundOptions: SoundOption[] = [
  { value: "none", Icon: EarOffIcon },
  { value: "rain", Icon: RainIcon },
  { value: "ocean", Icon: OceanIcon },
  { value: "fireplace", Icon: FireplaceIcon },
  { value: "coffee", Icon: CoffeeIcon },
  { value: "nature", Icon: NatureIcon },
];

interface SoundSelectProps {
  value: AmbientSound;
  onChange: (value: AmbientSound) => void;
}

const SoundSelect: React.FC<SoundSelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    soundOptions.find((option) => option.value === value) || soundOptions[0];

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm hover:bg-gray-50"
      >
        <selectedOption.Icon className="mr-2 h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          <ul className="py-1">
            {soundOptions.map((option) => (
              <li
                key={option.value}
                className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <option.Icon className="mr-2 h-5 w-5" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SoundSelect;
