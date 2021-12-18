import React,  { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

function NewsScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Berita"
      });
    }, []);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>News screen</Text>
      </View>
    );
}

export default NewsScreen;