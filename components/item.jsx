import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Item({itemText, isSelected = false, onPress = () => {}}){
    const [isChecked, setChecked] = useState(false);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.containerItem, isSelected && styles.selected]}>
            <Checkbox 
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? 'green' : 'white'}
            />
            <Text style={styles.text}>{itemText}</Text>
        </View>
        </TouchableOpacity>
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
    },
    selected: {
        borderWidth: 2,
        borderColor: '#FFD700',
    }
})

