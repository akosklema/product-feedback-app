import { useState } from 'react';

function useActiveValue(initialValue) {
  const [activeValue, setActiveValue] = useState(initialValue);

  const activateValueHandler = (value) => {
    setActiveValue(value);
  };

  return {activeValue, activateValueHandler};
};

export default useActiveValue;