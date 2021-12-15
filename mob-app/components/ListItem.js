import React from 'react';
import { ListItem, Avatar } from 'react-native-elements'
import { View, StyleSheet, ScrollView , RefreshControl, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ListItems = (item) => {
    const navigation = useNavigation();
    return (
        <ListItem key={item.id} bottomDivider onPress={() => {
            navigation.navigate('Details', item );
          }}>
            <Avatar rounded containerStyle={{ backgroundColor: "#BDBDBD" }} title={item.name.charAt(0)} source={{uri: ''}} />
            <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default ListItems;