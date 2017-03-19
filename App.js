import React from 'react';
import { StyleSheet, Text, Button, Alert, View } from 'react-native';

export default class App extends React.Component {
  state = {
    show: false,
  }

  alertMe = () => {
    Alert.alert(
      'Omg something is up!'
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button onPress={() => this.setState({ show: !this.state.show }) } title="Button!" />
        <Button title="Alert Me!" onPress={this.alertMe} />
        {this.state.show && <Text>SHOWING!!!</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
