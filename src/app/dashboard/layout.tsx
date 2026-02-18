"use client";

import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" bg="gray.50">
        <Header />
        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  );
}
