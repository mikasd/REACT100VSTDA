import React, { Component } from 'react';
import ToDo from './todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: 'You forgot to enter an Item!',
      priorityValue: '3',
      introHidden: 'intro-alert alert alert-info',
      delete: '',
      todoItems: [],
      updatedDesc: '',
      updatedPriority: ''
    }
    // declare binds
    this.handleDesc = this.handleDesc.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.renderTodo = this.renderTodo.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.handleUpdateDesc = this.handleUpdateDesc.bind(this);
    this.handleUpdatePriority = this.handleUpdatePriority.bind(this);
  }

  onDelete(index) {
    let todoItems = [...this.state.todoItems];
    let theTodoItemToDelete = todoItems[index];
    todoItems.splice(index, 1);
    this.setState({
      todoItems
    });
  }

  handleUpdateDesc(event) {
    this.setState({ updatedDesc: event.target.value })
  }

  handleUpdatePriority(event) {
    this.setState({ updatedPriority: event.target.value })
  }

  handleDesc(event) {
    this.setState({ desc: event.target.value })
  }

  handlePriority(event) {
    this.setState({ priorityValue: event.target.value })
  }


  onUpdate(index, description, priority) {
    // figure out how to update the todo item in the array based on the above information
    console.log('UPDATE CLICKED')
    // Creates a new array, and copies all elements from this.state.todoItems into this new array.
    let todoItems = [...this.state.todoItems]
    let theTodoItemToEdit = todoItems[index];
    console.log(this.state.todoItems[index])
    theTodoItemToEdit.desc = description;
    theTodoItemToEdit.priority = priority;
    this.setState({
      todoItems
    });
  }


  onAdd(event) {
    // Creates a new array, and copies all elements from this.state.todoItems into this new array.
    let todoItems = [...this.state.todoItems]

    // Create a new todo object, using the values entered by the user
    let todo = {
      desc: this.state.desc,
      priorityValue: this.state.priorityValue
    }

    // Push the todo object into the copy array
    todoItems.push(todo);

    // Updating the state, `replacing` the todoItems array that is currently in the state with the copied array.
    this.setState({
      introHidden: 'hidden',
      todoItems
    });
  }
  //MAP IS FOR EACH FOR EACH ITEM IN ARRAY GETS ITEM AND INDEX BASED ON VALUE
  renderTodo() {
    if (this.state.todoItems.length) {
      return this.state.todoItems.map((item, index) => {
        return (
          <ToDo
            description={item.desc}
            priority={item.priorityValue}
            index={index}
            key={index}
            onDelete={this.onDelete}
            onUpdate={this.onUpdate}
            handleUpdateDesc={this.handleUpdateDesc}
            handleUpdatePriority={this.handleUpdatePriority}
          />
        )
      })
    }


    return []

  }
  render() {
    return (
      <div className='container'>
        <div className='page-header'>
          <h1 style={{ color: 'white' }}> Very Simple Todo App</h1>
          <h3 style={{ color: 'white' }}>Track all of the things</h3>
        </div>
        <div className='panel panel-default col-xs-4' style={{ padding: 0 + 'px' }}>
          <div className='panel-heading'>Add New Todo</div>
          <div className='panel-body'>
            <p><strong> I want to do...</strong> </p>
            <textarea onChange={this.handleDesc} className='create-todo-text form-control'></textarea>
            <p><strong>How much of a priority is this?</strong> </p>
            <select onChange={this.handlePriority} className='create-todo-priority form-control'>
              <option value='' hidden>Select a priority</option>
              <option value='1'>Low Priority</option>
              <option value='2'>Medium Priority</option>
              <option value='3'>High Priority</option>
            </select>
          </div>
          <div className='panel-footer'>
            <button onClick={this.onAdd} id='addButton' className='btn btn-success form-control create-todo'>Add</button>
          </div>
        </div>
        <div className='panel panel-default col-xs-7 col-xs-offset-1' style={{ padding: 0 + 'px' }} >
          <div className='panel-heading'>View todos</div>
          <div className={this.state.introHidden} style={{ marginBottom: 0 + 'px' }}>
            <p><strong>Welcome to a Very Simple Todo App!</strong></p>
            <p>Get started now by adding a new todo on the left!</p>
          </div>
          <ul className='list-group'>{this.renderTodo()}</ul>

        </div>
      </div>
    );
  }
}

export default App;