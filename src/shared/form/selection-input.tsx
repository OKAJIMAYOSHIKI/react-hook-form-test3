import { SerializedStyles } from '@emotion/react';
import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type SelectionInputStyles = {
  container?: SerializedStyles;
  label?: SerializedStyles;
  input?: SerializedStyles;
};

export type SelectionInputProps = {
  label: string;
  type: 'radio' | 'checkbox';
  value: any;
  style?: SelectionInputStyles;
} & UseFormRegisterReturn;

export const SelectionInput = forwardRef<
  HTMLInputElement,
  Omit<SelectionInputProps, 'ref'>
>(({ name, label, style, ...props }, ref) => {
  return (
    <label css={style?.container}>
      <input ref={ref} name={name} css={style?.input} {...props} />
      <span css={style?.label}>{label}</span>
    </label>
  );
});

SelectionInput.displayName = 'SelectionInput';
