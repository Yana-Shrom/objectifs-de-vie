import { Text, StyleSheet } from "react-native";

export default function BigTitle({ value }) {
    return (
        <Text style={styles.title}>
            {value}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'rgba(35, 176, 211, 0.8)',
        fontSize: 54,
        textAlign: 'center'
    }
})