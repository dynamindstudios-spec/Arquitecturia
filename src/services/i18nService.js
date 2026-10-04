// Sistema de Internacionalización Exhaustivo (ES / EN / FR)
// ArquitecturIA Atelier · Soporte Multilingüe Nativo Reactivo

const STORAGE_KEY = 'arquitecturia_lang';

export const LANGUAGES = {
  ES: { code: 'ES', name: 'Español', flag: '🇨🇴', label: 'Español' },
  EN: { code: 'EN', name: 'English', flag: '🇺🇸', label: 'English' },
  FR: { code: 'FR', name: 'Français', flag: '🇫🇷', label: 'Français' }
};

export const TRANSLATIONS = {
  ES: {
    brand: {
      group: 'ATELIER',
      constructor: 'COMPUTACIONAL',
      subtitle: 'ATELIER DE ARQUITECTURA',
      alt: 'ArquitecturIA — Atelier de Arquitectura'
    },
    nav: {
      home: 'Portada',
      pillars: 'Pilares',
      scrolly: 'Experiencia 360°',
      simulator: 'Simulador',
      projects: 'Proyectos',
      contact: 'Contacto',
      bioclimatic: 'Bioclimática',
      nsr10: 'NSR-10',
      bookBtn: 'AGENDAR CITA',
      settingsTitle: 'Preferencias & Idioma',
      langSelect: 'Idioma'
    },
    hero: {
      eyebrow: 'ESTUDIO DE ARQUITECTURA & CONSTRUCCIÓN',
      title: 'La Pureza de la Forma Habitable',
      subtitle: 'Concebimos y ejecutamos residencias campestres, complejos turísticos y proyectos comerciales de alto estatus en el corazón del Paisaje Cultural Cafetero.',
      exploreBtn: 'EXPLORAR CATÁLOGO',
      scheduleBtn: 'AGENDAR ANÁLISIS DE PROYECTO',
      metrics: {
        works: '50+ Obras Ejecutadas',
        standards: '100% Norma Sismorresistente NSR-10',
        bioclimatic: 'Arquitectura Bioclimática & Pasiva'
      }
    },
    pillars: {
      title: 'Pilares de Creación',
      subtitle: 'Nuestra práctica se fundamenta en principios constructivos innegociables que desafían la arquitectura descartable.',
      normLabel: 'ESTÁNDAR ARQUITECTURIA',
      items: [
        {
          number: '01',
          title: 'Rigor Estructural & Geometría',
          description: 'Cálculo estructural riguroso bajo la norma NSR-10. Diseñamos estructuras que dialogan con la sismicidad del Eje Cafetero con máxima nobleza espacial.'
        },
        {
          number: '02',
          title: 'Integración Bioclimática',
          description: 'Aprovechamos la orientación solar, los vientos cruzados de la cordillera y la recolección de aguas para residencias de mínima huella térmica.'
        },
        {
          number: '03',
          title: 'Materialidad Atemporal',
          description: 'Concreto visto fenólico, maderas curadas de bosques sostenibles, acero corten y piedra local que envejecen con elegancia y carácter.'
        },
        {
          number: '04',
          title: 'Gestión Constructiva Integral',
          description: 'Dirección arquitectónica de obra sin intermediarios opacos. Control milimétrico de costos, tiempos de entrega y calidades de acabado.'
        }
      ]
    },
    scrolly: {
      phase1Tag: '01 · LA GÉNESIS DE LA FORMA',
      phase1Title: 'La Mente Arquitectónica',
      phase1Desc: 'Cada obra de ArquitecturIA nace como una sinapsis entre la pureza geométrica, el entorno natural del Quindío y el rigor sismorresistente.',
      
      phase2Tag: '02 · PRECISIÓN ORTOGONAL',
      phase2Title: 'Apertura del Núcleo Estructural',
      phase2Desc: 'Desplegamos volúmenes habitables que dialogan con la cordillera. Concreto a la vista, carpinterías nobles y juegos de luces cenitales.',
      
      phase3Tag: '03 · TRANSCENDENCIA ESPACIAL',
      phase3Title: 'La Continuidad del Vacío Habitable',
      phase3Desc: 'La luz esculpe cada plano. Transiciones diáfanas entre el interior noble y la majestuosidad exterior del paisaje cafetero.',
      
      phase4Tag: '04 · MATERIALIDAD & ALTO ESTATUS',
      phase4Title: 'Obras que Desafían el Tiempo',
      phase4Desc: 'Más de 50 obras ejecutadas entre residencias privadas de ensueño, complejos comerciales y proyectos ecoturísticos de clase mundial.',
      
      phase5Tag: '05 · EL PORTAFOLIO COMPLETO',
      phase5Title: '24 Obras Inmortalizadas',
      phase5Desc: 'Explora en detalle nuestras obras con fichas técnicas, memorias descriptivas y galerías completas de alta resolución.',
      
      exploreBtn: 'INGRESAR A LA PÁGINA DE PROYECTOS',
      scrollIndicator: 'DESPLAZA PARA RECORRER',
      hudSequence: 'SECUENCIA CINEMÁTICA · 240 CUADROS'
    },
    portfolioPortal: {
      title: 'Portafolio de 24 Obras',
      desc: 'Ingresa a nuestra galería especializada para explorar cada proyecto en modalidades de vitrina panorámica, retícula multitoma o revista editorial con fotografías de alta resolución.',
      viewFullBtn: 'VER CATÁLOGO COMPLETO',
      bookMeetingBtn: 'CONSULTAR PROYECTO EN CONTACTO'
    },
    simulator: {
      title: 'Simulador de Inversión Arquitectónica',
      subtitle: 'Estima el rango de inversión para estructurar tu proyecto residencial, turístico o comercial en el Eje Cafetero.',
      step1: '1. TIPOLOGÍA DE PROYECTO',
      typologyLabel: 'Tipología del Proyecto',
      typologyRes: 'Residencial Campestre',
      typologyTour: 'Suites / Turismo',
      typologyComm: 'Comercial & Retail',
      step2: '2. ÁREA CONSTRUIDA ESTIMADA',
      areaLabel: 'Área Construida Estimada',
      compactVilla: '150 m² (Villa Compacta)',
      signatureResidence: '600 m² (Residencia Insignia)',
      masterplan: '1.200 m² (Masterplan)',
      step3: '3. NIVEL DE ESPECIFICACIÓN & MATERIALIDAD',
      specLabel: 'Nivel de Acabados & Especificación',
      specHigh: 'Alto Estatus',
      specHighDesc: 'Concreto visto y teka estándar',
      specSignature: 'Firma ArquitecturIA',
      specSignatureDesc: 'Encofrado fenólico, mármol y ventanería 3.2m',
      specUltra: 'Ultra Lujo Monolítico',
      specUltraDesc: 'Piedras de cantera, acero corten y domótica integral',
      step4: '4. CUOTA INICIAL DE SEPARACIÓN & PREVENTA',
      initialPct: 'INICIAL',
      estProjection: 'PROYECCIÓN ESTIMADA (COP)',
      costM2Label: 'Valor Estimado por m²',
      equivCost: 'Equivalente a',
      perM2: 'por m²',
      downPayment: 'Cuota Inicial',
      financedBalance: 'Saldo Financiable a 24 Meses',
      monthlyFee: 'Cuota Mensual de Obra (24 cuotas)',
      perMonth: '/ mes',
      capitalGain: 'Plusvalía Proyectada (+28%)',
      deliveryValue: 'VALOR PROYECTADO A ENTREGA',
      totalInvestmentLabel: 'Inversión Proyectada Estimada',
      requestStructure: 'SOLICITAR ESTRUCTURACIÓN PATRIMONIAL',
      disclaimerBottom: '* Valores referenciales sujetos a estudio topográfico de lote y memoria técnica definitiva.',
      disclaimer: '*Valores paramétricos orientativos para el año 2026. La cotización definitiva requiere estudio topográfico y análisis de suelos.',
      ctaBtn: 'AGENDAR CITA CON ESTE PRESUPUESTO'
    },
    projects: {
      title: 'Colección de 24 Obras',
      heading: 'Obras & Proyectos',
      subtitle: 'Arquitectura residencial, comercial y de rentas turísticas proyectada y construida en el Eje Cafetero.',
      description: 'Catálogo completo de composiciones residenciales, desarrollos comerciales y complejos turísticos en la Cordillera Central de Colombia.',
      catAll: 'Todas las Obras (24)',
      catRes: 'Residencial Campestre',
      catTour: 'Turístico & Glamping',
      catComm: 'Comercial & Salud',
      viewPanoramic: 'Vitrina Panorámica',
      viewGrid: 'Retícula Multitoma',
      showcaseTab: 'Vitrina',
      gridTab: 'Retícula',
      editorialTab: 'Editorial',
      searchPlaceholder: 'Buscar por obra, material o ciudad...',
      catalogCount: 'proyectos catalogados',
      modeLabel: 'Modo:',
      modeQuimbayas: 'Vitrina',
      modeGrid: 'Retícula Multitoma',
      modeEditorial: 'Revista Editorial',
      notFound: 'No se encontraron proyectos con ese criterio',
      resetFilters: 'Restablecer filtros',
      viewGallery: 'VER GALERÍA COMPLETA',
      bookAppointment: 'AGENDAR CITA',
      hdPhotos: 'fotografías HD',
      explore: 'EXPLORAR',
      cardArea: 'Área:',
      cardLocation: 'Ubicación:',
      cardYear: 'Año:',
      cardTier: 'Inversión:',
      cardBtn: 'VER MEMORIA & GALERÍA',
      backToHome: 'VOLVER AL INICIO',
      badge: 'Colección Arquitectónica',
      showcaseTitle: 'Obras Insignia & Materialidad',
      showcaseSubtitle: 'Explora la ingeniería de detalle, los acabados bioclimáticos y la precisión geométrica de nuestras 24 obras maestras.',
      viewFullCatalogBtn: 'VER CATÁLOGO COMPLETO',
      viewGalleryCount: 'VER GALERÍA COMPLETA',
      photosCount: 'FOTOS',
      bookCommission: 'AGENDAR CITA DE PROYECTO',
      catalogTitle: 'CATÁLOGO DE OBRAS',
      projectsCount: 'PROYECTOS',
      expandFullscreen: 'Expandir en pantalla completa',
      shotPrefix: 'Toma',
      codeAndRigor: 'NORMA & RIGOR',
      nsrCertified: 'NSR-10 CERTIFICADO',
      signatureMaterialsLabel: 'MATERIALES NOBLES DE AUTOR:',
      workTelemetry: 'OBRA:',
      categories: {
        all: 'Todos',
        residential: 'Residencial Campestre',
        hospitality: 'Turismo & Hospitalidad',
        commercial: 'Comercial & Retail'
      }
    },
    projectModal: {
      specsTitle: 'FICHA TÉCNICA DE LA OBRA',
      architecturalSpecs: 'FICHA ARQUITECTÓNICA',
      materialityTitle: 'MATERIALIDAD & RIGOR TÉCNICO',
      areaLabel: 'Área Construida',
      locationLabel: 'Ubicación',
      typeLabel: 'Tipología',
      yearLabel: 'Año de Entrega',
      yearPrefix: 'AÑO',
      tierLabel: 'Inversión Estimada',
      galleryLabel: 'Galería',
      hdTakes: 'tomas HD',
      signatureMaterials: 'Materialidad Signature',
      ctaBtn: 'SOLICITAR ANÁLISIS PARA PROYECTO SIMILAR',
      bookMeetingBtn: 'CONSULTAR OBRA EN CONTACTO',
      whatsappBtn: 'CONSULTAR POR WHATSAPP',
      closeBtn: 'CERRAR FICHA'
    },
    contact: {
      title: 'Iniciar un Nuevo Proyecto',
      subtitle: 'Coordinamos una Cita de Análisis Inicial personalizada para evaluar la viabilidad de tu lote, programa de áreas y presupuesto.',
      leftTitle: 'Hablemos de tu Proyecto',
      leftDesc: 'Estamos listos para escuchar tu visión. Cuéntanos sobre tu terreno, tu idea o tu plan de inversión y crearemos algo extraordinario.',
      emailLabel: 'CORREO CORPORATIVO',
      phoneLabel: 'LÍNEA DIRECTA & WHATSAPP',
      officeLabel: 'OFICINA & SALA DE VENTAS',
      formHeading: 'FORMULARIO DE CONTACTO DIRECTO',
      fullName: 'NOMBRE COMPLETO *',
      namePlaceholder: 'Tu nombre completo',
      emailField: 'CORREO ELECTRÓNICO *',
      phoneField: 'TELÉFONO MÓVIL *',
      detailsField: 'DETALLES DE LA PROPUESTA O PROYECTO *',
      detailsPlaceholder: 'Describe la ubicación del terreno, área proyectada, uso previsto (residencial, comercial, hotelero) o dudas sobre nuestros proyectos...',
      sendBtn: 'ENVIAR MENSAJE AL ESTUDIO',
      sendingBtn: 'ENVIANDO...',
      msgReceived: 'Mensaje Recibido',
      msgReceivedDesc: 'Un arquitecto de nuestro equipo directivo revisará tu propuesta y se comunicará contigo en menos de 24 horas.',
      sendAnother: 'ENVIAR OTRO MENSAJE',
      formName: 'Nombre Completo',
      formPhone: 'Número de WhatsApp (con código de país)',
      formType: 'Tipología de Proyecto',
      formLot: 'Ubicación o Municipio del Lote',
      formBudget: 'Presupuesto Proyectado Estimado',
      formDate: 'Fecha Tentativa Preferida',
      formNotes: 'Detalles adicionales o requerimientos del lote',
      submitBtn: 'SOLICITAR CITA DE ANÁLISIS DE PROYECTO',
      botHint: 'Un bot de WhatsApp te contactará de inmediato con el enlace de Google Meet para confirmar tu reunión.',
      successMsg: '¡Solicitud registrada con éxito! Tu Cita de Análisis ha sido programada y el Asistente WhatsApp te contactará en breve.',
      validationError: 'Por favor completa todos los campos obligatorios para agendar tu análisis.',
      qualificationBadge: 'ADMISIONES & CALIFICACIÓN TÉCNICA',
      qualificationStep: 'PASO ÚNICO',
      qualificationTitle: 'Ficha Preliminar de Proyecto',
      qualificationDesc: 'Estructura las coordenadas de tu futura obra para coordinar la evaluación arquitectónica con la dirección técnica de ArquitecturIA.',
      referenceCommission: 'Obra de Referencia:',
      q1Label: '1. ¿CUENTAS CON LOTE O TERRENO PARA EL PROYECTO? *',
      requiredBadge: 'Obligatorio',
      q2Label: '2. UBICACIÓN & TOPOGRAFÍA DEL TERRENO *',
      sectorPlaceholder: 'Sector específico, Vereda o Condominio (ej. Vereda Boquía, Condominio La Reserva)...',
      topographyLabel: 'Condición Topográfica:',
      q3Label: '3. TIPOLOGÍA DE PROYECTO & ÁREA CONSTRUIDA *',
      areaCoveredLabel: 'Área Cubierta Estimada (m² de construcción):',
      q4Label: '4. PRESUPUESTO PROYECTADO & HORIZONTE DE INICIO *',
      timelineLabel: 'Fecha proyectada para inicio de obra / diseño:',
      q5Label: '5. MODALIDAD DE ATENCIÓN PREFERIDA *',
      q6Label: '6. DATOS DE CONTACTO DEL TITULAR / INVERSIONISTA *',
      nameLabel: 'Nombre y Apellidos *',
      namePlaceholder: 'Ej. Ing. Roberto Mendoza / Dra. Claudia Gómez',
      phoneLabel: 'Teléfono WhatsApp *',
      emailLabelField: 'Correo Electrónico *',
      emailPlaceholder: 'inversionista@empresa.com',
      visionLabel: 'Visión del Proyecto o Requerimientos Específicos (Opcional)',
      visionPlaceholder: 'Detalles de interés: piscina sinfín, voladizos en concreto visto, madera teka curada, vistas cordilleranas...',
      submitBtnForm: 'RADICAR CALIFICACIÓN DE PROYECTO',
      submittingBtnForm: 'RADICANDO EN EL ATELIER...',
      preferDirectWa: '¿Prefieres consulta inmediata? Conversa directamente con el Director por WhatsApp',
      successRadicado: 'RADICADO:',
      successTitle: 'Calificación Registrada con Éxito',
      successDesc: 'Hemos consolidado los parámetros de tu proyecto. El director de obra revisará la viabilidad de la topografía y los cálculos preliminares.',
      summaryTitular: 'Titular:',
      summaryTenure: 'Tenencia del Terreno:',
      summaryLoc: 'Ubicación & Topografía:',
      summaryType: 'Tipología & Escala:',
      summaryBudget: 'Inversión Estimada:',
      summaryModality: 'Modalidad Preferida:',
      openWaBtn: 'ABRIR EN WHATSAPP CON EL DIRECTOR',
      submitAnotherBtn: 'Radicar otra consulta'
    },
    manifesto: {
      title: 'Nuestro Propósito',
      teamBadge: 'DIRECCIÓN DE ARQUITECTURA & OBRA',
      teamStudio: 'ARQUITECTURIA ATELIER',
      philosophyBody: 'Nacimos en el corazón del Eje Cafetero con una convicción inquebrantable: construir espacios que desafíen las modas efímeras. No concebimos el diseño como un ejercicio superficial de decoración, sino como la articulación precisa entre la masa, la luz, el concreto noble y la topografía que lo acoge.',
      anatomyTitle: 'Anatomía Material & Texturas',
      anatomyDesc: 'Explora los biomateriales, maderas curadas y mezclas pétreas que dan carácter táctil a cada una de nuestras obras.',
      pillarsTitle: 'Pilares Constructivos Innegociables',
      pillarsDesc: 'Principios arquitectónicos que rigen desde el primer trazo topográfico hasta el último detalle de obra.',
      territoryTitle: 'El Taller en Territorio',
      territoryDesc: 'Registros visuales de nuestra dirección de obra, procesos de cálculo estructural y presencia activa de los fundadores en cada proyecto.',
      metric1: 'Obras Construidas',
      metric2: 'Trayectoria Líder',
      metric3: 'M² Diseñados',
      metric4: 'Rigor NSR-10',
      normLabel: 'ESTÁNDAR ARQUITECTURIA'
    },
    concierge: {
      title: 'CONCIERGE ARQUITECTURIA',
      subtitle: 'Asesoría Arquitectónica & Voz',
      welcome: 'Bienvenido a ArquitecturIA Atelier. Soy tu Concierge Arquitectónico Virtual. ¿En qué obra, tipología o plan de inversión deseas profundizar hoy?',
      placeholder: 'Escribe tu consulta o usa el micrófono...',
      voiceListening: 'Escuchando tu voz...',
      voiceSpeaking: 'Hablando...',
      quick1: 'Análisis de Proyecto',
      quick2: 'Tipologías & Obras',
      quick3: 'Costo por m²',
      quick4: 'Calificar en Contacto',
      suggestionsLabel: 'Sugerencias:',
      bookBtn: 'IR A CONTACTO',
      catalogBtn: 'CATÁLOGO 24 OBRAS',
      activeVoice: 'VOZ ACTIVA',
      agentBadge: 'CONCIERGE ARQUITECTURIA',
      speakingStatus: 'RESPONDIENDO CON VOZ',
      listeningStatus: 'ESCUCHANDO TU VOZ...',
      inputPlaceholder: 'Escribe tu consulta sobre diseño o costos...',
      micListeningPlaceholder: 'Escuchando tu voz...',
      micTooltip: 'Hablar al agente (Reconocimiento de voz)',
      muteTooltip: 'Desactivar voz',
      unmuteTooltip: 'Activar voz',
      replyCita: 'Para estructurar tu proyecto y evaluar si cuentas con lote propio, topografía y presupuesto, puedes ingresar directamente a nuestra sección de Contacto usando el botón "IR A CONTACTO" aquí abajo o navegando en el menú. Allí radicaremos tu ficha de comisiones para la dirección técnica.',
      replyCosto: 'Nuestros proyectos se estructuran entre $4.8M y $8.2M COP por m² según el nivel de especificación (concreto visto fenólico, teka curada, mármol travertino y ventanería 3.2m). Contamos con planes de obra con 30% a 50% de inicial a 24 meses.',
      replyTurismo: 'En turismo y rentas de alta gama destacamos Yala Suits (850 m²), Mirador de Cocora (780 m² en Salento), Bindi (560 m²), Cabañas Delirio y Panorama Salento. Diseñados para alta valorización y modelos de administración hotelera.',
      replyProjects: 'Contamos con 24 obras insignia en el Quindío: Casa Nogales, Casa 49 Santa Clara, Vanessa Vidal, Bambazú y Mirum. Cada una cuenta con galería fotográfica completa de alta resolución y ficha técnica en nuestro catálogo.',
      replyDefault: 'En ArquitecturIA proyectamos obras residenciales, comerciales y campestres de alto estatus en Armenia y el Eje Cafetero. Puedes revisar las obras en el catálogo o ingresar a Contacto para estructurar tu terreno.'
    },
    settings: {
      modalTitle: 'PERSONALIZACIÓN DE AMBIENTE & EXPERIENCIA',
      modalSubtitle: 'Gama cromática, atmósfera auditiva e idioma',
      tabAmbient: '3 Ambientaciones & Paletas',
      tabLang: 'Idioma',
      ambientDesc: 'Selecciona una ambientación para transformar en vivo la gama cromática y el paisaje sonoro procedural de la web:',
      soundscapeTitle: 'PAISAJE SONORO AMBIENTAL',
      soundActive: 'SONIDO ACTIVO',
      soundMuted: 'SILENCIADO',
      volumeLabel: 'VOLUMEN',
      langDesc: 'Selecciona tu idioma de preferencia para la experiencia:',
      realtimeNotice: 'CAMBIOS APLICADOS EN TIEMPO REAL',
      confirmBtn: 'CONFIRMAR & VOLVER'
    },
    social: {
      whatsapp: 'WhatsApp Concierge',
      instagram: 'Instagram Oficial',
      phone: 'Llamar a PBX',
      location: 'Ubicación Armenia',
      ariaTrigger: 'Canales oficiales y redes sociales'
    },
    footer: {
      rights: '© 2026 ArquitecturIA Atelier S.A.S. Todos los derechos reservados.',
      headquarters: 'Sede Principal: Armenia, Quindío · Eje Cafetero, Colombia',
      standards: 'Ingeniería sismorresistente NSR-10 · Licencias urbanísticas certificadas',
      navTitle: 'NAVEGACIÓN',
      navHome: 'INICIO',
      navProjects: 'PROYECTOS',
      navManifesto: 'NUESTRO PROPÓSITO',
      navContact: 'CONTÁCTANOS',
      supportTitle: 'ATENCIÓN AL CLIENTE',
      backToTop: 'VOLVER ARRIBA',
      allRightsReserved: 'TODOS LOS DERECHOS RESERVADOS.'
    }
  },

  EN: {
    brand: {
      group: 'ATELIER',
      constructor: 'COMPUTATIONAL',
      subtitle: 'ARCHITECTURE ATELIER',
      alt: 'ArquitecturIA — Architecture Atelier'
    },
    nav: {
      home: 'Home',
      pillars: 'Pillars',
      scrolly: '360° Experience',
      simulator: 'Simulator',
      projects: 'Projects',
      contact: 'Contact',
      bioclimatic: 'Bioclimatic',
      nsr10: 'NSR-10 Code',
      bookBtn: 'SCHEDULE MEETING',
      settingsTitle: 'Preferences & Language',
      langSelect: 'Language'
    },
    hero: {
      eyebrow: 'ARCHITECTURE & CONSTRUCTION STUDIO',
      title: 'The Purity of Living Form',
      subtitle: 'We conceptualize and build high-status country residences, boutique hospitality resorts, and commercial landmarks in the heart of Colombia’s Coffee Cultural Landscape.',
      exploreBtn: 'EXPLORE CATALOG',
      scheduleBtn: 'SCHEDULE PROJECT ANALYSIS',
      metrics: {
        works: '50+ Executed Projects',
        standards: '100% NSR-10 Earthquake-Resistant Certified',
        bioclimatic: 'Passive Bioclimatic Architecture'
      }
    },
    pillars: {
      title: 'Pillars of Creation',
      subtitle: 'Our architectural practice is founded upon non-negotiable construction principles that challenge disposable design.',
      normLabel: 'ARQUITECTURIA STANDARD',
      items: [
        {
          number: '01',
          title: 'Structural Rigor & Geometry',
          description: 'Rigorous structural engineering under NSR-10 codes. We craft spatial frameworks that harmoniously embrace local seismic conditions with grandeur.'
        },
        {
          number: '02',
          title: 'Bioclimatic Integration',
          description: 'We leverage mountain crosswinds, solar trajectory, and rainwater harvesting to ensure minimal thermal footprints across all villas.'
        },
        {
          number: '03',
          title: 'Timeless Materiality',
          description: 'Architectural exposed concrete, certified sustainable teak, corten steel, and local quarry stone that age with dignity and character.'
        },
        {
          number: '04',
          title: 'End-to-End Construction Stewardship',
          description: 'Direct architectural construction supervision with zero opaque middlemen. Millimetric control over budgets, milestones, and finishes.'
        }
      ]
    },
    scrolly: {
      phase1Tag: '01 · GENESIS OF FORM',
      phase1Title: 'The Architectural Mind',
      phase1Desc: 'Every ArquitecturIA commission begins as a synapse between geometric purity, the Andean landscape, and earthquake-resistant rigor.',
      
      phase2Tag: '02 · ORTHOGONAL PRECISION',
      phase2Title: 'Structural Core Unfolding',
      phase2Desc: 'We sculpt living volumes that dialogue with the mountain range. Exposed board-formed concrete, noble joinery, and zenithal lightwells.',
      
      phase3Tag: '03 · SPATIAL TRANSCENDENCE',
      phase3Title: 'Continuity of Living Voids',
      phase3Desc: 'Light carves every plane. Diaphanous transitions between intimate interiors and the majestic coffee landscape outside.',
      
      phase4Tag: '04 · MATERIALITY & TIMELESS STATUS',
      phase4Title: 'Works that Defy Time',
      phase4Desc: 'Over 50 executed commissions spanning private dream estates, commercial hubs, and world-class eco-resorts.',
      
      phase5Tag: '05 · THE COMPLETE PORTFOLIO',
      phase5Title: '24 Immortalized Works',
      phase5Desc: 'Explore our full portfolio with technical data sheets, structural narratives, and high-resolution galleries.',
      
      exploreBtn: 'ENTER ARCHITECTURAL PORTFOLIO',
      scrollIndicator: 'SCROLL TO EXPLORE',
      hudSequence: 'CINEMATIC SEQUENCE · 240 FRAMES'
    },
    portfolioPortal: {
      title: 'Portfolio of 24 Works',
      desc: 'Enter our curated gallery to discover each architectural masterpiece in panoramic showcase, multi-angle grid, or editorial magazine format.',
      viewFullBtn: 'VIEW FULL CATALOG',
      bookMeetingBtn: 'INQUIRE ABOUT THIS WORK IN CONTACT'
    },
    simulator: {
      title: 'Architectural Investment Simulator',
      subtitle: 'Estimate your investment bracket to develop your bespoke residential, hospitality, or commercial project in the Coffee Region.',
      step1: '1. PROJECT TYPOLOGY',
      typologyLabel: 'Project Typology',
      typologyRes: 'Country Residence & Estate',
      typologyTour: 'Hospitality & Luxury Rentals',
      typologyComm: 'Commercial & Retail',
      step2: '2. ESTIMATED BUILT AREA',
      areaLabel: 'Estimated Built Area',
      compactVilla: '150 m² (Compact Villa)',
      signatureResidence: '600 m² (Signature Estate)',
      masterplan: '1,200 m² (Masterplan)',
      step3: '3. SPECIFICATION & FINISH LEVEL',
      specLabel: 'Finishes & Specification Level',
      specHigh: 'High Status',
      specHighDesc: 'Architectural concrete and standard teak',
      specSignature: 'ArquitecturIA Signature',
      specSignatureDesc: 'Phenolic board formwork, marble, and 3.2m glazing',
      specUltra: 'Monolithic Ultra-Luxury',
      specUltraDesc: 'Quarry stones, corten steel, and full home automation',
      step4: '4. INITIAL DOWN PAYMENT & PRESALE',
      initialPct: 'DOWN PAYMENT',
      estProjection: 'ESTIMATED PROJECTION (COP)',
      costM2Label: 'Estimated Cost per m²',
      equivCost: 'Equivalent to',
      perM2: 'per m²',
      downPayment: 'Initial Down Payment',
      financedBalance: 'Financed Balance (24 Months)',
      monthlyFee: 'Monthly Construction Fee (24 mo)',
      perMonth: '/ mo',
      capitalGain: 'Projected Capital Gain (+28%)',
      deliveryValue: 'ESTIMATED DELIVERY VALUE',
      totalInvestmentLabel: 'Estimated Total Investment',
      requestStructure: 'REQUEST WEALTH STRUCTURING',
      disclaimerBottom: '* Reference values subject to topographic land survey and definitive technical dossier.',
      disclaimer: '*Indicative parametric estimates for 2026. Final investment requires topographic surveying and soil mechanics studies.',
      ctaBtn: 'SCHEDULE CONSULTATION WITH THIS ESTIMATE'
    },
    projects: {
      title: 'Curated Collection of 24 Works',
      heading: 'Commissions & Works',
      subtitle: 'Bespoke residential, commercial, and hospitality architecture designed and delivered in the Colombian Andes.',
      description: 'Comprehensive portfolio of master-planned villas, commercial hubs, and hospitality sanctuaries in the Central Mountain Range.',
      catAll: 'All Works (24)',
      catRes: 'Country Residences',
      catTour: 'Hospitality & Glamping',
      catComm: 'Commercial & Healthcare',
      viewPanoramic: 'Panoramic Showcase',
      viewGrid: 'Multi-Shot Grid',
      showcaseTab: 'Showcase',
      gridTab: 'Grid',
      editorialTab: 'Editorial',
      searchPlaceholder: 'Search by project, material, or city...',
      catalogCount: 'cataloged commissions',
      modeLabel: 'Mode:',
      modeQuimbayas: 'Showcase',
      modeGrid: 'Multi-Shot Grid',
      modeEditorial: 'Editorial Magazine',
      notFound: 'No commissions found matching your criteria',
      resetFilters: 'Reset filters',
      viewGallery: 'VIEW FULL GALLERY',
      bookAppointment: 'SCHEDULE MEETING',
      hdPhotos: 'HD photographs',
      explore: 'EXPLORE',
      cardArea: 'Area:',
      cardLocation: 'Location:',
      cardYear: 'Year:',
      cardTier: 'Investment:',
      cardBtn: 'VIEW MEMORY & GALLERY',
      backToHome: 'BACK TO HOME',
      badge: 'Architectural Collection',
      showcaseTitle: 'Landmark Commissions & Materiality',
      showcaseSubtitle: 'Explore the detailed engineering, bioclimatic finishes, and geometric precision of our 24 masterworks.',
      viewFullCatalogBtn: 'VIEW FULL CATALOG',
      viewGalleryCount: 'VIEW FULL GALLERY',
      photosCount: 'PHOTOS',
      bookCommission: 'BOOK PROJECT CONSULTATION',
      catalogTitle: 'COMMISSIONS CATALOG',
      projectsCount: 'COMMISSIONS',
      expandFullscreen: 'Expand fullscreen',
      shotPrefix: 'Shot',
      codeAndRigor: 'CODE & RIGOR',
      nsrCertified: 'NSR-10 CERTIFIED',
      signatureMaterialsLabel: 'SIGNATURE NOBLE MATERIALS:',
      workTelemetry: 'COMMISSION:',
      categories: {
        all: 'All',
        residential: 'Country Residences',
        hospitality: 'Hospitality & Luxury Rentals',
        commercial: 'Commercial & Retail'
      }
    },
    projectModal: {
      specsTitle: 'PROJECT TECHNICAL DOSSIER',
      architecturalSpecs: 'ARCHITECTURAL DOSSIER',
      materialityTitle: 'MATERIALITY & TECHNICAL RIGOR',
      areaLabel: 'Built Area',
      locationLabel: 'Location',
      typeLabel: 'Typology',
      yearLabel: 'Completion Year',
      yearPrefix: 'YEAR',
      tierLabel: 'Estimated Investment',
      galleryLabel: 'Gallery',
      hdTakes: 'HD shots',
      signatureMaterials: 'Signature Materials',
      ctaBtn: 'REQUEST ANALYSIS FOR SIMILAR PROJECT',
      bookMeetingBtn: 'INQUIRE ABOUT THIS WORK IN CONTACT',
      whatsappBtn: 'INQUIRE ON WHATSAPP',
      closeBtn: 'CLOSE DOSSIER'
    },
    contact: {
      title: 'Start a New Project',
      subtitle: 'We coordinate an Initial Project Feasibility Session to analyze your land contours, urban zoning codes, and preliminary budgets.',
      leftTitle: 'Let’s Discuss Your Project',
      leftDesc: 'We are ready to listen to your vision. Tell us about your land, concept, or investment plans, and we will build something extraordinary.',
      emailLabel: 'CORPORATE EMAIL',
      phoneLabel: 'DIRECT LINE & WHATSAPP',
      officeLabel: 'OFFICE & ATELIER',
      formHeading: 'DIRECT CONTACT FORM',
      fullName: 'FULL NAME *',
      namePlaceholder: 'Your full name',
      emailField: 'EMAIL ADDRESS *',
      phoneField: 'MOBILE PHONE *',
      detailsField: 'PROJECT OR PROPOSAL DETAILS *',
      detailsPlaceholder: 'Describe your land location, estimated built area, intended use (residential, commercial, hospitality), or questions about our projects...',
      sendBtn: 'SEND MESSAGE TO STUDIO',
      sendingBtn: 'SENDING...',
      msgReceived: 'Message Received',
      msgReceivedDesc: 'A senior architect from our executive team will review your proposal and get in touch within 24 hours.',
      sendAnother: 'SEND ANOTHER MESSAGE',
      formName: 'Full Name',
      formPhone: 'WhatsApp Number (with country code)',
      formType: 'Project Typology',
      formLot: 'Lot Location or Municipality',
      formBudget: 'Estimated Investment Budget',
      formDate: 'Preferred Tentative Date',
      formNotes: 'Additional requirements or land details',
      submitBtn: 'SUBMIT PROJECT ANALYSIS REQUEST',
      botHint: 'Our dedicated WhatsApp bot will reach out immediately with your Google Meet video conference link.',
      successMsg: 'Request logged successfully! Your Project Analysis meeting is scheduled. Our WhatsApp concierge will ping you shortly.',
      validationError: 'Please fill in all required fields to schedule your architectural analysis.',
      qualificationBadge: 'ADMISSIONS & TECHNICAL QUALIFICATION',
      qualificationStep: 'SINGLE STEP',
      qualificationTitle: 'Preliminary Project Dossier',
      qualificationDesc: 'Structure the parameters of your future commission to coordinate architectural feasibility with ArquitecturIA technical stewardship.',
      referenceCommission: 'Reference Commission:',
      q1Label: '1. DO YOU OWN LAND OR A LOT FOR THE PROJECT? *',
      requiredBadge: 'Required',
      q2Label: '2. LOT LOCATION & TOPOGRAPHY *',
      sectorPlaceholder: 'Specific sector, rural district or condominium (e.g. Boquía, La Reserva)...',
      topographyLabel: 'Topographical Condition:',
      q3Label: '3. PROJECT TYPOLOGY & BUILT AREA *',
      areaCoveredLabel: 'Estimated Covered Area (built m²):',
      q4Label: '4. PROJECTED BUDGET & TARGET START DATE *',
      timelineLabel: 'Target date for construction or architectural design start:',
      q5Label: '5. PREFERRED CONSULTATION FORMAT *',
      q6Label: '6. CLIENT & INVESTOR CONTACT DETAILS *',
      nameLabel: 'Full Name & Surnames *',
      namePlaceholder: 'e.g. Robert Smith / Dr. Claire Dupont',
      phoneLabel: 'WhatsApp Phone *',
      emailLabelField: 'Email Address *',
      emailPlaceholder: 'investor@company.com',
      visionLabel: 'Project Vision or Specific Requirements (Optional)',
      visionPlaceholder: 'Key interests: infinity pool, exposed concrete cantilevers, cured teakwood, mountain ridge vistas...',
      submitBtnForm: 'SUBMIT PROJECT QUALIFICATION',
      submittingBtnForm: 'LOGGING INTO ATELIER...',
      preferDirectWa: 'Prefer direct consultation? Open WhatsApp with Director',
      successRadicado: 'FILING REF:',
      successTitle: 'Qualification Successfully Registered',
      successDesc: 'We have consolidated your project parameters. Our project director will review land feasibility and preliminary structural calculations.',
      summaryTitular: 'Client:',
      summaryTenure: 'Land Ownership:',
      summaryLoc: 'Location & Topography:',
      summaryType: 'Typology & Scale:',
      summaryBudget: 'Estimated Investment:',
      summaryModality: 'Preferred Format:',
      openWaBtn: 'OPEN IN WHATSAPP WITH DIRECTOR',
      submitAnotherBtn: 'Submit another inquiry'
    },
    manifesto: {
      title: 'Our Purpose',
      teamBadge: 'ARCHITECTURE & CONSTRUCTION STEWARDSHIP',
      teamStudio: 'ARQUITECTURIA ATELIER',
      philosophyBody: 'We were born in the heart of the Coffee Cultural Landscape with an unshakeable conviction: to craft spaces that transcend fleeting trends. Design is not superficial decoration, but the exact articulation between mass, zenithal light, noble concrete, and the topography that hosts it.',
      anatomyTitle: 'Material Anatomy & Textures',
      anatomyDesc: 'Explore the biomaterials, seasoned hardwoods, and stone aggregates that impart tactile character to each of our commissions.',
      pillarsTitle: 'Non-Negotiable Construction Pillars',
      pillarsDesc: 'Architectural codes governing every phase, from the initial topographic trace to the finest crafted detail on site.',
      territoryTitle: 'The Atelier on Site',
      territoryDesc: 'Visual chronicles of our site supervision, structural calculations, and active presence of our founders across each development.',
      metric1: 'Built Commissions',
      metric2: 'Years of Excellence',
      metric3: 'M² Conceptualized',
      metric4: 'NSR-10 Rigor',
      normLabel: 'ARQUITECTURIA STANDARD'
    },
    concierge: {
      title: 'ARQUITECTURIA CONCIERGE',
      subtitle: 'Architectural Advisory & Voice',
      welcome: 'Welcome to ArquitecturIA Atelier. I am your Virtual Architectural Concierge. Which commission, typology, or investment plan would you like to explore today?',
      placeholder: 'Type your inquiry or use voice input...',
      voiceListening: 'Listening to your voice...',
      voiceSpeaking: 'Speaking...',
      quick1: 'Project Feasibility',
      quick2: 'Typologies & Suites',
      quick3: 'Cost per m²',
      quick4: 'Qualify in Contact',
      suggestionsLabel: 'Suggestions:',
      bookBtn: 'GO TO CONTACT',
      catalogBtn: '24 COMMISSIONS CATALOG',
      activeVoice: 'ACTIVE VOICE',
      agentBadge: 'ARQUITECTURIA CONCIERGE',
      speakingStatus: 'VOICE SYNTHESIS ACTIVE',
      listeningStatus: 'LISTENING TO YOUR VOICE...',
      inputPlaceholder: 'Ask anything about architectural design or costs...',
      micListeningPlaceholder: 'Listening to your voice...',
      micTooltip: 'Speak to agent (Voice recognition)',
      muteTooltip: 'Mute voice',
      unmuteTooltip: 'Enable voice',
      replyCita: 'To structure your project and assess your lot, topography, and budget, visit our Contact section by clicking "GO TO CONTACT" below. Our technical director will personally review your submission.',
      replyCosto: 'Our projects range between $4.8M and $8.2M COP (~$1,200 to $2,100 USD) per m² depending on specification levels (phenolic exposed concrete, seasoned teak, travertine marble, and 3.2m floor-to-ceiling glass). We offer 24-month progressive construction payment schedules.',
      replyTurismo: 'In luxury hospitality, our flagships include Yala Suits (850 m²), Mirador de Cocora (780 m² in Salento), Bindi (560 m²), Cabañas Delirio, and Panorama Salento. Designed for exceptional asset appreciation and turnkey hotel operations.',
      replyProjects: 'We feature 24 landmark commissions across the Quindío region: Casa Nogales, Casa 49 Santa Clara, Vanessa Vidal, Bambazú, and Mirum. Each includes high-resolution photography and material dossiers in our catalog.',
      replyDefault: 'At ArquitecturIA, we design and build premier residential, commercial, and hospitality architecture in the Coffee Axis. Feel free to explore our portfolio or visit Contact to evaluate your site.'
    },
    settings: {
      modalTitle: 'ENVIRONMENT & EXPERIENCE CUSTOMIZATION',
      modalSubtitle: 'Color palette, soundscape & language',
      tabAmbient: '3 Atmospheres & Palettes',
      tabLang: 'Language',
      ambientDesc: 'Select an atmosphere to transform the color palette and procedural soundscape in real time:',
      soundscapeTitle: 'ENVIRONMENTAL SOUNDSCAPE',
      soundActive: 'SOUND ACTIVE',
      soundMuted: 'MUTED',
      volumeLabel: 'VOLUME',
      langDesc: 'Select your preferred language for the experience:',
      realtimeNotice: 'CHANGES APPLIED IN REAL TIME',
      confirmBtn: 'CONFIRM & RETURN'
    },
    social: {
      whatsapp: 'WhatsApp Concierge',
      instagram: 'Official Instagram',
      phone: 'Direct PBX Call',
      location: 'Armenia Headquarters',
      ariaTrigger: 'Official communication channels'
    },
    footer: {
      rights: '© 2026 ArquitecturIA Atelier S.A.S. All rights reserved.',
      headquarters: 'Headquarters: Armenia, Quindío · Colombian Coffee Axis',
      standards: 'NSR-10 Earthquake-Resistant Structural Engineering · Certified Urban Licenses',
      navTitle: 'NAVIGATION',
      navHome: 'HOME',
      navProjects: 'PROJECTS',
      navManifesto: 'OUR PURPOSE',
      navContact: 'CONTACT US',
      supportTitle: 'CLIENT SERVICE',
      backToTop: 'BACK TO TOP',
      allRightsReserved: 'ALL RIGHTS RESERVED.'
    }
  },

  FR: {
    brand: {
      group: 'ATELIER',
      constructor: 'COMPUTATIONNEL',
      subtitle: 'ATELIER D ARCHITECTURE',
      alt: 'ArquitecturIA — Atelier d Architecture'
    },
    nav: {
      home: 'Accueil',
      pillars: 'Piliers',
      scrolly: 'Expérience 360°',
      simulator: 'Simulateur',
      projects: 'Projets',
      contact: 'Contact',
      bioclimatic: 'Bioclimatique',
      nsr10: 'Code NSR-10',
      bookBtn: 'PRENDRE RENDEZ-VOUS',
      settingsTitle: 'Préférences & Langue',
      langSelect: 'Langue'
    },
    hero: {
      eyebrow: "STUDIO D'ARCHITECTURE & CONSTRUCTION",
      title: 'La Pureté de la Forme Habitable',
      subtitle: 'Nous concevons et réalisons des résidences de prestige, des complexes touristiques et des projets commerciaux au cœur du Paysage Culturel du Café.',
      exploreBtn: 'EXPLORER LE CATALOGUE',
      scheduleBtn: 'PLANIFIER UNE ÉTUDE DE PROJET',
      metrics: {
        works: 'Plus de 50 Projets Livrés',
        standards: '100% Conforme Norme Parasismique NSR-10',
        bioclimatic: 'Architecture Bioclimatique Passive'
      }
    },
    pillars: {
      title: 'Piliers de Création',
      subtitle: 'Notre pratique architecturale repose sur des principes constructifs inaliénables qui défient l’architecture éphémère.',
      normLabel: 'NORME ARQUITECTURIA',
      items: [
        {
          number: '01',
          title: 'Rigueur Structurale & Géométrie',
          description: 'Calcul structural rigoureux selon la norme NSR-10. Nous concevons des structures qui s’harmonisent avec le relief andin avec une noblesse spatiale totale.'
        },
        {
          number: '02',
          title: 'Intégration Bioclimatique',
          description: 'Nous exploitons les vents thermiques de la cordillère, la course du soleil et la récupération des eaux pour des résidences à empreinte minimale.'
        },
        {
          number: '03',
          title: 'Matérialité Intemporelle',
          description: 'Béton brut architectonique, teck certifié durable, acier corten et pierre locale qui vieillissent avec caractère et élégance.'
        },
        {
          number: '04',
          title: 'Direction Constructive Intégrale',
          description: 'Supervision architecturale directe des chantiers sans intermédiaires opaques. Contrôle rigoureux des coûts, délais et finitions.'
        }
      ]
    },
    scrolly: {
      phase1Tag: '01 · LA GENÈSE DE LA FORME',
      phase1Title: 'L’Esprit Architectural',
      phase1Desc: 'Chaque projet d ArquitecturIA naît comme une synapse entre pureté géométrique, nature préservée du Quindío et rigueur parasismique.',
      
      phase2Tag: '02 · PRÉCISION ORTHOGONALE',
      phase2Title: 'Ouverture du Cœur Structural',
      phase2Desc: 'Nous sculptons des volumes habitables qui dialoguent avec la cordillère. Béton banché apparent, menuiseries nobles et puits de lumière zénithale.',
      
      phase3Tag: '03 · TRANSCENDANCE SPATIALE',
      phase3Title: 'La Continuité du Vide Habité',
      phase3Desc: 'La lumière sculpte chaque plan. Des transitions diaphanes entre des intérieurs intimes et la majesté du paysage environnant.',
      
      phase4Tag: '04 · MATÉRIALITÉ & HAUT STANDING',
      phase4Title: 'Des Œuvres Qui Défient le Temps',
      phase4Desc: 'Plus de 50 réalisations entre résidences privées d’exception, édifices commerciaux et éco-resorts de classe internationale.',
      
      phase5Tag: '05 · LE PORTFOLIO COMPLET',
      phase5Title: '24 Œuvres Immortalisées',
      phase5Desc: 'Explorez en détail l’ensemble de nos projets avec fiches techniques, mémoires descriptifs et galeries haute résolution.',
      
      exploreBtn: 'DÉCOUVRIR LE PORTFOLIO',
      scrollIndicator: 'DÉFILEZ POUR PARCOURIR',
      hudSequence: 'SÉQUENCE CINÉMATIQUE · 240 IMAGES'
    },
    portfolioPortal: {
      title: 'Portfolio de 24 Œuvres',
      desc: 'Accédez à notre galerie spécialisée pour contempler chaque chef-d’œuvre en vitrine panoramique, mosaïque multi-angles ou format magazine éditorial.',
      viewFullBtn: 'VOIR LE CATALOGUE COMPLET',
      bookMeetingBtn: 'CONSULTER CE PROJET DANS CONTACT'
    },
    simulator: {
      title: 'Simulateur d’Investissement Architectural',
      subtitle: 'Estimez la fourchette budgétaire pour structurer votre projet résidentiel, hôtelier ou commercial dans la Région du Café.',
      step1: '1. TYPOLOGIE DU PROJET',
      typologyLabel: 'Typologie du Projet',
      typologyRes: 'Résidence de Campagne & Villa',
      typologyTour: 'Suites / Hôtellerie & Tourisme',
      typologyComm: 'Commercial & Retail',
      step2: '2. SURFACE CONSTRUITE ESTIMÉE',
      areaLabel: 'Surface Construite Estimée',
      compactVilla: '150 m² (Villa Compacte)',
      signatureResidence: '600 m² (Résidence Signature)',
      masterplan: '1 200 m² (Masterplan)',
      step3: '3. NIVEAU DE FINITION & MATÉRIALITÉ',
      specLabel: 'Niveau de Finition & Spécification',
      specHigh: 'Haut Standing',
      specHighDesc: 'Béton brut et teck standard',
      specSignature: 'Firma ArquitecturIA',
      specSignatureDesc: 'Béton banché phénolique, marbre et baies 3,2m',
      specUltra: 'Ultra-Luxe Monolithique',
      specUltraDesc: 'Pierres de carrière, acier corten et domotique intégrale',
      step4: '4. ACOMPTE INITIAL & RÉSERVATION',
      initialPct: 'ACOMPTE',
      estProjection: 'PROJECTION ESTIMÉE (COP)',
      costM2Label: 'Coût Estimé au m²',
      equivCost: 'Équivalent à',
      perM2: 'au m²',
      downPayment: 'Acompte Initial',
      financedBalance: 'Solde Finançable sur 24 Mois',
      monthlyFee: 'Mensualité de Chantier (24 mois)',
      perMonth: '/ mois',
      capitalGain: 'Plus-value Projetée (+28%)',
      deliveryValue: 'VALEUR PROJETÉE À LA LIVRAISON',
      totalInvestmentLabel: 'Investissement Total Projeté',
      requestStructure: 'DEMANDER UNE STRUCTURATION PATRIMONIALE',
      disclaimerBottom: '* Valeurs indicatives sous réserve d’étude topographique et géotechnique définitive.',
      disclaimer: '*Estimations paramétriques à titre indicatif pour 2026. L’étude définitive exige des analyses topographiques et géotechniques.',
      ctaBtn: 'PLANIFIER AVEC CETTE ESTIMATION'
    },
    projects: {
      title: 'Collection de 24 Œuvres',
      heading: 'Œuvres & Projets',
      subtitle: 'Architecture résidentielle, commerciale et hôtelière conçue et bâtie dans les Andes colombiennes.',
      description: 'Catalogue complet de résidences de maître, complexes hôteliers et édifices commerciaux dans la Cordillère Centrale.',
      catAll: 'Toutes les Œuvres (24)',
      catRes: 'Résidences de Campagne',
      catTour: 'Hôtellerie & Glamping',
      catComm: 'Commercial & Santé',
      viewPanoramic: 'Vitrine Panoramique',
      viewGrid: 'Mosaïque Multi-Prises',
      showcaseTab: 'Vitrine',
      gridTab: 'Mosaïque',
      editorialTab: 'Éditorial',
      searchPlaceholder: 'Rechercher par œuvre, matériau ou ville...',
      catalogCount: 'projets catalogués',
      modeLabel: 'Mode :',
      modeQuimbayas: 'Vitrine',
      modeGrid: 'Mosaïque Multi-Prises',
      modeEditorial: 'Magazine Éditorial',
      notFound: 'Aucune œuvre ne correspond à vos critères',
      resetFilters: 'Réinitialiser les filtres',
      viewGallery: 'VOIR LA GALERIE COMPLÈTE',
      bookAppointment: 'PRENDRE RENDEZ-VOUS',
      hdPhotos: 'photographies HD',
      explore: 'EXPLORER',
      cardArea: 'Surface :',
      cardLocation: 'Lieu :',
      cardYear: 'Année :',
      cardTier: 'Investissement :',
      cardBtn: 'VOIR MÉMOIRE & GALERIE',
      backToHome: 'RETOUR À L’ACCUEIL',
      badge: 'Collection Architecturale',
      showcaseTitle: 'Œuvres Phares & Matérialité',
      showcaseSubtitle: 'Découvrez l’ingénierie de pointe, les finitions bioclimatiques et la précision géométrique de nos 24 chefs-d’œuvre.',
      viewFullCatalogBtn: 'VOIR LE CATALOGUE COMPLET',
      viewGalleryCount: 'VOIR LA GALERIE COMPLÈTE',
      photosCount: 'PHOTOS',
      bookCommission: 'PLANIFIER UNE CONSULTATION',
      catalogTitle: 'CATALOGUE DES ŒUVRES',
      projectsCount: 'PROJETS',
      expandFullscreen: 'Plein écran',
      shotPrefix: 'Prise',
      codeAndRigor: 'NORME & RIGUEUR',
      nsrCertified: 'NSR-10 CERTIFIÉ',
      signatureMaterialsLabel: 'MATÉRIAUX NOBLES SIGNATURE :',
      workTelemetry: 'ŒUVRE :',
      categories: {
        all: 'Tous',
        residential: 'Résidences de Campagne',
        hospitality: 'Hôtellerie & Tourisme',
        commercial: 'Commercial & Espaces Pro'
      }
    },
    projectModal: {
      specsTitle: 'DOSSIER TECHNIQUE DE L’ŒUVRE',
      architecturalSpecs: 'DOSSIER ARCHITECTURAL',
      materialityTitle: 'MATÉRIALITÉ & RIGUEUR TECHNIQUE',
      areaLabel: 'Surface Construite',
      locationLabel: 'Localisation',
      typeLabel: 'Typologie',
      yearLabel: 'Année de Livraison',
      yearPrefix: 'ANNÉE',
      tierLabel: 'Investissement Estimé',
      galleryLabel: 'Galerie',
      hdTakes: 'prises HD',
      signatureMaterials: 'Matériaux Signatures',
      ctaBtn: 'DEMANDER UNE ÉTUDE POUR UN PROJET SIMILAIRE',
      bookMeetingBtn: 'CONSULTER CE PROJET DANS CONTACT',
      whatsappBtn: 'CONSULTER SUR WHATSAPP',
      closeBtn: 'FERMER LE DOSSIER'
    },
    contact: {
      title: 'Initier un Nouveau Projet',
      subtitle: 'Nous coordonnons une Séance d’Analyse Préliminaire pour évaluer la faisabilité de votre terrain, le cahier des charges et le budget.',
      leftTitle: 'Échangeons sur Votre Projet',
      leftDesc: 'Nous sommes à l’écoute de vos aspirations. Parlez-nous de votre terrain, de votre concept ou de vos projets d’investissement et créons ensemble l’extraordinaire.',
      emailLabel: 'COURRIEL DE L’ATELIER',
      phoneLabel: 'LIGNE DIRECTE & WHATSAPP',
      officeLabel: 'BUREAU & SALLE D’EXPOSITION',
      formHeading: 'FORMULAIRE DE CONTACT DIRECT',
      fullName: 'NOM ET PRÉNOM *',
      namePlaceholder: 'Votre nom complet',
      emailField: 'COURRIEL *',
      phoneField: 'TÉLÉPHONE MOBILE *',
      detailsField: 'DÉTAILS DU PROJET OU DU TERRAIN *',
      detailsPlaceholder: 'Indiquez la localisation du terrain, la surface estimée, l’usage prévu (résidentiel, commercial, hôtelier)...',
      sendBtn: 'ENVOYER LE MESSAGE À L’ATELIER',
      sendingBtn: 'ENVOI EN COURS...',
      msgReceived: 'Message Reçu',
      msgReceivedDesc: 'Un architecte associé de notre direction étudiera votre dossier et prendra contact avec vous sous 24 heures.',
      sendAnother: 'ENVOYER UN AUTRE MESSAGE',
      formName: 'Nom et Prénom',
      formPhone: 'Numéro WhatsApp (avec indicatif pays)',
      formType: 'Typologie du Projet',
      formLot: 'Localisation ou Commune du Terrain',
      formBudget: 'Budget d’Investissement Projeté',
      formDate: 'Date Souhaitée',
      formNotes: 'Spécifications ou détails du terrain',
      submitBtn: 'DEMANDER UNE ÉTUDE DE PROJET',
      botHint: 'Notre assistant WhatsApp vous transmettra aussitôt le lien de visioconférence Google Meet pour confirmer votre rendez-vous.',
      successMsg: 'Demande enregistrée avec succès ! Votre rendez-vous d’analyse est programmé. Notre concierge WhatsApp vous contactera sous peu.',
      validationError: 'Veuillez renseigner tous les champs obligatoires pour planifier votre analyse.',
      qualificationBadge: 'ADMISSIONS & QUALIFICATION TECHNIQUE',
      qualificationStep: 'ÉTAPE UNIQUE',
      qualificationTitle: 'Fiche Préliminaire de Projet',
      qualificationDesc: 'Structurez les coordonnées de votre futur projet pour coordonner l’évaluation architecturale avec la direction technique d ArquitecturIA.',
      referenceCommission: 'Projet de Référence :',
      q1Label: '1. DISPOSEZ-VOUS D’UN TERRAIN POUR LE PROJET ? *',
      requiredBadge: 'Requis',
      q2Label: '2. EMPLACEMENT & TOPOGRAPHIE DU TERRAIN *',
      sectorPlaceholder: 'Secteur spécifique, lieu-dit ou copropriété (ex. Boquía, Domaine La Reserva)...',
      topographyLabel: 'Condition Topographique :',
      q3Label: '3. TYPOLOGIE DU PROJET & SURFACE BÂTIE *',
      areaCoveredLabel: 'Surface Couverte Estimée (m² construits) :',
      q4Label: '4. BUDGET PROJETÉ & DATE DE DÉMARRAGE VISÉE *',
      timelineLabel: 'Date prévisionnelle pour le démarrage des études / travaux :',
      q5Label: '5. MODALITÉ D’ÉCHANGE SOUHAITÉE *',
      q6Label: '6. COORDONNÉES DU TITULAIRE / INVESTISSEUR *',
      nameLabel: 'Nom et Prénom *',
      namePlaceholder: 'Ex. M. Robert Martin / Dr. Claire Dupont',
      phoneLabel: 'Téléphone WhatsApp *',
      emailLabelField: 'Courriel Professionnel *',
      emailPlaceholder: 'investisseur@entreprise.com',
      visionLabel: 'Vision du Projet ou Spécifications Particulières (Optionnel)',
      visionPlaceholder: 'Particularités : piscine à débordement, porte-à-faux en béton brut, bois de teck, vues panoramiques...',
      submitBtnForm: 'ENREGISTRER LA QUALIFICATION DU PROJET',
      submittingBtnForm: 'ENREGISTREMENT À L’ATELIER...',
      preferDirectWa: 'Préférez un échange direct ? Écrivez au Directeur sur WhatsApp',
      successRadicado: 'DOSSIER N° :',
      successTitle: 'Qualification Enregistrée avec Succès',
      successDesc: 'Nous avons rassemblé les paramètres de votre projet. Le directeur de projet examinera la faisabilité topographique et les calculs préliminaires.',
      summaryTitular: 'Titulaire :',
      summaryTenure: 'Statut du Terrain :',
      summaryLoc: 'Emplacement & Topographie :',
      summaryType: 'Typologie & Échelle :',
      summaryBudget: 'Investissement Estimé :',
      summaryModality: 'Modalité Souhaitée :',
      openWaBtn: 'OUVRIR SUR WHATSAPP AVEC LE DIRECTEUR',
      submitAnotherBtn: 'Enregistrer une autre demande'
    },
    manifesto: {
      title: 'Notre Vocation',
      teamBadge: 'DIRECTION ARCHITECTURALE & DE CHANTIER',
      teamStudio: 'ARQUITECTURIA ATELIER',
      philosophyBody: 'Nous sommes nés au cœur du Paysage Culturel du Café avec une conviction inaltérable : bâtir des lieux qui défient les modes éphémères. Le design n’est pas un artifice décoratif, mais la composition exacte entre la masse, la lumière zénithale, le béton brut et le relief qui l’accueille.',
      anatomyTitle: 'Anatomie Matérielle & Textures',
      anatomyDesc: 'Découvrez les biomatériaux, bois traités et mélanges de pierre qui confèrent un caractère tactile à chacune de nos réalisations.',
      pillarsTitle: 'Piliers Constructifs Inaliénables',
      pillarsDesc: 'Principes architecturaux appliqués du premier relevé topographique aux détails les plus fins.',
      territoryTitle: 'L’Atelier sur le Terrain',
      territoryDesc: 'Témoignages visuels de notre suivi de chantier, calculs d’ingénierie et présence des fondateurs sur chaque projet.',
      metric1: 'Chantiers Livrés',
      metric2: 'Années d’Excellence',
      metric3: 'M² Conçus',
      metric4: 'Rigueur NSR-10',
      normLabel: 'NORME ARQUITECTURIA'
    },
    concierge: {
      title: 'CONCIERGE ARQUITECTURIA',
      subtitle: 'Conseil Architectural & Voix',
      welcome: 'Bienvenue chez ArquitecturIA Atelier. Je suis votre Concierge Virtuel. Quelle réalisation, typologie ou plan d’investissement souhaitez-vous explorer aujourd’hui ?',
      placeholder: 'Posez votre question ou utilisez le micro...',
      voiceListening: 'À votre écoute...',
      voiceSpeaking: 'Élocution en cours...',
      quick1: 'Faisabilité de Projet',
      quick2: 'Typologies & Suites',
      quick3: 'Coût au m²',
      quick4: 'Qualifier dans Contact',
      suggestionsLabel: 'Suggestions :',
      bookBtn: 'ALLER À CONTACT',
      catalogBtn: 'CATALOGUE 24 ŒUVRES',
      activeVoice: 'VOIX ACTIVE',
      agentBadge: 'CONCIERGE ARQUITECTURIA',
      speakingStatus: 'RÉPONSE VOCALE ACTIVE',
      listeningStatus: 'À VOTRE ÉCOUTE...',
      inputPlaceholder: 'Posez votre question sur la conception ou les coûts...',
      micListeningPlaceholder: 'À votre écoute...',
      micTooltip: 'Parler à l’agent (Reconnaissance vocale)',
      muteTooltip: 'Désactiver la voix',
      unmuteTooltip: 'Activer la voix',
      replyCita: 'C’est avec plaisir que nous étudions votre projet. Dans la section Contact, nous analysons la propriété du terrain, la topographie et le budget. Cliquez sur "ALLER À CONTACT" pour qualifier votre projet.',
      replyCosto: 'Nos projets se situent entre 4,8M et 8,2M COP (environ 1 200 à 2 100 USD) par m² selon le niveau de finitions (béton banché apparent, teck traité, travertin et baies vitrées de 3,2m). Modalités d’échelonnement sur 24 mois.',
      replyTurismo: 'Dans le secteur hôtelier de prestige, découvrez Yala Suits (850 m²), Mirador de Cocora (780 m² à Salento), Bindi (560 m²), Cabañas Delirio et Panorama Salento. Conçus pour une valorisation patrimoniale et une gestion hôtelière optimale.',
      replyProjects: 'Nous comptons 24 réalisations majeures dans le Quindío : Casa Nogales, Casa 49 Santa Clara, Vanessa Vidal, Bambazú et Mirum. Chacune dispose d’un dossier photographique complet et d’une fiche technique dans notre catalogue.',
      replyDefault: 'ArquitecturIA conçoit des projets résidentiels et hôteliers d’exception dans la Région du Café. Explorez notre catalogue ou rendez-vous dans Contact pour qualifier votre terrain.'
    },
    settings: {
      modalTitle: 'PERSONNALISATION D’AMBIANCE & EXPÉRIENCE',
      modalSubtitle: 'Palette chromatique, paysage sonore & langue',
      tabAmbient: '3 Ambiances & Palettes',
      tabLang: 'Langue',
      ambientDesc: 'Sélectionnez une ambiance pour transformer en direct la palette chromatique et le paysage sonore procédural :',
      soundscapeTitle: 'PAYSAGE SONORE ENVIRONNEMENTAL',
      soundActive: 'SON ACTIF',
      soundMuted: 'EN SOURDINE',
      volumeLabel: 'VOLUME',
      langDesc: 'Sélectionnez votre langue de préférence pour l’expérience :',
      realtimeNotice: 'MODIFICATIONS EN TEMPS RÉEL',
      confirmBtn: 'CONFIRMER ET RETOURNER'
    },
    social: {
      whatsapp: 'Concierge WhatsApp',
      instagram: 'Instagram Officiel',
      phone: 'Ligne PBX Directe',
      location: 'Siège à Armenia',
      ariaTrigger: 'Canaux officiels et réseaux'
    },
    footer: {
      rights: '© 2026 ArquitecturIA Atelier S.A.S. Tous droits réservés.',
      headquarters: 'Siège Principal : Armenia, Quindío · Région du Café, Colombie',
      standards: 'Ingénierie parasismique NSR-10 · Permis d’urbanisme certifiés',
      navTitle: 'NAVIGATION',
      navHome: 'ACCUEIL',
      navProjects: 'PROJETS',
      navManifesto: 'NOTRE VOCATION',
      navContact: 'CONTACTEZ-NOUS',
      supportTitle: 'RELATION CLIENT',
      backToTop: 'HAUT DE PAGE',
      allRightsReserved: 'TOUS DROITS RÉSERVÉS.'
    }
  }
};

class I18nService {
  constructor() {
    this.currentLang = this.getStoredLanguage();
  }

  getStoredLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['ES', 'EN', 'FR'].includes(stored.toUpperCase())) {
        return stored.toUpperCase();
      }
    } catch (e) {}
    return 'ES';
  }

  getLanguage() {
    return this.currentLang;
  }

  setLanguage(lang) {
    const target = (lang || 'ES').toUpperCase();
    if (!['ES', 'EN', 'FR'].includes(target)) return;
    this.currentLang = target;
    try {
      localStorage.setItem(STORAGE_KEY, target);
    } catch (e) {}

    // Dispatch global event for instant reactive re-rendering
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('arquitecturia-language-changed', {
        detail: { language: target }
      }));
    }
  }

  t(path) {
    const keys = path.split('.');
    let current = TRANSLATIONS[this.currentLang];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to Spanish
        let fallback = TRANSLATIONS.ES;
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  }

  getSpeechLang() {
    switch (this.currentLang) {
      case 'EN': return 'en-US';
      case 'FR': return 'fr-FR';
      default: return 'es-CO';
    }
  }

  translateCategory(category) {
    if (!category) return '';
    const catMap = {
      'Residencial': {
        ES: 'Residencial',
        EN: 'Residential',
        FR: 'Résidentiel'
      },
      'Turismo': {
        ES: 'Turismo',
        EN: 'Hospitality',
        FR: 'Hôtellerie'
      },
      'Comercial': {
        ES: 'Comercial',
        EN: 'Commercial',
        FR: 'Commercial'
      },
      'Residencial Campestre': {
        ES: 'Residencial Campestre',
        EN: 'Country Residences',
        FR: 'Résidences de Campagne'
      },
      'Residencial de Alta Gama': {
        ES: 'Residencial de Alta Gama',
        EN: 'High-End Residential',
        FR: 'Résidentiel Haut de Gamme'
      },
      'Residencial Exclusivo': {
        ES: 'Residencial Exclusivo',
        EN: 'Exclusive Residential',
        FR: 'Résidentiel Exclusif'
      },
      'Residencial Monolítico': {
        ES: 'Residencial Monolítico',
        EN: 'Monolithic Residential',
        FR: 'Résidentiel Monolithique'
      },
      'Residencial Vanguardia': {
        ES: 'Residencial Vanguardia',
        EN: 'Avant-Garde Residential',
        FR: 'Résidentiel d’Avant-Garde'
      },
      'Turismo & Hospitalidad': {
        ES: 'Turismo & Hospitalidad',
        EN: 'Hospitality & Luxury Rentals',
        FR: 'Hôtellerie & Tourisme'
      },
      'Turismo Boutique': {
        ES: 'Turismo Boutique',
        EN: 'Boutique Hospitality',
        FR: 'Hôtellerie Boutique'
      },
      'Turismo & Resort': {
        ES: 'Turismo & Resort',
        EN: 'Resort & Hospitality',
        FR: 'Complexe Hôtelier & Écotourisme'
      },
      'Turismo & Paisaje': {
        ES: 'Turismo & Paisaje',
        EN: 'Landscape Tourism & Glamping',
        FR: 'Tourisme de Paysage & Nature'
      },
      'Hotelería Boutique': {
        ES: 'Hotelería Boutique',
        EN: 'Boutique Hospitality',
        FR: 'Hôtellerie Boutique'
      },
      'Glamping & Suites de Lujo': {
        ES: 'Glamping & Suites de Lujo',
        EN: 'Luxury Glamping & Suites',
        FR: 'Glamping & Suites de Luxe'
      },
      'Comercial & Negocios': {
        ES: 'Comercial & Negocios',
        EN: 'Commercial & Business',
        FR: 'Commercial & Affaires'
      },
      'Comercial & Gastronomía': {
        ES: 'Comercial & Gastronomía',
        EN: 'Commercial & Gastronomy',
        FR: 'Commercial & Gastronomie'
      },
      'Comercial Gastronómico': {
        ES: 'Comercial Gastronómico',
        EN: 'Commercial & Dining',
        FR: 'Commercial & Restauration'
      },
      'Comercial Boutique': {
        ES: 'Comercial Boutique',
        EN: 'Boutique Commercial',
        FR: 'Commercial Boutique'
      },
      'Comercial & Bakery': {
        ES: 'Comercial & Bakery',
        EN: 'Commercial & Bakery',
        FR: 'Commercial & Boulangerie'
      },
      'Comercial Retail': {
        ES: 'Comercial Retail',
        EN: 'Commercial Retail',
        FR: 'Commercial & Vente'
      },
      'Comercial & Retail': {
        ES: 'Comercial & Retail',
        EN: 'Commercial & Retail',
        FR: 'Commercial & Espaces Pro'
      },
      'Comercial & Wellness': {
        ES: 'Comercial & Wellness',
        EN: 'Commercial & Wellness',
        FR: 'Commercial & Bien-Être'
      },
      'Comercial & Bar': {
        ES: 'Comercial & Bar',
        EN: 'Commercial & Lounge Bar',
        FR: 'Commercial & Bar Lounge'
      },
      'Comercial Atelier & Moda': {
        ES: 'Comercial Atelier & Moda',
        EN: 'Fashion Atelier & Retail',
        FR: 'Atelier de Mode & Commercial'
      },
      'Clínica & Salud Especializada': {
        ES: 'Clínica & Salud Especializada',
        EN: 'Clinic & Healthcare Hub',
        FR: 'Clinique & Santé Spécialisée'
      },
      'Arquitectura Tropical': {
        ES: 'Arquitectura Tropical',
        EN: 'Tropical Architecture',
        FR: 'Architecture Tropicale'
      },
      'Minimalismo y Luz': {
        ES: 'Minimalismo y Luz',
        EN: 'Minimalism & Light',
        FR: 'Minimalisme et Lumière'
      },
      'Salento, Quindío': {
        ES: 'Salento, Quindío',
        EN: 'Salento, Quindío',
        FR: 'Salento, Quindío'
      },
      'Todos': {
        ES: 'Todos',
        EN: 'All',
        FR: 'Tous'
      }
    };
    return catMap[category]?.[this.currentLang] || category;
  }

  translateStatus(status) {
    if (!status) return '';
    const statusMap = {
      'Construido / Entregado': {
        ES: 'Construido / Entregado',
        EN: 'Built / Delivered',
        FR: 'Construit / Livré'
      },
      'Construido / Habitado': {
        ES: 'Construido / Habitado',
        EN: 'Built / Inhabited',
        FR: 'Construit / Habité'
      },
      'Construido / Obra Insignia': {
        ES: 'Construido / Obra Insignia',
        EN: 'Built / Landmark Commission',
        FR: 'Construit / Chef-d’Œuvre'
      },
      'Operativo / Turismo VIP': {
        ES: 'Operativo / Turismo VIP',
        EN: 'Operational / VIP Hospitality',
        FR: 'Opérationnel / Hôtellerie VIP'
      },
      'Construido / Operativo': {
        ES: 'Construido / Operativo',
        EN: 'Built / Operational',
        FR: 'Construit / Opérationnel'
      },
      'Operativo / Destino Ícono': {
        ES: 'Operativo / Destino Ícono',
        EN: 'Operational / Iconic Destination',
        FR: 'Opérationnel / Destination Emblématique'
      },
      'Operativo / Hospitalidad': {
        ES: 'Operativo / Hospitalidad',
        EN: 'Operational / Hospitality',
        FR: 'Opérationnel / Hôtellerie'
      },
      'Operativo / Complejo Turístico': {
        ES: 'Operativo / Complejo Turístico',
        EN: 'Operational / Tourism Resort',
        FR: 'Opérationnel / Complexe Touristique'
      },
      'Operativo / Turismo': {
        ES: 'Operativo / Turismo',
        EN: 'Operational / Hospitality',
        FR: 'Opérationnel / Tourisme'
      },
      'Construido': {
        ES: 'Construido',
        EN: 'Built / Delivered',
        FR: 'Construit / Livré'
      },
      'En Obra': {
        ES: 'En Obra',
        EN: 'Under Construction',
        FR: 'En Chantier'
      },
      'Diseño': {
        ES: 'En Diseño',
        EN: 'In Design',
        FR: 'En Conception'
      }
    };
    return statusMap[status]?.[this.currentLang] || status;
  }

  translateMaterial(material) {
    if (!material) return '';
    const matMap = {
      'Concreto Visto': { ES: 'Concreto Visto', EN: 'Exposed Concrete', FR: 'Béton Brut Apparent' },
      'Concreto Fenólico': { ES: 'Concreto Fenólico', EN: 'Phenolic Formwork Concrete', FR: 'Béton Banché Phénolique' },
      'Concreto Visto Tablado': { ES: 'Concreto Visto Tablado', EN: 'Board-Formed Concrete', FR: 'Béton Banché Planche' },
      'Concreto Blanco': { ES: 'Concreto Blanco', EN: 'White Architectural Concrete', FR: 'Béton Blanc Architectonique' },
      'Concreto Vaciado': { ES: 'Concreto Vaciado', EN: 'Cast-in-Place Concrete', FR: 'Béton Coulé sur Place' },
      'Estructura Metálica': { ES: 'Estructura Metálica', EN: 'Structural Steel Frame', FR: 'Structure Métallique' },
      'Cristal Templado': { ES: 'Cristal Templado', EN: 'Tempered Glass', FR: 'Verre Trempé' },
      'Iluminación Lineal Cálida 2700K': { ES: 'Iluminación Lineal Cálida 2700K', EN: '2700K Warm Linear Lighting', FR: 'Éclairage Linéaire Chaud 2700K' },
      'Madera de Teka': { ES: 'Madera de Teka', EN: 'Teak Hardwood', FR: 'Bois de Teck' },
      'Teka Tratada': { ES: 'Teka Tratada', EN: 'Treated Teak Hardwood', FR: 'Teck Traité' },
      'Pisos en Concreto Pulido': { ES: 'Pisos en Concreto Pulido', EN: 'Polished Concrete Floors', FR: 'Sols en Béton Ciré' },
      'Ventanería Piso a Techo': { ES: 'Ventanería Piso a Techo', EN: 'Floor-to-Ceiling Glazing', FR: 'Baies Vitrées Toute Hauteur' },
      'Mármol Negro Marquina': { ES: 'Mármol Negro Marquina', EN: 'Nero Marquina Marble', FR: 'Marbre Noir Marquina' },
      'Acero Corten': { ES: 'Acero Corten', EN: 'Corten Steel', FR: 'Acier Corten' },
      'Piedra Natural de Cantera': { ES: 'Piedra Natural de Cantera', EN: 'Natural Quarry Stone', FR: 'Pierre Naturelle de Carrière' },
      'Celosías de Concreto': { ES: 'Celosías de Concreto', EN: 'Concrete Brise-Soleil', FR: 'Claustras en Béton' },
      'Pórticos de Gran Formato': { ES: 'Pórticos de Gran Formato', EN: 'Large-Format Portal Frames', FR: 'Portiques Grand Format' },
      'Palmas Nativas': { ES: 'Palmas Nativas', EN: 'Native Andean Palms', FR: 'Palmiers Andins Indigènes' },
      'Acabados en Cal Hidráulica': { ES: 'Acabados en Cal Hidráulica', EN: 'Hydraulic Lime Finishes', FR: 'Finitions à la Chaux Hydraulique' },
      'Jardines Interiores': { ES: 'Jardines Interiores', EN: 'Interior Courtyards', FR: 'Jardins Intérieurs' },
      'Muros Texturizados': { ES: 'Muros Texturizados', EN: 'Textured Stucco Walls', FR: 'Murs Texturés' },
      'Acero Negro Mate': { ES: 'Acero Negro Mate', EN: 'Matte Black Steel', FR: 'Acier Noir Mat' },
      'Mobiliario a Medida': { ES: 'Mobiliario a Medida', EN: 'Custom Millwork', FR: 'Mobilier sur Mesure' },
      'Microcemento': { ES: 'Microcemento', EN: 'Microcement', FR: 'Microciment' },
      'Espejos Tonalizados': { ES: 'Espejos Tonalizados', EN: 'Tinted Architectural Mirrors', FR: 'Miroirs Teintés' },
      'Perfiles de Aluminio Grafito': { ES: 'Perfiles de Aluminio Grafito', EN: 'Graphite Aluminum Profiles', FR: 'Profilés Aluminium Graphite' },
      'Madera de Roble': { ES: 'Madera de Roble', EN: 'Oak Hardwood', FR: 'Bois de Chêne' },
      'Madera Tratada': { ES: 'Madera Tratada', EN: 'Seasoned Hardwood', FR: 'Bois Traité' },
      'Acero': { ES: 'Acero', EN: 'Structural Steel', FR: 'Acier' },
      'Cristal': { ES: 'Cristal', EN: 'Architectural Glass', FR: 'Verre Architectural' },
      'Madera de Nogal': { ES: 'Madera de Nogal', EN: 'Walnut Wood', FR: 'Bois de Noyer' },
      'Hierro Negro': { ES: 'Hierro Negro', EN: 'Black Wrought Iron', FR: 'Fer Forgé Noir' },
      'Baldosa Rústica': { ES: 'Baldosa Rústica', EN: 'Artisanal Clay Tiles', FR: 'Carreaux Rustiques en Terre Cuite' },
      'Ladrillo a la Vista': { ES: 'Ladrillo a la Vista', EN: 'Exposed Brick', FR: 'Brique Apparente' },
      'Vigas IPE Expuestas': { ES: 'Vigas IPE Expuestas', EN: 'Exposed IPE Steel Beams', FR: 'Poutres IPE Apparentes' },
      'Madera Maciza': { ES: 'Madera Maciza', EN: 'Solid Timber', FR: 'Bois Massif' },
      'Iluminación Suspendida': { ES: 'Iluminación Suspendida', EN: 'Pendant Lighting', FR: 'Éclairage Suspendu' },
      'Solid Surface Antibacterial': { ES: 'Solid Surface Antibacterial', EN: 'Antibacterial Solid Surface', FR: 'Surface Solide Antibactérienne' },
      'Madera Clara Natural': { ES: 'Madera Clara Natural', EN: 'Natural Light Wood', FR: 'Bois Clair Naturel' },
      'Ventanería Acústica': { ES: 'Ventanería Acústica', EN: 'Acoustic Double Glazing', FR: 'Menuiserie Acoustique' },
      'Iluminación Indirecta': { ES: 'Iluminación Indirecta', EN: 'Cove Indirect Lighting', FR: 'Éclairage Indirect' },
      'Estructura Mixta': { ES: 'Estructura Mixta', EN: 'Composite Hybrid Structure', FR: 'Structure Mixte Acier-Béton' },
      'Cubierta en Pendiente': { ES: 'Cubierta en Pendiente', EN: 'Sloped Architectural Roof', FR: 'Toiture en Pente' },
      'Terrazas de Madera': { ES: 'Terrazas de Madera', EN: 'Timber Sun Decks', FR: 'Terrasses en Bois' },
      'Piedra de Río': { ES: 'Piedra de Río', EN: 'River Cobblestone', FR: 'Galets de Rivière' },
      'Pérgolas de Madera': { ES: 'Pérgolas de Madera', EN: 'Timber Pergolas', FR: 'Pergolas en Bois' },
      'Pisos Porcelánicos Gran Formato': { ES: 'Pisos Porcelánicos Gran Formato', EN: 'Large-Format Porcelain Tiles', FR: 'Grès Cérame Grand Format' },
      'Carpintería en Cedro': { ES: 'Carpintería en Cedro', EN: 'Cedar Joinery', FR: 'Menuiserie en Cèdre' },
      'Yeso Escultural': { ES: 'Yeso Escultural', EN: 'Sculptural Plasterwork', FR: 'Plâtre Sculptural' },
      'Perfiles Ocultos': { ES: 'Perfiles Ocultos', EN: 'Concealed Framing', FR: 'Profilés Dissimulés' },
      'Pintura Mineral al Silicato': { ES: 'Pintura Mineral al Silicato', EN: 'Silicate Mineral Coating', FR: 'Peinture Minérale au Silicate' },
      'Mármol Verde Guatemala': { ES: 'Mármol Verde Guatemala', EN: 'Verde Guatemala Marble', FR: 'Marbre Vert Guatemala' },
      'Madera Estructural Certificada': { ES: 'Madera Estructural Certificada', EN: 'Certified Structural Timber', FR: 'Bois Structural Certifié' },
      'Cimentación Puntual': { ES: 'Cimentación Puntual', EN: 'Isolated Footing Foundation', FR: 'Fondations Ponctuelles' },
      'Vidrio Laminado Extra-Claro': { ES: 'Vidrio Laminado Extra-Claro', EN: 'Extra-Clear Laminated Glass', FR: 'Verre Feuilleté Extra-Clair' },
      'Cubiertas Verdes': { ES: 'Cubiertas Verdes', EN: 'Living Green Roofs', FR: 'Toitures Végétalisées' },
      'Muros de Arcilla Compactada': { ES: 'Muros de Arcilla Compactada', EN: 'Rammed Earth Walls', FR: 'Murs en Pisé' },
      'Bambú Curado': { ES: 'Bambú Curado', EN: 'Seasoned Guadua Bamboo', FR: 'Bambou Guadua Traité' },
      'Lino Natural': { ES: 'Lino Natural', EN: 'Natural Linen', FR: 'Lin Naturel' },
      'Luz Cenital Cenital': { ES: 'Luz Cenital', EN: 'Zenithal Skylights', FR: 'Puits de Lumière Zénithale' },
      'Bloques de Concreto Arquitectónico': { ES: 'Bloques de Concreto Arquitectónico', EN: 'Architectural Concrete Blocks', FR: 'Blocs de Béton Architectonique' },
      'Enchapados en Roble Oscuro': { ES: 'Enchapados en Roble Oscuro', EN: 'Dark Oak Veneers', FR: 'Placages en Chêne Foncé' },
      'Ventanales Schüco': { ES: 'Ventanales Schüco', EN: 'Schüco High-End Glazing', FR: 'Menuiseries Schüco' },
      'Césped Perimetral': { ES: 'Césped Perimetral', EN: 'Perimeter Landscaping', FR: 'Pelouse Périphérique' },
      'Pino Canadiense Tratado': { ES: 'Pino Canadiense Tratado', EN: 'Treated Canadian Pine', FR: 'Pin Canadien Traité' },
      'Piedra Pizarra': { ES: 'Piedra Pizarra', EN: 'Natural Slate', FR: 'Pierre d’Ardoise' },
      'Calentamiento Solar Pasivo': { ES: 'Calentamiento Solar Pasivo', EN: 'Passive Solar Heating', FR: 'Chauffage Solaire Passif' },
      'Tejidos Artesanales': { ES: 'Tejidos Artesanales', EN: 'Artisanal Woven Textiles', FR: 'Tissages Artisanaux' },
      'Estructuras Metálicas Livianas': { ES: 'Estructuras Metálicas Livianas', EN: 'Light-Gauge Steel Framing', FR: 'Ossatures Métalliques Légères' },
      'Decks en WPC de Alta Durabilidad': { ES: 'Decks en WPC de Alta Durabilidad', EN: 'High-Durability WPC Decks', FR: 'Lames de Terrasse WPC' },
      'Vidrio Solar-E': { ES: 'Vidrio Solar-E', EN: 'Solar-E Low-Emissivity Glass', FR: 'Vitrage Solaire Basse Émissivité' },
      'Mampostería Local': { ES: 'Mampostería Local', EN: 'Artisanal Local Masonry', FR: 'Maçonnerie Artisanale Locale' },
      'Pórticos de Acero': { ES: 'Pórticos de Acero', EN: 'Structural Steel Portals', FR: 'Portiques en Acier' },
      'Maderas Nativas Sostenibles': { ES: 'Maderas Nativas Sostenibles', EN: 'Sustainable Native Hardwoods', FR: 'Bois Indigènes Durables' },
      'Gres Porcelánico': { ES: 'Gres Porcelánico', EN: 'Porcelain Stoneware', FR: 'Grès Cérame' },
      'Espejos de Agua': { ES: 'Espejos de Agua', EN: 'Reflecting Water Basins', FR: 'Miroirs d’Eau' },
      'Carpintería en Cedro Caqueta': { ES: 'Carpintería en Cedro Caqueta', EN: 'Caquetá Cedar Joinery', FR: 'Menuiserie en Cèdre du Caquetá' },
      'Granito Flameado': { ES: 'Granito Flameado', EN: 'Flamed Granite', FR: 'Granit Flammé' },
      'Terrazo Negro Pulido': { ES: 'Terrazo Negro Pulido', EN: 'Polished Black Terrazzo', FR: 'Terrazzo Noir Poli' },
      'Bronce Envejecido': { ES: 'Bronce Envejecido', EN: 'Aged Architectural Bronze', FR: 'Bronze Vieilli' },
      'Cueros Envejecidos': { ES: 'Cueros Envejecidos', EN: 'Patinated Full-Grain Leather', FR: 'Cuirs Vieillis Patinés' },
      'Iluminación Cálida 2200K': { ES: 'Iluminación Cálida 2200K', EN: '2200K Amber Ambient Lighting', FR: 'Éclairage Chaud Ambré 2200K' },
      'Celosías Rítmicas de Madera': { ES: 'Celosías Rítmicas de Madera', EN: 'Rhythmic Timber Louvers', FR: 'Brise-Soleil Rythmique en Bois' },
      'Espejos de Piso a Techo': { ES: 'Espejos de Piso a Techo', EN: 'Floor-to-Ceiling Mirrors', FR: 'Miroirs Toute Hauteur' },
      'Mármol Calacatta': { ES: 'Mármol Calacatta', EN: 'Calacatta Marble', FR: 'Marbre Calacatta' },
      'Iluminación Difusa CRI 98': { ES: 'Iluminación Difusa CRI 98', EN: 'CRI 98 Museum-Grade Diffused Lighting', FR: 'Éclairage Diffus Muséal IRC 98' }
    };
    return matMap[material]?.[this.currentLang] || material;
  }

  translateProjectDescription(projectId, fallbackDesc) {
    if (!projectId) return fallbackDesc || '';
    const descMap = {
      'mirum': {
        ES: 'Complejo comercial de vanguardia con iluminación arquitectónica perimetral y diseño volumétrico de alta presencia nocturna.',
        EN: 'Cutting-edge commercial complex featuring perimeter architectural lighting and volumetric night presence.',
        FR: 'Complexe commercial d’avant-garde avec éclairage périmétrique et forte présence volumétrique nocturne.'
      },
      'casa-49-santa-clara': {
        ES: 'Residencia unifamiliar de lujo con integración fluida interior-exterior, carpintería en maderas nobles y cielorrasos suspendidos.',
        EN: 'Luxury single-family residence with seamless indoor-outdoor continuity, noble wood joinery, and suspended architectural ceilings.',
        FR: 'Résidence unifamiliale de prestige alliant continuité dedans-dehors, menuiserie en bois noble et plafonds suspendus.'
      },
      'casa-nogales': {
        ES: 'Obra monumental orientada al paisaje cafetero. Cuenta con terraza en voladizo, comedor en doble altura y cocina de autor.',
        EN: 'Monumental residence oriented towards the coffee landscape. Features cantilevered terrace, double-height dining volume, and bespoke gourmet kitchen.',
        FR: 'Demeure monumentale tournée vers le paysage caféier, avec terrasse en porte-à-faux, salle à manger double hauteur et cuisine de maître.'
      },
      'yala-suits': {
        ES: 'Complejo de suites turísticas con pórticos de acceso esculturales, celosías de protección solar y paisajismo nativo.',
        EN: 'Boutique hospitality suites complex with sculptural portal frames, sun-shading brise-soleil, and native Andean landscaping.',
        FR: 'Complexe de suites hôtelières de luxe avec portiques sculpturaux, brise-soleil en claustras et aménagement paysager indigène.'
      },
      'bloom-garden': {
        ES: 'Espacio comercial y gastronómico donde la vegetación interior dialogue con superficies texturizadas y celosías de autor.',
        EN: 'Commercial and gastronomic venue where lush indoor botanical courtyards dialogue with textured mineral surfaces and bespoke louvers.',
        FR: 'Espace commercial et gastronomique où la végétation intérieure dialogue avec des surfaces texturées et des claustras d’auteur.'
      },
      'cinco': {
        ES: 'Espacio comercial contemporáneo de líneas puras, diseño lumínico escenográfico y mobiliario monolítico integrado.',
        EN: 'Contemporary commercial venue defined by clean geometric lines, scenographic architectural lighting, and integrated monolithic millwork.',
        FR: 'Espace commercial contemporain aux lignes pures, mise en scène lumineuse scénographique et mobilier monolithique intégré.'
      },
      'consultorio-t-c-': {
        ES: 'Proyecto de arquitectura y diseño contemporáneo concebido con altos estándares de materialidad noble.',
        EN: 'Contemporary medical consultation studio crafted under the highest standards of noble materiality and acoustic serenity.',
        FR: 'Cabinet de consultation médicale contemporain conçu selon les plus hauts standards de matérialité noble et de sérénité acoustique.'
      },
      'brod': {
        ES: 'Boutique gastronómica artesanal con barra de concreto vaciado en sitio, vitrinas empotradas y hornos integrados al salón.',
        EN: 'Artisanal gastronomic boutique featuring a cast-in-place raw concrete counter, flush architectural vitrines, and visible bakehouse hearths.',
        FR: 'Boutique gastronomique artisanale avec comptoir en béton banché coulé sur place, vitrines affleurantes et fournil ouvert.'
      },
      'chanchi': {
        ES: 'Concepto gastronómico de autor con espacialidad abierta, circulaciones dinámicas y materiales resistentes de estética industrial refinada.',
        EN: 'Signature dining concept with fluid open spatiality, dynamic circulation paths, and resilient materials in refined industrial aesthetics.',
        FR: 'Concept de restauration signature aux volumes ouverts, circulations fluides et matériaux pérennes d’esthétique industrielle raffinée.'
      },
      'consultorio-mq': {
        ES: 'Clínica odontológica y estética de alta gama con gabinetes privados, sala de espera vip y divisiones de privacidad de vidrio esmerilado.',
        EN: 'High-end dental and aesthetic clinic featuring private operatory suites, VIP lounge, and fluted frosted glass privacy partitions.',
        FR: 'Clinique dentaire et esthétique haut de gamme avec cabinets privés, salon VIP et cloisons de discrétion en verre cannelé sablé.'
      },
      'bambazu': {
        ES: 'Residencia campestre que reinterpreta las técnicas vernáculas en clave minimalista, con vistas panorámicas a la cordillera.',
        EN: 'Country residence reinterpreting vernacular construction through a minimalist lens, opening panoramic vistas onto the central cordillera.',
        FR: 'Résidence de campagne réinterprétant les techniques vernaculaires avec un minimalisme épuré, ouverte sur la cordillère centrale.'
      },
      'casa-45-entremaderos': {
        ES: 'Vivienda de alto estatus con articulación de patios internos, cocina social abierta y zona húmeda con borde infinito.',
        EN: 'High-status country estate articulated around internal landscape patios, an open social kitchen, and an infinity-edge wellness pool.',
        FR: 'Propriété de maître articulée autour de patios paysagers intérieurs, cuisine ouverte conviviale et piscine à débordement.'
      },
      'alce': {
        ES: 'Local comercial de autor con diseño de escaparates, iluminación focalizada de producto y acabados limpios.',
        EN: 'Signature commercial retail boutique featuring tailored display showcases, focal product lighting, and crisp minimalist finishes.',
        FR: 'Boutique commerciale haut de gamme avec vitrines de présentation sur mesure, éclairage focalisé et finitions épurées.'
      },
      'mirador-de-cocora': {
        ES: 'Mirador y pabellón ecoturístico de contemplación absoluta de las palmas de cera, con respeto ecológico y mínima huella en el suelo.',
        EN: 'Eco-tourism viewpoint and contemplation pavilion framing the iconic wax palms, built with deep ecological respect and minimal land footprint.',
        FR: 'Belvédère écotouristique et pavillon de contemplation des palmiers de cire, édifié dans le respect écologique et à faible empreinte au sol.'
      },
      'mantra': {
        ES: 'Espacio comercial y centro de experiencias holísticas con texturas táctiles, claraboyas cenitales y aislamiento sonoro pasivo.',
        EN: 'Commercial and holistic wellness sanctuary featuring tactile textures, overhead zenithal lightwells, and passive acoustic isolation.',
        FR: 'Espace commercial et sanctuaire de bien-être holistique aux textures tactiles, puits de lumière zénithale et isolation acoustique passive.'
      },
      'casa-del-r-o': {
        ES: 'Proyecto de arquitectura y diseño contemporáneo concebido con altos estándares de materialidad noble.',
        EN: 'Contemporary riverside residence masterfully merging cast concrete, seasoned teak, and passive natural ventilation along the stream.',
        FR: 'Résidence contemporaine au bord de l’eau unissant béton brut, teck traité et ventilation naturelle le long de la rivière.'
      },
      'casa-f-s': {
        ES: 'Volumetría sobria y contundente basada en prismas ortogonales puros con vacíos estratégicos que enmarcan la vegetación.',
        EN: 'Sober and monumental massing composed of pure orthogonal prisms with strategic voids that capture and frame the mountain greenery.',
        FR: 'Volumétrie sobre et monumentale en prismes orthogonaux purs, ponctuée de vides stratégiques qui cadrent la nature andine.'
      },
      'bindi': {
        ES: 'Hotel boutique de atmósfera íntima y mística, con habitaciones suspendidas entre la niebla y terrazas de avistamiento.',
        EN: 'Boutique hotel with an intimate, mystical atmosphere, featuring mist-embraced cantilevered suites and panoramic observation decks.',
        FR: 'Hôtel boutique à l’atmosphère intime et mystique, avec suites suspendues dans la brume et terrasses panoramiques d’observation.'
      },
      'panorama-salento': {
        ES: 'Masterplan hotelero y cabañas de lujo con visuales 360° sobre el cañón del Quindío. Integración topográfica milimétrica.',
        EN: 'Hospitality masterplan and luxury villas boasting 360° unobstructed views across the Quindío canyon with millimetric topographic adaptation.',
        FR: 'Plan directeur hôtelier et villas de prestige offrant des vues panoramiques à 360° sur le canyon du Quindío avec adaptation millimétrique au relief.'
      },
      'caba-as-delirio': {
        ES: 'Proyecto de arquitectura y diseño contemporáneo concebido con altos estándares de materialidad noble.',
        EN: 'Eco-luxury glamping retreat blending organic timber architecture, private hydrothermal plunge pools, and Andean sunset vistas.',
        FR: 'Retraite éco-luxe de glamping mariant architecture en bois courbé, bassins hydrothermaux privés et couchers de soleil andins.'
      },
      'panorama-tapao': {
        ES: 'Desarrollo de alojamiento campestre premium con club house, pérgolas bioclimáticas y piscina de entrenamiento.',
        EN: 'Premium rural accommodation resort featuring an architectural clubhouse, bioclimatic timber pergolas, and a full-length lap pool.',
        FR: 'Complexe hôtelier de campagne haut de gamme avec club-house d’architecte, pergolas bioclimatiques et couloir de nage.'
      },
      'casa-pt': {
        ES: 'Diseño geométrico riguroso de doble crujía con patio central de agua que refresca térmicamente toda la residencia de forma pasiva.',
        EN: 'Rigorous geometric double-bay layout with a central reflecting water court that passively cools the entire residence year-round.',
        FR: 'Conception géométrique rigoureuse à double travée avec patio d’eau central rafraîchissant toute la demeure de façon passive.'
      },
      'ember': {
        ES: 'Espacio comercial y bar de cócteles de autor con iluminación escultural, barras de terrazo fundido y techos oscuros texturizados.',
        EN: 'Signature cocktail lounge with sculptural mood lighting, cast terrazzo bar counters, and textured dark ceilings.',
        FR: 'Bar à cocktails d’auteur doté d’un éclairage sculptural tamisé, comptoirs en terrazzo coulé et plafonds sombres texturés.'
      },
      'vanessa-vidal': {
        ES: 'Atelier de moda y estética de alta costura con pasillos de celosías rítmicas, probadores de lujo y recepción monolítica.',
        EN: 'Haute-couture fashion atelier and beauty studio featuring rhythmic wood screen corridors, luxury fitting salons, and a monolithic stone reception.',
        FR: 'Atelier de haute couture et institut de beauté avec galeries de claustras en bois, salons d’essayage VIP et accueil en pierre monolithique.'
      }
    };
    return descMap[projectId]?.[this.currentLang] || fallbackDesc;
  }
}

export const i18n = new I18nService();
