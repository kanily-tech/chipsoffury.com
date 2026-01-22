/**
 * Image Lightbox for Blog Posts
 * Handles click-to-expand functionality for images in .prose content
 */
(function() {
  'use strict';

  // Create modal element
  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <button class="image-modal-close" aria-label="Close image">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img src="" alt="" />
    `;
    document.body.appendChild(modal);
    return modal;
  }

  // Close modal
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open modal with image
  function openModal(modal, imgSrc, imgAlt) {
    const modalImg = modal.querySelector('img');
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Initialize lightbox
  function init() {
    const modal = createModal();
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.image-modal-close');

    // Find all images in .prose containers
    const proseImages = document.querySelectorAll('.prose img');

    proseImages.forEach(function(img) {
      img.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(modal, img.src, img.alt);
      });
    });

    // Close on close button click
    closeBtn.addEventListener('click', function() {
      closeModal(modal);
    });

    // Close on backdrop click (but not on image)
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal(modal);
      }
    });

    // Prevent closing when clicking on the image itself
    modalImg.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
