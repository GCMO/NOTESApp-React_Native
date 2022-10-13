import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons'

const NotFound = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <AntDesign name='frowno' size={90} color='black' />
      <Text style={styles.text}>No notes found</Text>
    </View>
  )
};

export default NotFound

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: .5,
    zIndex: -1,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
})