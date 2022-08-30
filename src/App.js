import BookForm from "./components/book-form/book-form.cmp";
import BookList from "./components/book-list/book-list.cmp";
import { useState } from 'react';

function App() {
 const [bookId, setBookId] =  useState(null);
 const [refresh, setRefresh] =  useState(1);
  const editHandler = (id)=>{
    setBookId(id);
  }

  const refreshListHandler = ()=>{
    let count = refresh + 1;
    setRefresh(count);
    console.log(refresh);
  }

  return (
    <>
      <BookForm bookId={bookId} setBookId={setBookId} refreshList={refreshListHandler}/>
      <BookList onEdit={editHandler}  refresh={refresh}/>
    </>
  );
}

export default App;
