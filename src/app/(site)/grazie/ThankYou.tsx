"use client";

import { useSearchParams } from "next/navigation";
import type { ThankYou as ThankYouValue } from "@/content/types";
import { mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/Icons";
import { Lines, WithEmail } from "@/components/Lines";

type Props = { content: ThankYouValue; email: string };

/** Sceglie i testi in base al servizio acquistato (?servizio=consulenza|mappa). */
export function ThankYou(props: Props) {
  const servizio = useSearchParams().get("servizio");
  const variant = servizio === "consulenza" || servizio === "mappa" ? servizio : "generico";
  return <ThankYouContent {...props} variant={variant} />;
}

export function ThankYouContent({
  content,
  email,
  variant = "generico",
}: Props & { variant?: keyof ThankYouValue["variants"] }) {
  const copy = content.variants[variant];
  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>
        <Lines text={copy.title} />
      </h1>
      <p>{copy.intro}</p>
      <h2>{content.prepareTitle}</h2>
      <ul>
        {content.prepare.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p>
        {copy.when} <WithEmail text={content.contact} email={email} />
      </p>
      <a className="button hero-button" href={mailto(email, copy.subject, content.emailBody)}>
        {content.button} <ArrowUpRight className="arrow" />
      </a>
    </>
  );
}
