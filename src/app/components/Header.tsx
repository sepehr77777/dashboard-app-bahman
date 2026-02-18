"use client";

import { Flex, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex
      h="60px"
      bg="white"
      align="center"
      px={6}
      shadow="sm"
      justify="space-between"
    >
      <Text fontWeight="bold">Admin Dashboard</Text>
    </Flex>
  );
}
