import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

//Create new document
export async function SalvarProduto(data) {
  try {
    await addDoc(collection(db, "produtos"), data);
    return "ok";
  } catch (error) {
    console.log("erro ao adicionar produto:", error);
    return "erro";
  }
}

// Get Document
export async function PegarProduto() {
  try {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    let produtos = [];
    querySnapshot.forEach((doc) => {
      let produto = {
        id: doc.id,
        ...doc.data(),
      };
      produtos.push(produto);
    });
    return produtos;
  } catch (error) {
    console.log("erro ao recuperar dados:", error);
    return [];
  }
}

// export async function pegarProdutosTempoReal(setProdutos) {
//   const ref = query(collection(db, "produtos"));
//   let produtos = [];
//   onSnapshot(ref, (querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       let produto = {
//         id: doc.id,
//         ...doc.data(),
//       };
//       produtos.push(produto);
//     });
//     console.log(produtos);
//   });
// }

//Update Document
export async function atualizarProduto(productID, data) {
  try {
    const produtoRef = doc(db, "produtos", productID);
    await updateDoc(produtoRef, data);
    return "ok";
  } catch (error) {
    console.log("erro ao atualizar produto:", error);
    return "erro";
  }
}

//Delete Document
export async function DeleteProduto(productID) {
  try {
    const produtoRef = doc(db, "produtos", productID);
    await deleteDoc(produtoRef);
    return "ok";
  } catch (error) {
    console.log("erro ao atualizar produto:", error);
    return "erro";
  }
}
