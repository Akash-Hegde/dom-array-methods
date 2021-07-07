const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleMoney = document.getElementById("double-money");
const sortBtn = document.getElementById("sort");
const showMillionaire = document.getElementById("show-millionaire");
const calculate = document.getElementById("calculate");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function doubleUserMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sort() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function filter() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

function calculateTotal() {
  const total = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth<strong>${total}</strong></h3>`;
  main.appendChild(wealthEl);
}

function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach((data) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${data.name}</strong>${data.money}`;
    main.appendChild(element);
  });
}

addUser.addEventListener("click", getRandomUser);
doubleMoney.addEventListener("click", doubleUserMoney);
sortBtn.addEventListener("click", sort);
showMillionaire.addEventListener("click", filter);
calculate.addEventListener("click", calculateTotal);
