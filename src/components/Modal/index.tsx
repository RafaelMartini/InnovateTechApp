// components/StudentDetailModal.js
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
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <Image
                    source={{ uri: student.picture.large }}
                    style={styles.image}
                />
                <Text
                    style={styles.name}
                >{`${student.name.title} ${student.name.first} ${student.name.last}`}</Text>
                <Text style={styles.detail}>{`Email: ${student.email}`}</Text>
                <Text style={styles.detail}>{`Gender: ${student.gender}`}</Text>
                <Text style={styles.detail}>{`DOB: ${new Date(
                    student.dob.date
                ).toLocaleDateString()}`}</Text>
                <Text style={styles.detail}>{`Phone: ${student.phone}`}</Text>
                <Text
                    style={styles.detail}
                >{`Nationality: ${student.nat}`}</Text>
                <Text
                    style={styles.detail}
                >{`Address: ${student.location.street.number} ${student.location.street.name}, ${student.location.city}, ${student.location.state}, ${student.location.country}`}</Text>
                <Text
                    style={styles.detail}
                >{`ID: ${student.id.name} ${student.id.value}`}</Text>
                <TouchableOpacity onPress={onClose} style={styles.button}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        padding: 20,
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    detail: {
        fontSize: 16,
        marginTop: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});

export default StudentDetailModal;
