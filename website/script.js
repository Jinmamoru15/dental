
  const modal = document.getElementById("bookingModal");
  const openBtn = document.getElementById("openBooking");
  const closeBtn = document.getElementById("closeBooking");

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Optional: Show success message temporarily
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("successMessage").style.display = "block";
    setTimeout(() => {
      document.getElementById("successMessage").style.display = "none";
      modal.style.display = "none";
      this.reset();
    }, 3000);
  });

