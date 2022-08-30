import FireDBService from "./firedb.service";

class BookService extends FireDBService {
  table = "books";
  async createBook(newBook) {
    try {
      return await this.setTable(this.table)
        .addData(newBook)
        .then(() => {
          return { message: "Record Added Successfully!", error: false };
        });
    } catch (e) {
      return { error: true, message: e.message };
    }
  }

  getBooks() {
    const dbBooks = [];
    return this.setTable(this.table)
      .fetchData()
      .then((res) => {
        res.forEach((row) => {
          // console.log(row);
          const data = row.data();
          data.id = row.id;
          dbBooks.push(data);
        });
      })
      .then((res) => {
        return dbBooks;
      });
  }

  deleteBook(id) {
    try {
      return this.deleteData(id).then((res) => {
        return { message: "record deleted!", error: false };
      });
    } catch (e) {
      return { message: e.message, error: true };
    }
  }

  getBook(id) {
    try {
      return this.fetchData(id).then(res=>res.data());
    } catch (e) {
      return { message: e.message, error: true };
    }
  }

  updateBook(id, data){
    return this.updateData(id,data).then(res=>{
      return { message: "updated!", error: false };
    }).catch(e=>{ return {message: e, error: true} })
  }
}
export default new BookService();
