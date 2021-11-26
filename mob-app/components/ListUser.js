import * as React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListUser = (props) => {
  const { navigate } = props;
  const navigation = useNavigation();
  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
  ];
  return (
    <View style={styles.container}>
      {
          list.map((l, i) => (
              <ListItem key={i} bottomDivider onPress={() => {
                navigation.navigate('Details', l );
              }}>
                  <Avatar source={{uri: l.avatar_url}} />
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="grey" />
              </ListItem>
          ))
      }
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


export default ListUser;