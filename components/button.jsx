import {Text,StyleSheet,TouchableOpacity} from 'react-native';

export default function Button({value, onPress, disable=false, style}){
    return(
        <TouchableOpacity
            onPress={onPress}
            disabled={disable}
            activeOpacity={0.85}
            style={[styles.button, style, disable && styles.disabled]}
        >
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(35, 176, 211, 0.8)',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
    buttonText:{
        color: '#fff',
        fontWeight:'700',
        fontSize: 16,
    },
    disabled: {
        opacity: 0.6,
    }
});