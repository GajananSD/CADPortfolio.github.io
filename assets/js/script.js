(function(){
  "use strict";

  /* ---------------------------------------------------------
     PROJECT DATA
  --------------------------------------------------------- */
  var projects = [
    { img:"assets/imgs/1.png",  title:"Spirometer", cat:"thermal", catLabel:"Instrumentation",
      desc:"A spirometer is a medical device used to measure lung function by assessing the volume of air inhaled and exhaled, aiding in the diagnosis and management of respiratory conditions. It plays a crucial role in evaluating lung health." },
    { img:"assets/imgs/2.png",  title:"Thermal Diffusivity Setup", cat:"thermal", catLabel:"Thermal / Experimental",
      desc:"An experimental setup to measure the thermal diffusivity of metals using the lumped-capacitance method." },
    { img:"assets/imgs/3.png",  title:"Ball Balancing on Beam", cat:"controls", catLabel:"Controls / Mechatronics",
      desc:"Balancing a ball on a beam using a servo involves a feedback control system that adjusts the beam's angle in real time to counteract the ball's movements, demonstrating precise control and stability." },
    { img:"assets/imgs/4.png",  title:"Universal Joint", cat:"mechanisms", catLabel:"Mechanism",
      desc:"A universal joint (U-joint) is a mechanical connection that allows for the transmission of rotational motion between two shafts that are not in-line, enabling flexibility and angular movement." },
    { img:"assets/imgs/5.png",  title:"Two-Axis Self-Balancing Stick", cat:"controls", catLabel:"Controls / Mechatronics",
      desc:"The physics behind balancing a stick on two rotating wheels involves using sensors to detect the stick's tilt, then applying torque to the wheels to counteract it, relying on rotational dynamics and control theory." },
    { img:"assets/imgs/6.png",  title:"Geneva Wheel", cat:"mechanisms", catLabel:"Mechanism",
      desc:"A Geneva wheel translates continuous rotational motion into intermittent motion, commonly used in indexing and timing mechanisms. A driven pin slots into recesses on a rotating wheel, causing it to advance in discrete steps." },
    { img:"assets/imgs/7.png",  title:"Automatic Stamping Machine", cat:"mechanisms", catLabel:"Automation / Mechanism",
      desc:"An automatic stamping machine that produces multiple identical stamps simultaneously, ensuring precise, consistent alignment and perfect synchronization for high-quality output." },
    { img:"assets/imgs/8.png",  title:"Extended Surface Heat Transfer Setup", cat:"thermal", catLabel:"Thermal / Experimental",
      desc:"A setup studying heat conduction through extended surfaces (fins) to assess how shape and size affect heat dissipation — informing radiator and electronic-cooling design." },
    { img:"assets/imgs/9.png",  title:"Light Spectrometer Device", cat:"thermal", catLabel:"Instrumentation / Optics",
      desc:"A spectrometer using a diffraction grating disperses light into its component wavelengths, enabling spectral analysis vital to chemistry, astronomy, and material characterization." },
    { img:"assets/imgs/10.png", title:"4-Piston Cylinder Assembly", cat:"powertrain", catLabel:"Powertrain",
      desc:"A four-piston cylinder assembly within a common bore, typical of high-performance engines, maximizing intake and exhaust flow for greater torque and horsepower." },
    { img:"assets/imgs/11.png", title:"Tricopter Model", cat:"controls", catLabel:"Aerospace / Robotics",
      desc:"A three-armed tricopter frame with propeller mounts, designed in CAD for balanced, stable flight." },
    { img:"assets/imgs/12.png", title:"3-Jaw Robotic Gripper", cat:"controls", catLabel:"Robotics",
      desc:"A 3-jaw robotic gripper built around a rack-and-pinion mechanism, driven by a servo motor for precise control of jaw angle." },
    { img:"assets/imgs/13.png", title:"Aircraft Propeller", cat:"powertrain", catLabel:"Aerospace",
      desc:"A basic aerodynamic propeller design of the type used on light aircraft." },
    { img:"assets/imgs/14.png", title:"Dryer", cat:"product", catLabel:"Product Design",
      desc:"A dryer concept built around a BLDC motor and propeller — the motor's high RPM drives efficient drying of surface water." },
    { img:"assets/imgs/15.png", title:"SPOT Robot", cat:"controls", catLabel:"Robotics / Surface Modeling",
      desc:"A 3D model of the SPOT robot built from 2D reference images using surface modeling, with dimensions traced from top and side views." },
    { img:"assets/imgs/16.png", title:"V6 Engine", cat:"powertrain", catLabel:"Powertrain",
      desc:"A 3D model of a V6 engine built in SolidWorks, showcasing its structural design and component arrangement." }
  ];

  /* ---------------------------------------------------------
     RENDER SHEET GRID
  --------------------------------------------------------- */
  var grid = document.getElementById("sheetGrid");
  var total = projects.length;

  function catFilterLabel(cat){
    var map = { mechanisms:"Mechanism", controls:"Controls & Robotics", thermal:"Thermal & Instrumentation", powertrain:"Powertrain & Aerospace", product:"Product Design" };
    return map[cat] || cat;
  }

  projects.forEach(function(p, i){
    var card = document.createElement("article");
    card.className = "sheet-card";
    card.dataset.cat = p.cat;
    card.dataset.index = i;
    card.style.animationDelay = (i * 0.04) + "s";
    card.innerHTML =
      '<span class="sheet-card-corner corner-tl"></span>' +
      '<span class="sheet-card-corner corner-tr"></span>' +
      '<span class="sheet-card-corner corner-bl"></span>' +
      '<span class="sheet-card-corner corner-br"></span>' +
      '<div class="sheet-card-media"><img src="' + p.img + '" alt="' + p.title + '" loading="lazy"></div>' +
      '<div class="sheet-card-meta">' +
        '<span class="mono-tag">SHEET ' + String(i+1).padStart(2,'0') + '/' + total + '</span>' +
        '<span class="mono-tag sheet-card-cat">' + p.catLabel.toUpperCase() + '</span>' +
      '</div>' +
      '<div class="sheet-card-body"><h3>' + p.title + '</h3><p>' + p.desc + '</p></div>';
    card.addEventListener("click", function(){ openLightbox(i); });
    grid.appendChild(card);
  });

  /* ---------------------------------------------------------
     FILTERS
  --------------------------------------------------------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      filterBtns.forEach(function(b){ b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.dataset.filter;
      document.querySelectorAll(".sheet-card").forEach(function(card){
        var show = (f === "all" || card.dataset.cat === f);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------------------------------------------------------
     LIGHTBOX
  --------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbTitle = document.getElementById("lbTitle");
  var lbDesc = document.getElementById("lbDesc");
  var lbSheet = document.getElementById("lbSheet");
  var lbCat = document.getElementById("lbCat");
  var currentIndex = 0;

  function openLightbox(i){
    currentIndex = i;
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox(){
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }
  function renderLightbox(){
    var p = projects[currentIndex];
    lbImg.src = p.img;
    lbImg.alt = p.title;
    lbTitle.textContent = p.title;
    lbDesc.textContent = p.desc;
    lbSheet.textContent = "SHEET " + String(currentIndex+1).padStart(2,'0') + "/" + total;
    lbCat.textContent = p.catLabel.toUpperCase();
  }
  function nextLightbox(){ currentIndex = (currentIndex + 1) % total; renderLightbox(); }
  function prevLightbox(){ currentIndex = (currentIndex - 1 + total) % total; renderLightbox(); }

  document.querySelectorAll("[data-close]").forEach(function(el){
    el.addEventListener("click", closeLightbox);
  });
  document.getElementById("lbNext").addEventListener("click", nextLightbox);
  document.getElementById("lbPrev").addEventListener("click", prevLightbox);

  document.addEventListener("keydown", function(e){
    if(!lightbox.classList.contains("is-open")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowRight") nextLightbox();
    if(e.key === "ArrowLeft") prevLightbox();
  });

  /* ---------------------------------------------------------
     MOBILE NAV
  --------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");
  navToggle.addEventListener("click", function(){
    var open = navMobile.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navMobile.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      navMobile.classList.remove("is-open");
      navToggle.classList.remove("is-open");
    });
  });

  /* ---------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------
     DECORATIVE CROSSHAIR CURSOR
  --------------------------------------------------------- */
  var chH = document.querySelector(".crosshair-h");
  var chV = document.querySelector(".crosshair-v");
  if(chH && chV){
    window.addEventListener("mousemove", function(e){
      chH.style.opacity = 1;
      chV.style.opacity = 1;
      chH.style.top = e.clientY + "px";
      chH.style.left = (e.clientX - 13) + "px";
      chV.style.left = e.clientX + "px";
      chV.style.top = (e.clientY - 13) + "px";
    });
    window.addEventListener("mouseout", function(){
      chH.style.opacity = 0;
      chV.style.opacity = 0;
    });
  }

  /* ---------------------------------------------------------
     YEAR
  --------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
