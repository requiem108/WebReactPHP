import React from "react";
import { Col, Button} from "react-bootstrap";


export default function CardNoticia({noticia,editNoticia,handleSelectNoticia}){

  return (
      <Col className="d-block mx-auto p-0" col={12} lg={10} >
        <h2 className="card-title">{noticia.titulo}</h2>
      <div className="card mb-4">
        {noticia.imagen && (
          <img src={`../images/imgNoticias/${noticia.imagen}?v=${Math.random()}`} className="card-img-top" alt={noticia.titulo} />
        )}
        <div className="card-body">          
          <p className="card-text noticias-contenido">{noticia.contenido}</p>

          <div className="d-flex flex-wrap">
            <p className="card-text m-2">Autor:{noticia.autor}</p>
            <p className="card-text m-2">Fecha:{noticia.fecha_publicacion}</p>
          </div>
          

          
        </div>
        
          {handleSelectNoticia === null? '':
          <div className="card-footer text-muted d-flex justify-content-between flex-wrap">
            <select
                className="form-select"
                value={noticia.estado}
                onChange={(event) => handleSelectNoticia(noticia.id_noticias, event.target.value)}
              >
                <option value="b" >Borrador</option>
                <option value="p" >Publicado</option>
            </select> 
            <Button className="m-1 " variant="primary" onClick={() => editNoticia(noticia.id_noticias)}>Editar</Button> 
          </div>         
          }       
        
          

        
      </div>
    </Col>
  )
}