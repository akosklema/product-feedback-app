function Tab({ label, sum, active, clickHandler, className, activeClass }) {
  return (
    <div
      className={`${className} ${active ? activeClass : null}`}
      onClick={clickHandler}
    >
      {label} ({sum})
    </div>
  );
};

export default Tab;