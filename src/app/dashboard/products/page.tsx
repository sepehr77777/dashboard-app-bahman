"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Spinner,
  Center,
  Input,
  HStack,
  Button,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { api } from "@/app/lib/api";
import { Product } from "@/app/types/product";

const LIMIT = 8;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;

      const url = search
        ? `/products/search?q=${search}&limit=${LIMIT}&skip=${skip}`
        : `/products?limit=${LIMIT}&skip=${skip}`;

      const res = await api.get(url);

      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <Box>
      <HStack mb={4} spacing={4}>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </HStack>

      {loading ? (
        <Center h="300px">
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <Grid
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={6}
          >
            {products.map((product) => (
              <Box
                key={product.id}
                bg="white"
                p={4}
                borderRadius="lg"
                shadow="md"
              >
                <VStack align="start" spacing={3}>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    borderRadius="md"
                  />

                  <Text fontWeight="bold">
                    {product.title}
                  </Text>

                  <Text fontSize="sm" noOfLines={2}>
                    {product.description}
                  </Text>

                  <HStack>
                    <Badge colorScheme="green">
                      ${product.price}
                    </Badge>
                    <Badge colorScheme="purple">
                      {product.category}
                    </Badge>
                  </HStack>

                  <Text fontSize="sm">
                    ⭐ {product.rating} | Stock: {product.stock}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Grid>

          <HStack mt={6} justify="space-between">
            <Button
              onClick={() => setPage((p) => p - 1)}
              isDisabled={page === 1}
            >
              Previous
            </Button>

            <Text>
              Page {page} of {totalPages}
            </Text>

            <Button
              onClick={() => setPage((p) => p + 1)}
              isDisabled={page === totalPages}
            >
              Next
            </Button>
          </HStack>
        </>
      )}
    </Box>
  );
}
