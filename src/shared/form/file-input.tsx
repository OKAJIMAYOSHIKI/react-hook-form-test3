import React from 'react';
import { UseControllerReturn } from 'react-hook-form';
import { RegistrationForm } from '../../../pages/registration';

export type FileInputProps = {
  label: string;
} & UseControllerReturn<RegistrationForm>;

export const FileInput: React.FC<FileInputProps> = ({ label, ...props }) => {
  const { field } = props;
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input id={field.name} type="file" {...field} value={''} />
    </div>
  );
};
