import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cargarComentario,
  actualizarComentario,
  eliminarComentario,
} from "../Redux/actions/comentarioActions";
import "../Styles/comentarios.css";

const Comentarios = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  //usa los reducer desde un store
  const usuario = props.user;
  const cambio = props.comentarioReducer;
  const [inputText, setInputText] = useState();
  const [modificar, setModificar] = useState();
  /*   console.log("primero");
   */
  async function cargarUnComentario(event) {
    const comentarioUsuario = {
      itineraryID: props.itineraryID,
      comments: inputText,
    };
    /*     console.log(comentarioUsuario);
     */ //quiero el conjuntod de comentarios dependiendo de un id
    await dispatch(cargarComentario(comentarioUsuario, cambio)).then(
      (res) => console.log(res),
      setInputText("")
    );
  }

  async function modificarComentario(event) {
    const comentarioUsuario = {
      comentarioId: event.target.id,
      comentario: modificar,
    };
    //console.log(comentarioUsuario)
    await dispatch(actualizarComentario(comentarioUsuario, cambio)).then(
      (res) => console.log(res)
    );
  }
  async function matarComentario(event) {
    dispatch(eliminarComentario(event.target.id, cambio)).then((res) => res);
  }

  return (
    <div className="comentarios">
      {typeof props?.comments !== "undefined" ? (
        props?.comments?.map((comment, index) => {
          console.log(usuario);
          if (comment?.userID?._id !== usuario?.id) {
            return (
              <div className="Comment" key={index}>
                <p>{comment?.comment}</p>
              </div>
            );
          } else {
            return (
              <div className="card3 cardComments" key={index}>
                <h5 className="card-header">{comment?.userID?.fullName}</h5>
                <div className="card-body ">
                  <textarea
                    type="text"
                    className="card-text textComments"
                    onChange={(event) => setModificar(event.target.value)}
                    value={comment.comment}
                  />
                  <button
                    id={comment.comment._id}
                    onClick={modificarComentario}
                  >
                    Modificar
                  </button>
                  <button id={comment._id} onClick={matarComentario}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          }
        })
      ) : (
        <p>realiza el primer comentario</p>
      )}
      {usuario ? (
        <div className="card3 cardComments">
          <div className="card-header">DEJANOS TU COMENTARIO</div>
          <div className="card-body ">
            <textarea
              onChange={(event) => setInputText(event.target.value)}
              className="card-text textComments"
              value={inputText}
            />
            <button onClick={cargarUnComentario} className="btn btn-primary">
              Cargar
            </button>
          </div>
        </div>
      ) : (
        <h1>loguea rey comentame xD</h1>
      )}
    </div>
  );
};

export default Comentarios;
