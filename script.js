/**
 * SREERAG SANKAR PS - PORTFOLIO INTERACTIVITY
 * Features:
 * - Interactive Leaf Lens AI Plant Disease Scanner Simulator
 * - Project Detail Modal with Architecture Breakdown
 * - Categorized Skills Filter
 * - Mobile Navigation Menu Toggle
 * - Contact Form Handler with Mailto & Toast Notification
 * - Scroll Spy for Active Navigation Links
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Menu Toggle
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

    // Close mobile menu when a nav link is clicked
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

  // Two test cases to simulate real-time model inference
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
      title: "Tomato Early Blight (Alternaria)",
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

    // UI feedback during scan
    if (scanBtn) {
      scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
      scanBtn.style.opacity = '0.75';
    }

    if (laser) {
      laser.classList.add('scanning');
    }

    if (resultTitle) {
      resultTitle.textContent = "Processing image tensor...";
    }
    if (resultDesc) {
      resultDesc.textContent = "FastAPI endpoint receiving payload • TensorFlow CNN inference running...";
    }
    if (resultStatus) {
      resultStatus.textContent = "ANALYZING";
      resultStatus.style.color = "#38bdf8";
    }
    if (resultConfidence) {
      resultConfidence.textContent = "TensorFlow v2.x";
      resultConfidence.style.color = "#38bdf8";
      resultConfidence.style.background = "rgba(56, 189, 248, 0.15)";
    }

    // Simulate FastAPI backend response latency
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
    }, 1400);
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

  // --------------------------------------------------------------------------
  // 3. Skills Filter Tabs
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
  // 4. Project Details Modal
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsData = {
    leaflens: {
      title: "Leaf Lens – AI Plant Disease Detection",
      badge: "Academic Project (2026 Jan – 2026 Mar)",
      tags: ["Flutter", "Dart", "FastAPI", "TensorFlow", "Git", "GitHub"],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.1rem; color: #38bdf8; margin-bottom: 0.6rem;">Project Overview</h4>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
            <strong>Leaf Lens</strong> is an intelligent, cross-platform mobile application engineered using <strong>Flutter and Dart</strong> to empower farmers and agricultural enthusiasts to detect tomato plant diseases early and accurately. It bridges client-side mobile convenience with a high-throughput <strong>FastAPI</strong> backend running a <strong>TensorFlow</strong> deep learning classification model.
          </p>
        </div>

        <div style="margin-bottom: 1.5rem; background: rgba(15, 23, 42, 0.8); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.15);">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-sitemap" style="color: #38bdf8;"></i> Technical Architecture & Workflow
          </h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; list-style: none; padding-left: 0;">
            <li style="margin-bottom: 0.6rem;"><strong>1. Mobile Client (Flutter/Dart):</strong> User captures or uploads a tomato leaf photograph. Includes client-side compression, responsive Material 3 layout, and asynchronous network state handling.</li>
            <li style="margin-bottom: 0.6rem;"><strong>2. Backend Service (FastAPI):</strong> High-performance Python asynchronous REST API that receives multipart image payloads, handles preprocessing/normalization, and manages model session caching.</li>
            <li style="margin-bottom: 0.6rem;"><strong>3. Machine Learning Inference (TensorFlow):</strong> Convolutional Neural Network (CNN) trained on multi-class leaf datasets, predicting disease categories with high accuracy.</li>
            <li><strong>4. Recommendation Engine:</strong> Returns tailored organic & chemical treatments along with preventive agricultural practices.</li>
          </ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.6rem;">Key Contributions & Outcomes</h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; padding-left: 1.2rem;">
            <li>Engineered an intuitive, responsive mobile UI adhering strictly to clean Flutter architecture.</li>
            <li>Configured seamless API communication with robust error handling and loading indicators.</li>
            <li>Integrated treatment recommendation algorithms for direct actionable guidance.</li>
            <li>Managed source control, versioning, and feature branching via Git & GitHub.</li>
          </ul>
        </div>
      `
    },
    ruralconnect: {
      title: "Rural Connect Website",
      badge: "Developer Mini Project (2025 – 2026)",
      tags: ["HTML5", "CSS3", "JavaScript", "SQLite"],
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.1rem; color: #38bdf8; margin-bottom: 0.6rem;">Project Overview</h4>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
            <strong>Rural Connect</strong> is a dedicated citizen-empowerment web portal crafted to bridge the communication gap between rural citizens and local governance authorities. The platform facilitates direct civic engagement, grievance redressal, and transparent public infrastructure tracking.
          </p>
        </div>

        <div style="margin-bottom: 1.5rem; background: rgba(15, 23, 42, 0.8); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.15);">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-layer-group" style="color: #38bdf8;"></i> Core Modules & Functionality
          </h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; list-style: none; padding-left: 0;">
            <li style="margin-bottom: 0.6rem;"><strong>• Complaint Submission & Ticket Tracking:</strong> Allows village residents to submit categorized civic complaints (water, roads, electricity) with unique tracking IDs.</li>
            <li style="margin-bottom: 0.6rem;"><strong>• Project Status Portal:</strong> Displays ongoing local development projects, timelines, and allocation status for public transparency.</li>
            <li style="margin-bottom: 0.6rem;"><strong>• Community Participation Modules:</strong> Enables residents to voice suggestions and participate in local governance decisions.</li>
            <li><strong>• Database Layer (SQLite):</strong> Lightweight, reliable relational database structure storing citizen tickets, department routing, and progress logs.</li>
          </ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.6rem;">Key Contributions</h4>
          <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; padding-left: 1.2rem;">
            <li>Developed clean, accessible frontend pages using semantic HTML5, modern CSS3 styling, and JavaScript validation.</li>
            <li>Implemented SQLite schema for structured storage of complaints and status updates.</li>
            <li>Fostered community awareness and administrative accountability through open progress metrics.</li>
          </ul>
        </div>
      `
    }
  };

  window.openProjectModal = function(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !modalOverlay || !modalBody) return;

    let tagsHtml = data.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 1rem;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 600; color: #38bdf8; background: rgba(56, 189, 248, 0.12); padding: 3px 10px; border-radius: 20px; display: inline-block; margin-bottom: 0.5rem;">${data.badge}</span>
          <h2 style="font-size: 1.6rem; font-weight: 700; color: #fff;">${data.title}</h2>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem;">
        ${tagsHtml}
      </div>
      <div class="modal-dynamic-content">
        ${data.content}
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 5. Contact Form Handler (Mailto & Toast)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotice');

  function showToast(message, isError = false) {
    if (!toast) return;
    toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}" style="color: ${isError ? '#ef4444' : '#10b981'}; font-size: 1.1rem;"></i> <span>${message}</span>`;
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
        showToast("Please fill in your name, email, and message.", true);
        return;
      }

      // Generate mailto link
      const encodedSubject = encodeURIComponent(subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] From ${name}`);
      const encodedBody = encodeURIComponent(`Hi Sreerag,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
      const mailtoUrl = `mailto:sreeragpssankar@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      // Open mail client
      window.location.href = mailtoUrl;

      showToast("Opening your email client to send message to Sreerag!");
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 6. Active Navigation Link on Scroll (ScrollSpy)
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
