const customers = [];
const parkingSlots = {
  car: Array(5).fill(null),
  motorcycle: Array(5).fill(null),
  electric: Array(5).fill(null)
};

function addCustomer() {
  const name = document.getElementById("customer-name").value;
  const status = document.getElementById("customer-status").value;
  const vehicleType = document.getElementById("vehicle-type").value;
  const vehiclePlate = document.getElementById("vehicle-plate-customer").value;

  const ticketNumber = Math.floor(100000 + Math.random() * 900000).toString();
  const timeIn = new Date().toLocaleString();
  customers.push({ name, status, ticketNumber, timeIn, timeOut: null, vehicleType, vehiclePlate });

  updateCustomerTable();
  updateParkingSlots(vehicleType, ticketNumber);
}

function reserveCustomer() {
    const customer = customers[customers.length - 1]; // Get the last added customer
    if (customer && customer.status === "Online") {
      // Add reservation logic here
      // Redirect to reservation page or show a confirmation
      window.location.href = "reservations.html"; // Redirect to reservations page
    }
  }

function updateCustomerTable() {
  const customerTable = document.getElementById("customer-table").querySelector("tbody");
  customerTable.innerHTML = "";
  customers.forEach((customer, index) => {
    const row = `<tr>
      <td>${customer.name}</td>
      <td>${customer.status}</td>
      <td>${customer.ticketNumber}</td>
      <td>${customer.timeIn}</td>
      <td>${customer.timeOut || "Still parked"}</td>
      <td>${customer.vehiclePlate || "N/A"}</td>
      <td><button onclick="checkOutCustomer(${index})">Check Out</button></td>
    </tr>`;
    customerTable.innerHTML += row;
  });
}

function updateParkingSlots(type, ticketNumber) {
  const parkingGrid = document.querySelector(#${type}-parking .parking-grid);
  const availableSlot = parkingSlots[type].findIndex(slot => slot === null);
  if (availableSlot !== -1) {
    parkingSlots[type][availableSlot] = ticketNumber;
  }

  parkingGrid.innerHTML = "";
  parkingSlots[type].forEach(slot => {
    const slotDiv = <div class="parking-slot ${slot ? 'bg-red' : 'bg-green'}">${slot || "Empty"}</div>;
    parkingGrid.innerHTML += slotDiv;
  });
}

function checkOutCustomer(index) {
  const customer = customers[index];
  const timeOut = new Date().toLocaleString();
  customers[index].timeOut = timeOut;

  const type = customer.vehicleType;
  const slotIndex = parkingSlots[type].indexOf(customer.ticketNumber);
  if (slotIndex !== -1) {
    parkingSlots[type][slotIndex] = null;
  }

  const timeInDate = new Date(customer.timeIn);
  const timeOutDate = new Date(timeOut);
  const durationInHours = Math.ceil((timeOutDate - timeInDate) / (1000 * 60 * 60)); // in hours
  const ratePerHour = 100; // Rate per hour
  const totalFee = durationInHours * ratePerHour;

  const isPaid = confirm(Customer ${customer.name} owes  ${totalFee} PESOS. Click OK to mark as PAID.);
  if (isPaid) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push({ name: customer.name, vehicleType: customer.vehicleType, timeIn: customer.timeIn, timeOut, totalFee });
    localStorage.setItem('history', JSON.stringify(history));

    updateCustomerTable();
    updateParkingSlots(type);
  }
}

// Initialize parking grids
updateParkingSlots("car");
updateParkingSlots("motorcycle");
updateParkingSlots("electric");