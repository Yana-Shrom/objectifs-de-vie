import { FlatList, StyleSheet, StatusBar } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import Item from "./item";

export default function ItemsList({ data, selectedIndex = null, onSelectItem = () => {}, onToggleItem = () => {} }){
    return(
            <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item, index}) => {
                    const itemIndex = (item && typeof item.originalIndex === 'number') ? item.originalIndex : index;
                    const text = (item && typeof item.goal === 'string') ? item.goal : item;
                    const checked = (item && typeof item.done !== 'undefined') ? !!item.done : false;
                    return (
                        <Item 
                          itemText={text} 
                          isSelected={itemIndex === selectedIndex} 
                          onPress={() => onSelectItem(itemIndex)}
                          isChecked={checked}
                          onCheckToggle={(value) => onToggleItem(itemIndex, value)}
                        />
                    )
                }}
                keyExtractor={(item, index) => (item && item.goal ? item.goal + (item.originalIndex ?? index) : index.toString())}
            />
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        width: '100%'
    },
});