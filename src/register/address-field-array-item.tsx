import React, { EventHandler } from 'react';
import {
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form';
import { css } from '@emotion/react';
import { RegistrationForm } from '../../pages/registration';
import { TextBox, TextBoxProps } from '../shared/form/text-box';
import { textBoxStyles } from './form-content';
import { AddressFields } from './address-fields';

export type AddressFieldArrayItemProps = {
  index: number;
  onClickRemove: React.MouseEventHandler<HTMLButtonElement>;
};

export const AddressFieldArrayItem: React.FC<AddressFieldArrayItemProps> = ({
  index,
  onClickRemove,
}) => {
  const { register } = useFormContext<RegistrationForm>();
  const fields: TextBoxProps[] = [
    {
      label: '郵便番号',
      type: 'number',
      style: textBoxStyles,
      ...register(`receiver_address.${index}.zip_code`),
    },
    {
      label: '都道府県・市区町村',
      type: 'text',
      style: textBoxStyles,
      ...register(`receiver_address.${index}.city`),
    },
    {
      label: '番地',
      type: 'text',
      style: textBoxStyles,
      ...register(`receiver_address.${index}.street`),
    },
    {
      label: '建物名',
      type: 'text',
      style: {
        ...textBoxStyles,
        container: css([textBoxStyles.container, css({ marginBottom: 0 })]),
      },
      ...register(`receiver_address.${index}.building`),
    },
  ];

  return (
    <div>
      <div>お届け先住所{index + 1}</div>
      <AddressFields fields={fields} />
      <button type="button" onClick={onClickRemove}>
        削除
      </button>
    </div>
  );
};
