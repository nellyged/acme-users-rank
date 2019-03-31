import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createEditUser, clearErrors } from './store';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { errors: state.userFormErrors };
};

const mapDispatchToProps = dispatch => {
  return {
    createOrEditUser: (user, history) =>
      dispatch(createEditUser(user, history)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export class CreateUser extends Component {
  constructor(props) {
    super(props);
    if (!this.props.id) {
      this.state = {
        name: '',
        bio: '',
        rank: '',
      };
    } else {
      //we still need to be defensive if a user was not found
      const { user } = this.props;
      this.state = {
        name: user ? user.name : '',
        bio: user ? user.bio : '',
        rank: user ? user.rank : '',
      };
    }
  }
  componentDidMount() {
    //make sure errors are cleared on a new create form
    this.props.clearErrors();
  }
  componentDidUpdate(prevProps) {
    if (this.props.id && !prevProps.user && this.props.user) {
      const { user } = this.props;
      this.setState({
        name: user ? user.name : '',
        bio: user ? user.bio : '',
        rank: user ? user.rank : '',
      });
    }
  }
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  onSubmit = ev => {
    ev.preventDefault();
    const user = { ...this.state };
    if (this.props.id) {
      user.id = this.props.id;
    }
    this.props.createOrEditUser(user, this.props.history);
  };
  render() {
    const { errors } = this.props;
    const { onChange, onSubmit } = this;
    const editOrCreate = !!this.props.id;
    return (
      <form onSubmit={onSubmit}>
        {!!errors.length && (
          <ul className="alert alert-danger">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <input
          className="form-control"
          placeholder="name"
          name="name"
          value={this.state.name}
          onChange={onChange}
        />
        <input
          className="form-control"
          placeholder="bio"
          type="text"
          name="bio"
          value={this.state.bio}
          onChange={onChange}
        />
        <input
          className="form-control"
          placeholder="rank"
          type="number"
          name="rank"
          value={this.state.rank}
          onChange={onChange}
        />
        <div className="btn-group" style={{ marginTop: '10px' }}>
          <button className="btn btn-primary" type="submit">
            {editOrCreate ? 'Edit' : 'Create'}
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
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
