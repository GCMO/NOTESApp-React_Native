import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Intro from './src/screens/Intro';
import Note from './src/screens/Note';
import NoteDetails from './src/components/NoteDetails';
import NoteProvider from './src/context/NoteProvider';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState({}); // to greet the user by name
  const [firstOpen, setFirstOpen] = useState(false); // to check if the app is opened for the first time

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result === null) {
      return setFirstOpen (true)
    };
    setUser(JSON.parse(result)); // if user !null parse the string back to an object
    setFirstOpen(false); // if user !null set firstOpen to false
  }

  useEffect(() => {
    findUser();
    // AsyncStorage.clear()
  },[]);

  const RenderNote = props => <Note {...props} user={user} />;

  if (firstOpen) 
  return <Intro onFinish={findUser} />; // if no user return intro else return note
    return (
      <NavigationContainer> 
        <NoteProvider>
          <Stack.Navigator 
            screenOptions={{ headerTitle: '', headerTransparent: true }}>  
            <Stack.Screen component={RenderNote} name='Note' />
            <Stack.Screen component={NoteDetails} name='NoteDetails' />
          </Stack.Navigator>
        </NoteProvider>
      </NavigationContainer>
        /* return <Intro onFinish={findUser} />; */
        // return <Note user={user} />;
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
