import { SerializedStyles } from '@emotion/react';
import React from 'react';
import { TextBox, TextBoxProps, TextBoxStyle } from './text-box';

export type TextBoxDoubleStyle = {
  fieldset?: SerializedStyles;
  legend?: SerializedStyles;
  wrapper?: SerializedStyles;
  firstField?: TextBoxStyle;
  secondField?: TextBoxStyle;
};

export type TextBoxDoubleProps = {
  legend: string;
  style?: TextBoxDoubleStyle;
  firstField: TextBoxProps;
  secondField: TextBoxProps;
};

export const TextBoxDouble: React.FC<TextBoxDoubleProps> = ({
  legend,
  style,
  firstField,
  secondField,
}) => {
  return (
    <fieldset css={style?.fieldset}>
      <legend css={style?.legend}>{legend}</legend>
      <div css={style?.wrapper}>
        <TextBox style={style?.firstField} {...firstField} />
        <TextBox style={style?.secondField} {...secondField} />
      </div>
    </fieldset>
  );
};
