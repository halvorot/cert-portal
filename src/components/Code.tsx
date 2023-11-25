"use client";

import { useState } from "react";
import { BsCopy, BsCheck } from "react-icons/bs";

export default function Code({ code }: { code: string }) {
  const [icon, setIcon] = useState(<BsCopy />);

  const copy = async () => {
    await navigator?.clipboard?.writeText(code);
    setIcon(<BsCheck />);
    setTimeout(() => setIcon(<BsCopy />), 2000);
  };

  return (
    <pre className="bg-foreground/5 relative my-8 rounded-md p-8">
      <button
        onClick={copy}
        className="bg-foreground/5 hover:bg-foreground/10 absolute  right-4 top-4 rounded-md p-2"
      >
        {icon}
      </button>
      <code>{code}</code>
    </pre>
  );
}
