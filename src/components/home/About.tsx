import Image from "next/image";
import { FAQ, PROCESS } from "@/content/faq";
import { PORTRAIT } from "@/content/images";
import { SITE } from "@/lib/site";

export function About() {
  return (
    <section id="chi-sono" className="section wrap" aria-labelledby="chi-sono-title">
      <div className="about">
        <div className="about-intro" data-reveal>
          <p className="eyebrow">03 / Il mio approccio</p>
          <h2 id="chi-sono-title">
            Piacere,
            <br />
            <em>sono Marianna.</em>
          </h2>
          <div className="about-portrait">
            <Image src={PORTRAIT.src} alt={PORTRAIT.alt} width={PORTRAIT.width} height={PORTRAIT.height} sizes="240px" />
          </div>
        </div>
        <div className="about-copy" data-reveal>
          <h3>Ti aiuto a dare una direzione alle idee e forma ai tuoi spazi.</h3>
          <p>
            Mi sono formata in architettura e ho scelto di dedicarmi all’interior design: all’organizzazione degli spazi e
            all’equilibrio tra materia e forme.
          </p>
          <p>
            Spesso le difficoltà nascono all’inizio: si scelgono pavimenti, colori e arredi separatamente, senza sapere
            come funzioneranno insieme. Il mio lavoro parte da qui: mettere ordine nelle idee e sviluppare una visione
            d’insieme prima di procedere con le singole decisioni.
          </p>
          <p>Partiamo dalle tue ispirazioni, da chi sei, da come vivi quotidianamente i tuoi spazi.</p>
          <p>
            Attraverso le moodboard traduco questi riferimenti in una direzione progettuale, che sviluppo nella
            disposizione degli spazi, nei materiali, nei colori e in tutto l’arredamento. Un progetto in cui ritrovare
            chi sei e ciò che ti piace, con un filo conduttore tra le diverse scelte.
          </p>
          <p>
            Lavoriamo online, attraverso fotografie, planimetrie e videocall, dalle prime idee alla definizione del
            progetto di interior.
          </p>
          <div className="about-signature">
            <p>
              <strong>{SITE.owner.name}</strong>
              <br />
              Interior designer
            </p>
          </div>
          <a className="text-link" href="#servizi">
            Scegliamo da dove iniziare <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="process">
        <h3 className="eyebrow">Come lavoriamo insieme</h3>
        <ol className="process-grid">
          {PROCESS.map((step, i) => (
            <li className="process-item" key={step.title} data-reveal>
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
          <p className="eyebrow">Prima di iniziare</p>
          <h2>
            Qualche
            <br />
            <em>risposta utile.</em>
          </h2>
        </div>
        <div>
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
