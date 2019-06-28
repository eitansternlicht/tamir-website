const concatAll = aoaoa => {
  const aoas = [];
  aoaoa.forEach(subArray => {
    subArray.forEach(subArrayValue => {
      aoas.push(subArrayValue);
    });
  });
  return aoas;
};

const entriesToObj = entries =>
  entries.reduce((prev, curr) => {
    const [key, val] = curr;
    return { ...prev, [key]: val };
  }, {});

const zip = (arr1, arr2) => arr1.map((elm, i) => [elm, arr2[i]]);

const checkIfAllFieldsHaveValue = (fields, obj, hasValue) => {
  return fields.filter(field => hasValue(obj, field)).length === fields.length;
};
const getOwners = (fixedStudent, role, uid) => {
  if (role === 'tutor')
    fixedStudent = {
      ...fixedStudent,
      owners: {
        tutors: [{ studentStatus: 'normal', uid: uid }],
        coordinators: [],
        departmentManagers: []
      }
    };
  else if (role === 'coordinator')
    fixedStudent = {
      ...fixedStudent,
      owners: { tutors: [], coordinators: [uid], departmentManagers: [] }
    };
  else if (role === 'departmentManager')
    fixedStudent = {
      ...fixedStudent,
      owners: { tutors: [], coordinators: [], departmentManagers: [uid] }
    };
  else
    fixedStudent = {
      ...fixedStudent,
      owners: { tutors: [], coordinators: [], departmentManagers: [] }
    };
  return fixedStudent;
};

const removeEmptyFields = obj => entriesToObj(Object.entries(obj).filter(([, v]) => v));

export { concatAll, entriesToObj, zip, checkIfAllFieldsHaveValue, getOwners, removeEmptyFields };
