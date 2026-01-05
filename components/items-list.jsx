import { FlatList, StyleSheet, StatusBar } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Item from "./item";

export default function ItemsList({ data }){
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <Item itemText={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
});