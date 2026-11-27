// list of clinic services
var services = [
  { id: 1, name: "General Health Checkup", doctor: "Dr. Rohit Sharma", category: "Vet", petType: "Dog", price: 500, info: "Full body checkup, temperature check, and medicine advice." },
  { id: 2, name: "Full Bath & Haircut", doctor: "Sparkle Paws Team", category: "Grooming", petType: "Dog", price: 800, info: "Shampoo bath, nail cutting, ear cleaning, and fur trimming." },
  { id: 3, name: "Rabies & Booster Vaccine", doctor: "Dr. Neha Mehta", category: "Vaccination", petType: "Cat", price: 650, info: "Annual vaccination shot with official vaccination card." },
  { id: 4, name: "Puppy Obedience Training", doctor: "Coach Alex", category: "Training", petType: "Dog", price: 1200, info: "Basic commands, leash walking, and habit correction." },
  { id: 5, name: "Cat Dental & Skin Check", doctor: "Dr. Rohit Sharma", category: "Vet", petType: "Cat", price: 700, info: "Teeth cleaning and skin allergy examination for cats." },
  { id: 6, name: "Bird Wing & Health Check", doctor: "Dr. Neha Mehta", category: "Vet", petType: "Bird", price: 450, info: "Feathers, beak checkup, and diet consultation for pet birds." },
  { id: 7, name: "Anti-Tick Medicated Bath", doctor: "Sparkle Paws Team", category: "Grooming", petType: "Cat", price: 600, info: "Safe medicated wash to remove ticks and fleas." }
];

var selectedCat = "All";
var chosenSlot = "09:30 AM";

// switch between pages
function showPage(pageId, btn) {
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active-page");
  }
  document.getElementById(pageId).classList.add("active-page");

  var navBtns = document.getElementsByClassName("nav-btn");
  for (var j = 0; j < navBtns.length; j++) {
    navBtns[j].classList.remove("active-nav");
  }

  if (btn) {
    btn.classList.add("active-nav");
  } else {
    if (pageId == "page1") navBtns[0].classList.add("active-nav");
    if (pageId == "page2") navBtns[1].classList.add("active-nav");
    if (pageId == "page3") navBtns[2].classList.add("active-nav");
    if (pageId == "page4") navBtns[3].classList.add("active-nav");
  }

  if (pageId == "page2") showPets();
  if (pageId == "page3") fillDropdowns();
  if (pageId == "page4") showAdminTable();
}

function toggleTimings() {
  var box = document.getElementById("timingsBox");
  if (box.style.display == "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}

function showEmergency() {
  alert("24x7 Emergency Vet Helpline: +91 98765-43210\nAmbulance Available in City Area.");
}

// filter category button click
function filterCat(cat, btn) {
  selectedCat = cat;
  var btns = document.getElementsByClassName("cat-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active-cat");
  }
  btn.classList.add("active-cat");
  loadServices();
}

function clearFilters() {
  selectedCat = "All";
  document.getElementById("searchBox").value = "";
  document.getElementById("petFilter").value = "All";
  document.getElementById("priceSort").value = "default";

  var btns = document.getElementsByClassName("cat-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active-cat");
  }
  btns[0].classList.add("active-cat");
  loadServices();
}

// show services on page 1
function loadServices() {
  var box = document.getElementById("serviceBox");
  var search = document.getElementById("searchBox").value.toLowerCase();
  var petType = document.getElementById("petFilter").value;
  var sortType = document.getElementById("priceSort").value;

  var list = [];
  for (var i = 0; i < services.length; i++) {
    var s = services[i];
    var okCat = (selectedCat == "All" || s.category == selectedCat);
    var okPet = (petType == "All" || s.petType == petType);
    var okSearch = (s.name.toLowerCase().indexOf(search) != -1 || s.doctor.toLowerCase().indexOf(search) != -1);

    if (okCat && okPet && okSearch) {
      list.push(s);
    }
  }

  if (sortType == "low") {
    list.sort(function (a, b) { return a.price - b.price; });
  } else if (sortType == "high") {
    list.sort(function (a, b) { return b.price - a.price; });
  }

  box.innerHTML = "";
  if (list.length == 0) {
    box.innerHTML = "<p>No services found for this filter.</p>";
    return;
  }

  for (var k = 0; k < list.length; k++) {
    var item = list[k];
    var div = document.createElement("div");
    div.className = "card";
    div.innerHTML =
      "<span class='card-tag'>" + item.category + " | " + item.petType + "</span>" +
      "<h3>" + item.name + "</h3>" +
      "<p><b>Doctor/Team:</b> " + item.doctor + "</p>" +
      "<p>" + item.info + "</p>" +
      "<div class='card-bottom'>" +
      "<span class='price-text'>Rs. " + item.price + "</span>" +
      "<button class='main-btn' onclick=\"goToBooking('" + item.name + "')\">Book Now</button>" +
      "</div>";
    box.appendChild(div);
  }
}

function showTip(type) {
  var out = document.getElementById("tipOutput");
  if (type == "dog") {
    out.innerText = "Dog Care: Give fresh water daily, take for a 30 minute walk, and never feed chocolate or grapes.";
  } else if (type == "cat") {
    out.innerText = "Cat Care: Keep litter box clean, brush fur twice a week, and schedule yearly dental checks.";
  } else if (type == "vaccine") {
    out.innerText = "Vaccination Guide: Puppies and kittens need their first core vaccines between 6 to 8 weeks of age.";
  } else if (type == "firstaid") {
    out.innerText = "First Aid: For minor cuts, clean gently with lukewarm water and call our helpline if bleeding continues.";
  }
}

function goToBooking(serviceName) {
  showPage("page3");
  document.getElementById("bService").value = serviceName;
}

// localStorage helpers
function getPets() {
  var data = localStorage.getItem("student_pets");
  if (data) return JSON.parse(data);
  return [{ id: "P1", name: "Rocky", type: "Dog", breed: "Golden Retriever", age: 3, notes: "Healthy" }];
}

function getBookings() {
  var data = localStorage.getItem("student_bookings");
  if (data) return JSON.parse(data);
  return [{ id: "APT101", owner: "Rohan Sharma", phone: "9876543210", pet: "Rocky (Dog)", service: "General Health Checkup", date: "2026-11-28", slot: "09:30 AM", status: "Confirmed" }];
}

// page 2: pets
function showPets() {
  var box = document.getElementById("petListBox");
  var pets = getPets();
  box.innerHTML = "";

  if (pets.length == 0) {
    box.innerHTML = "<p>No pets added yet.</p>";
    return;
  }

  for (var i = 0; i < pets.length; i++) {
    var p = pets[i];
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      "<span class='card-tag'>" + p.type + "</span>" +
      "<h3>" + p.name + " (" + p.breed + ")</h3>" +
      "<p><b>Age:</b> " + p.age + " years</p>" +
      "<p><b>Notes:</b> " + p.notes + "</p>" +
      "<div class='card-bottom'>" +
      "<span>ID: " + p.id + "</span>" +
      "<button class='danger-btn' onclick='removePet(" + i + ")'>Delete</button>" +
      "</div>";
    box.appendChild(card);
  }
}

function removePet(index) {
  var pets = getPets();
  pets.splice(index, 1);
  localStorage.setItem("student_pets", JSON.stringify(pets));
  showPets();
}

document.getElementById("petForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var pets = getPets();
  var newPet = {
    id: "P" + (pets.length + 1),
    name: document.getElementById("pName").value,
    type: document.getElementById("pType").value,
    breed: document.getElementById("pBreed").value,
    age: document.getElementById("pAge").value,
    notes: document.getElementById("pNotes").value || "None"
  };
  pets.push(newPet);
  localStorage.setItem("student_pets", JSON.stringify(pets));
  this.reset();
  alert("Pet profile saved!");
  showPets();
});

// page 3: booking
function fillDropdowns() {
  var petSelect = document.getElementById("bPet");
  var pets = getPets();
  petSelect.innerHTML = "<option value=''>-- Select Pet --</option>";
  for (var i = 0; i < pets.length; i++) {
    var opt = document.createElement("option");
    opt.value = pets[i].name + " (" + pets[i].type + ")";
    opt.text = pets[i].name + " - " + pets[i].breed;
    petSelect.appendChild(opt);
  }

  var serSelect = document.getElementById("bService");
  if (serSelect.options.length == 0) {
    for (var j = 0; j < services.length; j++) {
      var opt2 = document.createElement("option");
      opt2.value = services[j].name;
      opt2.text = services[j].name + " (Rs. " + services[j].price + ")";
      serSelect.appendChild(opt2);
    }
  }
}

function selectSlot(time, btn) {
  chosenSlot = time;
  var btns = document.getElementsByClassName("slot-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active-slot");
  }
  btn.classList.add("active-slot");
}

document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var list = getBookings();
  var booking = {
    id: "APT" + Math.floor(100 + Math.random() * 900),
    owner: document.getElementById("bOwner").value,
    phone: document.getElementById("bPhone").value,
    pet: document.getElementById("bPet").value,
    service: document.getElementById("bService").value,
    date: document.getElementById("bDate").value,
    slot: chosenSlot,
    status: "Pending"
  };
  list.push(booking);
  localStorage.setItem("student_bookings", JSON.stringify(list));
  this.reset();
  alert("Appointment booked successfully!");
  showPage("page4");
});

// page 4: admin
function showAdminTable() {
  var tbody = document.getElementById("adminBody");
  var list = getBookings();
  var pets = getPets();

  var confirmed = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i].status == "Confirmed") confirmed++;
  }

  document.getElementById("totalCount").innerText = list.length;
  document.getElementById("confirmedCount").innerText = confirmed;
  document.getElementById("pendingCount").innerText = list.length - confirmed;
  document.getElementById("petsCount").innerText = pets.length;

  tbody.innerHTML = "";
  if (list.length == 0) {
    tbody.innerHTML = "<tr><td colspan='7'>No appointments available.</td></tr>";
    return;
  }

  for (var j = 0; j < list.length; j++) {
    var a = list[j];
    var statusTag = a.status == "Confirmed"
      ? "<span class='status-ok'>Confirmed</span>"
      : "<span class='status-wait'>Pending</span>";

    var row = document.createElement("tr");
    row.innerHTML =
      "<td><b>" + a.id + "</b></td>" +
      "<td>" + a.owner + "<br><small>" + a.phone + "</small></td>" +
      "<td>" + a.pet + "</td>" +
      "<td>" + a.service + "</td>" +
      "<td>" + a.date + " (" + a.slot + ")</td>" +
      "<td>" + statusTag + "</td>" +
      "<td>" +
      (a.status != "Confirmed" ? "<button class='ok-btn' onclick='confirmBooking(" + j + ")'>Confirm</button> " : "") +
      "<button class='danger-btn' onclick='cancelBooking(" + j + ")'>Cancel</button>" +
      "</td>";
    tbody.appendChild(row);
  }
}

function confirmBooking(index) {
  var list = getBookings();
  list[index].status = "Confirmed";
  localStorage.setItem("student_bookings", JSON.stringify(list));
  showAdminTable();
}

function cancelBooking(index) {
  var list = getBookings();
  list.splice(index, 1);
  localStorage.setItem("student_bookings", JSON.stringify(list));
  showAdminTable();
}

function resetAll() {
  if (confirm("Reset all demo data?")) {
    localStorage.removeItem("student_pets");
    localStorage.removeItem("student_bookings");
    loadServices();
    showPets();
    fillDropdowns();
    showAdminTable();
  }
}

// run when page loads
window.onload = function () {
  loadServices();
  showPets();
  fillDropdowns();
  showAdminTable();

  var today = new Date().toISOString().split("T")[0];
  document.getElementById("bDate").min = today;
  document.getElementById("bDate").value = today;
};