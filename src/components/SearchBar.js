import React from 'react'
import { View, StyleSheet, TextInput} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../assets/colors'

const SearchBar = ({value, onClear, onChangeText}) => {
  return (
    <View style={styles.container}>
      <TextInput 
        value={value}
        style={styles.searchBar} 
        placeholder='Search...'
        onChangeText={onChangeText}
        />
        {value ? (<AntDesign name="close" onPress={onClear} color={colors.PRIMARY} style={styles.clearIcon}></AntDesign>) : null}
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 5,
  },
  searchBar: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 17,
    borderColor: colors.PRIMARY,
    height: 40,
    fontSize: 18,
    boxShadow: '4px 4px 10px rgba(0,0,0,0.3)',
  },
  clearIcon:{
    position: 'absolute',
    right: 10,
  }
})
