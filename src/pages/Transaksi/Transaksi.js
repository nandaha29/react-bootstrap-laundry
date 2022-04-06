// inisiasi library default
import React from "react";
import { Modal } from "bootstrap";
import Pdf from "react-to-pdf";

// inisiasi component
import Layout from "../../components/fragment/Layout";

// inisiasi hit api
import axios from "axios";
import { baseUrl, authorize } from "../../config";

// import react to pdf
// import Pdf from "react-to-pdf";

export default class Transaksi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      transaksis: [],
      id_transaksi: 0,

      members: [],
      id_member: 0,
      nama_member: "",

      users: [],
      id_user: 0,

      outlets: [],
      id_outlet: 0,

      tgl_nitip: "",
      tgl_ambil: "",

      pakets: [],
      id_paket: "",

      details: [],
      id_detail: "",

      qty_barang: 0,
      status_barang: "",
      status_pembayaran: "",

      nama_user: "",
      nama_outlet: "",

      // total: 0,

      //utk auth
      token: "",

      // utk manage list
      action: "",
    };
    /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
    // dapetin token dari localstorage
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      // token ga ada, redirect ke halaman login
      window.location = "/login";
    }
  }

  // GET -> manggil data
  getTransaksis() {
    let url = baseUrl + "/transaksi";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ transaksis: response.data });
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
    // console.log(this.state.transaksis);
  }
  // getMember -> untuk mengakses API get member
  getMember = () => {
    let url = baseUrl + "/member";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ members: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // getUser -> untuk mengakses API get user
  getUser = () => {
    let url = baseUrl + "/user";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // getPaket -> untuk mengakses API get paket
  getPaket = () => {
    let url = baseUrl + "/paket";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ pakets: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // getPaket -> untuk mengakses API get paket
  getOutlet = () => {
    let url = baseUrl + "/outlet";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ outlets: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // // getPaket -> untuk mengakses API get paket
  // getDetail = () => {
  //   let url = baseUrl + "/detail";
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       this.setState({ details: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("edit-modal"));
    this.modalTransaksi.show();

    //Mengosongkan input
    this.setState({
      // id_transaksi: 0,
      id_member: 0,
      id_user: 0,
      id_outlet: 0,
      tgl_nitip: "",
      tgl_ambil: "",
      status_barang: "",
      status_pembayaran: "",
      details: [],

      action: "insert", // target aksi
    });
  }

  detailPaket(ref) {
    if (this.state.action === "insert") {
      return;
    } else {
      return (
        <div>
          {this.state.details.map((data) => (
            <div className="row my-4">
              <div className="col-lg-4">
                <h6>Paket :</h6>
                {data.paket.jenis_paket}
              </div>
              <div className="col-lg-4">
                <h6>Qty :</h6>
                {data.qty_barang} item
              </div>
              <div className="col-lg-4">
                <h6>Total Bayar:</h6>
                @Rp {data.qty_barang * data.paket.harga} .000
              </div>
            </div>
          ))}
          <Pdf targetRef={ref} filename={`transaksi_${this.state.id_transaksi}.pdf`}>
            {({ toPdf }) => (
              <button className="btn btn-md btn-primary" onClick={toPdf}>
                Cetak Laporan
              </button>
            )}
          </Pdf>
        </div>
      );
    }
  }

  // function UPDATE == PUT
  updateData(selecteditem) {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("edit-modal-1"));
    this.modalTransaksi.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.transaksis.findIndex((transaksi) => transaksi.id_transaksi == selecteditem);
    // console.log(this.state.transaksis);

    this.setState({
      id_transaksi: this.state.transaksis[index].id_transaksi,
      id_member: this.state.transaksis[index].id_member,
      id_user: this.state.transaksis[index].id_user,
      id_outlet: this.state.transaksis[index].id_outlet,
      tgl_nitip: this.state.transaksis[index].tgl_nitip,
      tgl_ambil: this.state.transaksis[index].tgl_ambil,
      status_barang: this.state.transaksis[index].status_barang,
      status_pembayaran: this.state.transaksis[index].status_pembayaran,

      action: "update",
    });
  }

  // function ubah data == buat sendiri
  showData(id_transaksi) {
    //Memunculkan Modal
    this.modalTransaksi = new Modal(document.getElementById("show-modal"));
    this.modalTransaksi.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.transaksis.findIndex((transaksi) => transaksi.id_transaksi === id_transaksi);

    this.setState({
      nama_member: this.state.transaksis[index].member.nama_member,
      nama_user: this.state.transaksis[index].user.username,
      nama_outlet: this.state.transaksis[index].outlet.nama_outlet,
      tgl_nitip: this.state.transaksis[index].tgl_nitip,
      tgl_ambil: this.state.transaksis[index].tgl_ambil,
      status_barang: this.state.transaksis[index].status_barang,
      status_pembayaran: this.state.transaksis[index].status_pembayaran,
      details: this.state.transaksis[index].detail,

      action: "show",
    });
  }

  // function SAVE
  saveData(ev) {
    ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit

    let endpoint = baseUrl + "/transaksi";
    let newTransaksi = {
      id_transaksi: this.state.id_transaksi,
      id_member: this.state.id_member,
      id_user: this.state.id_user,
      id_outlet: this.state.id_outlet,
      tgl_nitip: this.state.tgl_nitip,
      tgl_ambil: this.state.tgl_ambil,
      status_barang: this.state.status_barang,
      status_pembayaran: this.state.status_pembayaran,
    };

    if (this.state.action === "insert") {
      axios
        .post(endpoint, newTransaksi, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "update") {
      axios
        .put(endpoint, newTransaksi, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
        })
        .catch((error) => console.log(error));
    }
    this.modalTransaksi.hide();
  }

  // function DELETE
  dropData(id_transaksi) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      let url = baseUrl + "/transaksi/" + id_transaksi;
      axios
        .delete(url, authorize)
        .then((response) => {
          window.alert(response.data.message);
          this.getTransaksis();
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

  // untuk convert time
  convertTime(time) {
    let date = new Date(time);
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `;
    // return `${date.getFullYear()}/${Number(date.getMonth()) + 1} /${date.getDate()}`;
  }

  // goToInvoice = (dataInvoice) => {
  //   window.location = `./components/element/${dataInvoice}`;
  // };

  // untuk mengenerate laporan
  ref = React.createRef();

  // function lifecycle
  componentDidMount() {
    this.getTransaksis();
    this.getMember();
    this.getUser();
    this.getPaket();
    this.getOutlet();
    // this.getDetail();
    // saya ambil role user dari localstorage
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({ roleUser: user.role });
    }
  }

  GantiStatusBarang(status) {
    if (status === "baru") {
      return <div className="badge bg-info">Baru</div>;
    } else if (status === "proses") {
      return <div className="badge bg-warning">Sedang diproses</div>;
    } else if (status === "selesai") {
      return <div className="badge bg-secondary">Siap Diambil</div>;
    } else if (status === "diambil") {
      return <div className="badge bg-success">Telah Diambil</div>;
    }
  }

  GantiStatusPembayaran(status) {
    if (status === "baru") {
      return <div className="badge bg-info">Baru</div>;
    } else if (status === "hutang") {
      return <div className="badge bg-danger">Belum Bayar</div>;
    } else if (status === "lunas") {
      return <div className="badge bg-success">Sudah Bayar</div>;
    }
  }

  tambahPaket(e) {
    e.preventDefault();
    // tutup modal
    // utk menyimpan data paket yg dipilih beserta jumlahnya
    // ke dalam array detail
    let idPaket = this.state.id_paket;
    let selectedPaket = this.state.pakets.find((paket) => paket.id_paket == idPaket);
    // console.log(idPaket);
    let newPaket = {
      id_paket: this.state.id_paket,
      qty_barang: this.state.qty_barang,
      jenis_paket: selectedPaket.jenis_paket,
      harga: selectedPaket.harga,
    };

    // Ambil array detail
    let temp = this.state.details;
    // console.log(temp);
    temp.push(newPaket);
    this.setState({ detail: temp });
    this.modalPaket.hide();
  }

  addPaket() {
    // menampilkan form modal utk memilih paket
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show();

    // kosongkan form nya
    this.setState({
      id_paket: "",
      qty_barang: 0,
      jenis_paket: "",
      harga: 0,
    });
  }

  simpanTransaksi() {
    let endpoint = baseUrl + "/transaksi";
    // let user = JSON.parse(localStorage.getItem("user"));
    let newData = {
      id_member: this.state.id_member,
      tgl_nitip: this.state.tgl_nitip,
      tgl_ambil: this.state.tgl_ambil,
      status_barang: this.state.status_barang,
      status_pembayaran: this.state.status_pembayaran,
      id_user: this.state.id_user,
      id_outlet: this.state.id_outlet,
      detail: this.state.details,
    };

    axios
      .post(endpoint, newData, authorize)
      .then((response) => {
        window.alert(response.data.message);
        this.modalTransaksi.hide();
        this.getTransaksis();
      })
      .catch((error) => console.log(error));
  }

  // // total semua barang -> belum berfungsi
  // totalHarga = () => {
  //   let tempProduk = this.state.produk;
  //   let totalHarga = 0;
  //   tempProduk.map((item) => {
  //     totalHarga += item.harga * item.qty_barang;
  //   });

  //   //masukkan ke dalam state
  //   this.setState({ total: totalHarga });
  // };

  // 'et url = "http://localhost:4040/api/transaksi/"
  //           axios.get(url)
  //           .then(response => {
  //               let dataTransaksi = response.data.data
  //               console.log(response)
  //               for (let i = 0; i < dataTransaksi.length; i++) {
  //                   let total = 0;
  //                   for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
  //                       let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
  //                       let qty = dataTransaksi[i].detail_transaksi[j].qty
  //                       total += (harga * qty)
  //                   }
  //                   //tambahkan key "total"
  //                   dataTransaksi[i].total = total
  //               }
  //               this.setState({ transaksi: dataTransaksi })
  //           })
  //           .catch(error => console.log(error))

  hapusData(id_paket) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
      //mencari posisi index dari data yang akan dihapus
      let temp = this.state.detail;
      let index = temp.findIndex((detail) => detail.id_paket === id_paket);

      //menghapus data pada array
      temp.splice(index, 1);

      this.setState({ detail: temp });
    }
  }

  render() {
    const ref = React.createRef();
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">List Transaksi ^o^</h1>{" "}
            <div className="col-3">
              {/* <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.showData()}>
                Cetak Laporan
              </button> */}
              {/* kalau role nya admin, maka tombol ini akan tetap muncul, kalau selain admin maka tombol ini akan hide menggunakan class d-none */}
              <button className={`btn btn-success btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` || this.state.roleUser === `kasir` ? `` : `d-none`}`} onClick={() => this.addData()}>
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
                  <th scope="col">nama_member</th>
                  <th scope="col">tgl_nitip</th>
                  <th scope="col">tgl_ambil</th>
                  <th scope="col">status_barang</th>
                  <th scope="col">status_pembayaran</th>
                  <th scope="col">nama_user</th>
                  <th scope="col">outlet</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transaksis.map((transaksi, index) => (
                  <tr key={index}>
                    <td>0{transaksi.id_transaksi}</td>
                    <td>{transaksi.member.nama_member}</td>
                    <td>{this.convertTime(transaksi.tgl_nitip)}</td>
                    <td>{this.convertTime(transaksi.tgl_ambil)}</td>
                    {/* <td>{transaksi.tgl_nitip}</td>
                    <td>{transaksi.tgl_ambil}</td> */}
                    <td>
                      {/* {transaksi.status_barang} */}
                      {this.GantiStatusBarang(transaksi.status_barang)}
                    </td>
                    <td>
                      {this.GantiStatusPembayaran(transaksi.status_pembayaran)}
                      {/* {transaksi.status_pembayaran} */}
                    </td>
                    <td>{transaksi.user.nama_user}</td>
                    <td>{transaksi.outlet.domisili_outlet}</td>
                    {/* <td>{transaksi.detail.qty_barang * transaksi.detail.harga}</td> */}
                    {/* <td>{this.totalHarga()}</td> */}

                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(transaksi.id_transaksi)}>
                        show
                      </button>
                      {/* <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(transaksi.id_transaksi)}>
                        edit
                      </button> */}
                      <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(transaksi.id_transaksi)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 ${this.state.roleUser === `admin` ? `` : `d-none`}`} onClick={() => this.dropData(transaksi.id_transaksi)}>
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
                  <h5 class="modal-title">SHOW TRANSAKSI</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body" ref={ref}>
                  <h5 className="text-center">Data Transaksi</h5>
                  <form>
                    {/* body form */}
                    Nama Member
                    <input type="text" className="form-control mb-1" value={this.state.nama_member} disabled />
                    tgl_nitip
                    <input type="text" className="form-control mb-1" value={this.state.tgl_nitip} disabled />
                    tgl_ambil
                    <input type="text" className="form-control mb-1" value={this.state.tgl_ambil} disabled />
                    status_barang
                    <input type="text" className="form-control mb-1" value={this.state.status_barang} disabled />
                    status_pembayaran
                    <input type="text" className="form-control mb-1" value={this.state.status_pembayaran} disabled />
                    Nama User
                    <input type="text" className="form-control mb-1" value={this.state.nama_user} disabled />
                    Nama Outlet
                    <input type="text" className="form-control mb-1" value={this.state.nama_outlet} disabled />
                  </form>
                  <br />
                  <h5 className="text-center">Data Detail Transaksi</h5>
                  {this.detailPaket(ref)}
                  <br />
                </div>
              </div>
            </div>
          </div>

          {/* MODAL TAMBAH*/}
          <div className="modal fade " id="edit-modal" tabindex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">SHOW TRANSAKSI</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <h5 className="text-center">Add Data Transaksi</h5>
                  Member
                  <select className="form-control mb-2" value={this.state.id_member} onChange={(e) => this.setState({ id_member: e.target.value })}>
                    <option value="">--Pilih Member--</option>
                    {this.state.members.map((member) => (
                      <option value={member.id_member}>{member.nama_member}</option>
                    ))}
                  </select>
                  tgl_nitip
                  <input type="date" className="form-control mb-2" value={this.state.tgl_nitip} onChange={(e) => this.setState({ tgl_nitip: e.target.value })} />
                  tgl_ambil
                  <input type="date" className="form-control mb-2" value={this.state.tgl_ambil} onChange={(e) => this.setState({ tgl_ambil: e.target.value })} />
                  status_pembayaran
                  <div className="form-group">
                    <select name="bayar" id="bayar" className="form-control" onChange={(ev) => this.setState({ status_pembayaran: ev.target.value })} value={this.state.status_pembayaran}>
                      <option>--- Pilih Status Bayar ---</option>
                      <option value="hutang">Belum Bayar</option>
                      <option value="lunas">Sudah Bayar</option>
                    </select>
                  </div>
                  status_barang
                  <div className="form-group">
                    <select name="status" id="status" className="form-control" onChange={(ev) => this.setState({ status_barang: ev.target.value })} value={this.state.status_barang}>
                      <option>--- Pilih Status Paket ---</option>
                      <option value="baru">Baru</option>
                      <option value="proses">Proses</option>
                      <option value="selesai">Selesai</option>
                      <option value="diambil">Diambil</option>
                    </select>
                  </div>
                  Nama User
                  <select className="form-control mb-2" value={this.state.id_user} onChange={(ev) => this.setState({ id_user: ev.target.value })}>
                    <option selected>Pilih Nama</option>
                    {this.state.users.map((user) => (
                      <option value={user.id_user}>{user.nama_user}</option>
                    ))}
                  </select>
                  Outlet
                  <select className="form-control mb-2" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })}>
                    <option selected>Pilih Outlet</option>
                    {this.state.outlets.map((outlet) => (
                      <option value={outlet.id_outlet}>{outlet.domisili_outlet}</option>
                    ))}
                  </select>
                  <button className="btn btn-outline-primary" onClick={() => this.addPaket()}>
                    Pilih Paket
                  </button>
                  {/* tampilkan isi detail */}
                  <h5>Detail Transaksi</h5>
                  {this.state.details.map((detail) => (
                    <div className="row">
                      {/* area nama paket col-3 */}
                      <div className="col-lg-3">{detail.jenis_paket}</div>
                      {/* area quantity col-2*/}
                      <div className="col-lg-2">Qty: {detail.qty_barang}</div>
                      {/* area harga paket col-3*/}
                      <div className="col-lg-2">@ Rp {detail.harga}</div>
                      {/* area harga total col-4  */}
                      <div className="col-lg-3">Rp {detail.harga * detail.qty_barang}</div>
                      <div className="col-lg-2">
                        <button className="btn btn-outline-danger btn-sm" onClick={() => this.hapusData(detail.id_paket)}>
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-success" onClick={() => this.simpanTransaksi()}>
                    Simpan
                  </button>
                  {/* Modal utk pilihan paket */}
                  <div className="modal" id="modal_paket">
                    <div className="modal-dialog modal-md">
                      <div className="modal-content">
                        <div className="modal-header bg-danger">
                          <h4 className="text-white">Pilih Paket</h4>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={(e) => this.tambahPaket(e)}>
                            Pilih Paket
                            <select className="form-control mb-2" value={this.state.id_paket} onChange={(e) => this.setState({ id_paket: e.target.value })}>
                              <option value="">--Pilih Paket--</option>
                              {this.state.pakets.map((paket) => (
                                <option value={paket.id_paket}>{paket.jenis_paket}</option>
                              ))}
                            </select>
                            Jumlah (Qty)
                            <input type="number" className="form-control mb-2" value={this.state.qty_barang} onChange={(e) => this.setState({ qty_barang: e.target.value })} />
                            <button type="submit" className="btn btn-success">
                              Tambah
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  modal-footer */}
                {/* <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(this.state.id_member)}>
                    edit
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* MODAL EDIT */}
          <div className="modal fade " id="edit-modal-1" tabindex="-1" aria-labelledby="tambah-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* modal-header */}
                <div class="modal-header">
                  <h5 class="modal-title">SHOW TRANSAKSI</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <h5 className="text-center">Edit Transaksi</h5>
                  <form onSubmit={(ev) => this.saveData(ev)}>
                    status_barang
                    <div className="form-group">
                      <select name="status" id="status" className="form-control" onChange={(ev) => this.setState({ status_barang: ev.target.value })} value={this.state.status_barang}>
                        <option>--- Pilih Status Paket ---</option>
                        <option value="baru">Baru</option>
                        <option value="proses">Proses</option>
                        <option value="selesai">Selesai</option>
                        <option value="diambil">Diambil</option>
                      </select>
                    </div>
                    status_pembayaran
                    <div className="form-group">
                      <select name="bayar" id="bayar" className="form-control" onChange={(ev) => this.setState({ status_pembayaran: ev.target.value })} value={this.state.status_pembayaran}>
                        <option>--- Pilih Status Bayar ---</option>
                        <option value="hutang">Belum Bayar</option>
                        <option value="lunas">Sudah Bayar</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success mt-2">
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
