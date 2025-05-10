console.log("✅ script.js loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {

  // Navbar and Footer Injection using /static/ path
fetch("/static/navbar.html")
.then(response => response.text())
.then(data => {
  const nav = document.getElementById("navbar-placeholder");
  if (nav) nav.innerHTML = data;
});

fetch("/static/footer.html")
.then(response => response.text())
.then(data => {
  const foot = document.getElementById("footer-placeholder");
  if (foot) foot.innerHTML = data;
});

  // Verification Page - Login/Register Toggle
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");

  if (loginForm && registerForm && showRegister && showLogin) {
    showRegister.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    });

    showLogin.addEventListener("click", function (e) {
      e.preventDefault();
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    });
  }

  // Campaigns - Progress Bars
  function updateProgressBars() {
    const progressIndicators = document.querySelectorAll('.progress-indicator');
    progressIndicators.forEach(indicator => {
      const raisedAmount = parseFloat(indicator.getAttribute('data-raised'));
      const goalAmount = parseFloat(indicator.getAttribute('data-goal'));
      if (isNaN(raisedAmount) || isNaN(goalAmount) || goalAmount === 0) return;

      let progressPercentage = (raisedAmount / goalAmount) * 100;
      progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);

      const progressFill = indicator.querySelector('.progress-fill');
      if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
      }

      const progressText = indicator.querySelector("p");
      if (progressText) {
        progressText.textContent = `Funds Raised: ₹${raisedAmount.toLocaleString()} / ₹${goalAmount.toLocaleString()}`;
      }
    });
  }

  setTimeout(updateProgressBars, 600);

  // Campaign Modals
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "flex";
  };

  // Donate Page - Amount Buttons
  const amountButtons = document.querySelectorAll('.amount-buttons button');
  const customInputContainer = document.getElementById('custom-amount-container');
  const customInput = document.getElementById('custom-amount');
  const amountField = document.getElementById('amount');

  if (amountButtons.length && customInputContainer && customInput && amountField) {
    customInput.addEventListener('input', () => {
      amountField.value = customInput.value;
    });

    amountButtons.forEach(button => {
      button.addEventListener('click', () => {
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        const value = button.getAttribute('data-amount');
        if (value === 'custom') {
          customInputContainer.style.display = 'block';
          customInput.focus();
          amountField.value = customInput.value || '';
        } else {
          customInputContainer.style.display = 'none';
          amountField.value = value;
        }
      });
    });
  }

  // Success Stories - Vertical Carousel
  const carousel = document.querySelector('.success-carousel');
  const stories = document.querySelectorAll('.success-carousel .story');
  if (carousel && stories.length) {
    const firstClone = stories[0].cloneNode(true);
    carousel.appendChild(firstClone);

    let currentIndex = 0;

    setInterval(() => {
      currentIndex++;
      carousel.style.transition = "transform 0.8s ease-in-out";
      carousel.style.transform = `translateY(-${currentIndex * 140}px)`;

      if (currentIndex >= stories.length) {
        setTimeout(() => {
          carousel.style.transition = "none";
          carousel.style.transform = "translateY(0)";
          currentIndex = 0;
        }, 900);
      }
    }, 3000);
  }

  // Emergency Page - Modal Close on Outside Click
  window.onclick = function (event) {
    document.querySelectorAll(".modal").forEach(modal => {
      if (event.target === modal) modal.style.display = "none";
    });
  };

  // Volunteer Testimonials - Auto Rotate
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length > 0) {
    let currentIndex = 0;

    function showNextTestimonial() {
      testimonials[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % testimonials.length;
      testimonials[currentIndex].classList.add('active');
    }

    testimonials[currentIndex].classList.add('active');
    setInterval(showNextTestimonial, 3000);
  }

  // Report Page - Animated Alerts
  const alertContainer = document.getElementById("alert-container");
  if (alertContainer) {
    const alerts = [
      { type: 'danger', message: "🚨 High Priority: Earthquake detected in Zone A! Immediate evacuation required." },
      { type: 'danger', message: "🚨 High Priority: Wildfire spreading near Forest Hills!" },
      { type: 'warning', message: "⚠️ Moderate Priority: Landslide risk in Hilltop region due to heavy rain." },
      { type: 'warning', message: "⚠️ Moderate Priority: Heavy flooding expected in Riverbank Area." },
      { type: 'danger', message: "🚨 High Priority: Gas leak reported in Industrial Sector 9." }
    ];
    let index = 0;

    function showNextAlert() {
      const current = document.querySelector(".alert.current");
      const incomingData = alerts[index % alerts.length];
      const newAlert = document.createElement("div");
      newAlert.className = `alert alert-${incomingData.type} incoming`;
      newAlert.innerHTML = incomingData.message;
      alertContainer.appendChild(newAlert);

      void newAlert.offsetWidth;

      newAlert.classList.remove("incoming");
      newAlert.classList.add("current");

      if (current) {
        current.classList.add("out");
        setTimeout(() => current.remove(), 1000);
      }

      index++;
      setTimeout(showNextAlert, 4000);
    }

    showNextAlert();
  }

});