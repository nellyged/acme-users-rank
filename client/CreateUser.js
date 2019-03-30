import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from './store';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    createOrEditUser: (user, history) => dispatch(createUser(user, history)),
  };
};

export class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      bio: '',
      rank: '',
    };
  }
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  onSubmit = ev => {
    ev.preventDefault();
    this.props.createOrEditUser(this.state, this.props.history);
  };
  render() {
    const { onChange, onSubmit } = this;
    return (
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="name"
          name="name"
          onChange={onChange}
        />
        <input
          className="form-control"
          placeholder="bio"
          name="bio"
          onChange={onChange}
        />
        <input
          className="form-control"
          placeholder="rank"
          name="rank"
          onChange={onChange}
        />
        <div className="btn-group" style={{ marginTop: '10px' }}>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
          <Link to="/users">
            <button className="btn btn-info">Cancel</button>
          </Link>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateUser);
