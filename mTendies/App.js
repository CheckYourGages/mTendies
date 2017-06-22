import React, {Component, PropTypes} from 'react';
import { StyleSheet, Text, View, NavigatorIOS} from 'react-native';
import HomePage from './HomePage.js';
import LandingPage from './LandingPage.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00274c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22,
  },
})


export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      fetched: false,
      hasTenders: [],
    };
  }

  componentDidMount(){



    return fetch('http://localhost:3000/find')
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({hasTenders: responseJson.hasTenders, fetched: true});
    });
  }

  render() {
    if(this.state.fetched == false){
      return (
        <View style={styles.container}>
          <Text style={{color: '#fff', fontSize: 25,}}> Loading... </Text>
        </View>
      )
    } else {
      return (
        <NavigatorIOS 
          initialRoute={{component: LandingPage, title: 'Welcome', passProps: {state: this.state}}} 
          style={{flex: 1}} 
          navigationBarHidden={true} />)
    };
  }
}