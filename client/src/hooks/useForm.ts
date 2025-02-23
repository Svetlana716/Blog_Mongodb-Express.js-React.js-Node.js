import { useState } from "react";

export function useForm<T>(inputValues: T) {
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

  const setNewValues = (val: T) => {
    setValues(val);
  };

  const reset = () => {
    setValues(inputValues as T);
  };
  return { values, handleChange, setNewValues, reset };
}
