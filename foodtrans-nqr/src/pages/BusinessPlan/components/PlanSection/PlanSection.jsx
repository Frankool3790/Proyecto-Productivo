export default function PlanSection({ section }) {
  return (
    <article className="plan-section" id={section.id}>
      <span>{section.accent}</span>
      <h2>{section.title}</h2>
      <p>{section.body}</p>
      <ul className="clean-list">
        {section.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
