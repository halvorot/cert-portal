"use client";
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  SlideFade,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsSearch, BsX } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

export default function CertificationSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <SlideFade in={true} offsetY={"20px"}>
      <Center>
        <InputGroup maxWidth="30rem" marginBottom={10}>
          <InputLeftElement pointerEvents="none">
            <BsSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search for certifications by name..."
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
      </Center>
    </SlideFade>
  );
}
