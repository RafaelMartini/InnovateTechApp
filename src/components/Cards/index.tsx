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
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
        }/${year}`;
    };

    const mapGenderToPortuguese = (gender: string) => {
        switch (gender) {
            case "male":
                return "Masculino";
            case "female":
                return "Feminino";
            default:
                return gender;
        }
    };

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
                <View style={styles.detailContainer}>
                    <Text style={styles.detail}>
                        {mapGenderToPortuguese(user.gender)}
                    </Text>
                    <Text style={styles.detail}>
                        {formatDate(user.dob.date)}
                    </Text>
                </View>
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
        backgroundColor: "#FFFFF0",
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
    detailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    detail: {
        fontSize: 14,
        color: "#666",
    },
});

export default UserCard;
