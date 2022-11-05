import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

export type FileInputProps = {
  label: string;
} & UseControllerProps;

export const FileInput: React.FC<FileInputProps> = ({ label, ...props }) => {
  const { field } = useController(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input id={field.name} type="file" {...field} />
    </div>
  );
};
