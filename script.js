/**
 * SREERAG SANKAR PS - PORTFOLIO INTERACTIVITY & FUNCTIONALITY
 * Software Developer (Fresher) | Flutter & Python
 * 
 * Features:
 * 1. Mobile navigation menu toggle with smooth close on select
 * 2. Interactive Leaf Lens AI Plant Disease Scanner Simulator
 * 3. Categorized Skills Filter matching exact 5 Resume Groups
 * 4. Technical Project Modals (Leaf Lens & Rural Connect) with Architecture Breakdowns
 * 5. Digital Resume Viewer Modal with Print / Save PDF capabilities
 * 6. Contact Form validation and auto-dispatch via mailto
 * 7. Active ScrollSpy navigation indicator
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Menu Navigation Toggle
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu when any navigation link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Interactive Leaf Lens AI Simulator in Hero Mockup
  // --------------------------------------------------------------------------
  const scanBtn = document.getElementById('scanLeafBtn');
  const switchSampleBtn = document.getElementById('switchSampleBtn');
  const laser = document.getElementById('scanLaser');
  const leafSvg = document.getElementById('leafSvg');
  const resultStatus = document.getElementById('resultStatus');
  const resultConfidence = document.getElementById('resultConfidence');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const sampleLabel = document.getElementById('sampleLabel');

  const leafSamples = [
    {
      id: 1,
      name: "Sample 1: Tomato Leaf (Infected)",
      leafColor: "#84cc16",
      spotColor: "#78350f",
      hasSpots: true,
      status: "DISEASE DETECTED",
      statusColor: "#f59e0b",
      confidence: "96.4% AI Match",
      title: "Tomato Early Blight (Alternaria Solani)",
      desc: "Concentric ring spots identified on foliage. Recommended action: Apply copper-based fungicide; remove affected lower leaves to halt spore spread."
    },
    {
      id: 2,
      name: "Sample 2: Tomato Leaf (Healthy)",
      leafColor: "#22c55e",
      spotColor: "none",
      hasSpots: false,
      status: "HEALTHY CROP",
      statusColor: "#10b981",
      confidence: "98.9% AI Match",
      title: "Healthy Tomato Foliage",
      desc: "Vibrant chlorophyll levels and clean cellular structure. No fungal or bacterial pathogens detected. Continue current irrigation & soil care."
    }
  ];

  let currentSampleIndex = 0;
  let isScanning = false;

  function updateLeafVisual(sample) {
    if (!leafSvg) return;
    const leafBody = leafSvg.querySelector('#leafBody');
    const leafSpots = leafSvg.querySelectorAll('.blight-spot');

    if (leafBody) {
      leafBody.setAttribute('fill', sample.leafColor);
    }

    leafSpots.forEach(spot => {
      spot.style.display = sample.hasSpots ? 'block' : 'none';
      if (sample.hasSpots) {
        spot.setAttribute('fill', sample.spotColor);
      }
    });

    if (sampleLabel) {
      sampleLabel.textContent = sample.name;
    }
  }

  function triggerScan() {
    if (isScanning) return;
    isScanning = true;

    const sample = leafSamples[currentSampleIndex];

    if (scanBtn) {
      scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
      scanBtn.style.opacity = '0.75';
    }

    if (laser) {
      laser.classList.add('scanning');
    }

    if (resultTitle) {
      resultTitle.textContent = "Transmitting image payload...";
    }
    if (resultDesc) {
      resultDesc.textContent = "Asynchronous HTTP request active • Cloud AI Vision API running multi-class classification...";
    }
    if (resultStatus) {
      resultStatus.textContent = "CLASSIFYING";
      resultStatus.style.color = "#38bdf8";
    }
    if (resultConfidence) {
      resultConfidence.textContent = "Cloud Vision API";
      resultConfidence.style.color = "#38bdf8";
      resultConfidence.style.background = "rgba(56, 189, 248, 0.15)";
    }

    setTimeout(() => {
      if (laser) {
        laser.classList.remove('scanning');
      }

      if (resultStatus) {
        resultStatus.textContent = sample.status;
        resultStatus.style.color = sample.statusColor;
      }

      if (resultConfidence) {
        resultConfidence.textContent = sample.confidence;
        resultConfidence.style.color = sample.statusColor;
        resultConfidence.style.background = sample.statusColor === '#10b981' 
          ? "rgba(16, 185, 129, 0.15)" 
          : "rgba(245, 158, 11, 0.15)";
      }

      if (resultTitle) {
        resultTitle.textContent = sample.title;
      }

      if (resultDesc) {
        resultDesc.textContent = sample.desc;
      }

      if (scanBtn) {
        scanBtn.innerHTML = '<i class="fas fa-camera"></i> Scan Leaf';
        scanBtn.style.opacity = '1';
      }

      isScanning = false;
    }, 1200);
  }

  if (scanBtn) {
    scanBtn.addEventListener('click', triggerScan);
  }

  if (switchSampleBtn) {
    switchSampleBtn.addEventListener('click', () => {
      if (isScanning) return;
      currentSampleIndex = (currentSampleIndex + 1) % leafSamples.length;
      updateLeafVisual(leafSamples[currentSampleIndex]);
      triggerScan();
    });
  }

  // Global helper to jump to hero and launch simulator
  window.triggerSimulatorDemo = function(e) {
    if (e) e.preventDefault();
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        triggerScan();
      }, 700);
    }
  };

  // --------------------------------------------------------------------------
  // 3. Skills Filter Tabs (Exact 5 Resume Categories)
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. Project Details Modal (Leaf Lens & Rural Connect)
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsData = {
    leaflens: {
      title: "Leaf Lens — AI Plant Disease Detection Mobile App",
      badge: "Lead Developer | Flutter, Dart, REST APIs, Git (Jan 2026 – Mar 2026)",
      tags: ["Flutter", "Dart", "RESTful APIs", "Cloud AI Vision API", "Git", "GitHub"],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.1rem; color: #38bdf8; margin-bottom: 0.6rem;">Project Overview</h4>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
            <strong>Leaf Lens</strong> is a cross-platform mobile application engineered with <strong>Flutter and Dart</strong> that empowers agriculturalists and plant hobbyists to rapidly diagnose plant diseases by capturing or uploading leaf photographs via camera and device gallery.
          </p>
        </div>

        <div style="margin-bottom: 1.5rem; background: rgba(15, 23, 42, 0.85); padding: 1.25rem; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-sitemap" style="color: #38bdf8;"></i> Technical Architecture &amp; Key Implementations
          </h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.65; list-style: none; padding-left: 0;">
            <li style="margin-bottom: 0.7rem;">
              <strong style="color: #f1f5f9;">1. Cross-Platform Flutter Client:</strong> Developed a smooth, responsive UI adhering to Material 3 principles, supporting both camera capture and photo gallery selection with runtime permission handshakes.
            </li>
            <li style="margin-bottom: 0.7rem;">
              <strong style="color: #f1f5f9;">2. Cloud-Based AI Vision API Integration:</strong> Integrated cloud vision APIs to perform real-time image analysis, multi-class disease classification, and instant confidence scoring.
            </li>
            <li style="margin-bottom: 0.7rem;">
              <strong style="color: #f1f5f9;">3. Asynchronous HTTP &amp; JSON Parsing:</strong> Engineered robust asynchronous HTTP request pipelines with resilient error states, progress spinners, and accurate JSON payload deserialization.
            </li>
            <li>
              <strong style="color: #f1f5f9;">4. Local Credential Storage &amp; Security:</strong> Implemented safe on-device storage of API tokens and configuration settings for offline resilience and secure endpoint communication.
            </li>
          </ul>
        </div>

        <div style="margin-bottom: 1.2rem;">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.6rem;">Key Engineering Achievements</h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; padding-left: 1.2rem;">
            <li>Executed the project as <strong>Lead Developer</strong> from conceptualization to functional mobile deployment.</li>
            <li>Eliminated UI freezes during image compression and payload uploads using Dart asynchronous isolates/futures.</li>
            <li>Integrated actionable agricultural remedies and preventive guidance mapped to diagnostic outcomes.</li>
            <li>Structured collaborative version control and feature milestones using Git and GitHub.</li>
          </ul>
        </div>
      `
    },
    ruralconnect: {
      title: "Rural Connect Web Platform",
      badge: "UI Developer | 5-Member Team (Jun 2025 – Sep 2025)",
      tags: ["HTML", "JavaScript", "Tailwind CSS", "Git", "Cross-Browser UI"],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.1rem; color: #38bdf8; margin-bottom: 0.6rem;">Project Overview</h4>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
            <strong>Rural Connect</strong> is a dedicated civic-engagement web portal developed to empower rural citizens to file infrastructure and municipal grievances digitally and track cross-departmental resolution progress with complete transparency.
          </p>
        </div>

        <div style="margin-bottom: 1.5rem; background: rgba(15, 23, 42, 0.85); padding: 1.25rem; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.2);">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-users-gear" style="color: #38bdf8;"></i> Role, Team Dynamics &amp; Implementation
          </h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.65; list-style: none; padding-left: 0;">
            <li style="margin-bottom: 0.7rem;">
              <strong style="color: #f1f5f9;">• UI Developer Role:</strong> Spearheaded the frontend visual architecture and UI implementation across all portal pages within a collaborative 5-member agile team.
            </li>
            <li style="margin-bottom: 0.7rem;">
              <strong style="color: #f1f5f9;">• Responsive Tailwind CSS Layouts:</strong> Crafted modular, mobile-first responsive components that eradicated cross-browser rendering discrepancies across Chrome, Edge, Safari, and Firefox.
            </li>
            <li style="margin-bottom: 0.7rem;">
              <strong style="color: #f1f5f9;">• Citizen Complaint &amp; Tracking Portal:</strong> Designed interactive complaint filing forms, ticket lookup dashboards, and department progress visualizers.
            </li>
            <li>
              <strong style="color: #f1f5f9;">• Collaborative Integration:</strong> Seamlessly interfaced frontend views with backend endpoints and database schemas built by team peers.
            </li>
          </ul>
        </div>

        <div style="margin-bottom: 1.2rem;">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.6rem;">Core Competencies Demonstrated</h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; padding-left: 1.2rem;">
            <li>Modern utility-first CSS authoring with Tailwind CSS for rapid and uniform UI iteration.</li>
            <li>Cross-browser accessibility and device responsiveness testing.</li>
            <li>Team collaboration, Git branch workflows, pull request reviews, and agile sprint alignment.</li>
          </ul>
        </div>
      `
    }
  };

  window.openProjectModal = function(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !projectModal || !modalBody) return;

    const tagsHtml = data.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span style="font-size: 0.8rem; font-weight: 600; color: #38bdf8; background: rgba(56, 189, 248, 0.12); padding: 4px 12px; border-radius: 20px; display: inline-block; margin-bottom: 0.6rem; border: 1px solid rgba(56, 189, 248, 0.25);">${data.badge}</span>
        <h2 style="font-size: 1.55rem; font-weight: 700; color: #fff; line-height: 1.3;">${data.title}</h2>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem;">
        ${tagsHtml}
      </div>
      <div class="modal-dynamic-content">
        ${data.content}
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Digital Resume Viewer Modal (Interactive & Printable)
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resumeModal');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');

  window.openResumeModal = function() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeResumeModal = function() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', window.closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        window.closeResumeModal();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
      if (resumeModal && resumeModal.classList.contains('active')) {
        window.closeResumeModal();
      }
    }
  });

  // --------------------------------------------------------------------------
  // 6. Contact Form Dispatcher & Toast
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotice');

  function showToast(message, isError = false) {
    if (!toast) return;
    toast.innerHTML = `<i class="fas ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}" style="color: ${isError ? '#ef4444' : '#10b981'}; font-size: 1.15rem;"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('msgSubject').value.trim();
      const message = document.getElementById('msgBody').value.trim();

      if (!name || !email || !message) {
        showToast("Please provide your name, email, and message.", true);
        return;
      }

      const encodedSubject = encodeURIComponent(subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] Message from ${name}`);
      const encodedBody = encodeURIComponent(`Hello Sreerag,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}\nSent via Developer Portfolio`);
      const mailtoUrl = `mailto:sreeragpssankar@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      // Trigger mailto link
      window.location.href = mailtoUrl;

      showToast("Redirecting to your email client to dispatch message to Sreerag!");
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 7. Active ScrollSpy Indicator
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
});
