import React, {Component, PropTypes} from 'react';
import {Image, StyleSheet, Text, View, Button, Alert, NavigatorIOS} from 'react-native';

import HomePage from './HomePage.js';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00274c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: '#ffcb05',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 30,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    margin: 20,
  },
});


export default class LandingPage extends Component {
  constructor(props){
    super(props);

    this.testFunc = this.testFunc.bind(this);
    this.state = this.props.state;
  }

  static propTypes={
    navigator: PropTypes.object.isRequired,
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.text}> Hey, friend! This is a tool to find chicken tenders in Umich dining halls! </Text>
        <Button style={styles.button} onPress={this.testFunc} title="OMG, hook me up!" color="#ffcb05"/>
      </View>
    )
  }

  testFunc() {
    if(Alert.alert('Confirm', "Are you sure you're TendieReady™?", 
      [
        { text: "Yes", onPress: () => {this.props.navigator.push({title: 'Finder', component: HomePage, passProps: {state: this.state}})} },
        { text: "No", onPress: () => {Alert.alert("That's okay, take your time. Tendies are a big deal.")}, style: 'cancel'},
      ])){
      alert("Tested.");
    }
  }
}