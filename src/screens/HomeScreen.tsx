import React, { useState, useEffect, useRef } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/userTypes";
import fetchUsers from "../services/UserService";
import UserCard from "../components/Cards";
import StudentDetailModal from "../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/themeSlice";

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [reachedEnd, setReachedEnd] = useState(false);
    const [genderFilter, setGenderFilter] = useState<string>("all");

    const flatListRef = useRef<FlatList>(null);
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const showButton = event.nativeEvent.contentOffset.y > 200;
        setShowScrollToTopButton(showButton);
    };

    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

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
        async function fetchData() {
            const cachedData = await AsyncStorage.getItem("initialUsers");
            if (cachedData) {
                setUsers(JSON.parse(cachedData));
            } else {
                if (initialUsers) {
                    setUsers(initialUsers);
                }
            }
        }

        fetchData();
    }, [initialUsers]);

    useEffect(() => {
        const filtered = filterUsers(users);
        setFilteredUsers(filtered);
    }, [users, genderFilter, search]);

    const filterUsers = (usersToFilter: User[]) => {
        let filtered =
            genderFilter !== "all"
                ? usersToFilter.filter((user) => user.gender === genderFilter)
                : usersToFilter;

        if (search) {
            const searchTerm = search.toLowerCase().trim();
            filtered = filtered.filter((user) =>
                `${user.name.title} ${user.name.first} ${user.name.last}`
                    .toLowerCase()
                    .includes(searchTerm)
            );
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

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
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
        <View
            style={[styles.container, darkMode ? styles.containerDark : null]}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Innovatech</Text>
                <Pressable
                    style={styles.toggleThemeButton}
                    onPress={handleToggleTheme}
                >
                    {darkMode ? (
                        <AntDesign name="bulb1" size={24} color="white" />
                    ) : (
                        <AntDesign name="bulb1" size={24} color="black" />
                    )}
                </Pressable>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Buscar..."
                        value={search}
                        onChangeText={setSearch}
                        autoCapitalize="none"
                    />
                    <Pressable
                        style={styles.filterIconContainer}
                        onPress={() => {
                            const filtered = filterUsers(users);
                            setFilteredUsers(filtered);
                        }}
                    >
                        <AntDesign name="filter" size={20} color="white" />
                    </Pressable>
                </View>
                <Picker
                    selectedValue={genderFilter}
                    onValueChange={(itemValue) => setGenderFilter(itemValue)}
                    style={[styles.picker]}
                >
                    <Picker.Item label="Todos" value={"all"} />
                    <Picker.Item label="Masculino" value="male" />
                    <Picker.Item label="Feminino" value="female" />
                </Picker>
            </View>

            <FlatList
                ref={flatListRef}
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.login.uuid}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0}
                ListFooterComponent={renderFooter}
                contentContainerStyle={styles.flatListContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
            <View style={[styles.footer]}>
                <AntDesign name="user" size={24} color={"#4169E1"}></AntDesign>
            </View>
            {showScrollToTopButton && (
                <Pressable
                    style={styles.scrollToTopButton}
                    onPress={scrollToTop}
                >
                    <AntDesign name="arrowup" size={24} color="white" />
                </Pressable>
            )}

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
        padding: 10,
    },
    containerDark: {
        backgroundColor: "#1c1c1e",
    },
    toggleThemeButton: {
        position: "absolute",
        top: 35,
        right: 0,
        padding: 10,
    },
    scrollToTopButton: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "#007bff",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        marginTop: 40,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: "bold",
        color: "#4169E1",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    headerBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 10,
    },
    headerContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchBar: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccddee",
        fontSize: 16,
        marginRight: 10,
    },
    filterIconContainer: {
        paddingTop: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: "#007bff",
    },
    picker: {
        width: "80%",
        marginTop: 10,
    },
    flatListContent: {
        flexGrow: 1,
        paddingBottom: 5,
        height: 300,
    },
    footer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 3,
        backgroundColor: "#ffffff",
        height: 15,
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
    pickerItem: {
        textAlign: "center",
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
