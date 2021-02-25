class User {
  constructor(id, surname, number, contract, address) {
    this.id = id;
    this.surname = surname;
    this.number = number;
    this.contract = contract;
    this.address = address;
  }
  setsurname(surname) {
    this.surname = surname;
  }
  setnumber(number) {
    this.number = number;
  }
  setcontract(contract) {
    this.contract = contract;
  }
  setAddress(address) {
    this.address = address;
  }
  getId() {
    return this.id;
  }
  getsurname() {
    return this.surname;
  }
  getnumber() {
    return this.number;
  }
  getcontract() {
    return this.contract;
  }
  getAddress() {
    return this.address;
  }
  getUser() {
    return `<tr>
        <td>${this.getId()}</td>
        <td>${this.getsurname()}</td>
        <td>${this.getnumber()}</td>
        <td>${this.getcontract()}</td>
        <td>${this.getAddress()}</td>
      </tr>`;
  }
  getUserByContract() {
    return `<tr>
        <td>${this.getId()}</td>
        <td></td>
        <td>${this.getnumber()}</td>
        <td>${this.getcontract()}</td>
        <td></td>
      </tr>`;
  }
}