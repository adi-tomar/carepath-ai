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
    },
    {
      title: "Missing information",
      items: missingInformation,
    },
    {
      title: "Coordination risks",
      items: risks,
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <section key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
