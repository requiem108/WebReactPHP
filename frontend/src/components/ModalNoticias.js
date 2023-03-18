import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function ModalNoticias({handleCloseModal,
    handleSubmit,
    showModal,
    titulo,
    cuerpo,
    autor,
    setTitulo,
    setCuerpo,
    setImagen,
    setAutor
}) {
   

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
                required={true}
                placeholder="Ingrese el título"
                maxLength={40}
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="autor">
            <Form.Label>Autor</Form.Label>
            <Form.Control
                type="text"
                required={true}
                placeholder="Ingrese el autor"
                value={autor}
                maxLength={40}
                onChange={(event) => setAutor(event.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="cuerpo">
            <Form.Label>Cuerpo</Form.Label>
            <Form.Control
                required={true}
                rows={10}
                as="textarea"
                placeholder="Ingrese el cuerpo de la noticia"
                value={cuerpo}
                maxLength={990}
                onChange={(event) => setCuerpo(event.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="imagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
                type="file"
                required={true}
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