const statusClass = {
  Programado: 'neutral',
  'En cargue': 'warning',
  'En ruta': 'info',
  Entregado: 'success',
  Facturado: 'success',
  Disponible: 'success',
  Mantenimiento: 'danger',
  Cargado: 'info',
  Aprobado: 'success',
  'Pendiente revision': 'warning',
  Alta: 'warning',
  Critica: 'danger',
  Normal: 'neutral',
};

export default function StatusBadge({ value }) {
  return <span className={`status status--${statusClass[value] || 'neutral'}`}>{value}</span>;
}
