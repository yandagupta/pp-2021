import React,  { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Menu } from 'react-native-paper';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListUserSwipe from '../components/ListUserSwipe';

//css
import Global from "../styles/Global";

const CustomMenu = ({navigation}) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
      <View style={{marginRight: 10}}>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <TouchableOpacity onPress={() => setShowMenu(true)}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={30}
                style={{ color: 'gray' }}
              />
            </TouchableOpacity>
          }>
          <Menu.Item onPress={() => {
            navigation.navigate('Create');
            setShowMenu(false);
          }} title="Tambah Data" />
        </Menu>
      </View>
    );
  };

function HomeScreen() {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title: "Beranda",
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <CustomMenu navigation={navigation}/>,
      });
    }, [navigation]);
  
    return (
      <View style={Global.flexBox}>
        <ListUserSwipe navigate={navigation}/>
      </View>
    );
}

export default HomeScreen;