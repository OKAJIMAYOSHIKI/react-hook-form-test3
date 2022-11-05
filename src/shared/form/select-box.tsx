import React, { forwardRef } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

export type SelectBoxProps = {
  label: string;
  options: Option[];
  placeholder?: string;
} & UseFormRegisterReturn;

export const SelectBox = forwardRef<
  HTMLSelectElement,
  Omit<SelectBoxProps, 'ref'>
>(({ name, label, options, ...props }, ref) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <label>
      <span>{label}</span>
      <select ref={ref} name={name} {...props}>
        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
});

SelectBox.displayName = 'SelectBox';
