import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import ModalNoticias from "../components/ModalNoticias";
import { Store } from '../Store';
import CardNoticia from "../components/CardNoticia";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NoticiasWeb({manejeadorError}) {

  const navigate = useNavigate();
  const {state, dispatch: ctxDispatch} = useContext(Store);
 
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [imagen, setImagen] = useState(null);
  const [noticiasAD, setNoticiasAD] = useState([]);
  const [autor, setAutor] = useState(""); 
  const [ni, setNi] = useState(0);
  const [nf, setNf] = useState(2);
  const [crearNuevaNoticia, setCrearNuevaNoticia] = useState(false);
  const [id_noticiasSeleccionada, setIdNoticiasSeleccionada] = useState(null);


  useEffect(() => {
    getNoticias(false);
  }, []);

  const handleCloseModal = () => {
    //Al cerrar Modal
    setShowModal(false);
    setTitulo("");
    setCuerpo("");
    setImagen(null);
    setAutor("");
    setIdNoticiasSeleccionada(null);    
  };

  const getNoticias = async (vermas) => {
    
    try {
      const response = await axios.get(`${state.url}noticias.php`, {
        params: { 
          token:  window.btoa(state.token),
          action: 'getNoticiasWeb',
          usuario:  window.btoa(state.usuario),
          ni: ni,
          nf: nf, },
      });
      //debugger
      const noticias = response.data.data;
      if(noticias.length>0){
        if(vermas){
          setNoticiasAD(noticiasAD.concat(noticias));
        }else{
          setNoticiasAD(noticias); 
        }
        setNi(ni+2)
        setNf(nf)
      }

    toast.success('Carga completa') 
    } catch (error) {
      console.log(error)      
      manejeadorError(error)
    
    }
  };


  return (
    <Container>  
   
      <br />
      <Row>
        {noticiasAD.map((noticia) => (          
          <CardNoticia noticia={noticia} key={`noticia_${noticia.id_noticias}`} id={noticia.id_noticias} editNoticia={null} handleSelectNoticia={null} />
        ))}
      </Row>
  
  <div className="text-center mb-4">
    <Button variant="primary" onClick={async () => {      
      getNoticias(true)
      }}>
      Ver noticias anteriores
    </Button>
  </div>
    
</Container>

);}

