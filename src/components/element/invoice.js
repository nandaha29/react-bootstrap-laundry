import React, { Component } from "react";

import $ from "jquery";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { Link, useParams } from "react-router-dom";
// import { Footer } from "../../../components";

export default function InvoiceDefault() {
  return <Invoice params={useParams()} />;
}

export class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      invoice: null,
      header: {
        invoice_date: "09/09/2019",
        outlet_name: "Outlet Tulungagung",
        customer_name: "John Doe",
        customer_email: "johndoe@gmail.com",
        customer_phone: "+6281234567890",
      },
      body: {
        laundry_notes: "laundry notes",
        driver_notes: "driver notes",
        items: [
          {
            id: 0,
            item_name: "item name 1",
            item_price: 100000,
            pickup_date: "09/09/2019",
            drop_date: "09/09/2019",
          },
          {
            id: 1,
            item_name: "item name 2",
            item_price: 200008,
            pickup_date: "09/09/2019",
            drop_date: "09/09/2019",
          },
        ],
        total_price: 0,
      },
    };
  }

  totalPrice = () => {
    let total = 0;
    this.state.body.items.map((item) => {
      total += parseInt(item.item_price);
    });
    this.setState({ body: { ...this.state.body, total_price: total } });
  };

  getPDF = (ev) => {
    ev.preventDefault();
    var HTML_Width = $("#printThisOut").width();
    var HTML_Height = $("#printThisOut").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + top_left_margin * 2;
    var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    const fromState = "ini code invoicenya";

    html2canvas($("#printThisOut")[0], { allowTaint: true }).then(function (canvas) {
      canvas.getContext("2d");
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, "JPG", top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(imgData, "JPG", top_left_margin, -(PDF_Height * i) + top_left_margin * 4, canvas_image_width, canvas_image_height);
      }
      pdf.save(`Laundryku-${fromState}.pdf`);
    });
  };

  componentDidMount() {
    this.setState({ invoice: this.props.params.invoice });
    this.totalPrice();
  }

  render() {
    return (
      <div class="container">
        <div class="jumbotron d-flex align-items-center min-vh-100">
          <div class="container text-center">
            <div id='printThisOut' class="card">
              <div class="card-header">
                <span className="float-start">
                  Invoice
                  <strong>01/01/01/2018</strong> 
                </span>
                <span class="float-end">
                  <strong>Status:</strong> Pending
                  <button type="button" class="btn btn-primary btn-sm ms-3" onClick={ev => this.getPDF(ev)}>Cetak Invoice</button>
                </span>
              </div>
              <div class="card-body">
                <div class="row mb-4">
                  <div class="col-sm-6">
                    <h6 class="mb-3">From:</h6>
                    <div>
                      <strong>Webz Poland</strong>
                    </div>
                    <div>Madalinskiego 8</div>
                    <div>71-101 Szczecin, Poland</div>
                    <div>Email: info@webz.com.pl</div>
                    <div>Phone: +48 444 666 3333</div>
                  </div>
                  <div class="col-sm-6">
                    <h6 class="mb-3">To:</h6>
                    <div>
                      <strong>Bob Mart</strong>
                    </div>
                    <div>Attn: Daniel Marek</div>
                    <div>43-190 Mikolow, Poland</div>
                    <div>Email: marek@daniel.com</div>
                    <div>Phone: +48 123 456 789</div>
                  </div>
                </div>
                <div class="table-responsive-sm">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th class="center">#</th>
                        <th>Item</th>
                        <th>Description</th>

                        <th class="right">Unit Cost</th>
                        <th class="center">Qty</th>
                        <th class="right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="center">1</td>
                        <td class="left strong">Origin License</td>
                        <td class="left">Extended License</td>

                        <td class="right">$999,00</td>
                        <td class="center">1</td>
                        <td class="right">$999,00</td>
                      </tr>
                      <tr>
                        <td class="center">2</td>
                        <td class="left">Custom Services</td>
                        <td class="left">Instalation and Customization (cost per hour)</td>

                        <td class="right">$150,00</td>
                        <td class="center">20</td>
                        <td class="right">$3.000,00</td>
                      </tr>
                      <tr>
                        <td class="center">3</td>
                        <td class="left">Hosting</td>
                        <td class="left">1 year subcription</td>

                        <td class="right">$499,00</td>
                        <td class="center">1</td>
                        <td class="right">$499,00</td>
                      </tr>
                      <tr>
                        <td class="center">4</td>
                        <td class="left">Platinum Support</td>
                        <td class="left">1 year subcription 24/7</td>

                        <td class="right">$3.999,00</td>
                        <td class="center">1</td>
                        <td class="right">$3.999,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-sm-5">
                  </div>
                  <div class="col-lg-4 col-sm-5 ml-auto">
                    <table class="table table-clear">
                      <tbody>
                        <tr>
                          <td class="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td class="right">$8.497,00</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>Discount (20%)</strong>
                          </td>
                          <td class="right">$1,699,40</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>VAT (10%)</strong>
                          </td>
                          <td class="right">$679,76</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>Total</strong>
                          </td>
                          <td class="right">
                            <strong>$7.477,36</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// INI BELUM KEPAKE YAK
