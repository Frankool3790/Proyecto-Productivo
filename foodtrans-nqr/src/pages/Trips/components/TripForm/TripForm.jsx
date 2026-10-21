import { useState } from 'react';
import Button from '../../../../components/Button/Button.jsx';
import SelectField from '../../../../components/SelectField/SelectField.jsx';
import TextField from '../../../../components/TextField/TextField.jsx';
import { priorityOptions, routeOptions } from '../../../../services/logistics/index.js';

const today = new Date().toISOString().slice(0, 10);

export default function TripForm({ clients, drivers, vehicles, onCreate }) {
  const [form, setForm] = useState({
    clientId: clients[0]?.id || '',
    vehicleId: vehicles[0]?.id || '',
    driverId: drivers[0]?.id || '',
    route: routeOptions[0],
    product: '',
    departure: today,
    eta: today,
    invoice: 'Pendiente',
    value: '',
    priority: 'Normal',
    notes: '',
    status: 'Programado',
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(form);
    setForm((current) => ({
      ...current,
      product: '',
      invoice: 'Pendiente',
      value: '',
      notes: '',
      priority: 'Normal',
      status: 'Programado',
    }));
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <SelectField
        id="clientId"
        label="Cliente"
        name="clientId"
        value={form.clientId}
        onChange={updateField}
        options={clients.map((client) => ({ value: client.id, label: client.name }))}
      />
      <SelectField
        id="vehicleId"
        label="Vehiculo"
        name="vehicleId"
        value={form.vehicleId}
        onChange={updateField}
        options={vehicles.map((vehicle) => ({ value: vehicle.id, label: vehicle.plate }))}
      />
      <SelectField
        id="driverId"
        label="Conductor"
        name="driverId"
        value={form.driverId}
        onChange={updateField}
        options={drivers.map((driver) => ({ value: driver.id, label: driver.name }))}
      />
      <SelectField
        id="route"
        label="Ruta"
        name="route"
        value={form.route}
        onChange={updateField}
        options={routeOptions}
      />
      <TextField id="product" label="Producto" name="product" value={form.product} onChange={updateField} required />
      <TextField id="departure" label="Fecha salida" name="departure" type="date" value={form.departure} onChange={updateField} />
      <TextField id="eta" label="Fecha llegada" name="eta" type="date" value={form.eta} onChange={updateField} />
      <TextField id="invoice" label="Factura" name="invoice" value={form.invoice} onChange={updateField} />
      <TextField id="value" label="Valor del servicio" name="value" type="number" value={form.value} onChange={updateField} required />
      <SelectField
        id="priority"
        label="Prioridad"
        name="priority"
        value={form.priority}
        onChange={updateField}
        options={priorityOptions}
      />
      <TextField className="field--full" id="notes" label="Notas" name="notes" value={form.notes} onChange={updateField} />
      <div className="form-actions">
        <Button type="submit">Crear viaje</Button>
      </div>
    </form>
  );
}
