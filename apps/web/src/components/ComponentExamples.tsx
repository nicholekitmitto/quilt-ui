import reactElementToJSXString from "react-element-to-jsx-string";
import { getExamples } from "../content/examples";

export default function ComponentExamples({ componentKey }: { componentKey: string }) {
  const examples = getExamples(componentKey);

  if (examples.length === 0) return null;

  return (
    <section>
      <h2>Examples</h2>
      {examples.map((ex) => {
        const rendered = ex.variants.map((v) => v.render());
        const code = rendered
          .map((el) =>
            reactElementToJSXString(el, {
              showDefaultProps: false,
              maxInlineAttributesLineLength: 120,
              useBooleanShorthandSyntax: true,
            })
          )
          .join("\n");

        return (
          <div key={ex.title} className="example-card">
            <h3>{ex.title}</h3>
            <p>{ex.description}</p>
            <div className="example-preview">
              {ex.variants.map((v) => (
                <div key={v.label} className="example-variant">
                  <span className="example-variant-label">{v.label}</span>
                  {v.render()}
                </div>
              ))}
            </div>
            <pre><code>{code}</code></pre>
          </div>
        );
      })}
    </section>
  );
}
