import React from 'react';
import { TextBox, TextBoxProps } from '../shared/form/text-box';

export type AddressFieldsProps = {
  fields: TextBoxProps[];
};

export const AddressFields: React.FC<AddressFieldsProps> = ({ fields }) => {
  const addressFields = fields.map((field) => (
    <TextBox key={field.name} {...field} />
  ));
  return <>{addressFields}</>;
};
