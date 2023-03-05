/*import { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";

function NoticiasAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [noticias, setNoticias] = useState([]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const titulo = form.titulo.value;
    const cuerpo = form.cuerpo.value;
    const nuevaNoticia = { titulo, cuerpo };
    setNoticias([...noticias, nuevaNoticia]);
    handleCloseModal();
  };

  return (
    <Container>
      <h1>Administración de Noticias</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Nueva Noticia
      </Button>
      <br />
      <br />
      <ul>
        {noticias.map((noticia, index) => (
          <li key={index}>
            <h2>{noticia.titulo}</h2>
            <p>{noticia.cuerpo}</p>
          </li>
        ))}
      </ul>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Noticia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el título" required />
            </Form.Group>
            <Form.Group controlId="cuerpo">
              <Form.Label>Cuerpo</Form.Label>
              <Form.Control as="textarea" placeholder="Ingrese el cuerpo de la noticia" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear Noticia
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default NoticiasAdmin;
*/







import { useState, useEffect } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import ModalNoticias from "../components/ModalNoticias";

export default function NoticiasAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [imagen, setImagen] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [showNoticias, setShowNoticias] = useState(2);

  useEffect(() => {
    getNoticias();
  }, [showNoticias]);

  const handleCloseModal = () => {
    setShowModal(false);
    setTitulo("");
    setCuerpo("");
    setImagen(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("cuerpo", cuerpo);
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const response = await axios.post("/api/noticias", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const nuevaNoticia = response.data;
      setNoticias([...noticias, nuevaNoticia]);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectNoticia = async (id, estado) => {
    try {
      await axios.put(`/api/noticias/${id}`, { estado });
      const noticiasActualizadas = noticias.map((noticia) =>
        noticia.id === id ? { ...noticia, estado } : noticia
      );
      setNoticias(noticiasActualizadas);
    } catch (error) {
      console.error(error);
    }
  };

  const getNoticias = async () => {
    try {
      const response = await axios.get("/api/noticias", {
        params: { estado: "publicado" },
      });
      const noticias = response.data;
      setNoticias(noticias);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Administración de Noticias</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Nueva Noticia
      </Button>
      <br />
      <br />
      <Row>
        {noticias.map((noticia) => (
          <Col key={noticia.id} xs={12} md={6} lg={4}>
            <div className="card mb-4">
              {noticia.imagen && (
                <img src={noticia.imagen.url} className="card-img-top" alt={noticia.titulo} />
              )}
              <div className="card-body">
                <h2 className="card-title">{noticia.titulo}</h2>
                <p className="card-text">{noticia.cuerpo}</p>
                <select
                  className="form-select"
                  value={noticia.estado}
                  onChange={(event) => handleSelectNoticia(noticia.id, event.target.value)}
                >
                <option value="borrador">Borrador</option>
                <option value="publicado">Publicado</option>
            </select>
          </div>
        </div>
      </Col>
    ))}
  </Row>
  
  <div className="text-center">
    <Button variant="primary" onClick={() => setShowNoticias(showNoticias + 2)}>
      Cargar Más Noticias
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
     />
</Container>

);}

