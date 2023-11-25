interface Props {
  text: string;
  href: string;
  ariaLabel: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export default function H1({ text, ariaLabel, href, target }: Props) {
  return (
    <button
      type="button"
      className={`rounded-lg bg-primary px-4 py-2 text-center font-medium text-light transition hover:bg-primary-accent focus:outline-none focus:ring-4 focus:ring-primary-accent/80`}
      aria-label={ariaLabel}
    >
      <a href={href} target={target}>
        {text}
      </a>
    </button>
  );
}
