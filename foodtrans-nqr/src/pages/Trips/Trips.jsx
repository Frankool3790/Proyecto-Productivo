import DataTable from '../../components/DataTable/DataTable.jsx';
import SelectField from '../../components/SelectField/SelectField.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';
import {
  getNameById,
  getVehicleLabel,
  statusOptions,
} from '../../services/logistics/index.js';
import { formatCurrency, formatDate } from '../../utils/formatters/index.js';
import TripForm from './components/TripForm/TripForm.jsx';
import TripTimeline from './components/TripTimeline/TripTimeline.jsx';

export default function Trips() {
  const { data, addTrip, updateTripStatus } = useAppData();

  const columns = [
    {
      key: 'service',
      header: 'Servicio',
      render: (trip) => (
        <div className="table-main">
          <strong>{trip.route}</strong>
          <span>{trip.product}</span>
        </div>
      ),
    },
    {
      key: 'team',
      header: 'Equipo',
      render: (trip) => (
        <div className="table-main">
          <strong>{getVehicleLabel(data.vehicles, trip.vehicleId)}</strong>
          <span>{getNameById(data.drivers, trip.driverId)}</span>
        </div>
      ),
    },
    {
      key: 'client',
      header: 'Cliente',
      render: (trip) => getNameById(data.clients, trip.clientId),
    },
    {
      key: 'dates',
      header: 'Fechas',
      render: (trip) => `${formatDate(trip.departure)} / ${formatDate(trip.eta)}`,
    },
    {
      key: 'value',
      header: 'Valor',
      render: (trip) => formatCurrency(trip.value),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (trip) => (
        <SelectField
          id={`status-${trip.id}`}
          label="Cambiar estado"
          className="field--compact"
          value={trip.status}
          onChange={(event) => updateTripStatus(trip.id, event.target.value)}
          options={statusOptions}
        />
      ),
    },
  ];

  return (
    <section className="page">
      <SectionHeader
        eyebrow="Logistica"
        title="Gestion de viajes"
        description="Registra servicios, controla su estado y conserva la trazabilidad de cada operacion."
      />

      <article className="panel">
        <h2>Nuevo viaje</h2>
        <TripForm clients={data.clients} drivers={data.drivers} vehicles={data.vehicles} onCreate={addTrip} />
      </article>

      <article className="panel">
        <h2>Seguimiento operativo</h2>
        <TripTimeline status={data.trips[0]?.status || 'Programado'} />
      </article>

      <article className="panel">
        <h2>Viajes registrados</h2>
        <DataTable columns={columns} rows={data.trips} />
      </article>
    </section>
  );
}
