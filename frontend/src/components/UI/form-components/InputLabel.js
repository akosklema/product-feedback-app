function InputLabel({ children, id }) {
  return (
    <label htmlFor={id}>
      {children}
    </label>
  );
};

export default InputLabel;