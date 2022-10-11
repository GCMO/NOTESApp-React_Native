import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../assets/colors';
import React from 'react'

const Noted = ({item, onPress}) => {
  const {title, descr} = item
  return (
    <TouchableOpacity onPress={onPress} numberOfLines={3} style={styles.container}>
        <Text style={styles.title} >{title}</Text>
        <Text numberOfLines={4} >{descr}</Text>  
    </TouchableOpacity>
  )
}

export default Noted

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.PRIMARY,
    width: width / 2 - 5, // 2 columns, 5px margin
    padding: 7,
    borderRadius: 7,
    marginTop: 5,
    marginRight:5,
    boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',

  },
  title:{
    fontSize: 15,
    fontWeight: 600,
    color:colors.LIGHT,
  },
});