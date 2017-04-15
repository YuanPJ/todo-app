import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
import '../css/TodoApp.css';
import TodoList from './TodoList';
import CountDisplay from './CountDisplay';

injectTapEventPlugin();

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      newListName: '',
      openMessage: false,
      message: '',
      showUnfinished: true,
      showFinished: true,
    };
    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChangeTitleType = this.handleChangeTitleType.bind(this);
    this.handleEditName = this.handleEditName.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.handleCreateItem = this.handleCreateItem.bind(this);
    this.handleChangeItemName = this.handleChangeItemName.bind(this);
    this.handleCreateItem = this.handleCreateItem.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleCreateList(e) {
    let lists = this.state.lists;
    const n = this.state.newListName;
    if (e.key === 'Enter' && n !== '') {
      const newList = {
        listName: n,
        todoItem: [],
        editingName: false,
        inputName: '',
      };
      lists = lists.concat(newList);
      this.setState({
        lists,
        newListName: '',
        openMessage: true,
        message: `${n} todo-list created`,
      });
    }
  }

  handleRequestClose() {
    this.setState({
      openMessage: false,
      message: '',
    });
  }

  handleChangeTitleType(id) {
    const lists = this.state.lists;
    lists[id].editingName = !lists[id].editingName;
    this.setState({
      lists,
    });
  }

  handleEditName(id, name) {
    const lists = this.state.lists;
    lists[id].listName = name;
    this.setState({
      lists,
    });
  }

  handleDeleteList(id) {
    const lists = this.state.lists;
    lists.splice(id, 1);
    this.setState({
      lists,
    });
  }

  handleChangeItemName(id, name) {
    const lists = this.state.lists;
    lists[id].inputName = name;
    this.setState({
      lists,
    });
  }

  handleCreateItem(id) {
    const lists = this.state.lists;
    if (lists[id].inputName !== '') {
      const item = {
        itemName: lists[id].inputName,
        finished: false,
      };
      lists[id].todoItem = lists[id].todoItem.concat(item);
      lists[id].inputName = '';
      this.setState({
        lists,
      });
    }
  }

  handleDeleteItem(idList, idItem) {
    const lists = this.state.lists;
    lists[idList].todoItem.splice(idItem, 1);
    this.setState({
      lists,
    });
  }

  handleCheck(idList, idItem) {
    const lists = this.state.lists;
    lists[idList].todoItem[idItem].finished = !lists[idList].todoItem[idItem].finished;
    this.setState({
      lists,
    });
  }

  countAll() {
    const lists = this.state.lists;
    let finished = 0;
    let unfinished = 0;
    for (let i = 0; i < lists.length; i += 1) {
      for (let j = 0; j < lists[i].todoItem.length; j += 1) {
        if (lists[i].todoItem[j].finished) {
          finished += 1;
        } else {
          unfinished += 1;
        }
      }
    }
    return { finished, unfinished };
  }

  render() {
    const n = this.state.lists.length;
    const list = Array.from(Array(n).keys());
    const count = this.countAll();
    const fin = this.state.showFinished;
    const unfin = this.state.showUnfinished;
    return (
      <div className="TodoApp">
        <div>
          <h1>TODO</h1>
        </div>

        <div className="header">
          <div className="trivial" />
          <div className="main">
            <TextField
              hintText="New List"
              value={this.state.newListName}
              onChange={(e) => {
                this.setState({
                  newListName: e.target.value,
                });
              }}
              onKeyUp={this.handleCreateList}
            />
            <CountDisplay count={count} />
          </div>

          <div className="toggle">
            <Toggle
              label="Complete"
              labelPosition="right"
              toggled={this.state.showFinished}
              onTouchTap={() => {
                this.setState({
                  showFinished: !fin,
                });
              }}
            />
            <Toggle
              label="Unfinished"
              labelPosition="right"
              toggled={this.state.showUnfinished}
              onTouchTap={() => {
                this.setState({
                  showUnfinished: !unfin,
                });
              }}
            />
          </div>
        </div>

        <ul className="Lists">
          {list.map(i =>
            <li>
              <TodoList
                id={i}
                content={this.state.lists[i]}
                fin={fin}
                unfin={unfin}
                handleChangeTitleType={id => this.handleChangeTitleType(id)}
                handleEditName={(id, name) => this.handleEditName(id, name)}
                handleDeleteList={id => this.handleDeleteList(id)}
                handleChangeItemName={(id, name) => this.handleChangeItemName(id, name)}
                handleCreateItem={id => this.handleCreateItem(id)}
                handleCheck={(idList, idItem) => this.handleCheck(idList, idItem)}
                handleDeleteItem={(idList, idItem) => this.handleDeleteItem(idList, idItem)}
              />
            </li>)
          }
        </ul>

        <Snackbar
          open={this.state.openMessage}
          message={this.state.message}
          autoHideDuration={1500}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default TodoApp;
