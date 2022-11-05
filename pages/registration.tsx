import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormContent } from '../src/register/form-content';

type Address = {
  zip_code: string;
  city: string;
  street: string;
  building: string;
};

type ReceiverAddress = {
  receiver_zip_code: string;
  receiver_city: string;
  receiver_street: string;
  receiver_building: string;
};

export type RegistrationForm = {
  first_name: string;
  last_name: string;
  phone: number;
  gender: 'male' | 'female' | 'other';
  identification_file: { name: string; content: File };
  same_address_check: boolean;
} & Address &
  ReceiverAddress;

export default function Registration() {
  const methods = useForm<RegistrationForm>();
  return (
    <main css={cssMain}>
      <h1>会員情報の登録</h1>
      <FormProvider {...methods}>
        <FormContent />
      </FormProvider>
    </main>
  );
}

const cssMain = css({
  maxWidth: 600,
  padding: 40,
  margin: '0 auto',
  border: '1px solid lightgray',
  borderRadius: 4,
});
