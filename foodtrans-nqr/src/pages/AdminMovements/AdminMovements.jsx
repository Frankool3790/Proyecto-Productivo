import DataTable from '../../components/DataTable/DataTable.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatCard from '../../components/StatCard/StatCard.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';
import { formatCurrency, formatDate } from '../../utils/formatters/index.js';

export default function AdminMovements() {
  const { movements } = useAppData();
  const totalPayable = movements.reduce((sum, movement) => sum + Number(movement.totalPayable || 0), 0);
  const totalMtu = movements.reduce((sum, movement) => sum + Number(movement.mtu || 0), 0);
  const totalAdvances = movements.reduce((sum, movement) => sum + Number(movement.advances || 0), 0);

  const columns = [
    { key: 'movementNo', header: 'Movimiento N.º', render: (item) => `#${item.movementNo}` },
    { key: 'movementDate', header: 'Fecha', render: (item) => formatDate(item.movementDate) },
    { key: 'clientName', header: 'Cliente' },
    { key: 'ownerName', header: 'Propietario' },
    { key: 'vehicle', header: 'Vehículo' },
    { key: 'trailer', header: 'Trailer' },
    { key: 'origin', header: 'Origen' },
    { key: 'destination', header: 'Destino' },
    { key: 'manifestNumber', header: 'Manifiesto' },
    { key: 'mtu', header: 'MTU', render: (item) => formatCurrency(item.mtu) },
    { key: 'thirdPartyFreight', header: 'Flete tercero', render: (item) => formatCurrency(item.thirdPartyFreight) },
    { key: 'thirdPartyConnections', header: 'Conexos terceros', render: (item) => formatCurrency(item.thirdPartyConnections) },
    { key: 'advances', header: 'Anticipos', render: (item) => formatCurrency(item.advances) },
    { key: 'withholding', header: 'Retefuente', render: (item) => formatCurrency(item.withholding) },
    { key: 'ica', header: 'ICA', render: (item) => formatCurrency(item.ica) },
    { key: 'retentionFopat', header: 'Retención FOPAT', render: (item) => formatCurrency(item.retentionFopat) },
    { key: 'totalPayable', header: 'Total a pagar', render: (item) => <strong>{formatCurrency(item.totalPayable)}</strong> },
  ];

  return (
    <section className="page movement-page">
      <SectionHeader eyebrow="Administración" title="Movimientos de clientes" description="Consulta los movimientos radicados por las cuentas cliente. La lista se actualiza automáticamente cada 10 segundos." />
      <div className="stats-grid movement-stats">
        <StatCard label="Movimientos recibidos" value={movements.length} meta="Todas las cuentas cliente" tone="info" />
        <StatCard label="MTU acumulado" value={formatCurrency(totalMtu)} meta="Suma reportada" />
        <StatCard label="Anticipos acumulados" value={formatCurrency(totalAdvances)} meta="Suma reportada" tone="warning" />
        <StatCard label="Total a pagar" value={formatCurrency(totalPayable)} meta="Suma reportada" tone="success" />
      </div>
      <article className="panel">
        <h2>Detalle radicado</h2>
        <DataTable columns={columns} rows={movements} empty="Aún no hay movimientos de clientes." />
      </article>
    </section>
  );
}
