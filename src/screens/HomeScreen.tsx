import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/userTypes";
import fetchUsers from "../services/UserService";
import UserCard from "../components/Cards";
import StudentDetailModal from "../components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";
import DraggableScrollView from "../components/ScrollTouch/DraggableScrollView";

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const scrollY = new Animated.Value(0);

    const {
        data: initialUsers,
        isLoading,
        isError,
        error,
    } = useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    useEffect(() => {
        if (initialUsers) {
            setUsers(initialUsers);
            setFilteredUsers(initialUsers.slice(0, 20)); // Limita a exibição inicial a 20 usuários
        }
    }, [initialUsers]);

    useEffect(() => {
        if (!search) {
            setFilteredUsers(users.slice(0, 20)); // Mostra apenas os primeiros 20 usuários
            return;
        }

        const filtered = users.filter((user) =>
            `${user.name.title} ${user.name.first} ${user.name.last}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
        setFilteredUsers(filtered.slice(0, 20)); // Mostra apenas os primeiros 20 usuários
    }, [search, users]);

    const handlePress = (user) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const fetchMoreUsers = async () => {
        try {
            setLoadingMore(true);
            const nextPage = page + 1;
            const response = await fetchUsers();
            setUsers((prevUsers) => [...prevUsers, ...response]);
            setFilteredUsers((prevUsers) => [
                ...prevUsers,
                ...response.slice(0, 20),
            ]);
            setPage(nextPage);
        } catch (error) {
            console.error("Error fetching more users:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    if (isLoading)
        return (
            <ActivityIndicator
                style={styles.loading}
                size="large"
                color="#007bff"
            />
        );
    if (isError)
        return (
            <Text style={styles.error}>
                Error fetching users: {error?.message}
            </Text>
        );

    return (
        <DraggableScrollView>
            <View style={{ height: 1000 }}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [
                                {
                                    translateY: Animated.multiply(scrollY, -1),
                                },
                            ],
                        },
                    ]}
                >
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Buscar..."
                        value={search}
                        onChangeText={setSearch}
                        autoCapitalize="none"
                    />
                    <View style={styles.flatListContainer}>
                        {filteredUsers.map((user, index) => (
                            <TouchableOpacity
                                key={user.login.uuid}
                                activeOpacity={0.7}
                                onPress={() => handlePress(user)}
                            >
                                <UserCard
                                    user={user}
                                    onPress={() => handlePress(user)}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.loadMoreContainer}>
                        {loadingMore ? (
                            <ActivityIndicator size="small" color="#007bff" />
                        ) : (
                            <TouchableOpacity onPress={fetchMoreUsers}>
                                <Text style={styles.loadMoreText}>
                                    Buscar mais...
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {selectedUser && (
                        <StudentDetailModal
                            visible={true}
                            onClose={closeModal}
                            student={selectedUser}
                        />
                    )}
                </Animated.View>
            </View>
        </DraggableScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    searchBar: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccddee",
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    flatListContainer: {
        marginTop: 10,
    },
    loadMoreContainer: {
        alignItems: "center",
        marginVertical: 10,
    },
    loadMoreText: {
        color: "#007bff",
        fontSize: 16,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "red",
    },
});

export default HomeScreen;
