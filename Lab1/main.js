const mySum = require("./mySum.js");

// task1
const myArr = [1, 2, 3, 4, 5];
const result = mySum(...myArr);
console.log(result);

// task2
const mySecondArr = myArr.map((num) => num * 2);

// task3
const average = mySecondArr.reduce((acc, curr) => acc + curr, 0) / mySecondArr.length;

// task4
mySecondArr.filter((num) => {
  if (num > average) {
    console.log(num);
    return true;
  }
  return false;
});

// task5
setTimeout(() => {
  console.log("GoodBye");
}, 3000);

// task6
const Employee = {
  name: "Yuya",
  email: "Yuya1994@gmail.com",
  department: "ACCOUNTING",
  startDate: "2023-05-01",
};

const { name, email } = Employee;
const Person = { name, email };
console.log(Person);
