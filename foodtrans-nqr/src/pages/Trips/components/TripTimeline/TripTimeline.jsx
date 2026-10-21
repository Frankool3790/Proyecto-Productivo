import { statusOptions } from '../../../../services/logistics/index.js';

export default function TripTimeline({ status }) {
  const activeIndex = statusOptions.indexOf(status);

  return (
    <div className="timeline" aria-label="Estado del viaje">
      {statusOptions.map((step, index) => (
        <div
          key={step}
          className={index <= activeIndex ? 'timeline__step timeline__step--active' : 'timeline__step'}
        >
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}
