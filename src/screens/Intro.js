// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/colors';
import RoundBtn from '../components/RoundBtn';

const Intro = ({ onFinish }) => {
  // to greet the user by name
  const [name, setName] = useState(''); 
  // 
  const handleOnChangeText = (text) => {
    setName(text);
  };

  const handleSubmit = async () => {
    const user = {name: name};
    await AsyncStorage.setItem('user', JSON.stringify(user)); // store the user object in AsyncStorage, has to be a string. 
    if (onFinish) {onFinish()};
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.text}>Enter FullName to Continue</Text>
        <TextInput 
          value={name} 
          onChangeText={handleOnChangeText} 
          placeholder={'First & Last Name'} 
          style={styles.textInput} 
        />
        { name.trim().length > 3 ? ( 
          <RoundBtn antIconName='arrowright' onPress={handleSubmit} /> 
        ) : null }
      </View>
    </>
  );
};

export default Intro;

const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    // marginLeft: -60,
    fontSize: 18,
    fontWeight: 'bold'
  },
  textInput:{
    width: 300,
    height: 40,
    borderWidth: 2,
    borderColor: colors.primary,   
    borderRadius: 9, 
    marginTop: 5,
    padding: 10,
    fontSize: 20,
  }
});