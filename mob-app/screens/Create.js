import React,  { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import _ from 'lodash';
import CreateUser from '../components/CreateUser';
//css
import Global from "../styles/Global";

function CreateScreen({ route }) {
    const navigation = useNavigation();
    const edit = route.params ? _.filter(route.params, i => !_.isNil(i?.id)) : false;
    useLayoutEffect(() => {
      navigation.setOptions({
        title: (edit) ? `Edit data ${route.params.id}`  : `Tambah data` 
      });
    }, [navigation]);
    return (
      <View style={Global.flexBox}>
        <CreateUser item = {(edit) ? route.params.id: false }/>
      </View>
    );
}

export default CreateScreen;