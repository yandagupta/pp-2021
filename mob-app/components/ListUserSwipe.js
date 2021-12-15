import React,  { useState, useEffect , useContext } from 'react';
import { LayoutAnimation, SafeAreaView, StyleSheet, ScrollView , RefreshControl, ActivityIndicator } from 'react-native';
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from 'react-native-swipe-list';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItems from './ListItem';

const ListUserSwipe = (props) => {
  const { title } = props;
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
    <SafeAreaView style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
            <SwipeableFlatList
                data={lists}
                renderItem={({ item }) => <ListItems {...item} />}
                keyExtractor={index => index.id}
                refreshControl={<RefreshControl refreshing={refreshing} 
                onRefresh={fetchData} />} 
                renderRightActions={({ item }) => (
                <SwipeableQuickActions>
                    <SwipeableQuickActionButton
                        onPress={() => {
                            LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut,
                            );
                            navigation.navigate('Details', item );
                        }}
                        text={<MaterialCommunityIcons name="trash-can-outline" size={14}/>}
                        textStyle={{ fontWeight: 'bold', color: 'white' }}
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    />
                    <SwipeableQuickActionButton
                        onPress={() => {
                            LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut,
                            );
                            navigation.navigate('Details', item );
                        }}
                        text={<MaterialCommunityIcons name="grease-pencil" size={14}/>}
                        textStyle={{ fontWeight: 'bold', color: 'white' }}
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                    />
                </SwipeableQuickActions>
                )}
                /*renderLeftActions={({ item }) => (
                <SwipeableQuickActions>
                    <SwipeableQuickActionButton onPress={() => {}} text="Other" />
                    <SwipeableQuickActionButton onPress={() => {}} text="Flag" />
                    <SwipeableQuickActionButton onPress={() => {}} text="Archive" />
                </SwipeableQuickActions>
                )}
                */
            />
    </SafeAreaView>
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
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },
    backRightBtnLeft: {
        backgroundColor: 'gray',
        borderRightWidth: 1,  
        borderRightStyle: 'solid',
        borderRightColor: '#a7a7a796',
    },
    backRightBtnRight: {
        backgroundColor: 'gray',
    },
    floatingMenuButtonStyle: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 35
    }
  });



export default ListUserSwipe;