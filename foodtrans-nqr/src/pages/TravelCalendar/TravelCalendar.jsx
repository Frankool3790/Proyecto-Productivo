import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';
import { useUser } from '../../contexts/UserContext/index.js';
import { getNameById, getVehicleLabel } from '../../services/logistics/index.js';
import { formatCurrency, formatDate } from '../../utils/formatters/index.js';

const monthFormatter = new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' });

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function localDate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function firstCalendarDate(events) {
  const today = dateKey(new Date());
  const upcoming = events.map((event) => event.date).filter((date) => date >= today).sort();
  if (upcoming.length) return upcoming[0];
  return events.map((event) => event.date).filter(Boolean).sort().at(-1) || '';
}

function CalendarEventDetails({ event, user, data }) {
  if (event.kind === 'trip') {
    const client = getNameById(data.clients, event.clientId);
    const driver = getNameById(data.drivers, event.driverId);
    return (
      <article className="calendar-event-card">
        <div className="calendar-event-card__heading">
          <span className="calendar-event-card__type">Viaje programado</span>
          <StatusBadge value={event.status} />
        </div>
        <h3>{event.route}</h3>
        <p className="calendar-event-card__date">Salida: {formatDate(event.departure)}</p>
        <dl className="calendar-event-details">
          <div><dt>Cliente</dt><dd>{client}</dd></div>
          <div><dt>Vehículo</dt><dd>{getVehicleLabel(data.vehicles, event.vehicleId)}</dd></div>
          <div><dt>Conductor</dt><dd>{driver}</dd></div>
          <div><dt>Producto</dt><dd>{event.product || '—'}</dd></div>
          <div><dt>Entrega estimada</dt><dd>{formatDate(event.eta)}</dd></div>
          <div><dt>Factura</dt><dd>{event.invoice || '—'}</dd></div>
          <div><dt>Valor</dt><dd>{formatCurrency(event.value)}</dd></div>
          {event.notes ? <div className="calendar-event-details__full"><dt>Notas</dt><dd>{event.notes}</dd></div> : null}
        </dl>
      </article>
    );
  }

  return (
    <article className="calendar-event-card">
      <div className="calendar-event-card__heading">
        <span className="calendar-event-card__type">{user.role === 'admin' ? 'Movimiento de cliente' : 'Viaje radicado'}</span>
        <StatusBadge value="Cargado" />
      </div>
      <h3>{event.origin} <span aria-hidden="true">→</span> {event.destination}</h3>
      <p className="calendar-event-card__date">Fecha del viaje: {formatDate(event.date)}</p>
      <dl className="calendar-event-details">
        {user.role === 'admin' ? <div><dt>Cliente</dt><dd>{event.clientName}</dd></div> : null}
        <div><dt>Propietario</dt><dd>{event.ownerName}</dd></div>
        <div><dt>Vehículo</dt><dd>{event.vehicle || '—'}</dd></div>
        <div><dt>Tráiler</dt><dd>{event.trailer || '—'}</dd></div>
        <div><dt>Manifiesto</dt><dd>{event.manifestNumber || '—'}</dd></div>
        <div><dt>Total a pagar</dt><dd>{formatCurrency(event.totalPayable)}</dd></div>
      </dl>
    </article>
  );
}

export default function TravelCalendar() {
  const { user } = useUser();
  const { data, movements } = useAppData();
  const isAdmin = user.role === 'admin';
  const events = useMemo(() => {
    const movementEvents = movements.map((movement) => ({
      ...movement,
      id: `movement-${movement.id}`,
      date: movement.movementDate,
      kind: 'movement',
    })).filter((movement) => movement.date);
    if (!isAdmin) return movementEvents;

    const tripEvents = data.trips.map((trip) => ({
      ...trip,
      date: trip.departure,
      kind: 'trip',
    })).filter((trip) => trip.date);
    return [...tripEvents, ...movementEvents].sort((left, right) => left.date.localeCompare(right.date));
  }, [data.trips, isAdmin, movements]);

  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted || !events.length) return;
    const nextDate = firstCalendarDate(events);
    if (!nextDate) return;
    setSelectedDate(nextDate);
    const parsedDate = localDate(nextDate);
    if (parsedDate) setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
  }, [events, hasInteracted]);

  const eventsByDate = useMemo(() => events.reduce((grouped, event) => {
    (grouped[event.date] ||= []).push(event);
    return grouped;
  }, {}), [events]);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarCells = [
    ...Array.from({ length: firstOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];
  const selectedDateValue = selectedDate ? localDate(selectedDate) : null;
  const weekdayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  function changeMonth(amount) {
    setHasInteracted(true);
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
    setSelectedDate('');
  }

  function goToToday() {
    const now = new Date();
    setHasInteracted(true);
    setVisibleMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(dateKey(now));
  }

  return (
    <section className="page calendar-page">
      <SectionHeader
        eyebrow={isAdmin ? 'Administración' : 'Portal cliente'}
        title={isAdmin ? 'Calendario de viajes' : 'Calendario de mis viajes'}
        description={isAdmin
          ? 'Consulta los viajes programados y los movimientos radicados por los clientes.'
          : 'Consulta las fechas y los detalles de los viajes que has radicado.'}
      />

      <div className="calendar-layout">
        <article className="panel calendar-panel">
          <div className="calendar-toolbar">
            <div>
              <span className="calendar-toolbar__eyebrow">Agenda de transporte</span>
              <h2>{monthFormatter.format(visibleMonth)}</h2>
            </div>
            <div className="calendar-toolbar__actions">
              <button className="calendar-today" type="button" onClick={goToToday}>Hoy</button>
              <button className="calendar-month-button" type="button" onClick={() => changeMonth(-1)} aria-label="Mes anterior">‹</button>
              <button className="calendar-month-button" type="button" onClick={() => changeMonth(1)} aria-label="Mes siguiente">›</button>
            </div>
          </div>

          <div className="calendar-weekdays" aria-hidden="true">
            {weekdayLabels.map((weekday) => <span key={weekday}>{weekday}</span>)}
          </div>
          <div className="calendar-days" role="group" aria-label={`Calendario de ${monthFormatter.format(visibleMonth)}`}>
            {calendarCells.map((day, index) => {
              if (!day) return <span className="calendar-day calendar-day--empty" key={`empty-${index}`} aria-hidden="true" />;
              const cellDate = new Date(year, month, day);
              const key = dateKey(cellDate);
              const dayEvents = eventsByDate[key] || [];
              const isSelected = selectedDate === key;
              const isToday = key === dateKey(new Date());
              return (
                <button
                  className={`calendar-day${dayEvents.length ? ' calendar-day--has-events' : ''}${isSelected ? ' calendar-day--selected' : ''}${isToday ? ' calendar-day--today' : ''}`}
                  key={key}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`${day} de ${monthFormatter.format(visibleMonth)}${dayEvents.length ? `, ${dayEvents.length} ${dayEvents.length === 1 ? 'viaje' : 'viajes'}` : ', sin viajes'}`}
                  onClick={() => {
                    setHasInteracted(true);
                    setSelectedDate(key);
                  }}
                >
                  <span className="calendar-day__number">{day}</span>
                  {dayEvents.length ? <span className="calendar-day__count">{dayEvents.length} {dayEvents.length === 1 ? 'viaje' : 'viajes'}</span> : null}
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span className="calendar-legend__marker" />
            <span>{isAdmin ? 'Día con viaje o movimiento' : 'Día con viaje radicado'}</span>
          </div>
        </article>

        <aside className="panel calendar-details" aria-live="polite">
          <div className="calendar-details__heading">
            <span className="calendar-toolbar__eyebrow">Detalle del día</span>
            <h2>{selectedDateValue ? formatDate(selectedDate) : 'Selecciona una fecha'}</h2>
            {selectedEvents.length ? <p>{selectedEvents.length} {selectedEvents.length === 1 ? 'viaje' : 'viajes'} para esta fecha</p> : null}
          </div>
          {selectedEvents.length ? (
            <div className="calendar-event-list">
              {selectedEvents.map((event) => (
                <CalendarEventDetails key={`${event.kind}-${event.id}`} event={event} user={user} data={data} />
              ))}
            </div>
          ) : (
            <div className="calendar-empty">
              <span className="calendar-empty__icon" aria-hidden="true">▦</span>
              <strong>{selectedDateValue ? 'No hay viajes para este día' : 'Elige un día resaltado'}</strong>
              <p>{isAdmin ? 'Los viajes y movimientos de esa fecha aparecerán aquí.' : 'Los viajes que radiques aparecerán aquí en su fecha correspondiente.'}</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
