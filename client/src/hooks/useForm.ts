import { useState } from "react";

type InputType = {
  [key: string]: string;
}

export function useForm(inputValues: InputType) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setValues({...values, [name]: value});
    };
    return {
        values, 
        handleChange, 
        setValues
    };
  }