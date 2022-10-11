import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, StatusBar, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/colors'
import NoteModal from '../components/NoteModal'
import RoundBtn from '../components/RoundBtn'
import SearchBar from '../components/SearchBar'
import Intro from './Intro'
import Noted from '../components/Noted'
import { useNotes } from '../context/NoteProvider';


const Note = ({user, navigation}) => {

  const [greet, setGreet] = useState('Hi')
  const [modal, setModal] = useState(false) // to show/hide the modal
  const {notes, setNotes} = useNotes()

  const handleOnSubmit = async (title, descr) => {
    const note = {id: Date.now(), title:title, descr:descr, time: Date.now() } 
    console.log(note);
    const updatedNotes = [...notes, note] // display all notes and + new one
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
  }
  
  // const findGreet = () => {
  //   const hours = new Date().getHours();
  //   if (hours === 0 || hours < 12) return setGreet('Good Morning');
  //   if (hours === 12 || hours < 17) return setGreet('Good Afternoon');
  //     setGreet('Good Morning');
  //   };

  useEffect(() => {
    findNotes();
    // findGreet();
  },[]);

  const openNote = (item) => {
    navigation.navigate('NoteDetails', {note})
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
          <View style={styles.container}>
            <Text style={styles.header}>{`${greet} ${user.name}`}
            </Text>
            <SearchBar containerStyle={{marginVertical:10}} />

            <FlatList data={notes} numColumns={2} columnWrapperStyle={{justifyContent:'space-between', marginBottom: 10}}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => ( <Noted onPress={() => openNote(item)} item={item} /> )} 
            /> 

            { !notes.length ? (
              <View style={[styles.emptyHeader, StyleSheet.absoluteFillObject]}>
              <Text style={styles.emptyHeading}>Add Notes</Text>
            </View>
            ) : null}

            <RoundBtn 
              antIconName='plus' 
              onPress={() => setModal(true) } 
              style={styles.addBtn} />
          </View>
        </TouchableWithoutFeedback>

        <NoteModal visible={modal} onClose={()=> setModal(false)} onSubmit={handleOnSubmit}
        />
    </>
  );
};

export default Note

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    maxWidth: '100%',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 20,
    marginBottom: 35,
  },
  emptyHeading:{
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'uppercase',
    opacity: 0.5,
  }, 
  emptyHeader:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    // border: '5px solid red',
  },
  addBtn:{
    position: 'absolute',
    bottom: 50,
    left: -30,
    zIndex: 1,
    // marginBottom: 20,
   },
});