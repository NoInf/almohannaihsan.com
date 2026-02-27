const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
	navToggle.addEventListener('click', () => {
		const isOpen = siteNav.dataset.open === 'true';
		siteNav.dataset.open = (!isOpen).toString();
		navToggle.setAttribute('aria-expanded', (!isOpen).toString());
	});
}

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0 && 'IntersectionObserver' in globalThis) {
	const observer = new IntersectionObserver((entries, currentObserver) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				currentObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });

	revealElements.forEach((element) => observer.observe(element));
} else {
	revealElements.forEach((element) => element.classList.add('visible'));
}

const saudiTimeElement = document.getElementById('saudi-time');
const localTimeElement = document.getElementById('local-time');

if (saudiTimeElement && localTimeElement) {
	const saudiFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZone: 'Asia/Riyadh',
	});

	const localFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});

	const renderTimes = () => {
		const now = new Date();
		const saudiTime = saudiFormatter.format(now);
		const localTime = localFormatter.format(now);

		saudiTimeElement.innerHTML = `${saudiTime} <span>GMT+3</span>`;
		localTimeElement.innerHTML = `${localTime} <span>Local</span>`;
	};

	renderTimes();
	setInterval(renderTimes, 30000);
}

const messageModal = document.getElementById('message-dialog');
const openMessageModalButton = document.getElementById('open-message-modal');
const closeMessageModalButton = document.getElementById('close-message-modal');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageStatus = document.getElementById('message-status');
const messageTypeRadios = document.querySelectorAll('input[name="message-type"]');
const contactFields = document.getElementById('contact-fields');
const contactNameInput = document.getElementById('contact-name');
const contactEmailInput = document.getElementById('contact-email');
const messageStorageKey = 'portfolioMessage';

// Initialize EmailJS if available
if (globalThis.emailjs) {
  emailjs.init({
    publicKey: 'gNfPPcFc0ZFbhZW3P'
  });
}

// Ensure modal is closed on page load
if (messageModal) {
  messageModal.close();
}

if (messageModal && openMessageModalButton && closeMessageModalButton && messageForm && messageInput && messageStatus) {
  openMessageModalButton.addEventListener('click', () => {
    messageModal.showModal();
    messageInput.focus();
  });

  closeMessageModalButton.addEventListener('click', () => {
    messageModal.close();
    messageStatus.textContent = '';
  });

  messageModal.addEventListener('cancel', (event) => {
    event.preventDefault();
    messageModal.close();
    messageStatus.textContent = '';
  });

  // Toggle contact fields based on radio selection
  messageTypeRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      if (event.target.value === 'contact') {
        contactFields.style.display = 'flex';
        contactNameInput.focus();
      } else {
        contactFields.style.display = 'none';
      }
    });
  });

  // Load saved message from localStorage
  const savedMessage = localStorage.getItem(messageStorageKey);
  if (savedMessage) {
    messageInput.value = savedMessage;
  }

  messageInput.addEventListener('input', () => {
    const draft = messageInput.value.trim();
    if (draft) {
      localStorage.setItem(messageStorageKey, draft);
    } else {
      localStorage.removeItem(messageStorageKey);
    }
  });

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    const messageType = document.querySelector('input[name="message-type"]:checked').value;
    const name = contactNameInput.value.trim() || 'Anonymous';
    const email = contactEmailInput.value.trim() || '';

    if (!message) {
      messageStatus.textContent = 'Please write a message first.';
      messageStatus.style.color = '#f87171';
      messageInput.focus();
      return;
    }

    if (messageType === 'contact') {
      if (!name || name === 'Anonymous') {
        messageStatus.textContent = 'Please enter your name.';
        messageStatus.style.color = '#f87171';
        contactNameInput.focus();
        return;
      }
      if (!email) {
        messageStatus.textContent = 'Please enter your email.';
        messageStatus.style.color = '#f87171';
        contactEmailInput.focus();
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        messageStatus.textContent = 'Please enter a valid email address.';
        messageStatus.style.color = '#f87171';
        contactEmailInput.focus();
        return;
      }
    }

    const fullMessage = messageType === 'contact' 
      ? `${name} (${email}): ${message}`
      : `Anonymous: ${message}`;

    if (globalThis.emailjs) {
      messageStatus.textContent = 'Sending...';
      messageStatus.style.color = 'var(--text-secondary)';
      emailjs.send('service_portfolio', 'template_portfolio', {
        from_name: name,
        from_email: email,
        message: fullMessage
      }).then(() => {
        messageStatus.textContent = '✓ Message sent';
        messageStatus.style.color = '#4ade80';
        messageInput.value = '';
        contactNameInput.value = '';
        contactEmailInput.value = '';
        localStorage.removeItem(messageStorageKey);
      }).catch((error) => {
        console.error('EmailJS send failed:', error);
        messageStatus.textContent = 'Could not send right now. Please email me instead at main@almohannaihsan.com';
        messageStatus.style.color = '#f87171';
      });
    } else {
      messageStatus.textContent = 'Message service unavailable. Please email me instead at main@almohannaihsan.com';
      messageStatus.style.color = '#f87171';
    }
	});
}
