// Data for Client Project Tracker (Portal Privado de Seguimiento de Obras)
// Uses verified high-definition photography from ArquitecturIA's portfolio

export const TRACKING_PROJECTS_DATA = [
  {
    contractCode: 'ARQ-2024-001',
    clientPhone: '3124567890',
    clientName: 'Familia Van Der Berg',
    projectTitle: 'Residencia Aethelgard',
    location: 'Cordillera Central · Sector Campestre',
    area: '480 m²',
    startDate: '15 Enero 2024',
    estimatedDelivery: '30 Noviembre 2024',
    residentArchitect: 'Arq. Andrés Echeverri (Director Residente)',
    residentPhone: '573008902400',
    overallProgress: 78,
    statusBadge: 'EN EJECUCIÓN · RITMO ÓPTIMO',
    coverImage: '/extracted/arquitecturia/assets/hero-residence-2.jpg',
    phases: [
      { id: 'p1', name: 'Preliminares & Replanteo Topográfico', progress: 100, status: 'Completado', date: 'Feb 2024' },
      { id: 'p2', name: 'Cimentación, Zapatas & Muros de Contención NSR-10', progress: 100, status: 'Completado', date: 'Abr 2024' },
      { id: 'p3', name: 'Estructura Portante & Placas de Concreto Visto', progress: 90, status: 'En Ejecución', date: 'Ago 2024' },
      { id: 'p4', name: 'Mampostería, Redes Hidrosanitarias & Eléctricas', progress: 65, status: 'En Ejecución', date: 'Sep 2024' },
      { id: 'p5', name: 'Acabados Nobles, Ventanería & Maderas Tropicales', progress: 35, status: 'Iniciando', date: 'Oct 2024' }
    ],
    fieldLog: [
      {
        id: 'log-1',
        date: '18 Septiembre 2024',
        title: 'Vaciado de Losa Aligerada & Concreto Visto',
        description: 'Se completó con éxito el vaciado de losa nivel 2 con concreto premezclado 4.000 PSI de matriz limpia. Resultados de probetas a 14 días cumplen el 112% de la resistencia proyectada bajo norma NSR-10.',
        image: '/extracted/arquitecturia/assets/tracking-concrete-pour.jpg'
      },
      {
        id: 'log-2',
        date: '04 Septiembre 2024',
        title: 'Encofrado Fenólico & Módulos Arquitectónicos',
        description: 'Armado minucioso de formaleta fenólica importada para garantizar el acabado arquitectónico sin burbujas en los muros de la zona social y el acceso principal.',
        image: '/extracted/arquitecturia/assets/tracking-steel-structure.jpg'
      },
      {
        id: 'log-3',
        date: '20 Agosto 2024',
        title: 'Tendido de Redes Eléctricas e Hidráulicas Embebidas',
        description: 'Inspección técnica de tuberías de presión y ductos para domótica antes del fundido estructural. Aprobación favorable de la interventoría.',
        image: '/extracted/arquitecturia/assets/tracking-timber-deck.jpg'
      }
    ],
    latestCommittee: {
      date: '19 Septiembre 2024',
      number: 'Comité Técnico N° 16',
      attendees: ['Arq. Director de Obra', 'Ing. Calculista Estructural', 'Interventoría Externa', 'Residente de Obra'],
      decisions: [
        'Aprobación de la muestra de concreto visto cepillado para chimenea principal.',
        'Se coordina despacho de perfilería de aluminio con ruptura de puente térmico para el 10 de octubre.',
        'Cronograma en línea: 3 días de anticipación respecto al cronograma maestro contractual.'
      ],
      nextMilestone: 'Desencofrado de losa superior y prueba hidrostática de tanques de reserva subterráneos.'
    }
  },
  {
    contractCode: 'ARQ-2024-002',
    clientPhone: '3109876543',
    clientName: 'Desarrollos Patrimoniales S.A.S.',
    projectTitle: 'Villa Lumina',
    location: 'Reserva Campestre · Altos de la Cordillera',
    area: '620 m²',
    startDate: '01 Noviembre 2023',
    estimatedDelivery: '15 Octubre 2024',
    residentArchitect: 'Arq. Mauricio Henao (Residente de Acabados)',
    residentPhone: '573008902400',
    overallProgress: 92,
    statusBadge: 'FASE FINAL · ACABADOS DE AUTOR',
    coverImage: '/extracted/arquitecturia/assets/hero-residence-1.jpg',
    phases: [
      { id: 'p1', name: 'Preliminares & Movimiento de Tierras', progress: 100, status: 'Completado', date: 'Dic 2023' },
      { id: 'p2', name: 'Cimentación Profunda & Caissons', progress: 100, status: 'Completado', date: 'Feb 2024' },
      { id: 'p3', name: 'Estructura Monolítica', progress: 100, status: 'Completado', date: 'May 2024' },
      { id: 'p4', name: 'Redes Técnicas & Enlucidos', progress: 95, status: 'Completado', date: 'Jul 2024' },
      { id: 'p5', name: 'Carpintería en Teka, Iluminación & Deck Piscina', progress: 85, status: 'En Ejecución', date: 'Sep 2024' }
    ],
    fieldLog: [
      {
        id: 'log-201',
        date: '16 Septiembre 2024',
        title: 'Instalación de Deck en Madera Teka Tratada',
        description: 'Montaje de estructura flotante para deck en madera teka con fijaciones ocultas de acero inoxidable. Aplicación de aceite hidrófugo con protección UV.',
        image: '/extracted/arquitecturia/assets/tracking-timber-deck.jpg'
      },
      {
        id: 'log-202',
        date: '01 Septiembre 2024',
        title: 'Montaje de Ventanería Monumental de 3.20m',
        description: 'Instalación de paños de vidrio laminado de 8+8mm con perfilería europea oculta en zona de doble altura.',
        image: '/extracted/arquitecturia/assets/hero-cliff-home.jpg'
      }
    ],
    latestCommittee: {
      date: '17 Septiembre 2024',
      number: 'Comité Técnico N° 22',
      attendees: ['Dirección General ArquitecturIA', 'Propietario', 'Interventoría'],
      decisions: [
        'Aprobación de la textura final de piedra laja para muro húmedo en piscina.',
        'Programación de entrega y limpieza profunda para el 12 de octubre de 2024.'
      ],
      nextMilestone: 'Pruebas de iluminación arquitectónica nocturna y calibración domótica.'
    }
  },
  {
    contractCode: 'ARQ-2024-003',
    clientPhone: '3001234567',
    clientName: 'Corporación Financiera Zenith',
    projectTitle: 'Torre Zenith',
    location: 'Distrito Empresarial & Negocios',
    area: '1.450 m²',
    startDate: '01 Marzo 2024',
    estimatedDelivery: '28 Febrero 2025',
    residentArchitect: 'Ing. Alejandro Salazar (Director de Proyecto)',
    residentPhone: '573008902400',
    overallProgress: 54,
    statusBadge: 'ESTRUCTURA & PLACAS DE ENTREPISO',
    coverImage: '/extracted/arquitecturia/assets/hero-concrete-tower.jpg',
    phases: [
      { id: 'p1', name: 'Excavación profunda & Muros de Contención', progress: 100, status: 'Completado', date: 'Abr 2024' },
      { id: 'p2', name: 'Cimentación con Pilotes Pre-excavados', progress: 100, status: 'Completado', date: 'Jun 2024' },
      { id: 'p3', name: 'Estructura en Pórticos de Concreto NSR-10', progress: 60, status: 'En Ejecución', date: 'Sep 2024' },
      { id: 'p4', name: 'Mampostería Liviana & Ductería de Climatización', progress: 20, status: 'Iniciando', date: 'Nov 2024' },
      { id: 'p5', name: 'Fachada Bioclimática & Acabados Corporativos', progress: 0, status: 'Programado', date: 'Ene 2025' }
    ],
    fieldLog: [
      {
        id: 'log-301',
        date: '15 Septiembre 2024',
        title: 'Fundición de Columnas de Piso 4',
        description: 'Vaciado continuo de 18 columnas circulares en concreto de 5.000 PSI con vibrado de alta frecuencia.',
        image: '/extracted/arquitecturia/assets/comercial-concrete-office.jpg'
      }
    ],
    latestCommittee: {
      date: '18 Septiembre 2024',
      number: 'Comité de Obra N° 12',
      attendees: ['Gerencia de Proyecto ArquitecturIA', 'Residente de Estructura', 'Interventoría Técnica'],
      decisions: [
        'Aprobación de la secuencia de desencofrado para losa de piso 3.',
        'Se ratifica cumplimiento estricto del cronograma y control de calidad.'
      ],
      nextMilestone: 'Armado de acero de refuerzo para placa de piso 5.'
    }
  }
];
