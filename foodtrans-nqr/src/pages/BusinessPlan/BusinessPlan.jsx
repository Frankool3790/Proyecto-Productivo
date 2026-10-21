import DataTable from '../../components/DataTable/DataTable.jsx';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import {
  businessPlanSections,
  implementationPlan,
} from '../../services/business-plan/index.js';
import PlanSection from './components/PlanSection/PlanSection.jsx';

export default function BusinessPlan() {
  const implementationRows = implementationPlan.map((activity, index) => ({
    id: activity,
    month: index + 1,
    activity,
  }));

  const implementationColumns = [
    { key: 'month', header: 'Mes' },
    { key: 'activity', header: 'Actividad' },
  ];

  return (
    <section className="page">
      <SectionHeader
        eyebrow="Documento base"
        title="Plan de negocio FoodTrans NQR"
        description="Sintesis aplicada del formato de plan de negocio ajustado 2026-1."
      />

      <div className="plan-grid">
        {businessPlanSections.map((section) => (
          <PlanSection key={section.id} section={section} />
        ))}
      </div>

      <article className="panel">
        <h2>Plan de implementacion</h2>
        <DataTable columns={implementationColumns} rows={implementationRows} />
      </article>
    </section>
  );
}
