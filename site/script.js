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
        scrollTrigger: {
          trigger: "#skills",
          start: "top 75%" // Triggers when the top of the skills section is 25% down the screen
        }
      });

      // Initial setup for reveals
      gsap.set(".reveal", { opacity: 0 });
      gsap.set(".reveal-top", { y: -30 });
      gsap.set(".reveal-bottom", { y: 30 });
      gsap.set(".reveal-left", { x: -30 });
      gsap.set(".reveal-right", { x: 30 });
      
      // Initial setup for counters
      var counters = document.querySelectorAll('.counter');
      gsap.set(counters, { opacity: 0, scale: 0.9, textShadow: "0 0 0px rgba(199, 36, 60, 0)" });

      // Staggered entrance for panels
      skillsTl.to(".reveal", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Tie counters directly to the timeline so they animate 100% of the time the panels do
      skillsTl.add(function() {
        counters.forEach(function(counter, index) {
          var target = +counter.getAttribute('data-target');
          var hasPlus = counter.getAttribute('data-plus') === 'true';
          var obj = { val: 0 };
          
          var tl = gsap.timeline({ delay: index * 0.15 });
          
          // 1. Initial fade in & slight scale up with soft burgundy glow
          tl.to(counter, {
            opacity: 1,
            scale: 1.08,
            textShadow: "0 0 15px rgba(199, 36, 60, 0.4)",
            duration: 0.4,
            ease: "power2.out"
          });
          
          // 2. Count up smoothly
          tl.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: function() {
              var currentVal = Math.round(obj.val);
              counter.innerHTML = currentVal + (hasPlus ? "+" : "");
            }
          }, "-=0.4");
          
          // 3. Tiny pulse when final value is reached
          tl.to(counter, {
            scale: 1.1,
            textShadow: "0 0 25px rgba(199, 36, 60, 0.8)",
            duration: 0.15,
            ease: "power2.out"
          }).to(counter, {
            scale: 1,
            textShadow: "0 0 10px rgba(199, 36, 60, 0.2)",
            duration: 0.4,
            ease: "power2.inOut"
          });
        });
      }, "-=0.8"); // Start right as panels are fading in
    }

    // ==========================================
    // GSAP ARCHIVE / CERTIFICATES
    // ==========================================
    if (typeof ScrollTrigger !== 'undefined') {
      // 1. Entrance animation
      gsap.set(".cert-frame", { opacity: 0, y: 100 });
      gsap.set(".gallery-character", { opacity: 0, y: 50 });
      
      gsap.to(".cert-frame", {
        scrollTrigger: {
          trigger: "#archive",
          start: "top 60%",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      });
      
      gsap.to(".gallery-character", {
        scrollTrigger: {
          trigger: "#archive",
          start: "top 40%",
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      });

      // 2. Interactive Infinite Carousel
      var galleryWall = document.querySelector('.gallery-wall');
      var currentRotation = 0;
      var targetRotation = 0;
      var isDragging = false;
      var startX = 0;
      
      // Update loop for smooth rotation
      function updateRotation() {
        // Smoothly interpolate current to target
        currentRotation += (targetRotation - currentRotation) * 0.1;
        if (galleryWall) {
          galleryWall.style.transform = `translateZ(-800px) rotateY(${currentRotation}deg)`;
        }
        requestAnimationFrame(updateRotation);
      }
      requestAnimationFrame(updateRotation);
      
      // Mouse Wheel Scroll
      var archiveSection = document.getElementById('archive');
      if (archiveSection) {
        archiveSection.addEventListener('wheel', function(e) {
          // If a certificate is selected, prevent scrolling the carousel
          if (selectedCert) return;
          
          // Prevent default vertical scroll while interacting with gallery if hovered over the gallery container
          // Actually, let's just use horizontal scrolling or track vertical scroll to rotate
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            targetRotation -= e.deltaX * 0.1;
            e.preventDefault();
          } else {
            // Also allow vertical scroll to rotate for ease of use
            // targetRotation -= e.deltaY * 0.1; 
          }
        }, { passive: false });
        
        // Drag logic
        var galleryContainer = document.querySelector('.archive-gallery-container');
        galleryContainer.addEventListener('mousedown', function(e) {
          if (selectedCert) return;
          isDragging = true;
          startX = e.clientX;
          galleryContainer.style.cursor = 'grabbing';
        });
        
        window.addEventListener('mouseup', function() {
          isDragging = false;
          galleryContainer.style.cursor = 'default';
        });
        
        window.addEventListener('mousemove', function(e) {
          if (!isDragging || selectedCert) return;
          var deltaX = e.clientX - startX;
          targetRotation += deltaX * 0.2;
          startX = e.clientX;
        });
      }

      // 3. Click Interactions
      var certs = document.querySelectorAll('.cert-frame');
      var overlay = document.querySelector('.cert-overlay');
      var closeBtn = document.querySelector('.cert-close');
      var selectedCert = null;

      certs.forEach(function(cert, index) {
        // Assign angles dynamically for infinite scroll matching the CSS
        // cert-left-3: -90, cert-left-2: -60, cert-left-1: -30, cert-center: 0, cert-right-1: 30, cert-right-2: 60, cert-right-3: 90
        var angles = [-90, -60, -30, 0, 30, 60, 90];
        cert.dataset.angle = angles[index];
        
        cert.addEventListener('click', function() {
          if (selectedCert) return;
          
          selectedCert = cert;
          
          // Auto-rotate the wall to center this certificate
          targetRotation = -parseInt(cert.dataset.angle);
          
          // Dim others
          certs.forEach(function(c) {
            if (c !== selectedCert) {
              c.classList.add('is-dimmed');
            }
          });
          
          // Select this one
          selectedCert.classList.add('is-selected');
          
          // Show overlay
          overlay.classList.add('is-active');
        });
      });

      function closeCert() {
        if (!selectedCert) return;
        
        // Remove classes
        selectedCert.classList.remove('is-selected');
        certs.forEach(function(c) {
          c.classList.remove('is-dimmed');
        });
        
        // Hide overlay
        overlay.classList.remove('is-active');
        
        selectedCert = null;
      }

      if (closeBtn) closeBtn.addEventListener('click', closeCert);
      if (overlay) overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeCert(); // Only close if clicking the background, not the cert itself
      });
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && selectedCert) {
          closeCert();
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

  }

})();
