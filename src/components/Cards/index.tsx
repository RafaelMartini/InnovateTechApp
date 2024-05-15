import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import { User } from "../../types/userTypes";

const { width } = Dimensions.get("window");

interface UserCardProps {
    user: User;
    onPress: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: user.picture.large }}
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>
                    {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "center",
        backgroundColor: "#e7f0fd",
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        backgroundColor: "#bde0fe",
        padding: 2,
        borderRadius: 30,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    info: {
        flex: 1,
        paddingLeft: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    email: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
});

export default UserCard;
