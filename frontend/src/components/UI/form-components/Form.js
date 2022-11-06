function Form({ children, submitHandler, className }) {
  return (
    <form onSubmit={submitHandler} className={className}>
      {children}
    </form>
  );
};

export default Form;