import { useEffect, useState } from 'react';
import  Container  from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import bookService from '../../service/book.service';

const BookList = ({onEdit, refresh})=>{
  const [books, setBooks] = useState([]);

  const getBooks= async ()=>{
    const data = await bookService.getBooks();
    setBooks(data);
}

const onDelete = (id)=>{
  bookService.deleteData(id).then(()=>{
    getBooks();
    alert("Record Deleted!");
  })
}

const editHandler = (id) => {
  onEdit(id);

};

  // fetch All records
    useEffect( () => {
        getBooks();
    },[refresh]);

    return (
      <Container className='text-center'>
        <h1>Books</h1>
        <div>
          <Button className="float-end btn-warning" onClick={getBooks}>
            Refresh
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {books.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.title}</td>
                  <td>{row.author}</td>
                  <td>{row.status ? "true" : "false"}</td>
                  <td>
                    <Button className='btn-danger me-2' onClick={()=>onDelete(row.id)}>Delete</Button>
                   <Button className='btn-info' onClick={()=>editHandler(row.id)}>Edit</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
}

export default BookList;