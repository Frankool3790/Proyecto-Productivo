import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';
import {
  calculateDashboardSummary,
  getNameById,
  getVehicleLabel,
} from '../../services/logistics/index.js';
import { formatCurrency, formatDate } from '../../utils/formatters/index.js';

const fleetStatusStyles = [
  { name: 'Disponible', color: 'var(--palette-gold)' },
  { name: 'En ruta', color: 'var(--palette-coral)' },
  { name: 'Mantenimiento', color: 'var(--palette-wine)' },
];

function compactDate(value) {
  if (!value) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short' })
    .format(new Date(`${value}T12:00:00`));
}

function MiniBars({ items, valueFor, labelFor, description }) {
  const maximum = Math.max(...items.map(valueFor), 1);

  return (
    <div className="mini-bars" role="img" aria-label={description}>
      {items.length ? items.map((item, index) => {
        const value = valueFor(item);
        const height = Math.max(12, Math.round((value / maximum) * 100));
        return (
          <div className="mini-bars__item" key={item.id || `${labelFor(item)}-${index}`}>
            <span className="mini-bars__value">{formatCurrency(value)}</span>
            <span className="mini-bars__bar" style={{ '--bar-height': `${height}%` }} />
            <span className="mini-bars__label">{labelFor(item)}</span>
          </div>
        );
      }) : <p className="mini-bars__empty">Aún no hay datos para mostrar.</p>}
    </div>
  );
}

export default function Dashboard() {
  const { data, movements, clients } = useAppData();
  const summary = calculateDashboardSummary(data);
  const recentTrips = data.trips.slice(0, 5);
  const recentMovements = movements.slice(0, 5);
  const totalPayable = movements.reduce((total, movement) => total + Number(movement.totalPayable || 0), 0);
  const vehicleCounts = fleetStatusStyles.map(({ name, color }) => ({
    name,
    color,
    count: data.vehicles.filter((vehicle) => vehicle.status === name).length,
  }));
  const vehicleTotal = data.vehicles.length;
  let currentPercent = 0;
  const statusGradient = vehicleCounts.map(({ color, count }) => {
    const nextPercent = currentPercent + (vehicleTotal ? (count / vehicleTotal) * 100 : 0);
    const segment = `${color} ${currentPercent}% ${nextPercent}%`;
    currentPercent = nextPercent;
    return segment;
  }).join(', ');

  const tripsForChart = [...data.trips].slice(-6).reverse();
  const movementsForChart = [...movements].slice(0, 6).reverse();

  return (
    <section className="page dashboard-page">
      <header className="dashboard-heading">
        <div>
          <span className="eyebrow">Administración</span>
          <h1>Resumen operativo</h1>
          <p>Consulta el estado de tus viajes, movimientos y vehículos desde un solo lugar.</p>
        </div>
        <div className="dashboard-heading__date">
          <span>Hoy</span>
          <strong>{new Intl.DateTimeFormat('es-CO', { dateStyle: 'long' }).format(new Date())}</strong>
        </div>
      </header>

      <div className="dashboard-grid">
        <article className="dashboard-insight">
          <span className="dashboard-insight__eyebrow">FoodTrans NQR · En tiempo real</span>
          <h2>Tu operación, clara y bajo control</h2>
          <p>
            Tienes <strong>{summary.activeTrips} viajes activos</strong> y <strong>{summary.availableVehicles} vehículos disponibles</strong> para continuar coordinando entregas.
          </p>
          <div className="dashboard-insight__footer">
            <span className="insight-pulse" /> Datos operativos actualizados automáticamente
          </div>
        </article>

        <article className="dashboard-metric panel dashboard-revenue">
          <div className="dashboard-metric__heading">
            <div><span>Indicador financiero</span><h2>Valor de los viajes</h2></div>
            <span className="metric-icon" aria-hidden="true">$</span>
          </div>
          <strong className="dashboard-metric__value">{formatCurrency(summary.monthlyIncome)}</strong>
          <span className="dashboard-metric__meta">{data.trips.length} viajes registrados</span>
          <MiniBars
            items={tripsForChart}
            valueFor={(trip) => Number(trip.value || 0)}
            labelFor={(trip) => compactDate(trip.departure)}
            description="Valor de los últimos viajes registrados"
          />
        </article>

        <article className="dashboard-metric panel dashboard-movements">
          <div className="dashboard-metric__heading">
            <div><span>Portal de clientes</span><h2>Movimientos radicados</h2></div>
            <span className="metric-icon metric-icon--coral" aria-hidden="true">↗</span>
          </div>
          <strong className="dashboard-metric__value">{movements.length}</strong>
          <span className="dashboard-metric__meta">Total a pagar: {formatCurrency(totalPayable)}</span>
          <MiniBars
            items={movementsForChart}
            valueFor={(movement) => Number(movement.totalPayable || 0)}
            labelFor={(movement) => compactDate(movement.movementDate)}
            description="Valor a pagar por cada movimiento reciente"
          />
        </article>

        <article className="dashboard-panel panel dashboard-fleet-status">
          <div className="dashboard-panel__heading">
            <div><span>Disponibilidad</span><h2>Estado de la flota</h2></div>
            <span className="dashboard-panel__more">{vehicleTotal} vehículos</span>
          </div>
          <div className="fleet-ring-wrap">
            <div className="fleet-ring" style={{ background: vehicleTotal ? `conic-gradient(${statusGradient})` : 'conic-gradient(var(--line) 0 100%)' }}>
              <div className="fleet-ring__center">
                <strong>{vehicleTotal}</strong>
                <span>Vehículos</span>
              </div>
            </div>
          </div>
          <div className="fleet-legend">
            {vehicleCounts.map(({ name, color, count }) => (
              <div className="fleet-legend__item" key={name}>
                <span className="fleet-legend__dot" style={{ '--legend-color': color }} />
                <span>{name}</span><strong>{count}</strong>
              </div>
            ))}
          </div>
          <div className="fleet-status-summary">
            <span>Viajes activos</span><strong>{summary.activeTrips}</strong>
            <span>Clientes registrados</span><strong>{clients.length}</strong>
          </div>
        </article>

        <article className="dashboard-panel panel dashboard-recent-trips">
          <div className="dashboard-panel__heading">
            <div><span>Seguimiento</span><h2>Viajes recientes</h2></div>
            <span className="dashboard-panel__more">{data.trips.length} en total</span>
          </div>
          {recentTrips.length ? (
            <div className="trip-list">
              {recentTrips.map((trip) => (
                <div className="trip-list__item" key={trip.id}>
                  <span className="trip-list__mark" aria-hidden="true">↗</span>
                  <div className="trip-list__details">
                    <strong>{trip.route}</strong>
                    <span>{getNameById(data.clients, trip.clientId)} · {getVehicleLabel(data.vehicles, trip.vehicleId)}</span>
                  </div>
                  <div className="trip-list__status"><StatusBadge value={trip.status} /><small>{formatDate(trip.departure)}</small></div>
                </div>
              ))}
            </div>
          ) : <p className="empty-state">Aún no hay viajes registrados.</p>}
        </article>

        <article className="dashboard-panel panel dashboard-vehicles">
          <div className="dashboard-panel__heading">
            <div><span>Recursos</span><h2>Vehículos</h2></div>
            <span className="dashboard-panel__more">{summary.availableVehicles} disponibles</span>
          </div>
          {data.vehicles.length ? (
            <div className="vehicle-list">
              {data.vehicles.slice(0, 5).map((vehicle) => {
                const assignedTrips = data.trips.filter((trip) => trip.vehicleId === vehicle.id).length;
                return (
                  <div className="vehicle-list__item" key={vehicle.id}>
                    <span className="vehicle-list__plate">{vehicle.plate}</span>
                    <span className="vehicle-list__type">{vehicle.type}</span>
                    <StatusBadge value={vehicle.status} />
                    <small>{assignedTrips} viajes</small>
                  </div>
                );
              })}
            </div>
          ) : <p className="empty-state">Aún no hay vehículos registrados.</p>}
        </article>

        <article className="dashboard-panel panel dashboard-recent-movements">
          <div className="dashboard-panel__heading">
            <div><span>Actividad del portal</span><h2>Últimos movimientos recibidos</h2></div>
            <span className="dashboard-panel__more">Actualización automática</span>
          </div>
          {recentMovements.length ? (
            <div className="movement-list">
              {recentMovements.map((movement) => (
                <div className="movement-list__item" key={movement.id}>
                  <div><strong>Movimiento #{movement.movementNo}</strong><span>{movement.clientName} · {formatDate(movement.movementDate)}</span></div>
                  <strong>{formatCurrency(movement.totalPayable)}</strong>
                </div>
              ))}
            </div>
          ) : <p className="empty-state">Aún no hay movimientos radicados por clientes.</p>}
        </article>
      </div>
    </section>
  );
}
