import { useState,useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import bookService from "../../service/book.service";


 const BookForm = ({bookId, setBookId, refreshList}) => {
    
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState(false);
    const [msg, setMsg] = useState({error:false,message:""});

    const refresh = ()=>{
      setTitle("");
      setAuthor("");
      setStatus(false);
      refreshList();
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        setMsg({message:"", error:false});
        
        if(title === "" || author === ""){
        setMsg({ message: "Please Enter Title/Author", error: true });
          return;
        }

        const newBook = {title,author,status};
        if(bookId === null){
          bookService.createBook(newBook).then((res) => {
            setMsg(res);
            refresh();
          });
        }
        else{
          bookService.updateBook(bookId,newBook).then((res) => {
            setMsg(res)
            setBookId(null); // edit mode close
            refresh();
          });
        }
    }

    const hideAlert = ()=>{
        setMsg({message:"", error:false});
    }

  useEffect(()=>{
    bookId !== null && 
    bookService.getBook(bookId).then(res=>{
      setTitle(res.title);
      setAuthor(res.author);
      setStatus(res.status);
    })
  },[bookId]);

  return (
    <Container className="w-50 mx-auto m-4">
      {msg.message !== "" && (
        <Alert dismissible variant={msg.error ? "danger" : "primary"} onClose={hideAlert}>
          {msg.message}
        </Alert>
      )}
      <Row className="justify-content-md-center">
        <Col className="card p-2 shadow">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter email"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="author"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                value={author}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Status"
                name="status"
                onChange={(e) => {
                  setStatus(e.target.checked);
                }}
                checked={status}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmitHandler}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookForm;