// ===== NAVIGATION & INTERACTIVE COMPONENTS =====

document.addEventListener('DOMContentLoaded', function() {
  initHamburger();
  initNavigation();
  initModals();
});

// ===== HAMBURGER MENU =====

function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');

  if (!hamburger || !sidebar) return;

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
  });

  // Close sidebar when clicking on a nav item
  const navItems = sidebar.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
    });
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', function(e) {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
    }
  });
}

// ===== NAVIGATION ACTIVE STATE =====

function initNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });
}

// ===== MODALS =====

function initModals() {
  const modals = document.querySelectorAll('.modal');

  // Close modal on background click
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this);
      }
    });

    // Close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
  });

  // Open modal buttons
  document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      if (modal) openModal(modal);
    });
  });

  // Close modal buttons
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = this.closest('.modal');
      if (modal) closeModal(modal);
    });
  });
}

function openModal(modal) {
  if (modal) {
    modal.classList.add('modal--active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove('modal--active');
    document.body.style.overflow = '';
  }
}

// ===== FORM VALIDATION =====

function validateForm(formElement) {
  let isValid = true;

  const inputs = formElement.querySelectorAll('[required]');
  inputs.forEach(input => {
    if (!input.value.trim()) {
      markInputError(input, 'This field is required');
      isValid = false;
    } else {
      clearInputError(input);
    }
  });

  return isValid;
}

function markInputError(input, message) {
  input.classList.add('input--error');
  const errorMsg = input.parentElement.querySelector('.error-message');
  if (errorMsg) {
    errorMsg.textContent = message;
  }
}

function clearInputError(input) {
  input.classList.remove('input--error');
  const errorMsg = input.parentElement.querySelector('.error-message');
  if (errorMsg) {
    errorMsg.textContent = '';
  }
}

// ===== CHECKBOX TOGGLE =====

document.addEventListener('change', function(e) {
  if (e.target.type === 'checkbox') {
    const row = e.target.closest('tr');
    if (row) {
      row.classList.toggle('row--completed', e.target.checked);
    }
  }
});

// ===== KEYBOARD SHORTCUTS =====

document.addEventListener('keydown', function(e) {
  // Close modal on ESC
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.modal--active');
    if (activeModal) {
      closeModal(activeModal);
    }
  }

  // Close sidebar on ESC (mobile)
  if (e.key === 'Escape') {
    const sidebar = document.querySelector('.sidebar.active');
    const hamburger = document.querySelector('.hamburger.active');
    if (sidebar && hamburger) {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
    }
  }
});

// ===== LIKE BUTTON HANDLER =====

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-like')) {
    e.preventDefault();
    e.target.classList.toggle('liked');
    
    // Update count
    const count = e.target.querySelector('.like-count');
    if (count) {
      let num = parseInt(count.textContent);
      count.textContent = e.target.classList.contains('liked') ? num + 1 : num - 1;
    }
  }
});

// ===== DELETE CONFIRMATION =====

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-delete')) {
    if (!confirm('Are you sure you want to delete this item?')) {
      e.preventDefault();
    }
  }
});

// ===== TABLE ROW HIGHLIGHT =====

document.querySelectorAll('.table tbody tr').forEach(row => {
  row.addEventListener('click', function() {
    document.querySelectorAll('.table tbody tr').forEach(r => r.classList.remove('row--selected'));
    this.classList.add('row--selected');
  });
});

// ===== COPY TO CLIPBOARD =====

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard: ' + text);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-copy')) {
    const text = e.target.getAttribute('data-copy');
    if (text) {
      copyToClipboard(text);
      e.target.textContent = 'Copied!';
      setTimeout(() => {
        e.target.textContent = 'Copy';
      }, 2000);
    }
  }
});

// ===== SCROLL TO TOP =====

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const scrollTopBtn = document.querySelector('[data-scroll-top]');
if (scrollTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', scrollToTop);
}

// ===== EXPORT DATA =====

function exportTableToCSV(tableId, filename = 'export.csv') {
  const table = document.getElementById(tableId);
  if (!table) return;

  let csv = [];
  const rows = table.querySelectorAll('tr');

  rows.forEach(row => {
    const cols = row.querySelectorAll('td, th');
    const csvRow = [];
    cols.forEach(col => {
      csvRow.push(col.textContent.trim());
    });
    csv.push(csvRow.join(','));
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv.join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', filename);
  link.click();
}

// ===== SEARCH FUNCTIONALITY =====

document.addEventListener('input', function(e) {
  if (e.target.classList.contains('search-input')) {
    const query = e.target.value.toLowerCase();
    const items = document.querySelectorAll('[data-searchable]');

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
});

// ===== SORT TABLE =====

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('sortable')) {
    e.preventDefault();
    const column = e.target.getAttribute('data-sort');
    if (column) {
      sortTable(column);
    }
  }
});

function sortTable(column) {
  const table = document.querySelector('.table');
  if (!table) return;

  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const aVal = a.querySelector(`[data-column="${column}"]`)?.textContent || '';
    const bVal = b.querySelector(`[data-column="${column}"]`)?.textContent || '';
    return aVal.localeCompare(bVal);
  });

  rows.forEach(row => tbody.appendChild(row));
}

// ===== NOTIFICATIONS =====

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    background: var(--color-${type});
    color: white;
    border-radius: 6px;
    box-shadow: var(--shadow-lg);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== FORMAT UTILITIES =====

function formatDate(date) {
  return new Date(date).toLocaleDateString('ru-RU');
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(amount);
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('ru-RU');
}
