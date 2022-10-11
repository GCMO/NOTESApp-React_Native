import React from 'react'
import { StyleSheet, Text, ScrollView, View, Alert } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/colors';
import RoundBtn from './RoundBtn';

// date note was created
const formatDate = (time) => {
  const date = new Date(ms)
  const day = date.getDate() +1;
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
};


const NoteDetails = props => {
  const { note } = props.route.params;
  const headerHeight = useHeaderHeight(); 
  const {setNotes} = useNotes();
  
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if(result !== null) notes = JSON.parse(result);
      const newNotes = notes.filter(item => item.id !== note.id);
      setNotes(newNotes)
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      props.navigation.goBack();
    }
  }

  const displayDeleteAlert = () => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this note?', [
      {text: 'Confirm', onPress: deleteNote},
      {text: 'No Thanks', onPress: () => console.log('no thanks'),}, 
    ],
    {cancelable: true},
  );

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, {paddingTop: headerHeight}] } >
        <Text style={styles.time}> {`Created on:${formatDate(note.time)}`}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.descr}>{note.descr}</Text>
      </ScrollView>

      <View style={styles.btnContainer}>
          <RoundBtn antIconName='delete' 
          style={{backgroundColor: colors.ERROR, marginBottom: 15}} 
          onPress={displayDeleteAlert} 
          />
          <RoundBtn antIconName='edit' 
          onPress={() => console.log('note deleted')} 
          />
      </View>
    </>
  )
};

export default NoteDetails

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
  },
  title:{
    fontSize: 20,
    fontWeight: '650',
    color: colors.PRIMARY,
  },
  descr:{
    fontSize: 16,
    opacity: 0.7,
  },
  time:{
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer:{
    position : 'absolute',
    right : 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});