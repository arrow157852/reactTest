
const Input = ({ label, id, ...props }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
};

export default Input;