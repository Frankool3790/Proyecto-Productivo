export default function TextField({ label, id, helper, className = '', ...props }) {
  return (
    <label className={`field ${className}`} htmlFor={id}>
      <span>{label}</span>
      <input id={id} {...props} />
      {helper ? <small>{helper}</small> : null}
    </label>
  );
}
