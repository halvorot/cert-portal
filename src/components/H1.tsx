interface Props {
  preText: string;
  gradientText: string;
}

export default function H1({ preText, gradientText }: Props) {
  return (
    <h1 className="my-16 text-center text-5xl md:text-6xl font-bold leading-tight break-words hyphens-auto">
      {preText + " "}
      <span className="bg-gradient-to-r from-primary from-10% to-secondary-accent bg-clip-text text-transparent">
        {gradientText}
      </span>
    </h1>
  );
}
