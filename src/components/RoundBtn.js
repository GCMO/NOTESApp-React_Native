import React from 'react';
import { StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from '../assets/colors';

const RoundBtn = ({antIconName, size, color, onPress, style}) => {
  return (
      <AntDesign 
        name={antIconName} 
        size={size || 24} 
        color={color || colors.DARK}
        style={[styles.icon, {...style}]} 
        onPress={onPress} />
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  icon:{
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 17,
    elevation: 5,
    marginTop: 10,
    boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
  },
});