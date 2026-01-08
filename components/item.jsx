import Checkbox from "expo-checkbox";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Item({itemText, depth = 0, isSelected = false, onPress = () => {}, isChecked = false, onCheckToggle = () => {}}){
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.containerItem, isSelected && styles.selected, { paddingLeft: 12 + depth * 14 }]}>
            <Checkbox 
            style={styles.checkbox}
            value={isChecked}
            onValueChange={onCheckToggle}
            color={isChecked ? 'green' : 'white'}
            />
            <Text style={[styles.text, isChecked && styles.doneText]}>{itemText}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerItem:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(35, 176, 211, 0.8)',
        width: '95%',
        marginHorizontal:10,
        marginTop: 5,
        borderRadius:25,
        padding: 2,
        overflow : 'hidden'
    },
    checkbox: {
        margin: 8,
    },
    text:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    doneText:{
        textDecorationLine: 'line-through',
        color: 'rgba(255,255,255,0.7)'
    },
    selected: {
        borderWidth: 2,
        borderColor: '#FFD700',
    }
})

