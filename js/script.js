/**
 * Muradul Islam Portfolio
 * Core JavaScript Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
      );
    }
  }

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Fixed Navbar & Scroll Effects
  // --------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (scrollY > 400) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Menu Toggle
  // --------------------------------------------------------------------------
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. ScrollSpy (Active Navigation Link on Scroll)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");
      const navItem = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        navItem?.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // --------------------------------------------------------------------------
  // 5. Typewriter Effect (Hero Section)
  // --------------------------------------------------------------------------
  const typedTextEl = document.getElementById("typed-text");
  const roles = [
    "Full-Stack Developer",
    "Frontend Architect",
    "React 19 & Next.js Expert",
    "MERN Stack Specialist",
    "UI/UX & Performance Engineer"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingDelay = 90;
  const erasingDelay = 45;
  const newRoleDelay = 1800;

  function typeRoleEffect() {
    if (!typedTextEl) return;
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRoleEffect, newRoleDelay);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeRoleEffect, 400);
    } else {
      setTimeout(typeRoleEffect, isDeleting ? erasingDelay : typingDelay);
    }
  }

  setTimeout(typeRoleEffect, 600);

  // --------------------------------------------------------------------------
  // 6. Interactive Resume Download with Fallback Alert
  // --------------------------------------------------------------------------
  const resumeDownloadBtns = document.querySelectorAll(".btn-download-resume");
  const resumeAlertModal = document.getElementById("resume-alert-modal");
  const closeAlertModalBtn = document.getElementById("close-alert-modal");

  function showAlertModal() {
    if (resumeAlertModal) {
      resumeAlertModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function hideAlertModal() {
    if (resumeAlertModal) {
      resumeAlertModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (closeAlertModalBtn) {
    closeAlertModalBtn.addEventListener("click", hideAlertModal);
  }

  if (resumeAlertModal) {
    resumeAlertModal.addEventListener("click", (e) => {
      if (e.target === resumeAlertModal) hideAlertModal();
    });
  }

  resumeDownloadBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const primaryUrl = "./assets/docs/resume.pdf";
      const fallbackUrl = "./assets/resume.pdf";

      try {
        // Attempt head check on primary URL
        let response = await fetch(primaryUrl, { method: "HEAD" });
        let targetDownloadUrl = primaryUrl;

        if (!response.ok) {
          response = await fetch(fallbackUrl, { method: "HEAD" });
          if (response.ok) targetDownloadUrl = fallbackUrl;
        }

        if (response.ok) {
          // Trigger file download
          const link = document.createElement("a");
          link.href = targetDownloadUrl;
          link.download = "Muradul_Islam_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showToast("Resume downloaded successfully!", "success");
        } else {
          showAlertModal();
        }
      } catch (err) {
        console.warn("Direct resume fetch failed, attempting trigger:", err);
        // If local file:// protocol limits HEAD requests, try anchor click or trigger modal
        const link = document.createElement("a");
        link.href = primaryUrl;
        link.download = "Muradul_Islam_Resume.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. Visual Skills Filter Tabs & Animated Progress Bars
  // --------------------------------------------------------------------------
  const skillTabBtns = document.querySelectorAll(".skill-tab-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  skillTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      skillTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterCategory = btn.getAttribute("data-category");

      skillCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (filterCategory === "all" || cardCat === filterCategory) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // Animate skill progress bars upon viewport intersection
  const skillProgressBars = document.querySelectorAll(".skill-progress-bar");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute("data-progress") || "80%";
          bar.style.width = targetWidth;
        }
      });
    },
    { threshold: 0.2 }
  );

  skillProgressBars.forEach((bar) => skillObserver.observe(bar));

  // --------------------------------------------------------------------------
  // 8. Projects Filter Tabs
  // --------------------------------------------------------------------------
  const projectTabBtns = document.querySelectorAll(".project-tab-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 9. Project Details Modal System
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById("project-modal");
  const closeProjectModalBtn = document.getElementById("close-project-modal");
  const viewDetailBtns = document.querySelectorAll(".btn-view-project");

  function openProjectModal(projectId) {
    if (typeof getProjectById !== "function") return;
    const project = getProjectById(projectId);
    if (!project) return;

    // Fill Modal Information
    document.getElementById("modal-img").src = project.image;
    document.getElementById("modal-img").alt = project.title;
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-subtitle").textContent = project.subtitle;
    document.getElementById("modal-overview").textContent = project.overview;
    document.getElementById("modal-problem").textContent = project.problemStatement;

    // Links
    const liveDemoBtn = document.getElementById("modal-live-link");
    const githubBtn = document.getElementById("modal-github-link");
    if (liveDemoBtn) liveDemoBtn.href = project.demoUrl;
    if (githubBtn) githubBtn.href = project.githubUrl;

    // Tech Stack Tags
    const tagsContainer = document.getElementById("modal-tech-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = project.tags
        .map((tag) => `<span class="badge">${tag}</span>`)
        .join("");
    }

    // Challenges List
    const challengesContainer = document.getElementById("modal-challenges");
    if (challengesContainer) {
      challengesContainer.innerHTML = project.challenges
        .map(
          (c) => `
          <div class="challenge-box">
            <h5 class="challenge-title">⚠️ Challenge: ${c.title}</h5>
            <p class="challenge-desc">${c.description}</p>
            <div class="solution-box">
              <strong>💡 Solution:</strong> ${c.solution}
            </div>
          </div>
        `
        )
        .join("");
    }

    // Roadmap List
    const roadmapContainer = document.getElementById("modal-roadmap");
    if (roadmapContainer) {
      roadmapContainer.innerHTML = project.roadmap
        .map((item) => `<div class="roadmap-item">${item}</div>`)
        .join("");
    }

    // Show Modal
    projectModal?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    projectModal?.classList.remove("active");
    document.body.style.overflow = "";
  }

  viewDetailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project-id");
      openProjectModal(projectId);
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener("click", closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      hideAlertModal();
    }
  });

  // --------------------------------------------------------------------------
  // 10. Contact Form & Interactive Features
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const subjectInput = document.getElementById("contact-subject");
  const topicPills = document.querySelectorAll(".topic-pill");

  topicPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      topicPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      if (subjectInput) {
        subjectInput.value = pill.getAttribute("data-topic") || "";
        subjectInput.focus();
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.innerHTML = `<span>Sending...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast("Message sent successfully! Muradul will reply shortly.", "success");
        contactForm.reset();
        topicPills.forEach((p) => p.classList.remove("active"));
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Copy to Clipboard buttons
  const copyBtns = document.querySelectorAll(".contact-copy-btn");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const copyVal = btn.getAttribute("data-copy");
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Copied to clipboard: ${copyVal}`, "success");
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 11. Toast Notifications Utility
  // --------------------------------------------------------------------------
  function showToast(message, type = "info") {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon = type === "success" ? "✅" : type === "warning" ? "⚠️" : "ℹ️";

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-msg">
        <h6>Notification</h6>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // 12. Dynamic Footer Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
