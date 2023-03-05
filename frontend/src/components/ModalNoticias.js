import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function ModalNoticias({handleCloseModal,
    handleSubmit,
    showModal,
    titulo,
    cuerpo,
    setTitulo,
    setCuerpo,
    setImagen
}) {
   /* const {handleCloseModal,
        handleSubmit,
        showModal,
        titulo,
        cuerpo,
        setTitulo,
        setCuerpo,
        setImagen
    } = props;*/

    return (
    <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
            <Modal.Title>Nueva Noticia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="titulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
                type="text"
                placeholder="Ingrese el título"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="cuerpo">
            <Form.Label>Cuerpo</Form.Label>
            <Form.Control
                as="textarea"
                placeholder="Ingrese el cuerpo de la noticia"
                value={cuerpo}
                onChange={(event) => setCuerpo(event.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="imagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
                type="file"
                onChange={(event) => setImagen(event.target.files[0])}
            />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
            </Button>
            <Button variant="primary" type="submit">
            Guardar Noticia
            </Button>
        </Modal.Footer>
        </Form>
    </Modal>
    )
}