import firebase from 'firebase/app'
import 'firebase/firestore'

let firestoreDb = null

function getStudents() {
    return firestoreDb.collection("Students").get()
}
function getSpecificStudent(studentId) {
    
}

const getModule = () => {
    firestoreDb = firebase.firestore()
    return {
        getStudents
    }
}

export default getModule