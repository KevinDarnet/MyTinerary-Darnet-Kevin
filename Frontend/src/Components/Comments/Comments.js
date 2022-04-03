import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import comentarioReducer, {
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
  const cambio = useSelector((state) => state.comentarioReducer.cambio);
  console.log(cambio);

  const [inputText, setInputText] = useState();
  const [modificar, setModificar] = useState();

  async function cargarUnComentario(event) {
    const comentarioUsuario = {
      itineraryID: props.itineraryID,
      comments: inputText,
    };

    await dispatch(cargarComentario(comentarioUsuario, cambio)).then(
      (res) => console.log(res),
      setInputText("")
    );
  }

  async function modificarComentario(event) {
    const comentarioUsuario = {
      _id: event.target.id,
      comments: modificar,
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
          if (comment?.userID?._id !== usuario?.id) {
            return (
              <div className="Comment" key={index}>
                <p className="text">{comment?.comment}</p>
              </div>
            );
          } else {
            return (
              <div className="card3 cardComments" key={index}>
                <div className="ConteinerUsercomment">
                  <img className="imguser" src={comment?.userID?.picture} />
                  <h2 className="textName">{comment?.userID?.fullName}</h2>

                  <input
                    type="textName"
                    className="card-text textComments"
                    onChange={(event) => setModificar(event.target.value)}
                    value={comment.comment}
                  />

                  <button
                    className="btn btn-primary"
                    id={comment._id}
                    onClick={modificarComentario}
                  >
                    Modify
                  </button>
                  <button
                    className="btn btn-primary"
                    id={comment._id}
                    onClick={matarComentario}
                  >
                    Delete
                  </button>
                </div>
                <div className="card-body ">
                  <textarea
                    type="text"
                    className="card-text textComments"
                    onChange={(event) => setModificar(event.target.value)}
                    defaultValue={comment.comment}
                  />
                </div>
              </div>
            );
          }
        })
      ) : (
        <p>Add your comment</p>
      )}
      {usuario ? (
        <div className="card3 cardComments">
          <div className="card-header">
            <h2 className="text2">Add commnet</h2>
          </div>
          <div className="card-body ">
            <textarea
              onChange={(event) => setInputText(event.target.value)}
              className="card-text textComments"
              value={inputText}
            />
            <button onClick={cargarUnComentario} className="btn btn-primary">
              Update
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
