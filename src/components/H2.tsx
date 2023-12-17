import { SlideFade } from "@chakra-ui/react";

interface Props {
  text: string;
  classes?: string;
}

export default function H2({ text, classes }: Props) {
  return (
    <SlideFade in={true} offsetY={"20px"}>
      <h2
        className={`mb-12 text-center text-2xl font-light md:text-3xl ${classes}`}
      >
        {text}
      </h2>
    </SlideFade>
  );
}
