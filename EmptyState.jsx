export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-ink/15 px-6 py-16 text-center">
      <h3 className="font-display text-xl text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-soft/70">{description}</p>}
      {action}
    </div>
  );
}
