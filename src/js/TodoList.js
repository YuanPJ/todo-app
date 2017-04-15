import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import '../css/TodoList.css';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor() {
    super();
  }

  title() {
    const content = this.props.content;
    const id = this.props.id;
    let name = null;
    if (content.editingName) {
      name = (
        <TextField
          autoFocus
          value={content.listName}
          onChange={e => this.props.handleEditName(id, e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              this.props.handleEditName(id, content.listName);
              this.props.handleChangeTitleType(id);
            }
          }}
          onBlur={() => {
            this.props.handleEditName(id, content.listName);
            this.props.handleChangeTitleType(id);
          }}
        />
      );
    } else {
      name = content.listName;
      // name = (<span style={styles.title}>Title</span>)
      /* name = (
        <FlatButton
          label={content.listName}
          onTouchTap={() => this.props.handleChangeTitleType(id)}
        />
      );*/
    }
    return (
      <div>
        {name}
      </div>
    );
  }

  render() {
    const n = this.props.content.todoItem.length;
    const items = this.props.content.todoItem;
    let list = [];
    for (let j = 0; j < n; j += 1) {
      if (items[j].finished && this.props.fin) {
        list.push(j);
      } else if (!items[j].finished && this.props.unfin) {
        list.push(j);
      }
    }
    return (
      <div className="list-container">
        <AppBar
          title={this.title()}
          onTitleTouchTap={() => this.props.handleChangeTitleType(this.props.id)}
          iconElementLeft={
            <IconButton
              onTouchTap={() => this.props.handleDeleteList(this.props.id)}
            >
              <NavigationClose />
            </IconButton>
          }
        />

        <div className="list">
          <TextField
            hintText="New Item"
            value={this.props.content.inputName}
            onChange={(e) => {
              this.props.handleChangeItemName(this.props.id, e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                this.props.handleCreateItem(this.props.id);
              }
            }}
          />

          <List>
            {list.map(i =>
              <ListItem
                leftCheckbox={
                  // For some reason, there is shifting between click point and checkbox outline
                  // To solve this problem, I go to node_modules/material-ui/svg-icons/toggle
                  // in ./check-box.js, add in contruct func.
                  // props.style.position = 'relative';
                  // in ./check-box-outline-blank.js, add in contruct func.
                  // props.style.position = 'absolute';
                  <Checkbox
                    checked={this.props.content.todoItem[i].finished}
                    onTouchTap={() => this.props.handleCheck(this.props.id, i)}
                  />
                }
                id={i}
                primaryText={this.props.content.todoItem[i].itemName}
                rightIconButton={
                  <IconButton
                    onTouchTap={() => this.props.handleDeleteItem(this.props.id, i)}
                  >
                    <NavigationClose />
                  </IconButton>
                }
              />)
            }
          </List>
        </div>
      </div>
    );
  }
}

export default TodoList;
