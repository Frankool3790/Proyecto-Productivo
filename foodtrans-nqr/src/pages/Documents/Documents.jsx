import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import DataTable from '../../components/DataTable/DataTable.jsx';
import SelectField from '../../components/SelectField/SelectField.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import TextField from '../../components/TextField/TextField.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';
import { formatDate } from '../../utils/formatters/index.js';

const documentTypes = ['Factura', 'Remision', 'Carta porte', 'Evidencia', 'Otro'];
const documentStatuses = ['Cargado', 'Pendiente revision', 'Aprobado'];

export default function Documents() {
  const { data, addDocument } = useAppData();
  const [form, setForm] = useState({
    tripId: data.trips[0]?.id || '',
    type: 'Factura',
    name: '',
    status: 'Cargado',
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDocument(form);
    setForm((current) => ({ ...current, name: '', status: 'Cargado' }));
  };

  const columns = [
    {
      key: 'name',
      header: 'Documento',
      render: (document) => (
        <div className="table-main">
          <strong>{document.name}</strong>
          <span>{document.type}</span>
        </div>
      ),
    },
    {
      key: 'tripId',
      header: 'Viaje',
      render: (document) => {
        const trip = data.trips.find((item) => item.id === document.tripId);
        return trip ? `${trip.route} - ${trip.invoice}` : 'Sin viaje';
      },
    },
    {
      key: 'uploadedAt',
      header: 'Fecha',
      render: (document) => formatDate(document.uploadedAt),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (document) => <StatusBadge value={document.status} />,
    },
  ];

  return (
    <section className="page">
      <SectionHeader
        eyebrow="Archivo"
        title="Documentos y evidencias"
        description="Relaciona facturas, remisiones, cartas porte y evidencias directamente con el viaje."
      />

      <article className="panel">
        <h2>Cargar registro documental</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <SelectField
            id="doc-trip"
            label="Viaje"
            name="tripId"
            value={form.tripId}
            onChange={updateField}
            options={data.trips.map((trip) => ({ value: trip.id, label: `${trip.route} - ${trip.invoice}` }))}
          />
          <SelectField id="doc-type" label="Tipo" name="type" value={form.type} onChange={updateField} options={documentTypes} />
          <TextField id="doc-name" label="Nombre" name="name" value={form.name} onChange={updateField} required />
          <SelectField
            id="doc-status"
            label="Estado"
            name="status"
            value={form.status}
            onChange={updateField}
            options={documentStatuses}
          />
          <div className="form-actions">
            <Button type="submit">Guardar documento</Button>
          </div>
        </form>
      </article>

      <article className="panel">
        <h2>Repositorio documental</h2>
        <DataTable columns={columns} rows={data.documents} />
      </article>
    </section>
  );
}
