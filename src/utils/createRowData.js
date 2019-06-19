import { firestoreModule } from '../Firebase/Firebase';

const getStudents = (setRows, setLoading) => {
  firestoreModule
    .getStudents()
    .onSnapshot(querySnapshot => {
      setRows(querySnapshot.docs.map(doc => ({ ...doc.data(), fid: doc.id })))
      setLoading(false);
    });
};

const getTutors = (setRows, uid, setLoading, role) => {

  // uid = !firebase.auth().currentUser.uid
  //   ? tempUIDForTesting
  //   : !firebase.auth().currentUser.uid;
let str = 'owners.' + role + 's';
  if (role === 'ceo'){
    firestoreModule
    .getUsers()
    .onSnapshot(snapshot => {
      let answer = snapshot.docs.map(doc => ({ ...doc.data(), fid: doc.id }));
      answer = answer.filter(row => row.role === 'tutor');
      setRows(answer);
      setLoading(false);
    });
  }
  else{
    firestoreModule
    .getUsers()
    .where(str, 'array-contains', uid)
    .onSnapshot(snapshot => {
      let answer = snapshot.docs.map(doc => ({ ...doc.data(), fid: doc.id }));
      answer = answer.filter(row => row.role === 'tutor');
      setRows(answer);
      setLoading(false);
    
      //console.log('results', snapshot.docs.map(doc => doc.data()))
    });
  }
}

const getCoordinators = (setRows, uid, setLoading, role) => {

  // uid = !firebase.auth().currentUser.uid
  //   ? tempUIDForTesting
  //   : !firebase.auth().currentUser.uid;

  if (role === 'departmentManager')
    firestoreModule
      .getUsers()
      .where("owners.departmentManagers", 'array-contains', uid)
      .onSnapshot(snapshot => {
        let answer = snapshot.docs.map(doc => ({ ...doc.data(), fid: doc.id }));
        answer = answer.filter(row => row.role === 'coordinator');
        setRows(answer);
        setLoading(false);
      });
  else
    firestoreModule
      .getUsers()
      .onSnapshot(snapshot => {
        let answer = snapshot.docs.map(doc => ({ ...doc.data(), fid: doc.id }));
        answer = answer.filter(row => row.role === 'coordinator');
        setRows(answer);
        setLoading(false);
      });

}

const getDepartmentManagers = (setRows, setLoading) => {

  firestoreModule
    .getUsers()
    .onSnapshot(snapshot => {
      
      let answer = snapshot.docs.map(doc => ({ ...doc.data(), fid: doc.id }));
      answer = answer.filter(row => row.role === 'departmentManager');
      setRows(answer);
      setLoading(false);
      //console.log('results', snapshot.docs.map(doc => doc.data()))
    });

}

export { getStudents, getTutors, getCoordinators, getDepartmentManagers };
