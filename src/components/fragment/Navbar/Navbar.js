// inisiasi library default
import React from "react";
import { Link } from "react-router-dom";

/**
 * error nya krn saat manggil data di backend, tokennya belum dicantumkan
 * jadinya error 401 alias unauthorized
 */
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      namaUser: null,
      role: null,
    };

    // dapetin token dari localstorage
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      // token ga ada, redirect ke halaman login
      window.location = "/login";
    }
  }

  // GET ADMIN
  getUser = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ namaUser: user.nama_user });
  };
  // GET ROLE
  getRole = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ role: user.role });
  };
  // LOGOUT
  Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  componentDidMount() {
    this.getUser();
    this.getRole();
  }

  render() {
    return (
      <>
        <div className="row d-flex mb-3">
          <h1 className="col-7 fw-bold ">
            Selamat Datang, <span className="text-capitalize">{this.state.namaUser}</span> <span className="fw-normal">as {this.state.role}</span>
          </h1>
          <div className="col-4 fw-bold ">
            <button type="button" class="btn btn-outline-info" onClick={() => this.Logout()}>
              <Link to="/login" onClick={() => this.Logout()}>
                Logout
              </Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}
