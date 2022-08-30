import {db} from "../utility/firebase.utility";
import { collection,addDoc,doc,getDoc, getDocs, deleteDoc,updateDoc } from 'firebase/firestore';


class FireDBService {

  setTable(tableName) {
    this.tableName = tableName;
    this.collectionRef = collection(db, this.tableName);
    return this;
  }

  addData(newData) {
    return addDoc(this.collectionRef, newData);
  }

  updateData(id, newData) {
    const docRef = doc(db, this.tableName, id);
    return updateDoc(docRef, newData);
  }

  fetchData(id=null) {
    if(id){
        const docRef = doc(db, this.tableName, id);
        return getDoc(docRef);
    }
    return getDocs(this.collectionRef);
  }

  deleteData(id){
    return deleteDoc(doc(db, this.tableName, id));
  }
}

export default FireDBService;