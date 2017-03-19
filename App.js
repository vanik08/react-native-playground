import React from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput,
  Button, 
  ListView,
  Text
} from 'react-native';

export default class App extends React.Component {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  state = {
    newTodo: '',
    todos: ['1', '2'],
  }

  onNewTodo = (newTodo) => this.setState({ newTodo });

  onAddNewTodo = () => {
    this.setState((prevState) => {
      return {
        todos: [...prevState.todos, this.state.newTodo],
        newTodo: '',
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add Todo Item"
            onChangeText={this.onNewTodo}
            onSubmitEditing={this.onAddNewTodo}
            value={this.state.newTodo}
          />
          <View style={styles.addBtn}>
            <Button
              style={styles.addBtn}
              title="Add"
              onPress={this.onAddNewTodo}
            />
          </View>
        </View>
        <View>
          <ListView 
            style={styles.list}
            dataSource={this.ds.cloneWithRows(this.state.todos)}
            renderRow={(rowData) => <Text style={styles.listItem}>{rowData}</Text>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  input: {
    flexGrow: 1,
    height: 30,
    width: '50%',
    fontSize: 30,
  },
  addBtn: {
    marginRight: 0,
  },
  listItem: {
    fontSize: 25,
  }
});
