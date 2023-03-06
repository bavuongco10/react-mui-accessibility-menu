import * as React from "react";

interface MenuSectionProps {
  children: React.ReactNode;
  label: string;
}

const MenuSection = ({ children, label, labelProps }: MenuSectionProps) => {
  return (
    <li>
      <span
        className={`block py-2.5 mb-2.5 font-bold select-none ${
          labelProps?.className || ""
        }`}
      >
        {label}
      </span>
      <ul className="pl-4">{children}</ul>
    </li>
  );
};

export default MenuSection;
