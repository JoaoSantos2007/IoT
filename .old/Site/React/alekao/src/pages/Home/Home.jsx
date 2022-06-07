import React,{ Component } from "react";
import "./Home.css"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

class Home extends Component{
    render(){
        document.title = 'Alekão'
        return (
            <section>
                <Navbar/>
                <Footer/>
            </section>
        )
    }
}

export default Home

// import { getFirestore,collection, query, where, onSnapshot } from "firebase/firestore";

// const db = getFirestore();
// console.log(db)

// const q = query(collection(db, "devices"),);
// const unsubscribe = onSnapshot(q, (snapshot) => {
//   snapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//         console.log("New city: ", change.doc.data());
//     }
//     if (change.type === "modified") {
//         console.log("Modified city: ", change.doc.data());
//     }
//     if (change.type === "removed") {
//         console.log("Removed city: ", change.doc.data());
//     }
//   });
// });