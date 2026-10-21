export default function Avatar({ name, label }) {
  const initials = String(name || 'FT')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="avatar" aria-label={label || name}>
      {initials}
    </div>
  );
}
