import { HStack, Progress, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function RatingsBar({
  label,
  score,
  minScore,
  maxScore,
  variant = "default",
}: {
  label: string;
  score: number;
  minScore: number;
  maxScore: number;
  variant?: "default" | "slim";
}) {
  return (
    <Stack width="100%">
      <HStack justify="space-between">
        <Text fontSize={variant === "slim" ? "md" : "lg"}>{label}</Text>
        <Text fontSize={variant === "slim" ? "md" : "lg"}>
          {score.toFixed(1)}
        </Text>
      </HStack>
      <Progress
        width="100%"
        value={score}
        min={minScore}
        max={maxScore}
        rounded="md"
        size={variant === "slim" ? "sm" : "md"}
      />
    </Stack>
  );
}
