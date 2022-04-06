// inisiasi library default
import React from "react";
import { Modal } from "bootstrap"; //modal yg dipake ini

// inisiasi component
import Layout from "../../components/fragment/Layout";

// inisiasi hit api
import axios from "axios";
import { baseUrl, user_image_url, authorize } from "../../config";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      users: [],
      id_user: 0,
      nama_user: "",
      username: "",
      password: "",
      role: "",

      //utk auth
      token: "",
      fillPassword: true,
      // utk image
      image: null,
      uploadFile: true,
      // untuk menyimpan role yg login
      roleUser: "",
      // utk manage list
      action: "",
    };
    // dapetin token dari localstorage
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      // token ga ada, redirect ke halaman login
      window.location = "/login";
    }
  }

  // GET -> manggil data
  getUsers() {
    let url = baseUrl + "/user";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ users: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            // this.props.history.push("/login");
          }
        } else {
          console.log(error);
        }
      });
    console.log(this.state.users);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalUser = new Modal(document.getElementById("edit-modal"));
    this.modalUser.show();

    //Mengosongkan input
    this.setState({
      id_user: 0,
      nama_user: "",
      username: "",
      password: "",
      role: "",
      image: null,

      uploadFile: true, // aksi upload file
      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    // menampilkan modal versi bootstrap 5
    //Memunculkan Modal
    this.modalUser = new Modal(document.getElementById("edit-modal"));
    this.modalUser.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.users.findIndex((user) => user.id_user === selecteditem);

    this.setState({
      id_user: this.state.users[index].id_user,
      nama_user: this.state.users[index].nama_user,
      username: this.state.users[index].username,
      password: this.state.users[index].password,
      role: this.state.users[index].role,
      image: null,

      // aksi uploadFile
      uploadFile: false,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_user) {
    //Memunculkan Modal
    this.modalUser = new Modal(document.getElementById("show-modal"));
    this.modalUser.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.users.findIndex((user) => user.id_user === id_user);

    this.setState({
      id_user: this.state.users[index].id_user,
      nama_user: this.state.users[index].nama_user,
      username: this.state.users[index].username,
      password: this.state.users[index].password,
      role: this.state.users[index].role,
      image: this.state.users[index].image,

      action: "show",
    });
  }

  // function simpan data
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit

    // section untuk upload foto memakai formData
    let formData = new FormData(); // Currently empty
    formData.append("id_user", this.state.id_user);
    formData.append("nama_user", this.state.nama_user);
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("role", this.state.role);
    if (this.state.uploadFile) {
      formData.append("image", this.state.image);
    }

    // formData.forEach((value, key) => {
    //   console.log("key %s: value %s", key, value);
    // });

    //url endpoint
    let url = baseUrl + "/user";

    // cek aksi tambah atau ubah
    if (this.state.action === "insert") {
      // axios fecth data dari BE -> POST
      axios
        .post(url, formData, authorize)
        .then((response) => {
          // keluarkan respon
          window.alert(response.data.message);
          this.getUsers();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      // axios fecth data dari BE -> PUT
      axios
        .put(url, formData, authorize)
        .then((response) => {
          // keluarkan respon
          window.alert(response.data.message);
          this.getUsers();
        })
        .catch((error) => console.log(error));
    }
    this.modalUser.hide();
  }

  // function hapus data
  dropData(id_user) {
    // console.log(id_user);
    //selecteditem utk show dan edit
    if (window.confirm("are you sure will delete this item?")) {
      let url = baseUrl + "/user/" + id_user;
      axios
        .delete(url, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getUsers();
        })
        .catch((error) => console.log(error));
    }
  }

  // function lifecycle
  componentDidMount() {
    this.getUsers();
    // saya ambil role user dari localstorage
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({ roleUser: user.role });
    }
  }

  GantiRole(status) {
    if (status === "owner") {
      return <div className="badge bg-info">Owner</div>;
    } else if (status === "kasir") {
      return <div className="badge bg-warning">Kasir</div>;
    } else if (status === "admin") {
      return <div className="badge bg-dark">Admin</div>;
    }
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">List Karyawan ^-^</h1>{" "}
            <div className="col-3">
              {/* kalau role nya admin, maka tombol ini akan tetap muncul, kalau selain admin maka tombol ini akan hide menggunakan class d-none */}
              <button className={`btn btn-success btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` ? `` : `d-none`}`} onClick={() => this.addData()}>
                Tambah data
              </button>
            </div>
          </div>
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            {/* <div className="d-flex align-items-center mb-2 justify-content-between bg-warning"><button className={`btn btn-primary btn-sm mt-1 mx-2 `}><i class="fa-solid fa-pen-to-square"></i>edit</button></div> */}
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  {/* <th scope="col">Password</th>  */}
                  {/* password sebaiknya tdk ditampilkan */}
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) => (
                  <tr key={index}>
                    <td>0{user.id_user}</td>
                    <td>{user.nama_user}</td>
                    <td>{user.username}</td>
                    {/* <td>{user.password}</td> */}
                    <td>
                      {/* <span className="badge bg-primary"> {user.role}</span> */}
                      {this.GantiRole(user.role)}
                    </td>
                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(user.id_user)}>
                        show
                      </button>
                      <button className={`btn btn-primary btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` ? `` : `d-none`}`} onClick={() => this.updateData(user.id_user)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` ? `` : `d-none`}`} onClick={() => this.dropData(user.id_user)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* ========================= MODAL SECTION ========================*/}
          {/* MODAL SHOW */}
          <div className="modal fade " id="show-modal" tabindex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">SHOW DATA</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <form>
                    <div class="text-center">
                      <img src={user_image_url + "/" + this.state.image} class="rounded" alt="gambar" height="100%" width="50%"></img>
                    </div>
                    {/* body form */}
                    User Name
                    <input type="text" className="form-control mb-1" value={this.state.nama_user} disabled />
                    Username
                    <input type="text" className="form-control mb-1" value={this.state.username} disabled />
                    {/* Password
                    <input type="text" className="form-control mb-1" value={this.state.password} disabled /> */}
                    Role
                    <input type="text" className="form-control mb-1" value={this.state.role} disabled />
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* MODAL TAMBAH == EDIT */}
          <div className="modal fade" id="edit-modal" tabindex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">EDIT DATA</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <form onSubmit={(ev) => this.saveData(ev)}>
                  <div className="modal-body">
                    {/* UPLOAD IMAGE */}
                    <div class="text-center">
                      {this.state.action === "update" && this.state.uploadFile === false ? (
                        <button className="btn btn-sm btn-dark mb-1 btn-block" onClick={() => this.setState({ uploadFile: true })}>
                          Change User Image
                        </button>
                      ) : (
                        <div>
                          User Image
                          <input type="file" className="form-control mb-1" onChange={(ev) => this.setState({ image: ev.target.files[0] })} required />
                        </div>
                      )}
                    </div>
                    {/* body form */}
                    ID User
                    <input type="text" className="form-control mb-1" value={this.state.id_user} onChange={(ev) => this.setState({ id_user: ev.target.value })} disabled />
                    Member Name
                    <input type="text" className="form-control mb-1" value={this.state.nama_user} onChange={(ev) => this.setState({ nama_user: ev.target.value })} required />
                    Username Name
                    <input type="text" className="form-control mb-1" value={this.state.username} onChange={(ev) => this.setState({ username: ev.target.value })} required />
                    Password
                    <input type="text" className="form-control mb-1" value={this.state.password} onChange={(ev) => this.setState({ password: ev.target.value })} required />
                    Role
                    {/* <input type="text" className="form-control mb-1" value={this.state.nama_user} onChange={(ev) => this.setState({ nama: ev.target.value })} required /> */}
                    <select class="form-select" aria-label="Default select example" value={this.state.role} onChange={(ev) => this.setState({ role: ev.target.value })} required>
                      <option selected>--- Pilih ---</option>
                      <option value="admin">Admin</option>
                      <option value="kasir">Kasir</option>
                      <option value="owner">Owner</option>
                    </select>
                  </div>
                  {/* modal-footer */}
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
