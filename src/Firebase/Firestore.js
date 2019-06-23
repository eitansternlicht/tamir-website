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

function getSpecificUser(Uid) {
    return firestoreDb.collection(collections.users).doc(Uid);
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


const getModule = () => {
    firestoreDb = firebase.firestore();
    return {
        deleteStudent,
        getStudents,
        deleteUser,
        getSpecificStudent,
        getSpecificUser,
        getUsers
    };
}

export default getModule;