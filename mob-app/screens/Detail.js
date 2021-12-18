import React,  { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

import DetailUser from '../components/DetailUserWeb';

//css
import Global from "../styles/Global";


function DetailsScreen({ route }) {
    const navigation = useNavigation();
    const [value, onChangeText] = useState(route.params.name);
    useLayoutEffect(() => {
      navigation.setOptions({
        title: value === '' ? 'No title' : value,
      });
    }, [value]);
    return (
      <View style={Global.flexBox}>
        <DetailUser user={route.params}/>
      </View>
    );
  }
  

export default DetailsScreen;