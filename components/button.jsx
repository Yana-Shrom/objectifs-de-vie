import {Text,StyleSheet,TouchableOpacity} from 'react-native';

export default function Button({value, onPress, disable=false}){
    return(
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        padding: 25,
        backgroundColor: 'rgba(55, 55, 55, 0.5)',
        borderRadius:25
    },
    buttonText:{
        color: 'white',
        fontWeight:'bold'
    }
});