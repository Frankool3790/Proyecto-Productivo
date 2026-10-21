import DataTable from '../../components/DataTable/DataTable.jsx';
import SelectField from '../../components/SelectField/SelectField.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';
import { formatDate } from '../../utils/formatters/index.js';

const vehicleStatus = ['Disponible', 'En ruta', 'Mantenimiento'];

export default function Fleet() {
  const { data, updateVehicleStatus } = useAppData();

  const vehicleColumns = [
    {
      key: 'plate',
      header: 'Placa',
      render: (vehicle) => (
        <div className="table-main">
          <strong>{vehicle.plate}</strong>
          <span>{vehicle.type}</span>
        </div>
      ),
    },
    { key: 'capacity', header: 'Capacidad' },
    {
      key: 'nextMaintenance',
      header: 'Mantenimiento',
      render: (vehicle) => formatDate(vehicle.nextMaintenance),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (vehicle) => (
        <SelectField
          id={`vehicle-${vehicle.id}`}
          label="Estado"
          className="field--compact"
          value={vehicle.status}
          onChange={(event) => updateVehicleStatus(vehicle.id, event.target.value)}
          options={vehicleStatus}
        />
      ),
    },
  ];

  const driverColumns = [
    { key: 'name', header: 'Conductor' },
    { key: 'phone', header: 'Telefono' },
    { key: 'license', header: 'Licencia' },
    {
      key: 'status',
      header: 'Estado',
      render: (driver) => <StatusBadge value={driver.status} />,
    },
  ];

  return (
    <section className="page">
      <SectionHeader
        eyebrow="Recursos"
        title="Flota y conductores"
        description="Control de disponibilidad para camiones tipo NQR y personal operativo."
      />

      <div className="content-grid">
        <article className="panel panel--wide">
          <h2>Vehiculos NQR</h2>
          <DataTable columns={vehicleColumns} rows={data.vehicles} />
        </article>

        <article className="panel">
          <h2>Conductores</h2>
          <DataTable columns={driverColumns} rows={data.drivers} />
        </article>
      </div>
    </section>
  );
}
