import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import TextField from '../../components/TextField/TextField.jsx';

export default function AuthPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onLogin({ email: form.email, password: form.password });
    } catch (submitError) {
      setError(submitError.message || 'No fue posible iniciar sesión.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-card">
        <div className="brand auth-brand">
          <div className="brand__mark">FT</div>
          <div><strong>FoodTrans NQR</strong><span>Gestión de transporte</span></div>
        </div>
        <span className="eyebrow">Portal seguro</span>
        <h1>Bienvenido de nuevo</h1>
        <p>Ingresa con las credenciales que te proporcionó el administrador.</p>
        <form className="auth-form" onSubmit={submit}>
          <TextField id="email" name="email" label="Correo electrónico" type="email" autoComplete="email" value={form.email} onChange={update} required />
          <TextField id="password" name="password" label="Contraseña" type="password" autoComplete="current-password" value={form.password} onChange={update} required />
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <Button type="submit" disabled={busy}>{busy ? 'Un momento…' : 'Iniciar sesión'}</Button>
        </form>
        <small className="auth-footnote">¿Necesitas acceso? Solicita una cuenta al administrador de FoodTrans.</small>
      </section>
    </main>
  );
}
