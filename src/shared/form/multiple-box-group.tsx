import { SerializedStyles } from '@emotion/react';
import React from 'react';
import {
  SelectionInput,
  SelectionInputProps,
  SelectionInputStyles,
} from './selection-input';

export type MultipleBoxGroupStyles = {
  fieldset?: SerializedStyles;
  legend?: SerializedStyles;
  wrapper?: SerializedStyles;
  inputItem?: SelectionInputStyles;
};

export type MultipleBoxGroupProps = {
  legend: string;
  style?: MultipleBoxGroupStyles;
  inputItems: Omit<SelectionInputProps, 'type'>[];
  type: 'radio' | 'checkbox';
};

export const MultipleBoxGroup: React.FC<MultipleBoxGroupProps> = ({
  legend,
  style,
  inputItems,
  type,
}) => {
  return (
    <fieldset css={style?.fieldset}>
      <legend css={style?.legend}>{legend}</legend>
      <div css={style?.wrapper}>
        {inputItems.map((inputItem) => (
          <SelectionInput
            key={inputItem.value}
            type={type}
            style={style?.inputItem}
            {...inputItem}
          />
        ))}
      </div>
    </fieldset>
  );
};
