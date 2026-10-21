import DataTable from '../../components/DataTable/DataTable.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import StatCard from '../../components/StatCard/StatCard.jsx';
import { financialProjection, riskMatrix } from '../../services/business-plan/index.js';
import { formatCurrency } from '../../utils/formatters/index.js';

export default function Reports() {
  const totalProjectedIncome = financialProjection.reduce((total, row) => total + row.income, 0);
  const totalProjectedCosts = financialProjection.reduce(
    (total, row) => total + row.admin + row.sales + row.production,
    0,
  );
  const estimatedMargin = totalProjectedIncome - totalProjectedCosts;

  const financialColumns = [
    { key: 'year', header: 'Periodo' },
    { key: 'clients', header: 'Clientes' },
    { key: 'income', header: 'Ingresos', render: (row) => formatCurrency(row.income) },
    { key: 'admin', header: 'Gastos admin.', render: (row) => formatCurrency(row.admin) },
    { key: 'sales', header: 'Ventas', render: (row) => formatCurrency(row.sales) },
    { key: 'production', header: 'Produccion', render: (row) => formatCurrency(row.production) },
  ];

  const riskColumns = [
    { key: 'variable', header: 'Variable' },
    { key: 'risk', header: 'Riesgo' },
    { key: 'mitigation', header: 'Plan de mitigacion' },
  ];

  return (
    <section className="page">
      <SectionHeader
        eyebrow="Analisis"
        title="Reportes financieros y riesgos"
        description="Proyeccion base para evaluar ingresos, costos y variables criticas del negocio."
      />

      <div className="stats-grid">
        <StatCard label="Ingresos a 5 anos" value={formatCurrency(totalProjectedIncome)} tone="success" />
        <StatCard label="Costos y gastos" value={formatCurrency(totalProjectedCosts)} tone="warning" />
        <StatCard label="Margen estimado" value={formatCurrency(estimatedMargin)} tone="info" />
      </div>

      <article className="panel">
        <h2>Proyeccion financiera</h2>
        <DataTable columns={financialColumns} rows={financialProjection.map((row) => ({ ...row, id: row.year }))} />
      </article>

      <article className="panel">
        <h2>Matriz de riesgos</h2>
        <DataTable columns={riskColumns} rows={riskMatrix.map((row) => ({ ...row, id: row.variable }))} />
      </article>
    </section>
  );
}
