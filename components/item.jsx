import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View, StyleSheet} from "react-native";

export default function Item({itemText}){
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.containerItem}>
            <Checkbox 
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? 'green' : 'white'}
            />
            <Text style={styles.text}>{itemText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(35, 176, 211, 0.8)',
        width: '100%',
        margin: 5,
        borderRadius:25,
        overflow : 'hidden'
    },
    checkbox: {
        margin: 8,
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
})