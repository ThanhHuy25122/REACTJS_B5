import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import UserManagement from "./UserManagement";

export default class BaiTapQuanLyNguoidung extends Component {
  render() {
    return (
      <div className="w-75 mx-auto mt-5">
        <RegisterForm />
        <UserManagement />
      </div>
    );
  }
}
