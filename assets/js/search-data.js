// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "A chronological list of my research papers.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "Course materials, lecture notes, and computational resources.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Academic Curriculum Vitae of Shixian Liu - Ph.D. Candidate at BMSTU.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-callaway-two-relaxation-time-model",
        
          title: "Callaway Two-Relaxation-Time Model",
        
        description: "A theoretical derivation of the Callaway model, separating Normal and Resistive scattering processes to calculate thermal conductivity.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/callaway/";
          
        },
      },{id: "post-thermal-conductivity-calculation-using-vasp-phono3py",
        
          title: "Thermal Conductivity Calculation using VASP + Phono3py",
        
        description: "A step-by-step guide to calculating lattice thermal conductivity using VASP and Phono3py, covering supercell generation, force calculations, and BTE solutions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/vasp-phono3py/";
          
        },
      },{id: "post-thermal-conductivity-calculation-using-vasp-phono3py",
        
          title: "Thermal Conductivity Calculation using VASP + Phono3py",
        
        description: "A step-by-step guide to calculating lattice thermal conductivity using VASP and Phono3py, covering supercell generation, force calculations, and BTE solutions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/wigner/";
          
        },
      },{id: "post-landauer-theory-for-electrons-and-phonons",
        
          title: "Landauer Theory for Electrons and Phonons",
        
        description: "A detailed exploration of Landauer theory in nanoscale thermal transport, comparing electron and phonon transport mechanisms, mode counting, and spectral conductance.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/el-ph-landauer/";
          
        },
      },{id: "post-first-principles-based-pbte-method",
        
          title: "First-Principles-Based PBTE Method",
        
        description: "An introduction to the First-Principles Phonon Boltzmann Transport Equation (PBTE) method, covering DFT, lattice dynamics, and thermal conductivity calculations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/abinitio-bte/";
          
        },
      },{id: "post-vasp-structure-optimization",
        
          title: "VASP Structure Optimization",
        
        description: "A comprehensive guide to structure optimization using VASP, covering input parameters, file formats, output analysis, and convergence strategies.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/vasp-relax/";
          
        },
      },{id: "post-numerical-methods-for-density-of-states-dos-calculation",
        
          title: "Numerical Methods for Density of States (DOS) Calculation",
        
        description: "An overview of numerical techniques for calculating Density of States (DOS), including Root Sampling, Linear Extrapolation (GR/GGR methods), and Linear Interpolation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/dos-method/";
          
        },
      },{id: "post-phonon-dispersion-calculation-of-silicon-using-qe",
        
          title: "Phonon Dispersion Calculation of Silicon Using QE",
        
        description: "A step-by-step tutorial on calculating phonon dispersion for Silicon using Density Functional Perturbation Theory (DFPT) in Quantum Espresso.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/qe-disp-si/";
          
        },
      },{id: "post-self-consistent-energy-calculations-with-qe",
        
          title: "Self-Consistent Energy Calculations with QE",
        
        description: "A guide to performing self-consistent field (SCF) calculations using Quantum ESPRESSO, covering input files, execution, and output analysis.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/qe-scf/";
          
        },
      },{id: "post-microscopic-description-of-thermophysics",
        
          title: "Microscopic Description of Thermophysics",
        
        description: "A microscopic view of heat transfer, covering energy carriers, distribution functions, and fundamental constants.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/nano-micro-thermophysics/";
          
        },
      },{id: "post-classical-kinetic-theory-of-heat-conduction",
        
          title: "Classical Kinetic Theory of Heat Conduction",
        
        description: "A summary of classical kinetic theory, phonon transport, and macroscopic heat equations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/classical-kinetic-theory/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-participated-in-the-65th-all-russian-scientific-conference-at-the-moscow-institute-of-physics-and-technology-mipt-and-received-the-award-for-best-student-oral-presentation-pdf",
          title: 'Participated in the 65th All-Russian Scientific Conference at the Moscow Institute of Physics...',
          description: "",
          section: "News",},{id: "news-graduated-from-bauman-moscow-state-technical-university-with-a-master-s-degree-in-nuclear-energy-and-thermophysics-and-received-a-badge-with-honors-media",
          title: 'Graduated from Bauman Moscow State Technical University with a Master’s degree in Nuclear...',
          description: "",
          section: "News",},{id: "news-invited-to-participate-in-the-russian-universities-alumni-meeting-on-green-technology-for-the-younger-generation-at-the-international-forum-atomexpo-2024-media",
          title: 'Invited to participate in the Russian universities alumni meeting on “Green technology for...',
          description: "",
          section: "News",},{id: "news-participated-in-the-xviii-all-russian-school-conference-topical-issues-of-thermophysics-and-physical-hydrogas-dynamics-avtifg-gave-an-oral-presentation-and-was-awarded-first-prize-pdf",
          title: 'Participated in the XVIII All-Russian School-Conference “Topical Issues of Thermophysics and Physical Hydrogas...',
          description: "",
          section: "News",},{id: "news-participated-in-the-9th-national-workshop-on-thermal-transport-wtt-2025-and-received-the-outstanding-poster-award-pdf",
          title: 'Participated in the 9th National Workshop on Thermal Transport (WTT-2025) and received the...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "teachings-thermal-physics-of-nanosystems-in-russian",
          title: 'Thermal Physics of Nanosystems (in Russian)',
          description: "Master&#39;s course covering phonon transport, lattice dynamics, BTE, and ab initio calculations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/nano_thermophysics/";
            },},{id: "teachings-numerical-simulation-methods-in-russian",
          title: 'Numerical Simulation Methods (in Russian)',
          description: "First-year Master&#39;s course covering Python scientific computing, numerical methods, and machine learning fundamentals.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/numerical_simulation/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV_LIU_EN_0906.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%78%6C%69%75%39%38@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=bLVSRuUAAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-3042-7817", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
