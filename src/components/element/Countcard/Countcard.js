import React from "react";

export default function CountCard({ name, bg, value }) {
  return (
    <div className="col-lg 4 col-md-6 col-sm-12 mt-2">
      <div className="card">
        <div className={"card-body bg-" + bg}>
          <h4 className="text-dark">
            <strong>{name}</strong>
          </h4>
          <h1 className="text-white">
            <strong>{value}</strong>
          </h1>
        </div>
      </div>
    </div>
  );
}
