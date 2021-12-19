import React,  { useState, useEffect , useRef } from 'react';
import { Button, Input  } from 'react-native-elements';
import { Platform, View, StyleSheet, ScrollView , SafeAreaView , ActivityIndicator, Text, useWindowDimensions, TouchableOpacity, Linking, Alert, Image} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import * as Progress from 'react-native-progress';
import "../config/FirebaseInitialize";
import Helper from '../utils/helper';

import { getFirestore, addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();
const db = getFirestore();

const CreateUser = (props) => {
    const { item }  = props;
    const scrollRef = useRef();
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState([]);
    const [errors, setErrors] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [saving, setSaving] = useState(0);
    const [id, setId] = useState(item);
    const initialFormState = { name: '', subtitle: '' , telp: '', address: '', body: '', avatar_url: ''}
    const [user, setUser] = useState(initialFormState);
    
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }

          
          if(id){
                console.log('effect', id);
                const docRef = doc(db, "mob_app", 'users', 'users' , id);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const docState = docSnap.data();
                        setUser(docState)

                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.log('error', error)
                }  
            }
            
        })();

    }, [id]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
            const source = { uri: result.uri };
            setImage(source);
        }
    };

    const uploadImage = async () => {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = uri;
        setUploading(true);
        setTransferred(0);
        let avatar_uri = '';
        try {
            const response = await fetch(uploadUri)
            const blob = await response.blob()
            const storageRef = ref(storage, `avatars/${filename}`);
            await uploadBytes(storageRef, blob).then(async snapshot=> {
                avatar_uri = await getDownloadURL(snapshot.ref).then(downloadURL => {
                    console.log('downloadURL', downloadURL)
                    return downloadURL;
                });
                
                
                console.log('set avatar', avatar_uri);
            });
        } catch (error) {
            console.log(error)
        }

        setUploading(false);
        setImage(null);

        return avatar_uri;
    };

    const validation = (str, type) => {
      if(type == 'email') {
         if(Helper.isEmailValid(str)) setErrors([]);
         else setErrors([{message: "Invalid email!"}]);
      }

      return str;
    }

    const submitData = async () => {
        setSaving(true);
        console.log('before upload', user.avatar_url)
        let avatar_url = user.avatar_url;
        if(image) avatar_url = await uploadImage();
        console.log('after upload', avatar_url)

        try {
            let fields = user;
            if(avatar_url != '') fields = {
                ...fields,
                ...{avatar_url: avatar_url}
            }
            
            console.log(fields);

            let docRef = {};
            if(id){
                //updateDoc
                const ref = doc(db, "mob_app", 'users', 'users' , id);
                docRef = await updateDoc(ref, fields);

            }
            else {

                docRef = await addDoc(collection(db, "mob_app", 'users', 'users'), fields);
                // console.log("Document written with ID: ", docRef);
                if(docRef.id) setId(docRef.id);
            }
            setSaving(false);
            setErrors([]);
            setSuccess([{message: "Success save data!"}]);
            scrollTop();

        } catch (error) {
            setSaving(false);
            setErrors([{message: error}]);
        }
        
        setSaving(false);
    }

    const scrollTop = () => {
        return scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }

    const onInputChange = (name, value) => {
        setUser({ ...user, [name]: value })
        console.log(user)
    }
    
    return (
        <View style={styles.container}>
            <ScrollView ref={scrollRef} style={{marginTop: 10}}>
                <View style={styles.error}>
                    {errors.map( error => {
                        return <Text key={error} style={{padding: 10, backgroundColor:'#ffcece', borderColor: 'red', color: 'red', borderWidth: 1, borderStyle: 'solid'}}>{error.message}</Text>
                    })}

                    {success.map( item => {
                        return <Text key={item} style={{padding: 10, backgroundColor:'#8bc34aba', borderColor: 'green', color: 'green', borderWidth: 1, borderStyle: 'solid'}}>{item.message}</Text>
                    })}

                </View>
                <Input label="Name" defaultValue={user.name} onChangeText={(value) => {onInputChange('name', value)}} placeholder="Masukkan Nama"/>    
                <Input label="Pekerjaan" defaultValue={user.subtitle} onChangeText={(value) => {onInputChange('subtitle', value)}} placeholder="Jenis Pekerjaan"/>    
                <Input label="Alamat" defaultValue={user.address} onChangeText={(value) => {onInputChange('address', value)}} placeholder="Alamat"/>    
                <Input label="Email" defaultValue={user.email} onChangeText={(value) => {onInputChange('email', value)}} placeholder="Email"/>    
                <Input label="Telp." keyboardType="numeric" defaultValue={user.telp} onChangeText={(value) => {onInputChange('telp', value)}} placeholder="Telp."/>    
                <Input
                    label="Biodata"
                    placeholder="Body"
                    multiline={true}
                    numberOfLines={3}
                    style={{ height: 100, textAlignVertical: 'top', }}
                    onChangeText={(value) => {onInputChange('body', value)}}
                    defaultValue={ user.body}
                    />
                
                <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {image !== null ? (
                        <Image source={{ uri: image.uri }} style={styles.imageBox} />
                    ) : null}
                    {uploading ? (
                        <View style={styles.progressBarContainer}>
                            <Progress.Bar progress={transferred} width={300} />
                        </View>
                    ) : null }
                </View>
                
                 <View style={styles.button}>
                    <Button title={(saving) ? 'Saving...' : 'Submit'} color='green' onPress={submitData} />
                </View>
            </ScrollView>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    error: {
        margin: 10
    },
    input: {
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
    },
    selectButton: {
        borderRadius: 5,
        height: 150,
        borderColor: '#999999',
        borderStyle: 'dotted',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        color: "#000000"
      },
      uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      },
      buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
      },
      imageContainer: {
        margin: 10,
        alignItems: 'center',
        borderRadius: 5
      },
      progressBarContainer: {
        marginTop: 20
      },
      imageBox: {
        height: 300,
        width: '100%',
        borderRadius: 5
      }
});

export default CreateUser