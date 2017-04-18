import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';

class TodoList extends Component {
  constructor() {
    super('foo');
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  title() {
    const content = this.props.content;
    const id = this.props.id;
    let name = null;
    if (content.editingName) {
      name = (
        <TextField
          autoFocus
          fullWidth
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
    }
    return (
      <div>
        {name}
      </div>
    );
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const n = this.props.content.todoItem.length;
    const items = this.props.content.todoItem;
    const list = [];
    for (let j = 0; j < n; j += 1) {
      if (items[j].finished && this.props.fin) {
        list.push(j);
      } else if (!items[j].finished && this.props.unfin) {
        list.push(j);
      }
    }


    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Delete"
        secondary
        onTouchTap={() => {
          this.props.handleDeleteList(this.props.id);
          this.handleClose();
        }}
      />,
    ];

    return (
      <div className="list-container">
        <AppBar
          title={this.title()}
          onTitleTouchTap={() => this.props.handleChangeTitleType(this.props.id)}
          iconElementLeft={
            <IconButton
              // onTouchTap={() => this.props.handleDeleteList(this.props.id)}
              onTouchTap={this.handleOpen}
            >
              <NavigationClose />
            </IconButton>
          }
        />

        <Dialog
          title="Want to delete?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        Are you sure you want to delete the list?
        The deletion cannot be recovered.
        </Dialog>
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

          <List className="List">
            {list.map(i =>
              <ListItem
                leftIcon={
                  // For some reason, there is shifting between click point and checkbox outline
                  // To solve this problem, I go to node_modules/material-ui/svg-icons/toggle
                  // in ./check-box.js, add in contruct func.
                  // props.style.position = 'relative';
                  // in ./check-box-outline-blank.js, add in contruct func.
                  // props.style.position = 'absolute';
                  <Checkbox
                    checked={this.props.content.todoItem[i].finished}
                  />
                }
                onTouchTap={() => this.props.handleCheck(this.props.id, i)}
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


const p = React.PropTypes;

TodoList.propTypes = {
  id: p.number.isRequired,
  content: p.shape({
    listName: p.string.isRequired,
    todoItem: p.arrayOf(p.shape({
      itemName: p.string.isRequired,
      finished: p.bool.isRequired,
    })).isRequired,
    editingName: p.bool.isRequired,
    inputName: p.string.isRequired,
  }).isRequired,
  fin: p.bool.isRequired,
  unfin: p.bool.isRequired,
  handleChangeTitleType: p.func.isRequired,
  handleEditName: p.func.isRequired,
  handleDeleteList: p.func.isRequired,
  handleChangeItemName: p.func.isRequired,
  handleCreateItem: p.func.isRequired,
  handleCheck: p.func.isRequired,
  handleDeleteItem: p.func.isRequired,
};

export default TodoList;
