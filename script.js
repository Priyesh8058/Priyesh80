const loginForm = document.querySelector("#loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let role = document.querySelector("#role").value;
        if (username === "" || password === "" || role === "") {
            alert("Please enter all details.");
            return;
        }
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        if (role === "admin") {
            window.location.href = "admin.html";
        }
        else if (role === "doctor") {
            window.location.href = "doctor.html";
        }
        else if (role === "staff") {
            window.location.href = "staff.html";
        }
        else if (role === "patient") {
            window.location.href = "patient-dashboard.html";
        }
        else if (role === "appointment") {
            window.location.href = "appointment.html";
        }
        else if (role === "payment") {
            window.location.href = "payment.html";
        }
    });
}
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "index.html";
}
let patients = JSON.parse(localStorage.getItem("patients")) || [];
function savePatient() {
    let patient = {
        id: document.querySelector("#patientId")?.value,
        name: document.querySelector("#patientName")?.value,
        age: document.querySelector("#age")?.value,
        gender: document.querySelector("#gender")?.value,
        phone: document.querySelector("#phone")?.value,
        disease: document.querySelector("#disease")?.value,
        address: document.querySelector("#address")?.value
    };
    if (!patient.name || !patient.age || !patient.gender ||
        !patient.phone || !patient.disease || !patient.address) {
        alert("Please fill all patient details.");
        return;
    }
    if (!patient.id) {
        patient.id = "P" + String(patients.length + 1).padStart(3, "0");
    }
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));
    alert("Patient saved successfully.");
    displayPatients();
}
function displayPatients() {
    let table = document.querySelector("#patientTable");
    if (!table) {
        return;
    }
    table.innerHTML = "";
    patients.forEach(function(patient, index) {
        table.innerHTML += `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone}</td>
                <td>${patient.disease}</td>
                <td>${patient.address}</td>
                <td>
                    <button onclick="deletePatient(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
function deletePatient(index) {
    if (confirm("Are you sure you want to delete this patient?")) {
        patients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(patients));
        displayPatients();
    }
}
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
function saveDoctor() {
    let doctor = {
        id: document.querySelector("#doctorId")?.value,
        name: document.querySelector("#doctorName")?.value,
        specialization:
            document.querySelector("#specialization")?.value,
        department:
            document.querySelector("#department")?.value,
        contact:
            document.querySelector("#doctorContact")?.value,
        availability:
            document.querySelector("#availability")?.value
    };
    if (!doctor.name ||
        !doctor.specialization ||
        !doctor.department ||
        !doctor.contact ||
        !doctor.availability) {
        alert("Please fill all doctor details.");
        return;
    }
    if (!doctor.id) {
        doctor.id = "D" + String(doctors.length + 1).padStart(3, "0");
    }
    doctors.push(doctor);
    localStorage.setItem("doctors", JSON.stringify(doctors));
    alert("Doctor saved successfully.");
    displayDoctors();
}
function displayDoctors() {
    let table = document.querySelector("#doctorTable");
    if (!table) {
        return;
    }
    table.innerHTML = "";
    doctors.forEach(function(doctor, index) {
        table.innerHTML += `
            <tr>
                <td>${doctor.id}</td>
                <td>${doctor.name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.department}</td>
                <td>${doctor.contact}</td>
                <td>${doctor.availability}</td>
                <td>
                    <button onclick="deleteDoctor(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
function deleteDoctor(index) {
    if (confirm("Are you sure you want to delete this doctor?")) {
        doctors.splice(index, 1);
        localStorage.setItem("doctors", JSON.stringify(doctors));
        displayDoctors();
    }
}
let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];
function saveAppointment() {
    let appointment = {
        id: document.querySelector("#appointmentId")?.value,
        patientId:
            document.querySelector("#appointmentPatientId")?.value,
        patientName:
            document.querySelector("#appointmentPatientName")?.value,
        phone:
            document.querySelector("#appointmentPhone")?.value,
        doctor:
            document.querySelector("#appointmentDoctor")?.value,
        date:
            document.querySelector("#appointmentDate")?.value,
        time:
            document.querySelector("#appointmentTime")?.value,
        symptoms:
            document.querySelector("#symptoms")?.value
    };
    if (!appointment.patientId ||
        !appointment.patientName ||
        !appointment.phone ||
        !appointment.doctor ||
        !appointment.date ||
        !appointment.time ||
        !appointment.symptoms) {
        alert("Please fill all appointment details.");
        return;
    }
    if (!appointment.id) {
        appointment.id =
            "A" + String(appointments.length + 1).padStart(3, "0");
    }
    appointments.push(appointment);
    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );
    alert("Appointment booked successfully.");
    displayAppointments();
}
function formatTime(time) {
    if (!time) {
        return "";
    }
    let parts = time.split(":");
    let hour = parseInt(parts[0]);
    let minute = parts[1];
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) {
        hour = 12;
    }
    return hour + ":" + minute + " " + ampm;
}
function displayAppointments() {
    let table = document.querySelector("#appointmentTable");
    if (!table) {
        return;
    }
    table.innerHTML = "";
    appointments.forEach(function(appointment, index) {
        table.innerHTML += `
            <tr>
                <td>${appointment.id}</td>
                <td>${appointment.patientId}</td>
                <td>${appointment.patientName}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.date}</td>
                <td>${formatTime(appointment.time)}</td>
                <td>${appointment.symptoms}</td>
                <td>
                    <button onclick="deleteAppointment(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
function deleteAppointment(index) {
    if (confirm("Are you sure you want to delete this appointment?")) {
        appointments.splice(index, 1);
        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );
        displayAppointments();
    }
}
let staffMembers =
    JSON.parse(localStorage.getItem("staffMembers")) || [];
function saveStaff() {
    let staff = {
        id: document.querySelector("#staffId")?.value,
        name:
            document.querySelector("#staffName")?.value,
        role:
            document.querySelector("#staffRole")?.value,
        phone:
            document.querySelector("#staffPhone")?.value
    };
    if (!staff.name || !staff.role || !staff.phone) {
        alert("Please fill all staff details.");
        return;
    }
    if (!staff.id) {
        staff.id =
            "S" + String(staffMembers.length + 1).padStart(3, "0");
    }
    staffMembers.push(staff);
    localStorage.setItem(
        "staffMembers",
        JSON.stringify(staffMembers)
    );
    alert("Staff saved successfully.");
    displayStaff();
}
function displayStaff() {
    let table = document.querySelector("#staffTable");
    if (!table) {
        return;
    }
    table.innerHTML = "";
    staffMembers.forEach(function(staff, index) {
        table.innerHTML += `
            <tr>
                <td>${staff.id}</td>
                <td>${staff.name}</td>
                <td>${staff.role}</td>
                <td>${staff.phone}</td>
                <td>
                    <button onclick="deleteStaff(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
function deleteStaff(index) {
    if (confirm("Are you sure you want to delete this staff member?")) {
        staffMembers.splice(index, 1);
        localStorage.setItem(
            "staffMembers",
            JSON.stringify(staffMembers)
        );
        displayStaff();
    }
}
let bills = JSON.parse(localStorage.getItem("bills")) || [];
function calculateBill() {
    let treatment =
        parseFloat(
            document.querySelector("#treatmentCharges")?.value
        ) || 0;
    let doctor =
        parseFloat(
            document.querySelector("#doctorCharges")?.value
        ) || 0;
    let total = treatment + doctor;
    let totalBox = document.querySelector("#total");
    if (totalBox) {
        totalBox.value = total;
    }
    let totalText = document.querySelector("#totalAmount");
    if (totalText) {
        totalText.innerHTML = "₹" + total;
    }
}
function saveBill() {
    let treatment =
        parseFloat(
            document.querySelector("#treatmentCharges")?.value
        ) || 0;
    let doctor =
        parseFloat(
            document.querySelector("#doctorCharges")?.value
        ) || 0;
    let bill = {
        id:
            document.querySelector("#billId")?.value,
        patientId:
            document.querySelector("#billPatientId")?.value,
        treatmentCharges: treatment,
        doctorCharges: doctor,
        total: treatment + doctor
    };
    if (!bill.patientId) {
        alert("Please enter Patient ID.");
        return;
    }
    if (!bill.id) {
        bill.id =
            "B" + String(bills.length + 1).padStart(3, "0");
    }
    bills.push(bill);
    localStorage.setItem(
        "bills",
        JSON.stringify(bills)
    );
    alert("Bill saved successfully.");
    displayBills();
    calculateBill();
}
function displayBills() {
    let table = document.querySelector("#billTable");
    if (!table) {
        return;
    }
    table.innerHTML = "";
    bills.forEach(function(bill, index) {
        table.innerHTML += `
            <tr>
                <td>${bill.id}</td>
                <td>${bill.patientId}</td>
                <td>₹${bill.treatmentCharges}</td>
                <td>₹${bill.doctorCharges}</td>
                <td>₹${bill.total}</td>
                <td>
                    <button onclick="deleteBill(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
function deleteBill(index) {
    if (confirm("Are you sure you want to delete this bill?")) {
        bills.splice(index, 1);
        localStorage.setItem(
            "bills",
            JSON.stringify(bills)
        );
        displayBills();
    }
}
function printBill() {
    window.print();
}
let payments =
    JSON.parse(localStorage.getItem("payments")) || [];
function savePayment() {
    let payment = {
        id:
            document.querySelector("#paymentId")?.value,
        billId:
            document.querySelector("#paymentBillId")?.value,
        patientId:
            document.querySelector("#paymentPatientId")?.value,
        amount:
            document.querySelector("#paymentAmount")?.value,
        date:
            document.querySelector("#paymentDate")?.value,
        status:
            document.querySelector("#paymentStatus")?.value
    };
    if (!payment.billId ||!payment.patientId ||!payment.amount ||!payment.date ||!payment.status) {
        alert("Please fill all payment details.");
        return;
    }
    if (!payment.id) {
        payment.id =
            "PAY" + String(payments.length + 1).padStart(3, "0");
    }
    payments.push(payment);
    localStorage.setItem(
        "payments",
        JSON.stringify(payments)
    );
    alert("Payment saved successfully.");
    displayPayments();

}
function displayPayments() {
    let table = document.querySelector("#paymentTable");
    if (!table) {
        return;
    }
    table.innerHTML = "";
    payments.forEach(function(payment, index) {
        table.innerHTML += `
            <tr>
                <td>${payment.id}</td>
                <td>${payment.billId}</td>
                <td>${payment.patientId}</td>
                <td>₹${payment.amount}</td>
                <td>${payment.date}</td>
                <td>${payment.status}</td>
                <td>
                    <button onclick="deletePayment(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
function deletePayment(index) {
    if (confirm("Are you sure you want to delete this payment?")) {
        payments.splice(index, 1);
        localStorage.setItem(
            "payments",
            JSON.stringify(payments)
        );
        displayPayments();
    }
}
function clearForm() {
    let form = document.querySelector("form");
    if (form) {
        form.reset();
    }
}
document.addEventListener("DOMContentLoaded", function() {
    displayPatients();
    displayDoctors();
    displayAppointments();
    displayStaff();
    displayBills();
    displayPayments();
});