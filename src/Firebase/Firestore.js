import firebase from 'firebase/app'
import 'firebase/firestore'

let firestoreDb = null

const collections = {
    students: 'Students',
    users: 'Users'
}

function getStudents() {
    return firestoreDb.collection(collections.students);
}

function getSpecificStudent(studentId) {
    return firestoreDb.collection(collections.students).doc(studentId);
}

function getUsers() {
    return firestoreDb.collection(collections.users);
}

function deleteStudent(studentId) {
    return firestoreDb.collection(collections.students).doc(studentId).delete()
}

function deleteUser(userId) {
    return firestoreDb.collection(collections.users).doc(userId).delete()
}

// function deleteStudents(studentIds) {

// }

const getModule = () => {
    firestoreDb = firebase.firestore();
    return {
        deleteStudent,
        getStudents,
        deleteUser,
        getSpecificStudent,
        getUsers
    };
}

export default getModule;