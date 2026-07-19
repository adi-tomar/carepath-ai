interface SupportSectionsProps {
  questions: string[];
  missingInformation: string[];
  risks: string[];
}

export function SupportSections({ questions, missingInformation, risks }: SupportSectionsProps) {
  const sections = [
    {
      title: "Questions for the care team",
      items: questions,
      accent: "border-sky-100 bg-sky-50/50",
      pill: "bg-sky-100 text-sky-700",
    },
    {
      title: "Missing information",
      items: missingInformation,
      accent: "border-amber-100 bg-amber-50/50",
      pill: "bg-amber-100 text-amber-700",
    },
    {
      title: "Coordination risks",
      items: risks,
      accent: "border-rose-100 bg-rose-50/50",
      pill: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sections.map((section) => (
        <section key={section.title} className={`rounded-2xl border p-5 shadow-sm ${section.accent}`}>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${section.pill}`}>
            {section.items.length} items
          </span>
          <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
          {section.items.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {section.items.map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 p-3">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">No information provided.</p>
          )}
        </section>
      ))}
    </div>
  );
}
