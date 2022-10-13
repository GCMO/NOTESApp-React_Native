import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, StatusBar, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/colors'
import NoteModal from '../components/NoteModal'
import RoundBtn from '../components/RoundBtn'
import SearchBar from '../components/SearchBar'
import NotFound from '../components/NotFound'
import Noted from '../components/Noted'
import { useNotes } from '../context/NoteProvider';
// import Intro from './Intro'


const Note = ({user, navigation}) => {

  const [greet, setGreet] = useState('Hi')
  const [modal, setModal] = useState(false) // to show/hide the modal
  const [search, setSearch] = useState('') // to search for notes
  const [resultNotFound, setResultNotFound] = useState(false) // to show/hide the result not found text
  const {notes, setNotes, findNotes} = useNotes()
  
  // const findGreet = () => {
  //   const hours = new Date().getHours();
  //   if (hours === 0 || hours < 12) return setGreet('Good Morning');
  //   if (hours === 12 || hours < 17) return setGreet('Good Afternoon');
  //     setGreet('Good Morning');
  //   };

  // useEffect(() => {
  //   // findGreet();
  // },[]);

  const handleOnSubmit = async (title, descr) => {
    const note = {id: Date.now(), title:title, descr:descr, time: Date.now() } 
    console.log(note);
    const updatedNotes = [...notes, note]; // display all notes and + new one
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)) // save notes to storage
  };

  const openNote = (note) => {
    navigation.navigate('NoteDetails', {note})
  };

  const handleOnSearchInput = async (text) => {
    setSearch(text);              // update search state
    if(!text.trim()) {            // if search is empty
      setSearch('');              // update search state
      setResultNotFound(false);   // hide result not found text
      return await findNotes()     // and return all notes
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });
    if (filteredNotes.length) {     // if filtered notes is not empty
      setNotes([...filteredNotes]); // update notes state
    } else {
      setResultNotFound(true);     // else show result not found 
    }
  }

  const handleOnClear = async () => { // clear search bar
    setSearch('');
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
          <View style={styles.container}>

            <Text style={styles.header}>{`${greet} ${user.name}`}</Text>
            {/* if there are notes show the searchbar else null */}
            { notes.length ? (
              <SearchBar 
                value={search} 
                onChangeText={handleOnSearchInput} 
                containerStyle={{marginVertical:10}} 
                onClear={handleOnClear}
              />
            ) : null}
            
            {resultNotFound ? ( <NotFound /> ) : (<FlatList 
              data={notes} 
              numColumns={2} 
              columnWrapperStyle={{justifyContent:'space-between',marginBottom: 10}}
              keyExtractor={ item => item.id.toString()}
              renderItem={({ item }) => ( 
                <Noted onPress={() => openNote(item)} item={item} /> )} 
              /> 
            )}
        {/* if there are no notes then show the intro screen otherwise dont */}
            { !notes.length ? (
              <View style={[styles.emptyHeader, StyleSheet.absoluteFillObject]}>
              <Text style={styles.emptyHeading}>Add Notes</Text>
            </View>
            ) : null}
          </View>
          </TouchableWithoutFeedback>

            <RoundBtn 
              antIconName='plus' 
              onPress={() => setModal(true) } 
              style={styles.addBtn} />

        <NoteModal visible={modal} onClose={() => setModal(false)} onSubmit={handleOnSubmit}
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
    left: 160,
    zIndex: 1,
    // marginBottom: 20,
   },
});