import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import DataTable from '../../components/DataTable/DataTable.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatCard from '../../components/StatCard/StatCard.jsx';
import TextField from '../../components/TextField/TextField.jsx';
import { useAppData } from '../../contexts/AppDataContext/index.js';

const emptyForm = { fullName: '', companyName: '', email: '', password: '' };

export default function Clients() {
  const { clients, addClient, updateClient } = useAppData();
  const [form, setForm] = useState(emptyForm);
  const [editingClient, setEditingClient] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', companyName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function updateEdit(event) {
    setEditForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function startEditing(client) {
    setEditingClient(client);
    setEditForm({ fullName: client.name || '', companyName: client.companyName || '', email: client.email || '', password: '' });
    setError('');
    setNotice('');
  }

  function cancelEditing() {
    setEditingClient(null);
    setEditForm({ fullName: '', companyName: '', email: '', password: '' });
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await addClient(form);
      setForm(emptyForm);
      setNotice('Cliente creado. Comparte sus credenciales de acceso de forma segura.');
    } catch (submitError) {
      setError(submitError.message || 'No fue posible crear la cuenta.');
    } finally {
      setBusy(false);
    }
  }

  async function submitEdit(event) {
    event.preventDefault();
    if (!editingClient) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await updateClient(editingClient.id, editForm);
      setNotice(`Se actualizaron los datos de ${editForm.fullName}.`);
      cancelEditing();
    } catch (submitError) {
      setError(submitError.message || 'No fue posible actualizar la cuenta.');
    } finally {
      setBusy(false);
    }
  }

  const columns = [
    { key: 'name', header: 'Propietario / contacto' },
    { key: 'companyName', header: 'Empresa' },
    { key: 'email', header: 'Correo de acceso' },
    {
      key: 'createdAt',
      header: 'Fecha de registro',
      render: (client) => client.createdAt ? new Date(client.createdAt.replace(' ', 'T')).toLocaleDateString('es-CO') : '—',
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (client) => <Button type="button" variant="secondary" className="client-edit-button" onClick={() => startEditing(client)}>Editar</Button>,
    },
  ];

  return (
    <section className="page">
      <SectionHeader eyebrow="Administración" title="Clientes" description="Crea las cuentas que usarán el portal y consulta los clientes registrados." />
      <div className="stats-grid client-admin-stats">
        <StatCard label="Clientes registrados" value={clients.length} meta="Cuentas con acceso al portal" tone="info" />
      </div>
      <article className="panel">
        <h2>Crear cuenta de cliente</h2>
        <form className="form-grid" onSubmit={submit}>
          <TextField id="clientFullName" name="fullName" label="Nombre del propietario / contacto" autoComplete="name" value={form.fullName} onChange={update} required />
          <TextField id="clientCompanyName" name="companyName" label="Empresa" autoComplete="organization" value={form.companyName} onChange={update} required />
          <TextField id="clientEmail" name="email" label="Correo de acceso" type="email" autoComplete="email" value={form.email} onChange={update} required />
          <TextField id="clientPassword" name="password" label="Contraseña inicial" type="password" autoComplete="new-password" minLength={8} value={form.password} onChange={update} required />
          <div className="movement-actions">
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            {notice ? <p className="form-success" role="status">{notice}</p> : null}
            <Button type="submit" disabled={busy}>{busy ? 'Creando…' : 'Crear cliente'}</Button>
          </div>
        </form>
      </article>
      {editingClient ? (
        <article className="panel client-edit-panel">
          <div className="client-edit-heading">
            <div>
              <h2>Editar cliente</h2>
              <p>Actualiza los datos de acceso de {editingClient.name}. Deja la contraseña vacía para conservar la actual.</p>
            </div>
            <Button type="button" variant="secondary" onClick={cancelEditing}>Cancelar</Button>
          </div>
          <form className="form-grid" onSubmit={submitEdit}>
            <TextField id="editClientFullName" name="fullName" label="Nombre del propietario / contacto" autoComplete="name" value={editForm.fullName} onChange={updateEdit} required />
            <TextField id="editClientCompanyName" name="companyName" label="Empresa" autoComplete="organization" value={editForm.companyName} onChange={updateEdit} required />
            <TextField id="editClientEmail" name="email" label="Correo de acceso" type="email" autoComplete="email" value={editForm.email} onChange={updateEdit} required />
            <TextField id="editClientPassword" name="password" label="Nueva contraseña (opcional)" type="password" autoComplete="new-password" minLength={8} value={editForm.password} onChange={updateEdit} />
            <div className="movement-actions">
              {error ? <p className="form-error" role="alert">{error}</p> : null}
              <Button type="submit" disabled={busy}>{busy ? 'Guardando…' : 'Guardar cambios'}</Button>
            </div>
          </form>
        </article>
      ) : null}
      {!editingClient && (error || notice) ? (
        <div className="client-feedback">
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          {notice ? <p className="form-success" role="status">{notice}</p> : null}
        </div>
      ) : null}
      <article className="panel">
        <h2>Clientes registrados</h2>
        <DataTable columns={columns} rows={clients} empty="Aún no hay cuentas cliente." />
      </article>
    </section>
  );
}
