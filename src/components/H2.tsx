interface Props {
  text: string;
  classes?: string;
}

export default function H1({ text, classes }: Props) {
  return (
    <h2 className={`mb-12 text-center text-3xl font-light ${classes}`}>
      {text}
    </h2>
  );
}
