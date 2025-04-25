// Script per gestionar els vídeos amb accessibilitat
document.addEventListener('DOMContentLoaded', function() {
  // Gestió dels vídeos
  const videos = document.querySelectorAll('.video');

  videos.forEach(video => {
    // Assegurar que els vídeos siguin accessibles per teclat
    video.setAttribute('tabindex', '0');
    video.setAttribute('aria-label', 'Vídeo de cotxe clàssic');
    
    // Afegir atributs per a controls accessibles
    video.setAttribute('controls', 'true'); // Afegir controls natius
    video.setAttribute('preload', 'metadata'); // Carregar només les metadades inicialment
    
    // Missatges d'estat per a lectors de pantalla
    const videoStatus = document.createElement('span');
    videoStatus.className = 'visually-hidden';
    videoStatus.setAttribute('aria-live', 'polite');
    videoStatus.id = `video-status-${Math.random().toString(36).substring(2, 9)}`;
    video.parentNode.insertBefore(videoStatus, video.nextSibling);
    
    // Esdeveniments amb ratolí
    video.addEventListener('mouseover', () => {
      video.play();
      videoStatus.textContent = 'Vídeo en reproducció';
    });

    video.addEventListener('mouseout', () => {
      video.pause();
      video.currentTime = 0;
      videoStatus.textContent = 'Vídeo pausat';
    });

    // Esdeveniments amb teclat
    video.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (video.paused) {
          video.play();
          videoStatus.textContent = 'Vídeo en reproducció';
        } else {
          video.pause();
          videoStatus.textContent = 'Vídeo pausat';
        }
      }
    });

    // Esdeveniments per mostrar informació de l'estat del vídeo
    video.addEventListener('play', () => {
      videoStatus.textContent = 'Vídeo en reproducció';
    });

    video.addEventListener('pause', () => {
      videoStatus.textContent = 'Vídeo pausat';
    });
    
    video.addEventListener('ended', () => {
      videoStatus.textContent = 'Vídeo finalitzat';
      video.currentTime = 0;
    });
  });

  // Funció per gestionar formularis
  window.submitForm = function(formId) {
    const form = document.getElementById(formId);
    if (form) {
      form.submit();
    }
  };

  // Funció per enviar correus
  window.mailServlet = function(formId, endpoint) {
    const form = document.getElementById(formId);
    if (form) {
      // Implementa la lògica per enviar correus
      // Això és només un esquelet per gestionar la crida
      console.log('Enviant formulari a:', endpoint);
      // Aquí s'implementaria la lògica real per a l'enviament
    }
  };

  // Afegir estils per a elements d'accessibilitat
  if (!document.getElementById('accessibility-styles')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'accessibility-styles';
    styleTag.textContent = `
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
      .video:focus {
        outline: 3px solid #4a90e2;
        outline-offset: 2px;
      }
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px;
        z-index: 100;
      }
      .skip-link:focus {
        top: 0;
      }
    `;
    document.head.appendChild(styleTag);
  }
});