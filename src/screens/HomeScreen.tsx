// Importe os componentes adicionais necessários
import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/userTypes";
import fetchUsers from "../services/UserService";
import UserCard from "../components/Cards";
import StudentDetailModal from "../components/Modal";

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [reachedEnd, setReachedEnd] = useState(false);
    const [genderFilter, setGenderFilter] = useState<string | null>(null);

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
            AsyncStorage.setItem("initialUsers", JSON.stringify(initialUsers));
        }
    }, [initialUsers]);

    useEffect(() => {
        const fetchCachedData = async () => {
            try {
                const cachedData = await AsyncStorage.getItem("initialUsers");
                if (cachedData) {
                    setUsers(JSON.parse(cachedData));
                }
            } catch (error) {
                console.error("Error fetching cached users:", error);
            }
        };

        fetchCachedData();
    }, []);

    useEffect(() => {
        const filtered = filterUsers(users);
        setFilteredUsers(filtered);
    }, [users, genderFilter, search]);

    const filterUsers = (usersToFilter: User[]) => {
        let filtered = usersToFilter;

        if (genderFilter && genderFilter !== "Todos") {
            filtered = filtered.filter((user) => user.gender === genderFilter);
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            filtered = filtered.filter((user) =>
                `${user.name.title} ${user.name.first} ${user.name.last}`
                    .toLowerCase()
                    .includes(searchTerm)
            );
        }

        if (genderFilter === "all") {
            return usersToFilter;
        }

        return filtered;
    };

    const handlePress = (user: User) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const fetchMoreUsers = async () => {
        try {
            if (!loadingMore && !reachedEnd) {
                setLoadingMore(true);
                const nextPage = page + 1;
                console.log("Fetching more users. Page:", nextPage);
                const response = await fetchUsers();
                if (response.length > 0) {
                    setUsers((prevUsers) => [...prevUsers, ...response]);
                    setPage(nextPage);
                } else {
                    setReachedEnd(true);
                }
            }
        } catch (error) {
            console.error("Error fetching more users:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleEndReached = () => {
        if (!loadingMore && !reachedEnd) {
            fetchMoreUsers();
        }
    };

    const renderItem = ({ item }: { item: User }) => (
        <Pressable key={item.login.uuid} onPress={() => handlePress(item)}>
            <UserCard user={item} onPress={() => handlePress(item)} />
        </Pressable>
    );

    const renderFooter = () => {
        if (loadingMore) {
            return (
                <View style={styles.loadMoreContainer}>
                    <ActivityIndicator size="small" color="#007bff" />
                    <Text style={styles.loadMoreText}>Carregar mais...</Text>
                </View>
            );
        } else {
            return null;
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
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Buscar..."
                    value={search}
                    onChangeText={setSearch}
                    autoCapitalize="none"
                />
                <Picker
                    selectedValue={genderFilter}
                    onValueChange={(itemValue) => setGenderFilter(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    <Picker.Item label="Todos" value={"all"} />
                    <Picker.Item label="Masculino" value="male" />
                    <Picker.Item label="Feminino" value="female" />
                </Picker>
            </View>

            <FlatList
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.login.uuid}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter} // Renderiza o componente de rodapé dinâmico
                contentContainerStyle={styles.flatListContent}
            />
            <View style={styles.footer}>{/* Conteúdo do footer */}</View>

            {selectedUser && (
                <StudentDetailModal
                    visible={true}
                    onClose={closeModal}
                    student={selectedUser}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    flatListContent: {
        paddingBottom: 10,
    },
    footer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        backgroundColor: "#ffffff",
        height: 100,
    },
    loadMoreContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    loadMoreText: {
        marginLeft: 10,
        color: "#007bff",
        fontSize: 16,
    },
    picker: {
        width: "40%",
        alignSelf: "center",
    },
    pickerItem: {
        textAlign: "center",
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
