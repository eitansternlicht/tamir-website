import { diffInHours } from '../utils/date-utils';

const totalHoursWorked = attendanceDays =>
  attendanceDays
    .map(({ endTime, startTime }) => (startTime && endTime ? diffInHours(startTime, endTime) : 0))
    .reduce((acc, curr) => acc + curr, 0);

export { totalHoursWorked };
