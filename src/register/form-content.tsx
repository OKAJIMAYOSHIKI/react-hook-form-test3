import React, { useMemo } from 'react';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { Address, RegistrationForm } from '../../pages/registration';
import { FileInput, FileInputProps } from '../shared/form/file-input';
import {
  MultipleBoxGroup,
  MultipleBoxGroupProps,
  MultipleBoxGroupStyles,
} from '../shared/form/multiple-box-group';
import {
  TextBoxDouble,
  TextBoxDoubleProps,
  TextBoxDoubleStyle,
} from '../shared/form/text-box-double';
import { TextBox, TextBoxStyle } from '../shared/form/text-box';
import { AddressFields, AddressFieldsProps } from './address-fields';
import { TextBoxProps } from '../shared/form/text-box';
import { css } from '@emotion/react';
import {
  SelectionInput,
  SelectionInputProps,
} from '../shared/form/selection-input';
import {
  AddressFieldArray,
  AddressFieldArrayProps,
} from './address-field-array';

type RegistrationFields =
  | FieldBlock<'TextBox', TextBoxProps>
  | FieldBlock<'TextBoxDouble', TextBoxDoubleProps>
  | FieldBlock<'SelectionInput', SelectionInputProps>
  | FieldBlock<'MultipleBox', MultipleBoxGroupProps>
  | FieldBlock<'FileInput', FileInputProps>
  | FieldBlock<'Address', AddressFieldsProps>
  | FieldBlock<'AddressFieldArray', AddressFieldArrayProps>;

export const FormContent: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
  } = useFormContext<RegistrationForm>();
  const { fields: receiver_addresses, append, remove } = useFieldArray({
    name: 'receiver_address',
    control,
  });
  const onSubmit: SubmitHandler<RegistrationForm> = (data) => {
    console.log(data);
  };

  const watchSameAddressCheck = watch('same_address_check');

  const onClickAppend = () => {
    const address: Address = {
      zip_code: '',
      city: '',
      street: '',
      building: '',
    };
    append(address);
  };
  const onClickRemoveByIndex = (index: number) => () => remove(index);

  const fields: RegistrationFields[] = useMemo(
    () => [
      {
        componentName: 'TextBoxDouble',
        props: {
          legend: '氏名',
          style: textBoxDoubleStyles,
          firstField: {
            label: '氏',
            type: 'text',
            ...register('first_name'),
          },
          secondField: {
            label: '名',
            type: 'text',
            ...register('last_name'),
          },
        },
      },
      {
        componentName: 'TextBox',
        props: {
          label: '電話番号',
          type: 'number',
          style: textBoxStyles,
          ...register('phone'),
        },
      },
      {
        componentName: 'MultipleBox',
        props: {
          legend: '性別',
          type: 'radio',
          style: radioGroupStyles,
          inputItems: [
            { label: '女性', value: 'female', ...register('gender') },
            { label: '男性', value: 'male', ...register('gender') },
            { label: 'その他', value: 'other', ...register('gender') },
          ],
        },
      },
      {
        componentName: 'Address',
        props: {
          fields: [
            {
              label: '郵便番号',
              type: 'number',
              style: textBoxStyles,
              ...register('zip_code'),
            },
            {
              label: '都道府県・市区町村',
              type: 'text',
              style: textBoxStyles,
              ...register('city'),
            },
            {
              label: '番地',
              type: 'text',
              style: textBoxStyles,
              ...register('street'),
            },
            {
              label: '建物名',
              type: 'text',
              style: {
                ...textBoxStyles,
                container: css([
                  textBoxStyles.container,
                  css({ marginBottom: 0 }),
                ]),
              },
              ...register('building'),
            },
          ],
        },
      },
      {
        componentName: 'SelectionInput',
        props: {
          label: 'お届け先を別の住所に設定する',
          type: 'checkbox',
          value: true,
          ...register('same_address_check'),
        },
      },
      {
        componentName: 'AddressFieldArray',
        props: {
          fields: receiver_addresses,
          onClickAppend,
          onClickRemoveByIndex,
        },
      },
    ],
    [receiver_addresses]
  );

  const formContentView = fields.map(({ componentName, props }, index) => {
    switch (componentName) {
      case 'TextBox':
        return <TextBox key={props.name} {...props} />;
      case 'TextBoxDouble':
        return <TextBoxDouble key={props.firstField.name} {...props} />;
      case 'SelectionInput':
        return <SelectionInput key={props.name} {...props} />;
      case 'MultipleBox':
        return <MultipleBoxGroup key={props.legend} {...props} />;
      case 'FileInput':
        return <FileInput key={props.name} {...props} />;
      case 'Address':
        return <AddressFields key={props.fields[0].name} {...props} />;
      case 'AddressFieldArray':
        return watchSameAddressCheck ? (
          <AddressFieldArray key={index} {...props} />
        ) : null;
    }
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formContentView}
      <button>送信</button>
    </form>
  );
};

const cssVisuallyHidden = css({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const textBoxStyles: TextBoxStyle = {
  container: css({
    display: 'block',
    flex: 1,
    maxWidth: 288,
    marginBottom: 16,
  }),
  label: css({ display: 'block' }),
  input: (isError) =>
    css({
      width: '100%',
      height: 36,
      margin: 0,
      border: isError ? '1px solid red' : undefined,
      boxSizing: 'border-box',
    }),
};

const textBoxDoubleInputStyles: TextBoxStyle = {
  container: css([
    textBoxStyles.container,
    css({ maxWidth: 'none', margin: 0 }),
  ]),
  label: css([textBoxStyles.label, cssVisuallyHidden]),
  input: textBoxStyles.input,
};

const textBoxDoubleStyles: TextBoxDoubleStyle = {
  fieldset: css({ padding: 0, margin: 0, marginBottom: 16, border: 'none' }),
  legend: css({}),
  wrapper: css({ display: 'flex', gap: 24 }),
  firstField: textBoxDoubleInputStyles,
  secondField: textBoxDoubleInputStyles,
};

const radioGroupStyles: MultipleBoxGroupStyles = {
  fieldset: css({ padding: 0, margin: 0, marginBottom: 16, border: 'none' }),
  legend: css({}),
  wrapper: css({}),
};
