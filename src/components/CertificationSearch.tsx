"use client";
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SlideFade,
  Tooltip,
  Text,
  Stack,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsInfoCircle, BsSearch } from "react-icons/bs";
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
  }, 400);

  const tooltipMessage = (
    <Stack spacing={0.1}>
      <Text>Search examples:</Text>
      <UnorderedList paddingLeft={"0.3rem"}>
        <ListItem>
          <strong>kotlin java</strong> - 'kotlin' AND 'java'
        </ListItem>
        <ListItem>
          <strong>kotlin or java</strong> - 'kotlin' OR 'java'
        </ListItem>
        <ListItem>
          <strong>"kotlin java"</strong> - exact match
        </ListItem>
        <ListItem>
          <strong>kotlin -java</strong> - 'kotlin' AND NOT 'java'
        </ListItem>
      </UnorderedList>
    </Stack>
  );

  return (
    <SlideFade in={true} offsetY={"20px"}>
      <Center>
        <InputGroup maxWidth="30rem" marginBottom={10}>
          <InputLeftElement pointerEvents="none">
            <BsSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search by exam code, name or description..."
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputRightElement pointerEvents={"auto"}>
            <Tooltip
              hasArrow
              label={tooltipMessage}
              placement="right"
              closeDelay={500}
              shouldWrapChildren
              padding={"0.5rem"}
              paddingLeft={"1rem"}
            >
              <BsInfoCircle color="gray.300" />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </Center>
    </SlideFade>
  );
}
