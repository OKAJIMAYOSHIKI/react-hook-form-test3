import React from 'react';
import {
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { RegistrationForm } from '../../pages/registration';
import { AddressFieldArrayItem } from './address-field-array-item';

export type AddressFieldArrayProps = {
  fields: FieldArrayWithId<RegistrationForm, 'receiver_address', 'id'>[];
  onClickAppend: React.MouseEventHandler<HTMLButtonElement>;
  onClickRemoveByIndex: (
    index: number
  ) => React.MouseEventHandler<HTMLButtonElement>;
};

export const AddressFieldArray: React.FC<AddressFieldArrayProps> = ({
  fields,
  onClickAppend,
  onClickRemoveByIndex,
}) => {
  const addressFieldArray = fields.map((address, index) => (
    <AddressFieldArrayItem
      key={address.id}
      index={index}
      onClickRemove={onClickRemoveByIndex(index)}
    />
  ));
  return (
    <div>
      {addressFieldArray}
      <button type="button" onClick={onClickAppend}>
        追加
      </button>
    </div>
  );
};
