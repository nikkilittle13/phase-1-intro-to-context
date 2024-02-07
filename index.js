function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  const employeeRecord = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
  return employeeRecord;
};

function createEmployeeRecords(data) {
  return data.map((employeeData) => createEmployeeRecord(employeeData));
};

function createTimeInEvent(employeeRecord, dateTime){
  const date = dateTime.slice(0, 10);
  const time = dateTime.slice(11, 15);

  const timeInEvent = {
    type: 'TimeIn',
    date: date,
    hour: parseInt(time, 10)
  };

  employeeRecord.timeInEvents.push(timeInEvent);

  return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateTime) {
  const date = dateTime.slice(0, 10);
  const time = dateTime.slice(11, 15);

  const timeOutEvent = {
    type: 'TimeOut',
    date: date,
    hour: parseInt(time, 10)
  };

  employeeRecord.timeOutEvents.push(timeOutEvent);

  return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, date) {
  let timeInEvent = undefined;
  let timeOutEvent = undefined;

  for (const event of employeeRecord.timeInEvents) {
    if (event.date === date) {
      timeInEvent = event;
      break;
    }
  };

  for (const event of employeeRecord.timeOutEvents) {
    if (event.date === date) {
      timeOutEvent = event;
      break;
    }
  };

  if (timeOutEvent && timeInEvent) {
    const hoursWorked = timeOutEvent.hour - timeInEvent.hour;
    let hoursWorkedString = hoursWorked.toString().slice(0, -2);
    return parseInt(hoursWorkedString, 10);
  } else {
    return 0;
  };
};

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  return wagesEarned;
};

function allWagesFor(employeeRecord) {
  let totalWages = 0;

  for (const timeInEvent of employeeRecord.timeInEvents) {
    const date = timeInEvent.date;
    const wagesOnDate = wagesEarnedOnDate(employeeRecord, date);
    totalWages += wagesOnDate;
  };
  return totalWages;
};

function calculatePayroll(employeeRecord) {
  let totalPayroll = 0;

  employeeRecord.forEach((employeeRecord) => {
    const calculatedWages = allWagesFor(employeeRecord);
    totalPayroll += calculatedWages;
  });
  return totalPayroll;
};