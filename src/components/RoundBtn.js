import React from 'react';
import { View, StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from '../assets/colors';

const RoundBtn = ({antIconName, size, color, onPress, style}) => {
  return (
    <View style={styles.container}>
      <AntDesign 
        name={antIconName} 
        size={size || 24} 
        color={color || colors.DARK}
        style={[styles.icon, {...style}]} 
        onPress={onPress} />
    </View>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 10,
  //   backgroundColor: 'silver',
  //   padding: 10,
  //   borderRadius: 17,
  //   borderColor: '#000',  
  //   borderWidth: 2,
  // },
  icon:{
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 17,
    elevation: 5,
    marginTop: 10,
    boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
  },
});