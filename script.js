import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "🔑🔑🔑",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function login() {
  const empId = document.getElementById("employeeId").value.trim();
  if (empId === "70062") {
    showSection('dashboard');
  } else {
    alert("رقم وظيفي غير صحيح");
  }
}

function logout() {
  showSection('login');
}

async function saveInvoice() {
  const data = {
    clientName: document.getElementById("clientName").value,
    phone: document.getElementById("phone").value,
    quantity: parseInt(document.getElementById("quantity").value),
    timestamp: new Date()
  };
  await addDoc(collection(db, "invoices"), data);
  alert("✅ تم الحفظ");
  document.getElementById("clientName").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("quantity").value = "";
}

window.login = login;
window.showSection = showSection;
window.saveInvoice = saveInvoice;
window.logout = logout;

async function loadReports() {
  const querySnapshot = await getDocs(collection(db, "invoices"));
  const tbody = document.getElementById("reportTable").querySelector("tbody");
  tbody.innerHTML = "";
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const row = `<tr>
      <td>${data.clientName}</td>
      <td>${data.phone}</td>
      <td>${data.quantity}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

document.getElementById("report").addEventListener("click", loadReports);

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleString();
}
setInterval(updateClock, 1000);
