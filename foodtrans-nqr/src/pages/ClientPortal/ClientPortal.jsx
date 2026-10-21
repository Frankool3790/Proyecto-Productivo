import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import DataTable from '../../components/DataTable/DataTable.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatCard from '../../components/StatCard/StatCard.jsx';
import TextField from '../../components/TextField/TextField.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';
import { useUser } from '../../contexts/UserContext/index.js';
import { formatCurrency, formatDate } from '../../utils/formatters/index.js';

const today = new Date().toISOString().slice(0, 10);
const blankMovement = (user) => ({
  movementDate: today,
  clientName: user.companyName || '',
  ownerName: user.name || '',
  vehicle: '',
  trailer: '',
  origin: '',
  destination: '',
  manifestNumber: '',
  mtu: '0',
  thirdPartyFreight: '0',
  thirdPartyConnections: '0',
  advances: '0',
  withholding: '0',
  ica: '0',
  retentionFopat: '0',
  totalPayable: '0',
});

const amountFields = [
  ['mtu', 'MTU'],
  ['thirdPartyFreight', 'Flete tercero'],
  ['thirdPartyConnections', 'Total conexos terceros'],
  ['advances', 'Total anticipos'],
  ['withholding', 'Retefuente'],
  ['ica', 'ICA'],
  ['retentionFopat', 'Retención FOPAT'],
  ['totalPayable', 'Total a pagar'],
];

export default function ClientPortal() {
  const { user } = useUser();
  const { movements, addMovement } = useAppData();
  const [form, setForm] = useState(() => blankMovement(user));
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const totalPayable = movements.reduce((sum, movement) => sum + Number(movement.totalPayable || 0), 0);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await addMovement(form);
      setForm(blankMovement(user));
      setNotice('Movimiento radicado. Ya está disponible para administración.');
    } catch (submitError) {
      setError(submitError.message || 'No fue posible guardar el movimiento.');
    } finally {
      setBusy(false);
    }
  }

  const columns = [
    { key: 'movementNo', header: 'N.º', render: (movement) => `#${movement.movementNo}` },
    { key: 'movementDate', header: 'Fecha', render: (movement) => formatDate(movement.movementDate) },
    { key: 'manifestNumber', header: 'Manifiesto' },
    { key: 'vehicle', header: 'Vehículo' },
    { key: 'route', header: 'Origen / destino', render: (movement) => `${movement.origin} → ${movement.destination}` },
    { key: 'totalPayable', header: 'Total a pagar', render: (movement) => formatCurrency(movement.totalPayable) },
  ];

  return (
    <section className="page">
      <SectionHeader eyebrow="Portal cliente" title="Radicar movimiento" description="Ingresa los datos del manifiesto y los valores para que el equipo de administración los consulte en tiempo real." />
      <div className="stats-grid client-stats">
        <StatCard label="Movimientos radicados" value={movements.length} meta="En tu cuenta" tone="info" />
        <StatCard label="Total a pagar" value={formatCurrency(totalPayable)} meta="Suma de tus movimientos" tone="success" />
      </div>
      <article className="panel">
        <h2>Datos del movimiento</h2>
        <form className="form-grid movement-form" onSubmit={submit}>
          <TextField id="movementDate" name="movementDate" label="Fecha movimiento" type="date" value={form.movementDate} onChange={update} required />
          <TextField id="clientName" name="clientName" label="Cliente" value={form.clientName} onChange={update} required />
          <TextField id="ownerName" name="ownerName" label="Propietario" value={form.ownerName} onChange={update} required />
          <TextField id="vehicle" name="vehicle" label="Vehículo" placeholder="Ej. NNV110" value={form.vehicle} onChange={update} required />
          <TextField id="trailer" name="trailer" label="Trailer" value={form.trailer} onChange={update} />
          <TextField id="origin" name="origin" label="Origen" value={form.origin} onChange={update} required />
          <TextField id="destination" name="destination" label="Destino" value={form.destination} onChange={update} required />
          <TextField id="manifestNumber" name="manifestNumber" label="Manifiesto" value={form.manifestNumber} onChange={update} required />
          {amountFields.map(([name, label]) => (
            <TextField key={name} id={name} name={name} label={`${label} (COP)`} type="number" min="0" step="0.01" value={form[name]} onChange={update} required />
          ))}
          <div className="movement-actions">
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            {notice ? <p className="form-success" role="status">{notice}</p> : null}
            <Button type="submit" disabled={busy}>{busy ? 'Guardando…' : 'Radicar movimiento'}</Button>
          </div>
        </form>
      </article>
      <article className="panel">
        <h2>Mis movimientos</h2>
        <DataTable columns={columns} rows={movements} empty="Todavía no has radicado movimientos." />
      </article>
    </section>
  );
}
