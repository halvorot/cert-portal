interface Props {
  text: string;
  classes?: string;
}

export default function H1({ text, classes }: Props) {
  return (
    <h2 className={`mb-12 text-center text-3xl font-light capitalize ${classes}`}>
      {text}
    </h2>
  );
}
