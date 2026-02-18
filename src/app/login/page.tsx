"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // 🔹 Mock login: فقط برای تست مصاحبه
      if (username === "kminchelle" && password === "0lelplR") {
        localStorage.setItem("token", "FAKE_TOKEN_123");
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center h="100vh" bg="gray.50">
      <Box p={8} bg="white" rounded="lg" shadow="md" w="sm">
        <VStack spacing={4}>
          <Heading size="lg">Login</Heading>

          {error && <Text color="red.500">{error}</Text>}

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            colorScheme="teal"
            w="full"
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
