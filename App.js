import React from 'react';
import { StyleSheet, Text, Button, Alert, View } from 'react-native';

export default class App extends React.Component {
  state = {
    total: 0,
  }

  onAdd = () => {
    this.setState((prevState) => {
      return { total: prevState.total + 1};
    })
  }

  onSubtract = () => {
    if (this.state.total === 0) {
      Alert.alert('Cannot go any lower than 0!');
    } else {
      this.setState((prevState) => {
        return { total: prevState.total - 1};
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Total: {this.state.total} </Text>
        <View style={styles.inlineView}>
          <Button style={styles.opBtn} onPress={this.onAdd} title="ADD" />
          <Button style={styles.opBtn} onPress={this.onSubtract} title="Subtract" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 60,
  },
  inlineView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  opBtn: {
    fontSize: 100,
  }
});
