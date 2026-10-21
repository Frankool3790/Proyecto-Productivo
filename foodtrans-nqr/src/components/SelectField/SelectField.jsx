export default function SelectField({ label, id, options, className = '', ...props }) {
  return (
    <label className={`field ${className}`} htmlFor={id}>
      <span>{label}</span>
      <select id={id} {...props}>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const text = typeof option === 'string' ? option : option.label;

          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </label>
  );
}
