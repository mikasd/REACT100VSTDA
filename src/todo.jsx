import React, { Component } from 'react';

class Child extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editToDo: false,
            updatedDesc: props.description
        }
        this.finishUpdate = this.finishUpdate.bind(this);
        this.finishDelete = this.finishDelete.bind(this)
    }

    priorityClass(priority) {
        switch (priority) {
            case '1':
                return 'list-group-item-success';
            case '2':
                return 'list-group-item-warning';
            case '3':
                return 'list-group-item-danger';
        }
    }

    
    finishDelete() {
        this.props.onDelete(
            this.props.index,
        )
    } 

    finishUpdate() {
        this.setState({
            editToDo: false,
        });

        this.props.onUpdate(
            this.props.index,
            this.state.updatedDesc,
            this.state.updatedPriority
        )
    } 

    render() {
        return (
            <li className={'list-group-item ' + this.priorityClass(this.props.priority)}> 
                {
                    this.state.editToDo

                        ? (
                            <div style={{ marginBottom: 0 + 'px', textDecorationStyle: "none"}} >
                                <div style={{ marginBottom: 20 + 'px' }}>
                                    <textarea
                                        style={{ float: 'left', marginBottom: '0px', marginTop: '10px' }}
                                        className='form-control update-todo-text'
                                        onChange={(e) => this.setState({ updatedDesc: e.target.value })}
                                        value={this.state.updatedDesc} />
                                    <p><strong >Priority</strong></p>
                                    <div className='row'>
                                        <div className='col-xs-10'>
                                            <select onChange={this.props.updatedPriority} className='form-control update-todo-priority '>
                                                <option value='' hidden>Select a priority</option>
                                                <option value='1'>Low Priority</option>
                                                <option value='2'>Medium Priority</option>
                                                <option value='3'>High Priority</option>
                                            </select>
                                        </div>

                                        <div className='col-xs-1'>
                                            <a className='edit-todo' onClick={this.finishUpdate} ><button style={{}} className='update-todo btn btn-success'>Save!</button> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        : (<div style={{ marginBottom: 0 + 'px' }} className={'alert ' + this.priorityClass(this.props.priority)}>
                            <div style={{ marginBottom: 20 + 'px' }}>
                                <input style={{ float: 'left' }} id='check' type='checkbox' />
                                <p className=''><strong>{this.props.description}</strong></p>
                                <div style={{ float: 'right' }}>
                                    <a style={{color: '#2e5ca5'}}className='edit-todo' onClick={(event) => {this.setState({ editToDo: true })}}><span className='glyphicon glyphicon-edit'> </span> </a>
                                    <a style={{color: '#a52e2e'}}className='delete-todo' onClick={this.finishDelete}><span className='glyphicon glyphicon-trash'> </span></a>
                                </div>
                            </div>
                        </div>
                        )
                }
            </li>

        );
    }
}
export default Child;