import { FlatList, StyleSheet, StatusBar } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import Item from "./item";

export default function ItemsList({ goals = [], selectedId = null, onSelectItem = () => {}, onToggleItem = () => {} }){
    const buildList = (list) => {
        const mapByParent = {};
        list.forEach(g => {
            const p = g.parentId ?? 'root';
            if (!mapByParent[p]) mapByParent[p] = [];
            mapByParent[p].push(g);
        });
        const result = [];
        const walk = (parentId, depth) => {
            const children = mapByParent[parentId] || [];
            children.forEach(child => {
                result.push({ ...child, depth });
                walk(child.id, depth + 1);
            });
        };
        walk('root', 0);
        return result;
    };

    const data = buildList(goals);

    return(
            <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => {
                    const text = item.goal;
                    const checked = !!item.done;
                    return (
                        <Item 
                          itemText={text} 
                          depth={item.depth}
                          isSelected={item.id === selectedId} 
                          onPress={() => onSelectItem(item.id)}
                          isChecked={checked}
                          onCheckToggle={(value) => onToggleItem(item.id, value)}
                        />
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
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