import React,  { useState, useEffect , useContext } from 'react';
import { ListItem, Avatar, Button } from 'react-native-elements';
import { View, StyleSheet, ScrollView , RefreshControl, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//https://61b6be92c95dd70017d40fe5.mockapi.io/api/v1
const ListUser = (props) => {
  const { navigate, title } = props;
  const [refreshing, setRefreshing] = useState(true);
  const [lists, setLists] = useState([]);
  const navigation = useNavigation();

  const fetchData = () => {
    fetch('https://61b6be92c95dd70017d40fe5.mockapi.io/api/v1/users')
      .then((response) => response.json())
      .then((response) => {
        setRefreshing(false);
        setLists(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <View style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
       <ScrollView refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={fetchData} />}>
      {
          lists.map((l, i) => (
              <ListItem key={i} bottomDivider onPress={() => {
                navigation.navigate('Details', l );
              }}>
                  <Avatar rounded containerStyle={{ backgroundColor: "#BDBDBD" }} title={l.name.charAt(0)} source={{uri: ''}} />
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="grey" />
              </ListItem>
          ))
      }
      <View style={styles.mainConatinerStyle}>
        <Button style={styles.floatingMenuButtonStyle}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      </ScrollView>
      
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1
  },
  floatingMenuButtonStyle: {
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 35
  }
});

export default ListUser;