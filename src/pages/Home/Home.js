// inisiasi library default
import React from "react";

// inisiasi component
import Layout from "../../components/fragment/Layout";
import CountCard from "../../components/element/Countcard/Countcard";

// inisiasi hit api
import axios from "axios";
import { baseUrl, authorize } from "../../config";

/**
 * error nya krn saat manggil data di backend, tokennya belum dicantumkan
 * jadinya error 401 alias unauthorized
 */
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // call variable
      // namaUser: null,
      paketsCount: 0,
      outletsCount: 0,
      transaksisCount: 0,
      membersCount: 0,
    };

    // dapetin token dari localstorage
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      // token ga ada, redirect ke halaman login
      window.location = "/login";
    }
  }

  // GET MEMBER
  getMember = () => {
    let url = baseUrl + "/member";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ membersCount: response.data.length });
        console.log(response.data.length);
      })
      .catch((error) => {
        // if (error.response) {
        //   if (error.response.status) {
        //     this.props.history.push("/login");
        //   }
        // } else {
        console.log(error);
        // }
      });
  };

  // GET PAKET
  getPaket = () => {
    let url = baseUrl + "/paket";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ paketsCount: response.data.length });
      })
      .catch((error) => {
        // if (error.response) {
        //   if (error.response.status) {
        //     this.props.history.push("/login");
        //   }
        // } else {
        console.log(error);
        // }
      });
  };

  // GET TRANSAKSI
  getTransaksi = () => {
    let url = baseUrl + "/transaksi";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ transaksisCount: response.data.length });
      })
      .catch((error) => {
        // if (error.response) {
        //   if (error.response.status) {
        //     this.props.history.push("/login");
        //   }
        // } else {
        console.log(error);
        // }
      });
  };

  // GET OUTLET
  getOutlet = () => {
    let url = baseUrl + "/outlet";
    axios
      .get(url, authorize)
      .then((response) => {
        this.setState({ outletsCount: response.data.length });
      })
      .catch((error) => {
        // if (error.response) {
        //   if (error.response.status) {
        //     this.props.history.push("/login");
        //   }
        // } else {
        console.log(error);
        // }
      });
  };

  // // GET ADMIN
  // getUser = () => {
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   this.setState({ namaUser: user.nama_user });
  // };

  componentDidMount() {
    this.getMember();
    this.getPaket();
    this.getTransaksi();
    this.getOutlet();
    // this.getUser();
  }

  render() {
    return (
      <>
        <Layout>
          <div className="row ">
            {/* <h1 className="col">ini HOME, halo {this.state.namaUser}</h1> */}
            {/* <div className="col-3 row flex">
              <button className="btn btn-primary btn-sm mt-1 mx-2" onClick={() => this.showData()}>
                Cetak Laporan
              </button>
            </div> */}
          </div>

          <div className="row ">
            <CountCard name="Transaksi" bg="info" value={this.state.transaksisCount} />
            <CountCard name="Customer" bg="warning" value={this.state.membersCount} />
            <CountCard name="Paket Cuci" bg="success" value={this.state.paketsCount} />
            <CountCard name="Outlet" bg="primary" value={this.state.outletsCount} />
          </div>
        </Layout>
      </>
    );
  }
}
