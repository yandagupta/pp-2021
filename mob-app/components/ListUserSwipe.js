import React,  { useState, useEffect, useRef} from 'react';
import { LayoutAnimation, SafeAreaView, StyleSheet, ScrollView , RefreshControl, ActivityIndicator } from 'react-native';
import { SwipeableFlatList, SwipeableQuickActionButton, SwipeableQuickActions } from 'react-native-swipe-list';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItems from './ListItem';
import "../config/FirebaseInitialize";
import { doc, getDocs, getFirestore, deleteDoc, collection } from "firebase/firestore";
const db = getFirestore();
const ListUserSwipe = (props) => {
  const [refreshing, setRefreshing] = useState(true);
  const [lists, setLists] = useState([]);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const fetchData = async () => {
    const docRef = collection(db, "mob_app", 'users','users');
    const docSnap = await getDocs(docRef);
    if (docSnap) {
      let listings = docSnap.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      setLists(listings);
      console.log('load data')
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setLists([]);
    }
    
    setRefreshing(false);
   
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;

  }, [navigation]);

  const deleteUser = async (item) => {
    await deleteDoc(doc(db,  "mob_app", 'users', 'users' , item));
    setRefreshing(true);
  }

  return (
    <SafeAreaView style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
            <SwipeableFlatList
                data={lists}
                closeOnScroll
                renderItem={({ item }) => <ListItems {...item} />}
                keyExtractor={index => index.id}
                refreshControl={<RefreshControl refreshing={refreshing} 
                onRefresh={fetchData} />} 
                onEndReached={fetchData}
                onEndReachedThreshold={0.5}
                extraData={refreshing}
                renderRightActions={({item}) => {
                  return (
                    <SwipeableQuickActions>
                        <SwipeableQuickActionButton
                            onPress={() => {
                                LayoutAnimation.configureNext(
                                LayoutAnimation.Presets.easeInEaseOut,
                                );
                                deleteUser(item.id);
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
                                navigation.navigate('Create', item );
                            }}
                            text={<MaterialCommunityIcons name="grease-pencil" size={14}/>}
                            textStyle={{ fontWeight: 'bold', color: 'white' }}
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                        />
                    </SwipeableQuickActions>
                    )
                }}
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
        paddingLeft: 20,
        paddingRight: 20
    },
    backRightBtnLeft: {
        backgroundColor: 'gray',
        borderRightWidth: 1,  
        borderStyle: "solid",
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