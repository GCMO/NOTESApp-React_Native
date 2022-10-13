import React, {useState} from 'react'
import { StyleSheet, Text, ScrollView, View, Alert } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'; //'@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/colors';
import RoundBtn from './RoundBtn';
import NoteModal from './NoteModal';
import { useNotes } from '../context/NoteProvider';

// import { useParams } from 'react-router-dom';
// const { params } = useParams();

// note creation date
const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() +1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`
};


const NoteDetails = (props) => {

  const [note, setNote] = useState(props.route.params.note);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const headerHeight = useHeaderHeight(); 
  const {setNotes} = useNotes();
 
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes'); // get all notes
    let notes = [];
    if (result !== null) notes = JSON.parse(result);  // if notes exist, parse them
      const newNotes = notes.filter(item => item.id !== note.id); // filter out the note to be deleted
      setNotes(newNotes) // update context
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes)); // update storage
      props.navigation.goBack(); // go back to notes list
    };

  //   const displayDeleteAlert = () => {
  //   // console.log('delete alert');
  //   Alert.alert('Confirm Deletion', 'Are you sure you want to delete this note?', [
  //     {text: 'Confirm', onPress: deleteNote},
  //     {text: 'No Thanks', onPress: () => console.log('no thanks'),}, 
  //     ],
  //     { cancelable: true },
  //   );
  // };

  const handleUpdate = async (title, descr, time) => {
    const result = await AsyncStorage.getItem('notes'); // get the notes
    let notes = []; 
    if (result !== null)  notes = JSON.parse(result); 
    // if there are notes, parse them
    
    const newNotes = notes.filter(item => {
      if (item.id === note.id) {
        item.title = title;
        item.descr = descr;
        item.time = time;
        item.isUpdated = true;

        setNote(item); // update note to item 
      }
      return item;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const handleOnClose = () => setShowModal(false);
  
  const openEditModal = () => {
    setShowModal(true);
    setIsEdit(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, {paddingTop: headerHeight}] } >
        <Text style={styles.date}> 
          { note && note.isUpdated  
            ? `Updated on: ${formatDate(note.time)}` 
            : `Created on: ${formatDate(note.time)}` }
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.descr}>{note.descr}</Text>
      </ScrollView>

      <View style={styles.btnContainer}>
          <RoundBtn 
            antIconName='delete' 
            style={{backgroundColor: colors.ERROR, marginBottom: 15}} 
            onPress={deleteNote}  //{displayDeleteAlert} 
          />
          <RoundBtn 
            antIconName='edit' 
            onPress={openEditModal} 
            style={{ marginBottom: 15, marginLeft:5}} 
          />
      </View>
      <NoteModal 
        isEdit={isEdit} 
        note={note} 
        onClose={handleOnClose} 
        onSubmit={handleUpdate} 
        visible={showModal} 
      />
    </>
  );
};

export default NoteDetails

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: colors.PRIMARY,
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
  date:{
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer:{
    position : 'absolute',
    right : 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 10,
  },
});