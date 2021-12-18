import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialCommunityIcons.json
import { Provider } from 'react-native-paper';

//screens
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Detail';
import NewsScreen from './screens/News';
import CreateScreen from './screens/Create';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
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