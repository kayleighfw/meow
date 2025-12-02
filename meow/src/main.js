import './login/LoginForm.js';
import './dashboard/Dashboard.js';
import './dashboard/dashboard.css';

const app = document.getElementById('app');

function showPage(page) {
  if (page === 'dashboard') {
    app.innerHTML = '<dashboard-page></dashboard-page>';
  } else {
    app.innerHTML = '<login-form></login-form>';
  }
}

// Expose voor LoginForm en Dashboard
window.showPage = showPage;

// Initieel login-form tonen
showPage('login');

