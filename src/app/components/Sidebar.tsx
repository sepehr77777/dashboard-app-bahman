"use client";

import { Box, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <Box w="250px" bg="teal.600" color="white" p={5}>
      <VStack align="stretch" spacing={4}>
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          Dashboard
        </Button>

        <Button variant="ghost" onClick={() => router.push("/dashboard/users")}>
          Users
        </Button>

        <Button variant="ghost" onClick={() => router.push("/dashboard/products")}>
          Products
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
