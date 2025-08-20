/*
 * script.js
 *
 * This client‑side script reads the language code assigned on each
 * page (via the global LANG_CODE variable) and fetches the appropriate
 * JSON file from the assets/lang directory. Once the translation data is
 * loaded it populates the HTML placeholders. Using this method keeps
 * your markup clean and allows you to update all textual content from
 * a single JSON file per language. To add a new language, create a
 * corresponding JSON file in assets/lang and reference the new LANG_CODE
 * on your language’s index.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  const langCode = window.LANG_CODE || 'en';
  const translationPath = `/assets/lang/${langCode}.json`;

  fetch(translationPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Translation file not found: ${translationPath}`);
      }
      return response.json();
    })
    .then((data) => {
      // Set document title
      document.title = `${data.name} — ${data.roles}`;

      // Populate hero section
      const nameEl = document.getElementById('name');
      const subtitleEl = document.getElementById('subtitle');
      const rolesEl = document.getElementById('roles');
      const taglineEl = document.getElementById('tagline');
      if (nameEl) nameEl.textContent = data.name;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;
      if (rolesEl) rolesEl.textContent = data.roles;
      if (taglineEl) taglineEl.textContent = data.tagline;

      // Download CV button
      const downloadCVEl = document.getElementById('download-cv');
      if (downloadCVEl) {
        downloadCVEl.textContent = data.downloadCV;
        downloadCVEl.setAttribute('href', data.cv);
      }

      // LinkedIn button
      const linkedinBtnEl = document.getElementById('linkedin-btn');
      if (linkedinBtnEl) {
        linkedinBtnEl.textContent = data.linkedinButtonText;
        linkedinBtnEl.setAttribute('href', data.linkedin);
      }

      // About section
      const aboutTitleEl = document.getElementById('about-title');
      const aboutTextEl = document.getElementById('about-text');
      if (aboutTitleEl) aboutTitleEl.textContent = data.aboutTitle;
      if (aboutTextEl) aboutTextEl.innerHTML = data.aboutText;

      // Expertise section
      const expertiseTitleEl = document.getElementById('expertise-title');
      if (expertiseTitleEl) expertiseTitleEl.textContent = data.expertiseTitle;
      const expertiseContainer = document.getElementById('expertise-cards');
      if (expertiseContainer && Array.isArray(data.expertise)) {
        // Clear any existing cards
        expertiseContainer.innerHTML = '';
        data.expertise.forEach((group) => {
          const cardDiv = document.createElement('div');
          cardDiv.className = 'fin-card p-6';
          const h3 = document.createElement('h3');
          h3.className = 'text-xl font-semibold text-[#1d4ed8] mb-4';
          h3.textContent = group.title;
          cardDiv.appendChild(h3);
          const ul = document.createElement('ul');
          ul.className = 'list-disc pl-5 text-gray-700 leading-relaxed';
          group.items.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          cardDiv.appendChild(ul);
          expertiseContainer.appendChild(cardDiv);
        });
      }

      // Contact section
      const contactTitleEl = document.getElementById('contact-title');
      if (contactTitleEl) contactTitleEl.textContent = data.contactTitle;
      const emailLabelEl = document.getElementById('email-label');
      const emailLinkEl = document.getElementById('email-link');
      if (emailLabelEl) emailLabelEl.textContent = data.emailLabel;
      if (emailLinkEl) {
        emailLinkEl.textContent = data.email;
        emailLinkEl.setAttribute('href', `mailto:${data.email}`);
      }
      const linkedinLabelEl = document.getElementById('linkedin-label');
      const linkedinLinkEl = document.getElementById('linkedin-link');
      if (linkedinLabelEl) linkedinLabelEl.textContent = data.linkedinLabel;
      if (linkedinLinkEl) {
        linkedinLinkEl.textContent = data.linkedin;
        linkedinLinkEl.setAttribute('href', data.linkedin);
      }

      // Footer
      const footerTextEl = document.getElementById('footer-text');
      if (footerTextEl) footerTextEl.textContent = data.footer;
    })
    .catch((error) => {
      console.error('Error loading translations:', error);
    });
});