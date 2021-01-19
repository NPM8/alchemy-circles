import React from 'react';

type ChangeInputNameProps = {
  value: string;
  setValue: (value: string) => void;
};

const ChangeInputName = ({ value, setValue }: ChangeInputNameProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input type="text" value={value} onChange={onChange} />;
};

export default ChangeInputName;
