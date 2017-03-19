import React from 'react';
import _ from 'lodash';
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
    todos: ['example 1', 'example 2'],
  }

  onNewTodo = (newTodo) => this.setState({ newTodo });

  onAddNewTodo = () => {
    this.setState((prevState) => ({
        todos: [...prevState.todos, this.state.newTodo],
        newTodo: '',
        focusInput: true,
    }));
    _.defer(this._input.focus);
  }

  onDelete = (searchItm) => {
    this.setState((prevState) => ({
      todos: _.pull(prevState.todos, searchItm),
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input => this._input = input }
            style={styles.input}
            placeholder="Add Todo Item"
            onChangeText={this.onNewTodo}
            onSubmitEditing={this.onAddNewTodo}
            returnKeyType="done"
            enablesReturnKeyAutomatically
            value={this.state.newTodo}
          />
          <View style={styles.addBtn}>
            <Button
              style={styles.addBtn}
              title="Add"
              disabled={!this.state.newTodo}
              onPress={this.onAddNewTodo}
            />
          </View>
        </View>
        <View>
          <ListView 
            style={styles.list}
            dataSource={this.ds.cloneWithRows(this.state.todos)}
            renderRow={(rowData) => (
              <View style={styles.listRow}>
                <Text style={styles.listItem}>{rowData}</Text>
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => this.onDelete(rowData)}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingBottom: 35,
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
    height: 32,
    width: '50%',
    fontSize: 30,
  },
  addBtn: {
    marginRight: 0,
  },
  list: {
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderBottomColor: '#AABBCC',
    borderBottomWidth: 1,
  },
  listItem: {
    fontSize: 25,
    fontStyle: 'italic',
  }
});
