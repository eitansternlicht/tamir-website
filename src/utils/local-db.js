import { diffInHours } from '../utils/date-utils';

const totalHoursWorked = attendanceDays =>
  attendanceDays
    .map(({ endTime, startTime }) => (startTime && endTime ? diffInHours(startTime, endTime) : 0))
    .reduce((acc, curr) => acc + curr, 0);

const addOwnersForUsers = (myRole, myUid, myOwners, roleOfUserToAdd, userToAdd) => {
  if (myRole === 'ceo')
    return {
      ...userToAdd,
      role: roleOfUserToAdd.substr(0, roleOfUserToAdd.length - 1)
    };
  return {
    ...userToAdd,
    owners: {
      ...myOwners,
      [myRole + 's']: [myUid]
    },
    role: roleOfUserToAdd.substr(0, roleOfUserToAdd.length - 1)
  };
};

export { totalHoursWorked, addOwnersForUsers };
