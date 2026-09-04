(function(){
  "use strict";

  var sections = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var tabnav = document.getElementById("tabnav");
  var pills = Array.prototype.slice.call(document.querySelectorAll(".pill"));
  var jumpButtons = Array.prototype.slice.call(document.querySelectorAll("[data-target]"));

  function scrollToSection(id){
    var el = document.getElementById(id);
    if(el){ el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  }

  jumpButtons.forEach(function(btn){
    btn.addEventListener("click", function(){
      var target = btn.getAttribute("data-target");
      scrollToSection(target);
    });
  });

  function setActivePill(id){
    pills.forEach(function(p){
      p.classList.toggle("is-active", p.getAttribute("data-target") === id);
    });
  }

  // Show tab nav once user scrolls past hero; track active section
  if("IntersectionObserver" in window){
    var navObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.target.id === "hero"){
          tabnav.classList.toggle("is-visible", !entry.isIntersecting);
        }
      });
    }, { threshold: 0.35 });

    var heroEl = document.getElementById("hero");
    if(heroEl){ navObserver.observe(heroEl); }

    var sectionObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && entry.target.id !== "hero"){
          setActivePill(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(function(s){
      if(s.id !== "hero"){ sectionObserver.observe(s); }
    });

    // scroll reveal
    var legacyTargets = document.querySelectorAll(
      ".tile, .contact__left, .contact__right"
    );
    legacyTargets.forEach(function(el){ el.classList.add("reveal"); });

    var allReveals = document.querySelectorAll(".reveal");

    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-in");
        } else {
          entry.target.classList.remove("is-in"); // Remove class so it re-animates
        }
      });
    }, { threshold: 0.15 });

    allReveals.forEach(function(el){ revealObserver.observe(el); });
  } else {
    tabnav.classList.add("is-visible");
  }

  // subtle parallax on hero red panel — restrained, disabled if reduced motion
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var panel = document.querySelector(".hero__panel");
  if(panel && !prefersReduced){
    window.addEventListener("scroll", function(){
      var y = window.scrollY;
      if(y < window.innerHeight){
        panel.style.transform = "rotate(-2deg) translateY(" + (y * 0.15) + "px)";
      }
    }, { passive: true });
  }

  // ==========================================
  // GSAP HERO CINEMATIC INTRO
  // ==========================================
  // ==========================================
  // GSAP HERO CINEMATIC INTRO
  // ==========================================
  if (typeof gsap !== 'undefined') {
    if (!prefersReduced) {
      
      // Initial state: hide everything
      gsap.set([".h-let", ".hero-year-wrap", ".h-ui-item", ".h-char-video", ".h-char-final"], { opacity: 0 });
      gsap.set(".hero-year-wrap", { x: 20 });
      gsap.set(".h-ui-item", { y: 15 });
      
      // Position the video canvas (no longer translating horizontally)
      gsap.set([".h-char-video", ".h-char-final"], { x: 0 });

      var walkVid = document.getElementById('walk-vid');
      var hasTransitioned = false;

      // --------------------------------------------------
      // TIMELINE 1: ENTRANCE CHOREOGRAPHY
      // --------------------------------------------------
      var entranceTl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });

      entranceTl.to(".h-char-video", { opacity: 1 }, 0.0);

      // --------------------------------------------------
      // TYPOGRAPHY CONSTRUCTION (Simultaneous with walk)
      // --------------------------------------------------
      entranceTl.fromTo(".h-let-1", { x: -80, y: -40, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.0);
      entranceTl.fromTo(".h-let-2", { x: 0, y: -80, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.1);
      entranceTl.fromTo(".h-let-3", { x: 80, y: -40, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.2);
      entranceTl.fromTo(".h-let-4", { x: -40, y: 80, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.3);
      entranceTl.fromTo(".h-let-5", { x: 40, y: 80, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.4);
      entranceTl.fromTo(".h-let-6", { x: -80, y: 0, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.5);
      entranceTl.fromTo(".h-let-7", { x: 80, y: 80, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.6);
      entranceTl.fromTo(".h-let-8", { x: -40, y: -80, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.7);
      entranceTl.fromTo(".h-let-9", { x: 40, y: -80, opacity: 0, scale: 0.8 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.2 }, 1.8);
      
      // --------------------------------------------------
      // TIMELINE 2: DYNAMIC ARRIVAL & FINAL POSTER
      // --------------------------------------------------
      var transitionTl = gsap.timeline({ defaults: { ease: "power2.out" }, paused: true });
      
      // Extremely quick, seamless crossfade from video to final pose
      transitionTl.to(".h-char-final", { opacity: 1, duration: 0.2 }, 0.0);
      transitionTl.to(".h-char-video", { 
        opacity: 0, 
        rotation: -2,      // Lean slightly backward
        scale: 0.97,       // Shrink slightly to simulate leaning away
        x: -5,             // Nudge slightly left to match leaning axis
        duration: 0.2 
      }, 0.0);
      
      // UI Reveals
      transitionTl.to(".hero__designation", { opacity: 1, y: 0, duration: 0.8 }, 0.5);
      transitionTl.to(".hero-year-wrap", { opacity: 1, x: 0, duration: 0.8 }, 0.8);
      transitionTl.to(".hero__menu-item", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, 1.0);
      
      // Completely pause video at the end to save resources and ensure static layout
      transitionTl.call(function() {
        if (walkVid) walkVid.pause();
      }, null, 1.0);

      // --------------------------------------------------
      // SYNCHRONIZED EXECUTION (WITH PRELOADER)
      // --------------------------------------------------
      if (walkVid) {
        walkVid.playbackRate = 1.0; // Restored to 1.0x native speed
        walkVid.volume = 0.8; // Set reasonable volume

        function startHeroIntro() {
          let playPromise = walkVid.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Audio autoplay blocked by browser, falling back to muted playback.", error);
              walkVid.muted = true;
              walkVid.play();
            });
          }
          entranceTl.play();
        }

        // Preloader Timeline
        var preloaderTl = gsap.timeline({
          paused: true,
          onComplete: startHeroIntro
        });

        preloaderTl.to(".preloader__fill", { height: "100%", duration: 1.2, ease: "power2.inOut", delay: 0.2 })
                   .to(".preloader__logo", { scale: 60, opacity: 0, duration: 0.8, ease: "power4.in" })
                   .set(".preloader", { display: "none" });

        // Wait for video to be ready before starting preloader fill
        if (walkVid.readyState >= 3) {
           preloaderTl.play();
        } else {
           walkVid.addEventListener('canplaythrough', function() {
              preloaderTl.play();
           }, { once: true });
           
           // Failsafe timeout
           setTimeout(function() { preloaderTl.play(); }, 2500);
        }

        // Dynamically trigger the transition precisely at 5.0 seconds
        walkVid.addEventListener('timeupdate', function() {
          if (!hasTransitioned && walkVid.currentTime >= 5.0) {
            hasTransitioned = true;
            transitionTl.play();
          }
        });

        // Failsafe backup
        walkVid.addEventListener('ended', function() {
          if (!hasTransitioned) {
            hasTransitioned = true;
            transitionTl.play();
          }
        });
      } else {
        // Failsafe if video is missing entirely
        entranceTl.play();
        setTimeout(function() { transitionTl.play(); }, 4000);
      }
    }

    // ==========================================
    // GSAP SKILLS (HUD MATRIX)
    // ==========================================
    if (typeof ScrollTrigger !== 'undefined') {
      
      var skillsTl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 75%",
          onEnter: function() { skillsTl.restart(); },
          onLeaveBack: function() { skillsTl.pause(0); }
        }
      });

      // Initial setup for reveals ONLY in the skills section
      gsap.set("#skills .reveal", { opacity: 0 });
      gsap.set("#skills .reveal-top", { y: -30 });
      gsap.set("#skills .reveal-bottom", { y: 30 });
      gsap.set("#skills .reveal-left", { x: -30 });
      gsap.set("#skills .reveal-right", { x: 30 });
      
      // Staggered entrance for panels
      skillsTl.to("#skills .reveal", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Animate progress bars from 0 to their inline widths
      skillsTl.from(".hud-progress-fill", {
        width: "0%",
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.05
      }, "-=0.8");
      
      // Stats Counter Timeline
      var counters = document.querySelectorAll('.counter');
      gsap.set(counters, { opacity: 0, scale: 0.9, textShadow: "0 0 0px rgba(199, 36, 60, 0)" });
      
      var statsTl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: ".hud-stats-grid",
          start: "top 85%",
          onEnter: function() { statsTl.restart(); },
          onLeaveBack: function() { 
            statsTl.pause(0);
            counters.forEach(function(c) { c.innerHTML = "0"; });
          }
        }
      });

      counters.forEach(function(counter, index) {
        var target = +counter.getAttribute('data-target');
        var hasPlus = counter.getAttribute('data-plus') === 'true';
        var obj = { val: 0 };
        
        // Fade in & scale up
        statsTl.to(counter, {
          opacity: 1,
          scale: 1.08,
          textShadow: "0 0 15px rgba(199, 36, 60, 0.4)",
          duration: 0.4,
          ease: "power2.out"
        }, index * 0.15);
        
        // Count up smoothly
        statsTl.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: function() {
            counter.innerHTML = Math.round(obj.val) + (hasPlus ? "+" : "");
          }
        }, index * 0.15);
        
        // Pulse at end
        statsTl.to(counter, {
          scale: 1.1,
          textShadow: "0 0 25px rgba(199, 36, 60, 0.8)",
          duration: 0.15,
          ease: "power2.out"
        }, (index * 0.15) + 1.8)
        .to(counter, {
          scale: 1,
          textShadow: "0 0 10px rgba(199, 36, 60, 0.2)",
          duration: 0.4,
          ease: "power2.inOut"
        });
      });
    }

    // ==========================================
    // GSAP ARCHIVE / CERTIFICATES
    // ==========================================
    if (typeof ScrollTrigger !== 'undefined') {
      // 1. Entrance animation (opacity-only so CSS 3D transforms are untouched)
      gsap.fromTo(".cert-frame", 
        { opacity: 0 }, 
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#archive",
            start: "top 60%",
          }
        }
      );
      
      gsap.fromTo(".gallery-character", 
        { opacity: 0, y: 50, xPercent: -50 }, 
        {
          opacity: 1,
          y: 0,
          xPercent: -50,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#archive",
            start: "top 40%",
          }
        }
      );

      // 2. Interactive Infinite Carousel
      var galleryWall = document.querySelector('.gallery-wall');
      var currentRotation = 0;
      var targetRotation = 0;
      var isDragging = false;
      var startX = 0;
      var selectedCert = null;
      var currentTz = -600;

      function updateGalleryZ() {
        if (window.innerWidth <= 480) currentTz = -260;
        else if (window.innerWidth <= 768) currentTz = -360;
        else if (window.innerWidth <= 1024) currentTz = -460;
        else currentTz = -580;
      }
      updateGalleryZ();
      window.addEventListener('resize', updateGalleryZ);
      
      // Update loop for smooth rotation
      var lastRotation = null;
      var lastTz = null;
      
      function updateRotation() {
        var diff = targetRotation - currentRotation;
        
        // Snap to target if very close to stop micro-calculations
        if (Math.abs(diff) > 0.01) {
          currentRotation += diff * 0.1;
        } else {
          currentRotation = targetRotation;
        }

        // Only trigger layout/paint if values actually changed
        if (galleryWall && (currentRotation !== lastRotation || currentTz !== lastTz)) {
          galleryWall.style.transform = 'translateZ(' + currentTz + 'px) rotateY(' + currentRotation + 'deg)';
          lastRotation = currentRotation;
          lastTz = currentTz;
        }
        
        requestAnimationFrame(updateRotation);
      }
      requestAnimationFrame(updateRotation);
      
      // Mouse Wheel Scroll
      var archiveSection = document.getElementById('archive');
      if (archiveSection) {
        archiveSection.addEventListener('wheel', function(e) {
          if (selectedCert) return;
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            targetRotation -= e.deltaX * 0.1;
            e.preventDefault();
          }
        }, { passive: false });
        
        // Drag logic
        var galleryContainer = document.querySelector('.archive-gallery-container');
        if (galleryContainer) {
          galleryContainer.addEventListener('mousedown', function(e) {
            if (selectedCert) return;
            isDragging = true;
            startX = e.clientX;
            galleryContainer.style.cursor = 'grabbing';
          });
          
          window.addEventListener('mouseup', function() {
            isDragging = false;
            if (galleryContainer) galleryContainer.style.cursor = 'default';
          });
          
          window.addEventListener('mousemove', function(e) {
            if (!isDragging || selectedCert) return;
            var deltaX = e.clientX - startX;
            targetRotation += deltaX * 0.2;
            startX = e.clientX;
          });

          // Touch support
          var touchStartX = 0;
          galleryContainer.addEventListener('touchstart', function(e) {
            if (selectedCert) return;
            touchStartX = e.touches[0].clientX;
          }, { passive: true });

          galleryContainer.addEventListener('touchmove', function(e) {
            if (selectedCert) return;
            var touchX = e.touches[0].clientX;
            var deltaX = touchX - touchStartX;
            targetRotation += deltaX * 0.25;
            touchStartX = touchX;
          }, { passive: true });
        }
      }

      // 3. Navigation & Indicators
      var certs = document.querySelectorAll('.cert-frame');
      var overlay = document.querySelector('.cert-overlay');
      var closeBtn = document.querySelector('.cert-close');
      
      var btnPrev = document.querySelector('.gallery-nav-prev');
      var btnNext = document.querySelector('.gallery-nav-next');
      var indicatorsContainer = document.querySelector('.gallery-indicators');
      var activeIndex = 0;
      var total = certs.length;
      var step = total > 0 ? 360 / total : 45;

      // Build indicators
      if (indicatorsContainer) {
        for (var i = 0; i < total; i++) {
          var dot = document.createElement('div');
          dot.className = 'gallery-indicator' + (i === 0 ? ' is-active' : '');
          dot.dataset.index = i;
          indicatorsContainer.appendChild(dot);

          dot.addEventListener('click', function(e) {
            var idx = parseInt(this.dataset.index);
            activeIndex = idx;
            targetRotation = -(idx * step);
            updateIndicators();
          });
        }
      }

      function updateIndicators() {
        var dots = document.querySelectorAll('.gallery-indicator');
        dots.forEach(function(dot, idx) {
          if (idx === activeIndex) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      }

      function rotateToIndex(idx) {
        if (idx < 0) idx = total - 1;
        if (idx >= total) idx = 0;
        activeIndex = idx;
        targetRotation = -(activeIndex * step);
        updateIndicators();
      }

      if (btnPrev) {
        btnPrev.addEventListener('click', function() {
          rotateToIndex(activeIndex - 1);
        });
      }
      if (btnNext) {
        btnNext.addEventListener('click', function() {
          rotateToIndex(activeIndex + 1);
        });
      }

      // Update active index based on drag/scroll rotation
      function snapToNearest() {
        var normalizedRot = -targetRotation % 360;
        if (normalizedRot < 0) normalizedRot += 360;
        var nearestIdx = Math.round(normalizedRot / step) % total;
        activeIndex = nearestIdx;
        updateIndicators();
      }

      if (archiveSection) {
        archiveSection.addEventListener('wheel', function(e) {
          if (selectedCert) return;
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            // After wheel, update nearest index for indicators
            clearTimeout(window.wheelTimeout);
            window.wheelTimeout = setTimeout(snapToNearest, 150);
          }
        }, { passive: false });
        
        if (galleryContainer) {
          window.addEventListener('mouseup', function() {
            if (isDragging) {
               isDragging = false;
               if (galleryContainer) galleryContainer.style.cursor = 'default';
               snapToNearest();
            }
          });

          galleryContainer.addEventListener('touchend', function(e) {
            if (selectedCert) return;
            snapToNearest();
          }, { passive: true });
        }
      }

      // 4. Click Interactions (Lightbox)
      var lbImg = document.querySelector('.lightbox-img');
      var lbTitle = document.getElementById('lb-title');
      var lbIssuer = document.getElementById('lb-issuer');
      var lbSkills = document.getElementById('lb-skills');
      var lbPdf = document.getElementById('lb-pdf');
      var lbDl = document.getElementById('lb-dl');
      var lbCounter = document.getElementById('lb-counter');
      var lbPrev = document.querySelector('.lb-nav-prev');
      var lbNext = document.querySelector('.lb-nav-next');

      function openLightbox(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        
        var cert = certs[index];
        
        if (selectedCert === cert) {
          closeCert();
          return;
        }
        
        if (selectedCert) {
          selectedCert.classList.remove('is-selected');
        }
        
        selectedCert = cert;
        activeIndex = index;
        
        // Auto-rotate the wall to center this certificate
        targetRotation = -parseInt(cert.dataset.angle);
        updateIndicators();
        
        // Dim others
        certs.forEach(function(c) {
          if (c !== selectedCert) {
            c.classList.add('is-dimmed');
          } else {
            c.classList.remove('is-dimmed');
          }
        });
        
        // Select this one
        selectedCert.classList.add('is-selected');

        // Populate Lightbox
        if (lbImg) lbImg.src = cert.dataset.img;
        if (lbTitle) lbTitle.textContent = cert.dataset.title;
        if (lbIssuer) lbIssuer.textContent = cert.dataset.issuer;
        if (lbSkills) lbSkills.textContent = cert.dataset.skills;
        if (lbPdf) lbPdf.href = cert.dataset.pdf;
        if (lbDl) lbDl.href = cert.dataset.pdf; // Download also uses pdf
        if (lbCounter) lbCounter.textContent = (index + 1) + ' / ' + total;
        
        // Show overlay
        if (overlay) overlay.classList.add('is-active');
      }

      certs.forEach(function(cert, index) {
        var angle = index * step;
        cert.dataset.angle = angle;
        cert.style.setProperty('--rotY', angle + 'deg');
        
        cert.addEventListener('click', function(e) {
          e.stopPropagation();
          openLightbox(index);
        });
      });

      if (lbPrev) {
        lbPrev.addEventListener('click', function(e) {
          e.stopPropagation();
          openLightbox(activeIndex - 1);
        });
      }

      if (lbNext) {
        lbNext.addEventListener('click', function(e) {
          e.stopPropagation();
          openLightbox(activeIndex + 1);
        });
      }

      function closeCert() {
        if (!selectedCert) return;
        
        // Remove classes
        selectedCert.classList.remove('is-selected');
        certs.forEach(function(c) {
          c.classList.remove('is-dimmed');
        });
        
        // Hide overlay
        if (overlay) overlay.classList.remove('is-active');
        
        selectedCert = null;
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          closeCert();
        });
      }

      if (overlay) {
        overlay.addEventListener('click', function(e) {
          // Only close if clicking outside the lightbox content and nav arrows
          if(e.target === overlay || e.target.classList.contains('cert-zoom-container')) {
            closeCert();
          }
        });
      }
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && selectedCert) {
          closeCert();
        }
        
        if (e.key === 'ArrowRight') {
          if (selectedCert) {
             openLightbox(activeIndex + 1);
          } else {
             rotateToIndex(activeIndex + 1);
          }
        } else if (e.key === 'ArrowLeft') {
          if (selectedCert) {
             openLightbox(activeIndex - 1);
          } else {
             rotateToIndex(activeIndex - 1);
          }
        }
      });
    }

    // ==========================================
    // GSAP FINALE ANIMATION
    // ==========================================
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

    // Initial states for non-GSAP elements are handled by CSS, but we can set them here to be safe
    gsap.set(".gs-fade", { opacity: 0, y: 20 });
    gsap.set(".gs-scale", { scale: 0.9, opacity: 0 });
    gsap.set(".gs-slide-up", { y: 60, opacity: 0 });
    gsap.set(".gs-slide-left", { x: 100, opacity: 0 });
    
    // Create the timeline
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%", // Trigger when top of contact hits 75% down viewport
        toggleActions: "play reverse play reverse" // Re-trigger on scroll back
      }
    });

    // 1. Fade in heading and name
    tl.to(".gs-fade", { opacity: 1, y: 0, duration: 1.2, stagger: 0.4, ease: "power2.out" })
      // 2. Scale in portrait
      .to(".gs-scale", { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.2)" }, "-=0.6")
      
      // 3. Radial pop out of socials
      .to(".finale-social-1", { x: 110, y: -110, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }, "-=0.2")
      .to(".finale-social-2", { x: 150, y: -40, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }, "-=0.8")
      .to(".finale-social-3", { x: 150, y: 40, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }, "-=0.8")
      .to(".finale-social-4", { x: 110, y: 110, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }, "-=0.8")
      
      // 4. Fade in the social text
      .to(".social-text", { opacity: 1, x: 10, duration: 0.8, stagger: 0.2 }, "-=0.4")
      
      // 5. Slide in THANK YOU from the right
      .to(".gs-slide-left", { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1.5")
      
      // 6. Slide up the projects
      .to(".gs-slide-up", { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1.0");
    }
    // ==========================================
    // GSAP PROJECTS ANIMATIONS
    // ==========================================
    if (typeof ScrollTrigger !== 'undefined') {
      // 1. Custom Cursor Logic
      var cursor = document.getElementById("custom-cursor");
      var projectsSection = document.getElementById("projects");
      
      if (cursor && projectsSection) {
        document.addEventListener("mousemove", function(e) {
          cursor.style.left = e.clientX + "px";
          cursor.style.top = e.clientY + "px";
        });
        
        projectsSection.addEventListener("mouseenter", function() {
          cursor.classList.add("active");
        });
        
        projectsSection.addEventListener("mouseleave", function() {
          cursor.classList.remove("active");
        });

        document.querySelectorAll('.demo-link').forEach(function(link) {
          link.addEventListener('mouseenter', function() {
            cursor.classList.remove('active');
          });
          link.addEventListener('mouseleave', function() {
            cursor.classList.add('active');
          });
        });
      }

      // 2. Staggered Entrance
      gsap.set(".tile", { y: 50, opacity: 0 });
      gsap.to(".tile", {
        scrollTrigger: {
          trigger: "#collage",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      // 3. Vertical Parallax
      gsap.utils.toArray(".tile").forEach(function(tile, i) {
        var speed = (i % 3 === 0) ? -40 : (i % 2 === 0) ? -20 : -60;
        gsap.to(tile, {
          scrollTrigger: {
            trigger: "#collage",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          },
          y: speed,
          ease: "none"
        });
      });
    }

    // ============ PROJECTS LIGHTBOX ============
    var projectTiles = document.querySelectorAll('.tile[data-project]');
    var projectOverlay = document.getElementById('project-overlay');
    if (projectOverlay) {
      var projCloseBtn = projectOverlay.querySelector('#proj-close');
      if (projCloseBtn) {
        projCloseBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          projectOverlay.classList.remove('is-active');
        });
      }
      
      projectOverlay.addEventListener('click', function(e) {
        if(e.target === projectOverlay) {
          projectOverlay.classList.remove('is-active');
        }
      });
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectOverlay.classList.contains('is-active')) {
          projectOverlay.classList.remove('is-active');
        }
      });

      var projectData = {
        'salesmachine': `
          <div class="markdown-body">
            <h3 style="margin-top:0;">Autonomous AI Sales Machine</h3>
            <p>An autonomous email pipeline built on n8n that processes inbound leads, scores them, and generates hyper-personalized email replies using LLMs. It monitors the inbox, handles 2-day follow-ups, and surfaces live metrics via an Executive Dashboard.</p>
            <h3>Core Tech Stack</h3>
            <ul>
              <li><strong>Orchestration:</strong> n8n</li>
              <li><strong>AI Engine:</strong> OpenAI API / Claude</li>
              <li><strong>Data / Logic:</strong> REST APIs, Webhooks</li>
            </ul>
            <div style="margin-top: 40px; display: flex; gap: 15px; flex-wrap: wrap;">
              <a href="https://github.com/ehtishamazing/N8N-Automations/tree/main/Autonomous%20Sales%20Machine" target="_blank" style="font-family: var(--font-head); letter-spacing: 0.1em; font-size: 14px; border: 1px solid var(--hud-cyan); padding: 12px 24px; border-radius: 4px; border-bottom: 1px solid var(--hud-cyan);">GITHUB REPOSITORY</a>
              <a href="https://www.youtube.com/watch?v=0h5G29o0Jv8" target="_blank" style="font-family: var(--font-head); letter-spacing: 0.1em; font-size: 14px; border: 1px solid var(--hud-cyan); padding: 12px 24px; border-radius: 4px; border-bottom: 1px solid var(--hud-cyan);">DEMO VIDEO</a>
            </div>
          </div>
        `,
        'braintumor': `
          <div class="markdown-body">
            <h3 style="margin-top:0;">Brain Tumor Detection with YOLO11</h3>
            <p>A computer vision system utilizing the state-of-the-art YOLO11 object detection model to identify and locate brain tumors in MRI scans. The model achieves high precision by processing medical imagery and drawing localized bounding boxes around anomalies.</p>
            <h3>Core Tech Stack</h3>
            <ul>
              <li><strong>Model:</strong> Ultralytics YOLO11</li>
              <li><strong>Data Framework:</strong> PyTorch, OpenCV</li>
              <li><strong>Language:</strong> Python</li>
            </ul>
            <div style="margin-top: 40px; display: flex; gap: 15px; flex-wrap: wrap;">
              <a href="https://github.com/ehtishamazing/Brain-Tumor-Detection-with-YOLO11" target="_blank" style="font-family: var(--font-head); letter-spacing: 0.1em; font-size: 14px; border: 1px solid var(--hud-cyan); padding: 12px 24px; border-radius: 4px; border-bottom: 1px solid var(--hud-cyan);">GITHUB REPOSITORY</a>
            </div>
          </div>
        `,
        'hostel': `
          <div class="markdown-body">
            <h3 style="margin-top:0;">Smart Hostel Management System</h3>
            <p>A comprehensive management suite for administering hostel records, room allocations, and student data. It features role-based access control, analytics dashboards, and automated record-keeping to streamline administrative workflows.</p>
            <h3>Core Tech Stack</h3>
            <ul>
              <li><strong>Frontend:</strong> React, Tailwind CSS</li>
              <li><strong>Backend:</strong> Node.js, Express</li>
              <li><strong>Database:</strong> MongoDB</li>
            </ul>
            <div style="margin-top: 40px; display: flex; gap: 15px; flex-wrap: wrap;">
              <a href="https://github.com/ehtishamazing/Smart-Hostel-Management-System" target="_blank" style="font-family: var(--font-head); letter-spacing: 0.1em; font-size: 14px; border: 1px solid var(--hud-cyan); padding: 12px 24px; border-radius: 4px; border-bottom: 1px solid var(--hud-cyan);">GITHUB REPOSITORY</a>
            </div>
          </div>
        `,
        'sysspy': `
          <div class="markdown-body">
            <h3 style="margin-top:0;">SysSpy - System Surveillance</h3>
            <p>A lightweight, stealthy system monitoring tool designed to capture and log keystrokes, clipboard activity, and network metrics. Built primarily for security research, auditing, and understanding endpoint vulnerabilities.</p>
            <h3>Core Tech Stack</h3>
            <ul>
              <li><strong>Language:</strong> C++ / Python</li>
              <li><strong>OS APIs:</strong> Windows API</li>
              <li><strong>Networking:</strong> Sockets</li>
            </ul>
            <div style="margin-top: 40px; display: flex; gap: 15px; flex-wrap: wrap;">
              <a href="https://github.com/ehtishamazing/SysSpy" target="_blank" style="font-family: var(--font-head); letter-spacing: 0.1em; font-size: 14px; border: 1px solid var(--hud-cyan); padding: 12px 24px; border-radius: 4px; border-bottom: 1px solid var(--hud-cyan);">GITHUB REPOSITORY</a>
            </div>
          </div>
        `,
        'n8n-automations': `
          <div class="markdown-body">
            <h3 style="margin-top:0;">Enterprise Workflow Automations</h3>
            <p>A collection of robust n8n workflows designed to automate repetitive business processes. Includes integrations between CRMs, communication channels, and AI endpoints to create self-sustaining data pipelines.</p>
            <h3>Core Tech Stack</h3>
            <ul>
              <li><strong>Platform:</strong> n8n</li>
              <li><strong>Integrations:</strong> Slack, Google Sheets, Gmail</li>
              <li><strong>Protocols:</strong> REST, Webhooks</li>
            </ul>
            <div style="margin-top: 40px; display: flex; gap: 15px; flex-wrap: wrap;">
              <a href="https://github.com/ehtishamazing/N8N-Automations" target="_blank" style="font-family: var(--font-head); letter-spacing: 0.1em; font-size: 14px; border: 1px solid var(--hud-cyan); padding: 12px 24px; border-radius: 4px; border-bottom: 1px solid var(--hud-cyan);">GITHUB REPOSITORY</a>
            </div>
          </div>
        `
      };

      projectTiles.forEach(function(tile) {
        tile.addEventListener('click', function(e) {
          if (e.target.tagName.toLowerCase() === 'a' && !e.target.classList.contains('tile__main-link')) {
            return; // let external demo links work
          }
          e.preventDefault();
          
          var projId = this.dataset.project;
          if(!projId || !projectData[projId]) return;
          
          document.getElementById('proj-title').textContent = this.querySelector('h3').textContent;
          document.getElementById('proj-body').innerHTML = projectData[projId];
          projectOverlay.classList.add('is-active');
        });
      });
    }

  }

})();
