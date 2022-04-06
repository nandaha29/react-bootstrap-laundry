import React from "react";

export default function Card({ image, tempat, props }) {
  return (
    <div className="col-lg 4 col-md-6 col-sm-12 mt-2">
      <div className="card">
        <img src="..." className="card-img-top"></img>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
    // <div className="col-lg-6 col-sm-12 p-2">
    //   <div className="card">
    //     <div className="card-body row">
    //       {/* menampilkan Gambar / cover */}
    //       <div className="col-5">
    //         <img src={props.image} className="img" height="200" width="200" alt={props.tempat} />
    //       </div>

    //       {/* menampilkan deskripsi */}
    //       <div className="col-7">
    //         <h5 className="text-info">{props.tempat}</h5>
    //         {/* <h6 className="text-danger">Price: {props.price}</h6> */}
    //         {/* <h6 className="text-dark">Stock: {props.stock}</h6> */}

    //         {/* button untuk menambah ke keranjang belanja */}
    //         <button className="btn btn-sm btn-success m-1" onClick={props.onCart}>
    //           Tambahkan ke keranjang belanja
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
// INI HARUSNYA BUAT OUTLET // BELUM KE SOLVE
// MANGGIL DI OUTLETNYA
// {
//   /* <Card /> */
// }
// {
//   /* {this.state.outlets.map((item) => (
//   <Card
//     key={item.id_outlet}
//     tempat={item.tempat}
//     image={url + item.image}
//     onCart={() => this.addToCart(item)}
//   />
// ))} */
// }
