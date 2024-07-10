import { Box, Skeleton, Spinner, Stack } from "@chakra-ui/react";

export function LoadingComponent({ flex }) {
  return (
    <>
      <Stack my={4}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </>
  );
}
