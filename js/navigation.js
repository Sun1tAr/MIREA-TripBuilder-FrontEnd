document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (sidebar) {
        sidebar.classList.remove('active');
      }
    });
  });

  document.addEventListener('click', function(event) {
    if (hamburger && sidebar && !hamburger.contains(event.target) && !sidebar.contains(event.target)) {
      sidebar.classList.remove('active');
    }
  });
});

function setActiveNavItem() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    
    if (currentPath.includes(href.replace('.html', '')) || 
        (currentPath.endsWith('/') && href === 'index.html')) {
      item.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavItem);

document.addEventListener('DOMContentLoaded', function() {
  const userHeader = document.querySelector('.header-user');
  
  if (userHeader) {
    userHeader.addEventListener('click', function() {
      window.location.href = 'profile.html';
    });
    userHeader.style.cursor = 'pointer';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const toggles = document.querySelectorAll('.toggle-switch input');
  
  toggles.forEach(toggle => {
    const key = toggle.id;
    if (localStorage.getItem(key)) {
      toggle.checked = JSON.parse(localStorage.getItem(key));
    }
    
    toggle.addEventListener('change', function() {
      localStorage.setItem(key, JSON.stringify(this.checked));
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.header-search input');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const item = this.closest('.checklist-item');
      if (this.checked) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const oneDayToggle = document.getElementById('one-day-trip');
  
  if (oneDayToggle) {
    oneDayToggle.addEventListener('change', function() {
      const multiDay = document.getElementById('multi-day-dates');
      const oneDay = document.getElementById('one-day-inputs');
      
      if (this.checked) {
        multiDay.style.display = 'none';
        oneDay.style.display = 'grid';
      } else {
        multiDay.style.display = 'grid';
        oneDay.style.display = 'none';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const publicToggle = document.getElementById('public-route');
  
  if (publicToggle) {
    publicToggle.addEventListener('change', function() {
      const shareBtn = document.getElementById('share-btn');
      
      if (this.checked) {
        shareBtn.style.display = 'block';
      } else {
        shareBtn.style.display = 'none';
      }
    });
  }
});

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};
