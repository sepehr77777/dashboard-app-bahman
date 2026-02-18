"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Spinner,
  Center,
  Input,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { api } from "@/app/lib/api";
import { User } from "@/app/types/user";

const LIMIT = 10;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;

      const url = search
        ? `/users/search?q=${search}&limit=${LIMIT}&skip=${skip}`
        : `/users?limit=${LIMIT}&skip=${skip}`;

      const res = await api.get(url);

      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <Box>
      <HStack mb={4} spacing={4}>
        <Input
          placeholder="Search users..."
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
          <Box bg="white" p={6} borderRadius="lg" shadow="md">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Avatar</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>
                      <Avatar size="sm" src={user.image} />
                    </Td>
                    <Td>
                      {user.firstName} {user.lastName}
                    </Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <HStack mt={4} justify="space-between">
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
