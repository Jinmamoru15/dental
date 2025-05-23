// Tab functionality for the combined Dental Imaging & AI Analysis module
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Remove "active" class from all tab buttons
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Show current tab and add active class to its button
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Open default tab on page load
document.getElementById("defaultOpen").click();

// Set current year (this can also be in integration.js if preferred)
document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  // Welcome alert on page load
  alert("Welcome to the Dental Clinic Patient Interface!");

  // Fetch user dashboard data from the backend
  fetch('/api/dashboard-data')
    .then(response => response.json())
    .then(data => {
      // Assume data is structured as:
      // data = { profile: { name, location, contact }, activeAppointment: { datetime, treatment, dentist }, treatmentHistory: [ { period, code, dentist }, ... ] }

      // Populate Profile section
      document.querySelector('.profile-name').textContent = data.profile.name;
      document.querySelector('.profile-location').textContent = data.profile.location;
      document.querySelector('.profile-phone').textContent = data.profile.contact;

      // Populate Active Appointment section
      const activeAppointmentSection = document.querySelector('.active-appointment');
      activeAppointmentSection.querySelector('.appointment-datetime').textContent = data.activeAppointment.datetime;
      activeAppointmentSection.querySelector('.appointment-treatment').textContent = data.activeAppointment.treatment;
      activeAppointmentSection.querySelector('.appointment-dentist').textContent = `Dentist: ${data.activeAppointment.dentist}`;

      // Populate Treatment History section
      const treatmentHistoryContainer = document.querySelector('.treatment-history');
      // Clear placeholder text
      treatmentHistoryContainer.innerHTML = <h2>Treatment History</h2>;
      if (data.treatmentHistory.length === 0) {
        treatmentHistoryContainer.innerHTML += <p>No treatment history available.</p>;
      } else {
        data.treatmentHistory.forEach(item => {
          treatmentHistoryContainer.innerHTML += `
            <div class="treatment-item">
              <p class="period">${item.period}</p>
              <p class="treatment-code">${item.code}</p>
              <p class="treatment-dentist">Dentist: ${item.dentist}</p>
            </div>`;
        });
      }
    })
    .catch(error => console.error("Error fetching dashboard data: ", error));
  
  // Highlight active navigation link
  const menuLinks = document.querySelectorAll("nav ul li a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuLinks.forEach(l => l.style.background = ""); 
      link.style.background = "#00b4d8"; 
    });
  });

});