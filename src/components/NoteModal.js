import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import RoundBtn from './RoundBtn';
import colors from '../assets/colors';


const NoteModal = ({ visible, onClose, onSubmit, note, isEdit}) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');

  const handleModalClose = () => {
    Keyboard.dismiss();
  } 

  useEffect(() => { 
    if (isEdit) { 
      setTitle( note.title)  
      setDescr( note.descr)
    }
  }, [isEdit]);   

  const handleOnChangeText = (text, valueFor) => {
    if(valueFor === 'title'){
      setTitle(text);
    }
    if(valueFor === 'descr'){
      setDescr(text);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() && !descr.trim()) // if no title and no descr
      return onClose();                 // close the modal    

    if (isEdit){ // for edited
      onSubmit(title, descr, Date.now()) // else submit the title and descr
    } else {
      onSubmit(title, descr)
      setTitle('');                       // clear the title
      setDescr('');                       // clear the descr
      }                                     
      onClose();                          // and close the modal  
    };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');                       
      setDescr(''); 
    }                        
    onClose();
  };

  return (
    <>
     <StatusBar hidden />
      <Modal visible={visible} animationType='slide'>
        <View style={styles.container}>

          <TextInput 
            onChangeText={(text) => handleOnChangeText(text, 'title')} 
            style={[styles.input, styles.title]}
            value={title} placeholder='Title:' />

          <TextInput  
            onChangeText={(text) => handleOnChangeText(text, 'descr')} 
            style={[styles.input, styles.descr]}
            multiline value={descr} placeholder='Note:' />

          <View style={styles.btnCon}>
            <RoundBtn 
              antIconName='check' 
              size={15} 
              onPress={handleSubmit} 
              style={styles.icon} />  

            { title.trim() || descr.trim() ? (
            <RoundBtn 
              antIconName='close' 
              size={15} 
              onPress={closeModal} /> 
            ) : null } 

          </View>
        </View>

            <TouchableWithoutFeedback onpress={handleModalClose}>
              <View style={[styles.modalBg, StyleSheet.absoluteFillObject]} />
            </TouchableWithoutFeedback>
      </Modal>
    </>
  )
};

export default NoteModal;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    margin: 10,
    paddingTop: 20,
    backgroundColor: '#fa9522',
    borderRadius: 7,
    boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
  },
  input: {
    borderBottomWidth: 3,
    flex: 1,
    fontSize: 20,
    margin: 10,
    color: colors.DARK,
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 10,
    maxHeight: 100,
    padding: 5,
    boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
    backgroundColor: 'coral',
    borderRadius: 7,
  },
  descr: {
    minHeight: 200,
    padding: 5,
    boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  modalBg:{
    flex: 1,
    zIndex: -1,
    BorderBottomColor: 'salmon',
  },
  btnCon:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 10,
    paddingVertical: 10,
  },
});