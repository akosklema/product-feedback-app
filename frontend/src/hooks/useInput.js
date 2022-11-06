import { useState } from 'react';

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState(null);

  const valueChangeHandler = (event) => {
    setErrorMessage(null);
    setValue(event.target.value);
  };

  const checkValueIsEmpty = (inputName) => {
    if (value === '') {
      setErrorMessage(`${inputName} can't be empty.`);
      return true;
    }

    return false;
  };

  const resetField = () => {
    setValue('');
  };

  return {
    value,
    errorMessage,
    checkValueIsEmpty,
    valueChangeHandler,
    resetField,
    setErrorMessage
  }
};

export default useInput;