// dashboard => utk dasar template biar tampilannya sama semua / layout aja di bagian page content

import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

export default function Layout({ children }) {
  const sidebarContent = [
    {
      label: "Dashboard",
      target: "/home",
      // icon: "icon/estate.svg",
    },
    {
      label: "Karyawan",
      target: "/user",
    },
    {
      label: "Customer",
      target: "/member",
    },
    {
      label: "Paket",
      target: "/paket",
    },
    {
      label: "Outlet",
      target: "/outlet",
    },
    {
      label: "Transaksi",
      target: "/transaksi",
    },
    // {
    //   label: "Detail Transaksi",
    //   target: "/detail",
    // },
    {
      label: "Login",
      target: "/login",
    },
    // {
    //   label: "Invoice swementara",
    //   target: "/invoice",
    // },
    // {
    //   label: "Transaksi form sementara",
    //   target: "/transaksi-form",
    // },
  ];

  return (
    <div className="container-fluid ">
      <div className="d-flex ">
        <div className="border-end min-vh-100">
          <h2 className="sidebar-heading p-3 m-3 bg-warning">LaundryAja</h2>
          <div className="list-group list-group-flush m-3">
            {sidebarContent.map(({ target, label, icon }, i) => (
              <Link to={target} className="list-group-item list-group-item-action list-group-item-light p-3" key={i}>
                {/* <p>{icon}</p> */}
                {label}
              </Link>
            ))}
          </div>
        </div>
        {/* <!-- Page content--> */}
        <div className="container-fluid p-4 bg-light">
          {/* <h4>Selamat Datang, Namamu</h4> */}
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}
