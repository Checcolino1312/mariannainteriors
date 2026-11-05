import Image from "next/image";
import type { Home, Settings } from "@/content/types";
import { ArrowUpRight } from "@/components/Icons";
import { Lines } from "@/components/Lines";
import { RichText } from "@/components/RichText";

type Props = {
  about: Home["about"];
  process: Home["process"];
  faq: Home["faq"];
  settings: Settings;
};

export function About({ about, process, faq, settings }: Props) {
  const { portrait } = about;
  return (
    <section id="chi-sono" className="section wrap" aria-labelledby="chi-sono-title">
      <div className="about">
        <div className="about-head">
          <p className="eyebrow" data-reveal>
            {about.eyebrow}
          </p>
          <h2 id="chi-sono-title" data-reveal>
            <Lines text={about.title} />
          </h2>
        </div>
        <div className="about-portrait" data-reveal="image">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(max-width: 620px) 90vw, 440px"
          />
        </div>
        <div className="about-copy" data-reveal-group>
          <h3>{about.subtitle}</h3>
          <RichText value={about.body} />
          <div className="about-signature">
            <p>
              <strong>{settings.ownerName}</strong>
              <br />
              {about.signatureRole}
            </p>
          </div>
          <a className="text-link" href="#servizi">
            {about.link} <ArrowUpRight className="arrow" />
          </a>
        </div>
      </div>

      <div className="process">
        <h3 className="eyebrow" data-reveal="fade">
          {process.title}
        </h3>
        <ol className="process-grid" data-reveal-group>
          {process.steps.map((step, i) => (
            <li className="process-item" key={i}>
              <span className="number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="faq">
        <div data-reveal>
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2>
            <Lines text={faq.title} />
          </h2>
        </div>
        <div data-reveal-group>
          {faq.items.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
