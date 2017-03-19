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
    doneTodos: { 'example 2': true, },
    filterDone: false,
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

  onDone = (doneItm) => {
    console.log(doneItm, 'DONE ITM');

    this.setState(prevState => ({
      doneTodos: {
        ...this.state.doneTodos,
        [doneItm]: !prevState.doneTodos[doneItm],
      }
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
          <View style={styles.actionButton}>
            <Button
              style={styles.actionButton}
              title="Add"
              disabled={!this.state.newTodo}
              onPress={this.onAddNewTodo}
            />
          </View>
          <View style={styles.actionButton}>
            <Button
              style={styles.actionButton}
              title={this.state.filterDone ? 'Show All' : "Show Done"}
              onPress={() => this.setState(prevState => ({ filterDone: !prevState.filterDone }))}
            />
          </View>
        </View>
        <View>
          <ListView 
            style={styles.list}
            dataSource={this.ds.cloneWithRows(this.state.filterDone ? this.state.todos.filter(itm => this.state.doneTodos[itm]) : this.state.todos)}
            renderRow={(rowData) => (
              <View style={styles.listRow}>
                <Text style={this.state.doneTodos[rowData] ? styles.listItemDone : styles.listItem}>{rowData}</Text>
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => this.onDelete(rowData)}
                />
                <Button
                  title={this.state.doneTodos[rowData] ? 'Todo' : 'Done'}
                  color={this.state.doneTodos[rowData] ? 'purple' : 'green'}
                  onPress={() => this.onDone(rowData)}
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
    height: 32,
    width: '50%',
    fontSize: 30,
  },
  actionButton: {
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
  listItemDone: {
    fontSize: 24,
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
  },
  listItem: {
    fontSize: 25,
    fontStyle: 'italic',
  }
});
