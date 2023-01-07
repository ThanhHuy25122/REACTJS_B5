import React, { Component } from "react";
import { connect } from "react-redux";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  state = {
    values: {
      username: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      email: "",
      type: "Client",
    },
    errors: {
      username: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      email: "",
      type: "",
    },
  };

  handleChange = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);

    // if (event.target.name === "username") {
    //   this.setState({
    //     username: event.target.value,
    //   });
    // }

    // if (event.target.name === "fullName") {
    //   this.setState({
    //     fullName: event.target.value,
    //   });
    // }

    const { name, value } = event.target;

    // object literals

    // giữ lại giá trị state cũ ở cấp ngoài cùng
    // đối với cấp state thứ 2 trở lên cần phải sử dụng spread operator
    // this.setState({
    //   [name]: value,
    // });

    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // chặn ko cho lưu nếu có lỗi của form
    const isValid = event.target.checkValidity();

    if (!isValid) {
      return;
    }

    // nếu selectedUser có thì đang ở trạng thái edit, ngược lại là create
    if (this.props.selectedUser) {
      this.props.dispatch({
        type: "UPDATE_USER",
        payload: this.state.values,
      });
    } else {
      this.props.dispatch({
        type: "ADD_USER",
        payload: this.state.values,
      });
    }
  };

  handleBlur = (event) => {
    let message = "";
    const { validationMessage, name, validity, title, minLength, maxLength } =
      event.target;
    const { valueMissing, tooShort, tooLong, patternMismatch } = validity;

    // console.log(event);
    // console.log(validationMessage);

    console.log(patternMismatch);

    if (valueMissing) {
      message = `${title} is required.`;
    }

    if (tooShort || tooLong) {
      message = `${title} from ${minLength}-${maxLength} characters`;
    }

    if (patternMismatch) {
      message = `${title} is invalid pattern`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  };

  static getDerivedStateFromProps(nextProps, currentState) {
    // console.log(nextProps, "nextProps");
    // console.log(currentState);
    console.log({
      nextProps: JSON.parse(JSON.stringify(nextProps)),
      currentState: JSON.parse(JSON.stringify(currentState)),
    });

    if (
      nextProps.selectedUser &&
      currentState.values.id !== nextProps.selectedUser.id
    ) {
      // chuyển giá trị của props thành state
      currentState.values = nextProps.selectedUser;
    }

    return currentState;
  }

  render() {
    const {
      username = "",
      email = "",
      phoneNumber = "",
      password = "",
      type = "",
      fullName = "",
    } = this.state.values || {};

    return (
      <div className="card p-0">
        <div className="card-header bg-warning text-white font-weight-bold">
          REGISTER FORM
        </div>
        <div className="card-body">
          {/* onSubmit chạy khi trong form có button có type là submit */}
          <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    // ? ý nghĩa là nếu selectedUser có thì mới chấm tiếp đến username còn ko có thì ngừng
                    // value={this.props.selectedUser?.username}
                    value={username}
                    title="Username"
                    required
                    name="username"
                    type="text"
                    className="form-control"
                    // onChange={(event) => this.handleChange(event)}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">
                    {this.state.errors.username}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    value={fullName}
                    title="Full name"
                    required
                    minLength={5}
                    maxLength={10}
                    name="fullName"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">
                    {this.state.errors.fullName}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    value={password}
                    title="Password"
                    required
                    type="text"
                    className="form-control"
                    name="password"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">
                    {this.state.errors.password}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    value={phoneNumber}
                    title="Phone number"
                    required
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {/* onBlur chạy khi thoát ra khỏi ô input ( click, tab...) */}
                  <span className="text-danger">
                    {this.state.errors.phoneNumber}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  {/* 
                    pattern của input cần phải sử dụng regex string
                    cách chuyển từ regex object -> regex string 
                    => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.source
                  */}
                  <input
                    value={email}
                    title="Email"
                    required
                    type="text"
                    // pattern="^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="form-control"
                    name="email"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={type}
                    type="Type"
                    required
                    className="form-control"
                    name="type"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  >
                    <option>Client</option>
                    <option>Admin</option>
                  </select>
                  <span className="text-danger"></span>
                </div>
              </div>
            </div>

            <div className="card-footer text-muted">
              {/* button không định nghĩa type , mặc định sẽ có type là submit */}
              <button
                disabled={!this.formRef.current?.checkValidity()}
                className="btn btn-warning mr-2"
              >
                SAVE
              </button>
              <button type="reset" className="btn btn-outline-dark">
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedUser: state.userReducer.selectedUser,
  };
};

export default connect(mapStateToProps)(RegisterForm);
