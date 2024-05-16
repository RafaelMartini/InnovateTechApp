import React from "react";
import {
    Modal,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const StudentDetailModal = ({ visible, onClose, student }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
        }/${year}`;
    };

    const mapGenderToPortuguese = (gender) => {
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: student.picture.large }}
                        style={styles.image}
                    />
                    <Text
                        style={styles.name}
                    >{`${student.name.title} ${student.name.first} ${student.name.last}`}</Text>
                    <View style={styles.detailContainer}>
                        <Text
                            style={styles.detail}
                        >{`Email: ${student.email}`}</Text>
                        <Text
                            style={styles.detail}
                        >{`Gênero: ${mapGenderToPortuguese(
                            student.gender
                        )}`}</Text>
                        <Text
                            style={styles.detail}
                        >{`Data de Nascimento: ${formatDate(
                            student.dob.date
                        )}`}</Text>
                        <Text
                            style={styles.detail}
                        >{`Telefone: ${student.phone}`}</Text>
                        <Text
                            style={styles.detail}
                        >{`Nacionalidade: ${student.nat}`}</Text>
                        <Text
                            style={styles.detail}
                        >{`Endereço: ${student.location.street.number} ${student.location.street.name}, ${student.location.city}, ${student.location.state}, ${student.location.country}`}</Text>
                        <Text
                            style={styles.detail}
                        >{`ID: ${student.id.name} ${student.id.value}`}</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    detailContainer: {
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default StudentDetailModal;
