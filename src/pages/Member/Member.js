// inisiasi library default
import React from "react";
import { Modal } from "bootstrap"; //modal yg dipake ini
// import { event } from "jquery";
// import { FaBeerIcon } from "@react-icons/all-files/fa/FaBeer";

// inisiasi component
import Layout from "../../components/fragment/Layout";
// inisiasi hit api
import axios from "axios";
import { baseUrl, member_image_url, authorize } from "../../config";

export default class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // variable yg dibutuhkan
      members: [],
      id_member: 0,
      nama_member: "",
      alamat: "",
      telp: "",

      // fltermember
      filterMember: [],

      //utk auth
      token: "",
      fillPassword: true,

      // utk image
      image: null,
      uploadFile: true,

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
  getMembers() {
    let url = baseUrl + "/member";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ members: response.data, filterMember: response.data });
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
    console.log(this.state.members);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalMember = new Modal(document.getElementById("edit-modal"));
    this.modalMember.show();

    //Mengkosongkan input
    this.setState({
      id_member: 0,
      nama_member: "",
      alamat: "",
      telp: 0,
      image: null,

      uploadFile: true, // aksi upload file
      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalMember = new Modal(document.getElementById("edit-modal"));
    this.modalMember.show();

    //mencari posisi index dari data member berdasarkan id_user pada array members
    let index = this.state.members.findIndex((member) => member.id_member === selecteditem);

    this.setState({
      id_member: this.state.members[index].id_member,
      nama_member: this.state.members[index].nama_member,
      alamat: this.state.members[index].alamat,
      telp: this.state.members[index].telp,
      image: null,

      // aksi uploadFile
      uploadFile: false,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_member) {
    //Memunculkan Modal
    this.modalMember = new Modal(document.getElementById("show-modal"));
    this.modalMember.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.members.findIndex((member) => member.id_member === id_member);

    this.setState({
      id_member: this.state.members[index].id_member,
      nama_member: this.state.members[index].nama_member,
      alamat: this.state.members[index].alamat,
      telp: this.state.members[index].telp,
      image: this.state.members[index].image,

      action: "show",
    });
  }

  // function simpan data
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit
    // section untuk upload foto memakai formData
    let formData = new FormData(); // Currently empty
    formData.append("id_member", this.state.id_member);
    formData.append("nama_member", this.state.nama_member);
    formData.append("alamat", this.state.alamat);
    formData.append("telp", this.state.telp);
    if (this.state.uploadFile) {
      formData.append("image", this.state.image);
    }

    //url endpoint
    let url = baseUrl + "/member";

    // cek aksi tambah atau ubah
    if (this.state.action === "insert") {
      // axios fecth data dari BE -> POST
      axios
        .post(url, formData, authorize)
        .then((response) => {
          // keluarkan respon
          window.alert(response.data.message);
          this.getMembers();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      // axios fecth data dari BE -> PUT
      axios
        .put(url, formData, authorize)
        .then((response) => {
          // keluarkan respon
          window.alert(response.data.message);
          this.getMembers();
        })
        .catch((error) => console.log(error));
    }
    this.modalMember.hide();
  }

  // function hapus data
  dropData(id_member) {
    // console.log(id_member);
    //selecteditem utk show dan edit
    if (window.confirm("are you sure will delete this item?")) {
      let url = baseUrl + "/member/" + id_member;
      axios
        .delete(url, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getMembers();
        })
        .catch((error) => console.log(error));
    }
  }

  // function seacrhing
  searching(event) {
    if (event.keyCode == 13) {
      let url = baseUrl + "/member/cari";
      let request = {
        keyword: this.state.keyword,
      };
      axios
        .get(url, request, authorize)
        .then((response) => {
          this.setState({ filterMember: response.data });
        })
        .catch((error) => console.log(error));
    }
  }

  // function lifecycle
  componentDidMount() {
    this.getMembers();
    // saya ambil role user dari localstorage
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({ roleUser: user.role });
    }
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">List Customer ^_~</h1>
            {/* SEACRH BAR */}
            {/* <div class="card mt-3"> */}
            {/* <div class="navbar-form navbar-right " role="search">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  //action
                  value={this.state.keyword}
                  onChange={(ev) => this.setState({ keyword: ev.target.value })}
                  onKeyUp={(ev) => this.searching(ev)}
                />
              </div>
            </div> */}
            {/* </div> */}

            <div className="col-3">
              {/* kalau role nya admin, maka tombol ini akan tetap muncul, kalau selain admin maka tombol ini akan hide menggunakan class d-none */}
              <button className={`btn btn-success btn-sm mt-2 mb-2 ${this.state.roleUser === `admin` || this.state.roleUser === `kasir` ? `` : `d-none`}`} onClick={() => this.addData()}>
                Tambah data
              </button>
            </div>
          </div>
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">alamat</th>
                  <th scope="col">Telp</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filterMember.map((member, index) => (
                  <tr key={index}>
                    <td>0{member.id_member}</td>
                    <td>{member.nama_member}</td>
                    <td>{member.alamat}</td>
                    <td>{member.telp}</td>
                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(member.id_member)}>
                        show
                      </button>

                      <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(member.id_member)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` ? `` : `d-none`}`} onClick={() => this.dropData(member.id_member)}>
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
                      <img src={member_image_url + "/" + this.state.image} class="rounded" alt="gambar" height="100%" width="50%"></img>
                    </div>
                    {/* body form */}
                    Member Name
                    <input type="text" className="form-control mb-1" value={this.state.nama_member} disabled />
                    Member alamat
                    <input type="text" className="form-control mb-1" value={this.state.alamat} disabled />
                    Member telp
                    <input type="text" className="form-control mb-1" value={this.state.telp} disabled />
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
                          Change Member Image
                        </button>
                      ) : (
                        <div>
                          Member Image
                          <input type="file" className="form-control mb-1" onChange={(ev) => this.setState({ image: ev.target.files[0] })} required />
                        </div>
                      )}
                    </div>
                    {/* body form */}
                    ID Member
                    <input type="text" className="form-control mb-1" value={this.state.id_member} onChange={(ev) => this.setState({ id_member: ev.target.value })} disabled />
                    Member Name
                    <input type="text" className="form-control mb-1" value={this.state.nama_member} onChange={(ev) => this.setState({ nama_member: ev.target.value })} required />
                    Member alamat
                    <input type="text" className="form-control mb-1" value={this.state.alamat} onChange={(ev) => this.setState({ alamat: ev.target.value })} required />
                    Member telp
                    <input type="text" className="form-control mb-1" value={this.state.telp} onChange={(ev) => this.setState({ telp: ev.target.value })} required />
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
