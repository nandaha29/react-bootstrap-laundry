// inisiasi library default
import React from "react";
import { Modal } from "bootstrap";

// inisiasi component
import Layout from "../../components/fragment/Layout";
// inisiasi hit api
import axios from "axios";
import { baseUrl, authorize } from "../../config";

export default class Paket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      pakets: [],
      id_paket: 0,
      jenis_paket: "",
      harga: 0,

      //utk auth
      token: "",
      // utk image
      image: null,
      uploadFile: true,

      // manage list
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
  getPakets() {
    let url = baseUrl + "/paket";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ pakets: response.data });
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
    console.log(this.state.pakets);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalPaket = new Modal(document.getElementById("edit-modal"));
    this.modalPaket.show();

    //Mengosongkan input
    this.setState({
      id_paket: 0,
      jenis_paket: "",
      harga: 0,

      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalPaket = new Modal(document.getElementById("edit-modal"));
    this.modalPaket.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.pakets.findIndex((paket) => paket.id_paket === selecteditem);

    this.setState({
      id_paket: this.state.pakets[index].id_paket,
      jenis_paket: this.state.pakets[index].jenis_paket,
      harga: this.state.pakets[index].harga,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_paket) {
    //Memunculkan Modal
    this.modalPaket = new Modal(document.getElementById("show-modal"));
    this.modalPaket.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.pakets.findIndex((paket) => paket.id_paket === id_paket);

    this.setState({
      id_paket: this.state.pakets[index].id_paket,
      jenis_paket: this.state.pakets[index].jenis_paket,
      harga: this.state.pakets[index].harga,

      action: "show",
    });
  }

  // function SAVE
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit

    let endpoint = baseUrl + "/paket";
    let newPaket = {
      id_paket: this.state.id_paket,
      jenis_paket: this.state.jenis_paket,
      harga: this.state.harga,
    };
    if (this.state.action === "insert") {
      axios
        .post(endpoint, newPaket, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getPakets();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      axios
        .put(endpoint, newPaket, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getPakets();
        })
        .catch((error) => console.log(error));
    }
    this.modalPaket.hide();
  }

  // function hapus data
  dropData(id_paket) {
    //selecteditem utk show dan edit
    if (window.confirm("are you sure will delete this item?")) {
      let url = baseUrl + "/paket/" + id_paket;
      axios
        .delete(url, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getPakets();
        })
        .catch((error) => console.log(error));
    }
  }

  showAddButton() {
    // if (this.state.role === "Admin" || this.state.role === "Kasir") {
    return (
      <button class="btn btn-primary me-md-2 my-3" type="button" onClick={() => this.tambahData()}>
        Tambah Member
      </button>
    );
    // }
  }

  // function lifecycle
  componentDidMount() {
    this.getPakets();
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
            <h1 className="col">List Paket ^.^</h1>{" "}
            <div className="col-3">
              {/* kalau role nya admin, maka tombol ini akan tetap muncul, kalau selain admin maka tombol ini akan hide menggunakan class d-none */}
              <button className={`btn btn-success btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` ? `` : `d-none`}`} onClick={() => this.addData()}>
                Tambah data
              </button>
            </div>
          </div>
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            <div className="d-flex align-items-center mb-2 justify-content-between bg-warning">{/* <button className={`btn btn-primary btn-sm mt-1 mx-2 `}><i class="fa-solid fa-pen-to-square"></i>edit</button> */}</div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Jenis_paket</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pakets.map((paket, index) => (
                  <tr key={index}>
                    <td>0{paket.id_paket}</td>
                    <td>{paket.jenis_paket}</td>
                    <td>{paket.harga}</td>
                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(paket.id_paket)}>
                        show
                      </button>
                      <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(paket.id_paket)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` ? `` : `d-none`}`} onClick={() => this.dropData(paket.id_paket)}>
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
                    {/* body form */}
                    Jenis_paket
                    <input type="text" className="form-control mb-1" value={this.state.jenis_paket} disabled />
                    harga
                    <input type="number" className="form-control mb-1" value={this.state.harga} disabled />
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* MODAL TAMBAH === EDIT*/}
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
                    {/* body form */}
                    ID Paket
                    <input type="text" className="form-control mb-1" value={this.state.id_paket} onChange={(ev) => this.setState({ id_paket: ev.target.value })} disabled />
                    Jenis_paket
                    <input type="text" className="form-control mb-1" value={this.state.jenis_paket} onChange={(ev) => this.setState({ jenis_paket: ev.target.value })} required />
                    Harga
                    <input type="number" className="form-control mb-1" value={this.state.harga} onChange={(ev) => this.setState({ harga: ev.target.value })} required />
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
