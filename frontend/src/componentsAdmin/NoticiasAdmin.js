import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import ModalNoticias from "../components/ModalNoticias";
import { Store } from '../Store';
import CardNoticia from "../components/CardNoticia";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NoticiasAdmin({manejeadorError}) {

  const navigate = useNavigate();
  const {state, dispatch: ctxDispatch} = useContext(Store);
   //validamos si el token esta vacion regresa a login
  if(state.token === ''){
    navigate('/login');
  }

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

  const handleShowModal = () =>{
    setCrearNuevaNoticia(true);
    setShowModal(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let action = crearNuevaNoticia ? 'addNoticia' : 'updateNoticia';
    const formData = new FormData();
    formData.append("token", state.token);
    formData.append("action", action);    
    formData.append("titulo", titulo);
    formData.append("contenido", cuerpo);
    formData.append("imagen", imagen);
    formData.append("autor", autor);
    formData.append("usuario", state.usuario);
    formData.append("crearNuevaNoticia", crearNuevaNoticia);
    formData.append("id_noticias", id_noticiasSeleccionada);

    try {
      const response = await axios.post(`${state.url}noticias.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });      
      

    
      if(response.data.ERROR != ''){
        debugger
        toast.error(response.data.error)
        throw new Error(response.data.error);
        
      }

      await handleCloseModal();
      const nuevaNoticia = response.data;//Noticia modificada o nueva
      if(crearNuevaNoticia){
        setNoticiasAD([nuevaNoticia,...noticiasAD]);
      }else{       

        //actualizar noticiasAD
        let noticiasTemp = []
        noticiasAD.map((noticia)=>{
          if(noticia.id_noticias === id_noticiasSeleccionada){
            noticiasTemp.push(nuevaNoticia)
            toast.success('Nueva noticia agregada');
          }else{
            noticiasTemp.push(noticia)
            toast.success('Noticia modificada correctamente');
          }
          
        })
        setNoticiasAD(noticiasTemp)
      }
      
      
    } catch (error) {
      debugger
      console.log(error);
      //toast.error(error);
      
    }
  };

  const handleSelectNoticia = async (id, estado) => {
    //Actualizar estado de la noticia
    try {
      const formData = new FormData();
      formData.append("token", state.token);
      formData.append("action", 'updateEstado');    
      formData.append("usuario", state.usuario);      
      formData.append("estado", estado);
      formData.append("id_noticia", id);

      const response = await axios.post(`${state.url}noticias.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });  

      //actualizar noticiasAD
      let noticiasTemp = []
      debugger
      noticiasAD.map((noticia)=>{
        if(noticia.id_noticias === id){
          noticia.estado = estado
          noticia.fecha_publicacion = response.data.fecha
          noticiasTemp.push(noticia)
        }else{
          noticiasTemp.push(noticia)
        }
      });
      setNoticiasAD(noticiasTemp)
      toast.success('Noticia modificada correctamente');
    } catch (error) {
      console.log(error)     
    }
  };

  const getNoticias = async (vermas) => {
    
    try {
      const response = await axios.get(`${state.url}noticias.php`, {
        params: { 
          token:  window.btoa(state.token),
          action: 'getNoticias',
          usuario:  window.btoa(state.usuario),
          ni: ni,
          nf: nf, },
      });
      debugger
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

  const editNoticia = (id_noticia) => {   
  
    noticiasAD.map((noticia) => {
      if(noticia.id_noticias == id_noticia){
        setTitulo(noticia.titulo);
        setCuerpo(noticia.contenido);
        setAutor(noticia.autor);
        setIdNoticiasSeleccionada(noticia.id_noticias);
      }
    });
    setShowModal(true);  
    setCrearNuevaNoticia(false); /* para que no se cree una nueva noticia */    
  }

  return (
    <Container>
      <h5>Administración de Noticias</h5>
      <Button variant="primary" onClick={handleShowModal}>
        Nueva Noticia
      </Button>
      <br />
      <br />
      <Row>
        {noticiasAD.map((noticia) => (          
          <CardNoticia noticia={noticia} key={`noticia_${noticia.id_noticias}`} id={noticia.id_noticias} editNoticia={editNoticia} handleSelectNoticia={handleSelectNoticia} />
        ))}
      </Row>
  
  <div className="text-center mb-4">
    <Button variant="primary" onClick={async () => {      
      getNoticias(true)
      }}>
      Ver noticias anteriores
    </Button>
  </div>

    <ModalNoticias handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit} 
      showModal={showModal}
      titulo={titulo}
      cuerpo={cuerpo}        
      setTitulo={setTitulo}
      setCuerpo={setCuerpo}
      setImagen={setImagen}
      setAutor={setAutor}
      autor={autor}
     />
</Container>

);}

