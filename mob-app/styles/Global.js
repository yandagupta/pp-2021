import { StyleSheet } from 'react-native';
const Global = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      borderWidth: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    flexBox: {
      flex: 1,
      padding: 0,
      flexDirection: "column"
    },
});

export default Global;