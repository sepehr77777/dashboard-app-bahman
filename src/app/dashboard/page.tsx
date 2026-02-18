"use client";

import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Stat, StatLabel, StatNumber, Spinner, Text } from "@chakra-ui/react";
import { api } from "../lib/api";

export default function DashboardPage() {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [productsCount, setProductsCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get("/users?limit=1");
        const productsRes = await api.get("/products?limit=1");

        setUsersCount(usersRes.data.total);
        setProductsCount(productsRes.data.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Welcome to Admin Dashboard 👋
      </Text>

      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
        <GridItem>
          <Stat p={5} bg="white" shadow="md" borderRadius="lg">
            <StatLabel>Total Users</StatLabel>
            <StatNumber>
              {usersCount === null ? <Spinner /> : usersCount}
            </StatNumber>
          </Stat>
        </GridItem>

        <GridItem>
          <Stat p={5} bg="white" shadow="md" borderRadius="lg">
            <StatLabel>Total Products</StatLabel>
            <StatNumber>
              {productsCount === null ? <Spinner /> : productsCount}
            </StatNumber>
          </Stat>
        </GridItem>
      </Grid>
    </Box>
  );
}
