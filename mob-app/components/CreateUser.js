import React,  { useState, useEffect , useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { Platform, View, StyleSheet, ScrollView , SafeAreaView , ActivityIndicator, Text, useWindowDimensions, TouchableOpacity, Linking} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateUser = (props) => {
    const { navigate } = props;
    return (
        <View style={styles.container}>
            <ScrollView>
            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                errorMessage=""
                errorStyle={{}}
                errorProps={{}}
                inputStyle={{}}
                label=""
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="account-outline" size={20} />}
                leftIconContainerStyle={{}}
                rightIcon={<Icon name="close" size={20} />}
                rightIconContainerStyle={{}}
                placeholder="Enter Name"
                />    
                 <View style={styles.button}>
                    <Button title='Submit' color='green' onPress={{}} />
                </View>
            </ScrollView>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    input: {
        width: 350,
        height: 40,
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 3
      },
      button: {
        padding: 5,
        margin: 5,
        borderRadius: 3
      }
});

export default CreateUser