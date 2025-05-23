document.addEventListener('DOMContentLoaded', function () {
  // --- Button references ---
  const signUpButton = document.getElementById('signUpButton');
  const signInButton = document.getElementById('signInButton');
  const recoverPasswordButton = document.getElementById('recoverPasswordLink');
  const backToSignInButton = document.getElementById('backToSignIn');
  const signInStaffBtn = document.getElementById('submitSignInStaff');
  const backToPatientLoginBtn = document.getElementById('backToPatientLogin');

  // --- Form containers ---
  const signInForm = document.getElementById('signIn');
  const signUpForm = document.getElementById('signup');
  const recoverPasswordForm = document.getElementById('recoverPassword');
  const otpVerificationForm = document.getElementById('otpVerification');
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const signInStaffForm = document.getElementById('signInStaff');

  // --- Utility: Show only the selected form ---
  function showOnly(form) {
    [
      signInForm,
      signUpForm,
      recoverPasswordForm,
      otpVerificationForm,
      resetPasswordForm,
      signInStaffForm
    ].forEach(f => {
      if (f) f.style.display = 'none';
    });
    if (form) form.style.display = 'block';
  }

  // --- Navigation between forms ---
  if (signUpButton) signUpButton.addEventListener('click', () => showOnly(signUpForm));
  if (signInButton) signInButton.addEventListener('click', () => showOnly(signInForm));
  if (recoverPasswordButton) {
    recoverPasswordButton.addEventListener('click', e => {
      e.preventDefault();
      showOnly(recoverPasswordForm);
    });
  }
  if (backToSignInButton) backToSignInButton.addEventListener('click', () => showOnly(signInForm));

  // --- Staff login navigation ---
  if (signInStaffBtn) {
    signInStaffBtn.addEventListener('click', function (e) {
      if (signInStaffForm && signInStaffForm.style.display === 'none') {
        e.preventDefault();
        showOnly(signInStaffForm);
      }
    });
  }
  if (backToPatientLoginBtn) {
    backToPatientLoginBtn.addEventListener('click', function () {
      showOnly(signInForm);
    });
  }

  // --- Password visibility toggles ---
  function setupToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    if (toggle && input) {
      toggle.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggle.classList.toggle('bi-eye');
        toggle.classList.toggle('bi-eye-slash');
      });
    }
  }
  setupToggle('toggleResetPassword', 'newPassword');
  setupToggle('toggleConfirmResetPassword', 'confirmResetPassword');
  setupToggle('toggleSignInPassword', 'password');
  setupToggle('toggleSignUpPassword', 'rPassword');
  setupToggle('toggleConfirmSignUpPassword', 'confirmSignUpPassword');

  // --- OTP SIMULATION SECTION ---
  let generatedOTP = '';

  // Simulate sending OTP
  const recoveryRequestForm = document.getElementById('recoveryRequestForm');
  if (recoveryRequestForm) {
    recoveryRequestForm.addEventListener('submit', function (e) {
      e.preventDefault();
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      alert('Simulated OTP: ' + generatedOTP);
      showOnly(otpVerificationForm);
    });
  }

  // OTP verification logic
  const otpForm = document.getElementById('otpForm');
  if (otpForm) {
    otpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const enteredOtp = document.getElementById('otpCode').value;
      const otpMessage = document.getElementById('otpMessage');
      if (enteredOtp === generatedOTP) {
        showOnly(resetPasswordForm);
        if (otpMessage) otpMessage.style.display = 'none';
      } else {
        if (otpMessage) {
          otpMessage.textContent = 'Invalid OTP. Try again.';
          otpMessage.style.display = 'block';
        }
      }
    });
  }

  // --- Password reset logic ---
  const resetForm = document.getElementById('resetForm');
  if (resetForm) {
    resetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const newPass = document.getElementById('newPassword').value;
      const confirm = document.getElementById('confirmPassword').value;
      if (newPass !== confirm) {
        alert('Passwords do not match!');
      } else {
        alert('Password updated successfully.');
        showOnly(signInForm);
      }
    });
  }

  // --- SIGN-IN REDIRECT LOGIC ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;
      if (email && pass) {
        window.location.href = '/systemhtml/index.html';
      } else {
        alert('Please enter valid credentials.');
      }
    });
  }
});