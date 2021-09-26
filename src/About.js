import React  from 'react';


import { Text, StyleSheet } from "react-native";


export default function About (){
  return <Text style = { styles.about}> Sometimes i can</Text>
}

const styles = StyleSheet.create({
  about: {
    color: 'green'
  }
})
