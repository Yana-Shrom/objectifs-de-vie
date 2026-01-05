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
        color: '#000000',
        fontSize: 54,
    }
})