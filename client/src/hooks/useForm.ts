import { useState } from "react";

type InputType = {
  [key: string]: string | File | null;
};

export function useForm<T>(inputValues: InputType) {
  const [values, setValues] = useState(inputValues as T);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.files) {
      setValues({ ...values, [name]: e.target.files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const reset = () => {
    setValues(inputValues as T);
  };
  return { values, handleChange, reset };
}
