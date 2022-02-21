import * as React from "react";
import "./styles.css";
import imgcontruciton from "./Assests/imgunderconstruction.png";

export default function Citties() {
  return (
    <>
      <div className="construction">
        <h1 className="tituloheader">Web in construction</h1>
        <img className="imgconstruction" src={imgcontruciton} />
      </div>
    </>
  );
}
