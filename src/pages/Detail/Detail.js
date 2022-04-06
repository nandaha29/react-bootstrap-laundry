// inisiasi library default
import React from "react";
import { Modal } from "bootstrap"; //modal yg dipake ini

// inisiasi component
import Layout from "../../components/fragment/Layout";

// inisiasi hit api
import axios from "axios";
import { baseUrl, detail_image_url } from "../../config";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      details: [],
      id_detail: 0,
      pakets: [],
      id_paket: "",
      id_transaksi: 0,
      qty_barang: 0,
      jumlah_bayar: 0,

      //utk auth
      token: "",
      // utk image
      image: null,
      uploadFile: true,

      // utk manage list
      action: "",

      // login statement
      // if(!localStorage.getItem("token")){
      //     window.location.href = "/login"
      // }
    };
  }

  // GET -> manggil data
  getDetails() {
    let url = baseUrl + "/detail";
    axios
      .get(url)
      .then((response) => {
        this.setState({ details: response.data });
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
    console.log(this.state.details);
  }

  // function tambah data
  addData() {
    //Memunculkan Modal
    this.modalDetail = new Modal(document.getElementById("edit-modal"));
    this.modalDetail.show();

    //Mengosongkan input
    this.setState({
      id_detail: 0,
      id_paket: 0,
      id_transaksi: 0,
      qty_barang: 0,
      jumlah_bayar: 0,
      image: null,

      uploadFile: true, // aksi upload file
      action: "insert", // target aksi
    });
  }

  // function ubah data
  updateData(selecteditem) {
    // menampilkan modal versi bootstrap 5
    //Memunculkan Modal
    this.modalDetail = new Modal(document.getElementById("edit-modal"));
    this.modalDetail.show();

    //mencari posisi index dari data member berdasarkan id_member pada array members
    let index = this.state.details.findIndex((detail) => detail.id_detail === selecteditem);

    this.setState({
      id_detail: this.state.details[index].id_detail,
      id_paket: this.state.details[index].id_paket,
      id_transaksi: this.state.details[index].id_transaksi,
      qty_barang: this.state.details[index].qty_barang,
      jumlah_bayar: this.state.details[index].jumlah_bayar,
      image: null,

      // aksi uploadFile
      uploadFile: false,

      action: "update",
    });
  }

  // // function ubah data == buat sendiri
  // showData(id_detail) {
  //   //Memunculkan Modal
  //   this.modalDetail = new Modal(document.getElementById("show-modal"));
  //   this.modalDetail.show();

  //   //mencari posisi index dari data member berdasarkan id_member pada array members
  //   let index = this.state.details.findIndex((detail) => detail.id_detail === id_detail);

  //   this.setState({
  //     id_detail: this.state.details[index].id_detail,
  //     id_paket: this.state.details[index].id_paket,
  //     id_transaksi: this.state.details[index].id_transaksi,
  //     qty_barang: this.state.details[index].qty_barang,
  //     jumlah_bayar: this.state.details[index].jumlah_bayar,
  //     image: this.state.details[index].image,

  //     action: "show",
  //   });
  // }
  goToInvoice(dataInvoice) {
    window.location = `./components/element/${dataInvoice}`;
  }
  goToFormTransaksi(id_transaksid) {
    window.location = `./components/element/${id_transaksid}`;
  }

  // // function simpan data
  // saveData(ev) {
  //   ev.preventDefault(); // untuk mencegah berjalannya aksi default dari form submit

  //   // section untuk upload foto memakai formData
  //   let formData = new FormData(); // Currently empty
  //   formData.append("id_detail", this.state.id_detail);
  //   formData.append("id_paket", this.state.id_paket);
  //   formData.append("id_transaksi", this.state.id_transaksi);
  //   formData.append("qty_barang", this.state.qty_barang);
  //   formData.append("jumlah_bayar", this.state.jumlah_bayar);
  //   if (this.state.uploadFile) {
  //     formData.append("image", this.state.image);
  //   }

  //   // formData.forEach((value, key) => {
  //   //   console.log("key %s: value %s", key, value);
  //   // });

  //   //url endpoint
  //   let url = baseUrl + "/detail";

  //   // cek aksi tambah atau ubah
  //   if (this.state.action === "insert") {
  //     // axios fecth data dari BE -> POST
  //     axios
  //       .post(url, formData)
  //       .then((response) => {
  //         // keluarkan respon
  //         window.alert(response.data.message);
  //         this.getDetails();
  //       })
  //       .catch((error) => console.log(error));
  //   } else if (this.state.action === "update") {
  //     // axios fecth data dari BE -> PUT
  //     axios
  //       .put(url, formData)
  //       .then((response) => {
  //         // keluarkan respon
  //         window.alert(response.data.message);
  //         this.getDetails();
  //       })
  //       .catch((error) => console.log(error));
  //   }
  //   this.modalDetail.hide();
  //   // this.totalHarga();
  // }

  // function hapus data
  dropData(id_detail) {
    // console.log(id_user);
    //selecteditem utk show dan edit
    if (window.confirm("are you sure will delete this item?")) {
      let url = baseUrl + "/detail/" + id_detail;
      axios
        .delete(url)
        .then((response) => {
          window.alert(response.data.message);
          this.getDetails();
        })
        .catch((error) => console.log(error));
    }
    // this.totalHarga();
  }

  showAddButton() {
    // if (this.state.role === "Admin" || this.state.role === "Kasir") {
    return (
      <button class="btn btn-primary me-md-2 my-3" type="button" onClick={() => this.addData()}>
        Tambah Member
      </button>
    );
    // }
  }

  // totalHarga() {
  //   let tempPaket = this.state.paket;
  //   let totalHarga = 0;
  //   tempPaket.map((item) => {
  //     totalHarga += item.harga * item.qty_barang;
  //   });

  //   //masukkan ke dalam state
  //   this.setState({ total: totalHarga });
  // }
  GantiStatusPembayaran(status) {
    if (status === "baru") {
      return <div className="badge bg-info">Baru</div>;
    } else if (status === "hutang") {
      return <div className="badge bg-danger">Belum Bayar</div>;
    } else if (status === "lunas") {
      return <div className="badge bg-success">Sudah Bayar</div>;
    }
  }

  // function lifecycle
  componentDidMount() {
    this.getDetails();
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row">
            <h1 className="col">List Detail Transaksi O_O</h1>{" "}
            <div className="col-3">
              {/* <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.addData()}>
                Tambah data
              </button> */}
            </div>
          </div>
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            {/* <div className="d-flex align-items-center mb-2 justify-content-between bg-warning"><button className={`btn btn-primary btn-sm mt-1 mx-2 `}><i class="fa-solid fa-pen-to-square"></i>edit</button></div> */}
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {/* <th scope="col">Foto Laundry</th> */}
                  <th scope="col">Invoice</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Barang Laundry</th>
                  <th scope="col">@Satuan</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Status</th>
                  {/* <th scope="col">harga_paket</th> */}
                  <th scope="col">Total</th>
                  <th scope="col">Nama Outlet</th>
                  {/* <th scope="col">Uang</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.details.map((detail, index) => (
                  <tr key={index}>
                    <td>0{detail.id_detail}</td>
                    {/* <td>{detail.image}</td> */}
                    <td>---</td>
                    <td>{detail.transaksi.member.nama_member}</td>
                    <td>{detail.paket.jenis_paket}</td>
                    <td>Rp.{detail.paket.harga}.000</td>
                    <td>{detail.qty_barang} item</td>
                    <td>{this.GantiStatusPembayaran(detail.transaksi.status_pembayaran)}</td>
                    {/* <td>Rp.{detail.paket.harga}.000</td> */}
                    <td>Rp.{detail.qty_barang * detail.paket.harga}.000</td>
                    <td>{detail.transaksi.outlet.domisili_outlet}</td>

                    <td>
                      <button className={`btn btn-success btn-sm mt-1 mx-2 `} onClick={() => this.showData(detail.id_detail)}>
                        show
                      </button>
                      <button className={`btn btn-info btn-sm mt-1 mx-2 `} onClick={() => this.goToFormTransaksi(detail.id_detail)}>
                        show Invoice
                      </button>
                      {/* <button className={`btn btn-primary btn-sm mt-1 mx-2 `} onClick={() => this.updateData(detail.id_detail)}>
                        edit
                      </button>
                      <button className={`btn btn-danger btn-sm mt-1 mx-2 `} onClick={() => this.dropData(detail.id_detail)}>
                        delete
                      </button> */}
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
                  <h5 class="modal-title">SHOW DETAIL TRANSAKSI</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/*  modal-body */}
                <div className="modal-body">
                  <h5 className="text-center">Data Detail Transaksi</h5>
                  <form>
                    <div class="text-center">
                      <img src={detail_image_url + "/" + this.state.image} class="rounded" alt="gambar" height="100%" width="50%"></img>
                    </div>
                    {/* body form */}
                    ID Detail
                    <input type="text" className="form-control mb-1" value={this.state.id_detail} disabled />
                    ID Paket
                    <input type="text" className="form-control mb-1" value={this.state.id_paket} disabled />
                    ID Transaksi
                    <input type="text" className="form-control mb-1" value={this.state.id_transaksi} disabled />
                    qty_barang
                    <input type="text" className="form-control mb-1" value={this.state.qty_barang} disabled />
                    jumlah_bayar
                    <input type="text" className="form-control mb-1" value={this.state.jumlah_bayar} disabled />
                  </form>
                  <h5 className="text-center">Data Transaksi</h5>
                  ---
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
