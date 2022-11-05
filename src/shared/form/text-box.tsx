import { css, SerializedStyles } from '@emotion/react';
import React, { forwardRef } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';

export type TextBoxStyle = {
  container?: SerializedStyles;
  label?: SerializedStyles;
  input?: (isError: boolean) => SerializedStyles;
};

export type TextBoxProps = {
  label: string;
  type: 'text' | 'number' | 'mail';
  placeholder?: string;
  style?: TextBoxStyle;
} & UseFormRegisterReturn;

export const TextBox = forwardRef<HTMLInputElement, Omit<TextBoxProps, 'ref'>>(
  ({ name, label, style, ...props }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();
    return (
      <label css={style?.container}>
        <span css={style?.label}>{label}</span>
        <input
          css={style?.input?.(!!errors[name])}
          ref={ref}
          name={name}
          {...props}
        />
      </label>
    );
  }
);

TextBox.displayName = 'TextBox';
