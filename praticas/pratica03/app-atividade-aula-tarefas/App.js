import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens';


export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={{ width: 150, position:'absolute', left: 5, top: 30}}>
        <TextInput style={styles.inputText} placeholder={rotulo_input_meta} />
      </View>
      <View style={{width: 150, position:'absolute', left: 5, top: 30}}>
        <Button title={rotulo_btn_cadastro_meta} />
      </View>
      <View style={{width: 150, position:'absolute', left: 5, top: 80}}>
        <Text>{rotulo_lista_metas}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    padding: 30
  },
  inputText: {
    borderColor: "#cccccc",
    borderWidth: 1,
  },

});
