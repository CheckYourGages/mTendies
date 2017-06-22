import React, {Component, PropTypes} from 'react';
import { FlatList, Image, StyleSheet, Text, View, Button, NavigatorIOS, Alert} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00274c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22,
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
  list: {
    flex: 1,
  }
});

export default class HomePage extends Component {
  constructor(props){
    super(props);

    this.listDiningHalls = this.listDiningHalls.bind(this);

    this.state = this.props.state;
  }

  static propTypes={
    navigator: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}> Finder </Text>

        {this.state.fetched == true && this.state.hasTenders.length == 0 ? 
        <Image style={{height: 300, width: 300}} source={{uri: "http://localhost:3000/pic"}} /> : 
        <Image style={{height: 150, width: 300}} source={{uri: "http://s3.amazonaws.com/cos-cdn2/SteaknShake/Menu/mobile/chicken-fingers.png"}} />}

        <Text style={styles.text}>  {this.state.fetched == false ? "Loading..." : this.state.hasTenders.length == 0 ? "Sorry, no tendies today..." : "Congratulations! Today there are tendies at:"} </Text>
        <FlatList style={styles.list} data={this.listDiningHalls()} renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>} />

      </View>
    )
  }

  listDiningHalls(){
    var halls = [];
    this.state.hasTenders.map((data) => {
      halls.push({key: data});
    })
    return halls;
  }
}