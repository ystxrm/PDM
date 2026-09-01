import { ScrollView, Text, StyleSheet } from "react-native-web";

function MetaList(props) {
    return (
        <ScrollView>
            {props.array.map((meta) => <Text  key={meta.id} style={styles.item}>{meta.texto} </Text>)}
        </ScrollView>
    )
}

export default MetaList;

const styles = StyleSheet.create({
    item: {
        margin: 8,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#ee35db",
    }
})