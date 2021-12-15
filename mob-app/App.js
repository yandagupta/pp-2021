import * as React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialCommunityIcons.json
import { Provider, Menu, Divider } from 'react-native-paper';
import ListUserSwipe from './components/ListUserSwipe';
import DetailUser from './components/DetailUserWeb';
import CreateUser from './components/CreateUser';
import Global from "./styles/Global";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
  });

function DetailsScreen({ navigation, route }) {
  const [value, onChangeText] = React.useState(route.params.name);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: value === '' ? 'No title' : value,
    });
  }, [navigation, value]);
  return (
    <View style={Global.flexBox}>
      <DetailUser user={route.params} navigate={navigation}/>
    </View>
  );
}

function CreateScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Tambah data'
    });
  }, [navigation]);
  return (
    <View style={Global.flexBox}>
      <CreateUser navigate={navigation}/>
    </View>
  );
}

const CustomMenu = ({navigation}) => {
  const [showMenu, setShowMenu] = React.useState(false);

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

function HomeScreen({ navigation }) {
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

function NewsScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Berita"
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>News screen</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen(navigation) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Create" component={CreateScreen} />
    </HomeStack.Navigator>
  );
}

const NewsStack = createNativeStackNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="News" component={NewsScreen} />
      <NewsStack.Screen name="Details" component={DetailsScreen} />
    </NewsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export default function App() {
  return (
    <Provider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator screenOptions={{ headerShown: false}} initialRouteName="Home"
          barStyle={{ padding: 0 }}>
          <Tab.Screen name="beranda" component={HomeStackScreen} options={{
            tabBarLabel: 'Beranda',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={22} />
            ),
          }} />
          <Tab.Screen name="berita" component={NewsStackScreen} options={{
            tabBarLabel: 'Berita',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="album" color={color} size={22} />
            ),
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}