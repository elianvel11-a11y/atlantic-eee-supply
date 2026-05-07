export type Lang = 'en' | 'es'

export const t = {
  nav: {
    about: { en: 'About', es: 'Nosotros' },
    categories: { en: 'Products', es: 'Productos' },
    products: { en: 'Products', es: 'Productos' },
    why: { en: 'Why Us', es: 'Por Qué' },
    presence: { en: 'Presence', es: 'Presencia' },
    operations: { en: 'Operations', es: 'Operaciones' },
    brands: { en: 'Brands', es: 'Marcas' },
    quote: { en: 'Request Quote', es: 'Cotizar' },
    contact: { en: 'Contact', es: 'Contacto' },
  },
  hero: {
    badge: { en: 'Panama Maritime Corridor', es: 'Corredor Marítimo de Panamá' },
    headline: {
      en: 'Maritime Supply.\nDelivered Fast.',
      es: 'Suministro Marítimo.\nEntregado Rápido.',
    },
    sub: {
      en: 'Industrial and marine supply for vessels and operators across Panama\'s Atlantic and Pacific corridor. Right product, right spec, 24-hour response.',
      es: 'Suministro industrial y marino para embarcaciones y operadores en el corredor Atlántico y Pacífico de Panamá. Producto correcto, especificación correcta, respuesta en 24 horas.',
    },
    cta: { en: 'Request a Quote', es: 'Solicitar Cotización' },
    ctaSecondary: { en: 'View Products', es: 'Ver Productos' },
    stat1: { en: 'Product Categories', es: 'Categorías' },
    stat2: { en: 'Atlantic & Pacific Access', es: 'Acceso Atlántico y Pacífico' },
    stat3: { en: 'Operational Coverage', es: 'Cobertura Operacional' },
    stat3v: { en: 'Atl. & Pac.', es: 'Atl. & Pac.' },
  },
  about: {
    badge: { en: 'Who We Are', es: 'Quiénes Somos' },
    headline: {
      en: 'A different kind of\nmaritime supplier.',
      es: 'Un proveedor marítimo\ndiferente.',
    },
    body1: {
      en: "Atlantic EEE Supply isn't a catalog company. We're a dedicated supply partner for vessels and maritime operators who need the right product, on time, without friction.",
      es: 'Atlantic EEE Supply no es una empresa de catálogos. Somos un socio de suministro dedicado a embarcaciones y operadores marítimos que necesitan el producto correcto, a tiempo y sin complicaciones.',
    },
    body2: {
      en: "With offices in Panama City and Colón, we sit at the crossroads of Atlantic and Pacific trade routes. That position gives us a distinct advantage: faster sourcing, better access, and a team that understands the pressure of operational timelines.",
      es: 'Con oficinas en Ciudad de Panamá y Colón, estamos en la intersección de las rutas comerciales del Atlántico y el Pacífico. Esa posición nos da una ventaja clara: abastecimiento más rápido, mejor acceso y un equipo que entiende la presión de los plazos operativos.',
    },
    card1: { en: 'Operational Speed', es: 'Velocidad Operacional' },
    card1b: { en: 'Responsive supply for tight schedules', es: 'Respuesta ágil para plazos ajustados' },
    card2: { en: 'Technical Precision', es: 'Precisión Técnica' },
    card2b: { en: 'Correct specs, every order', es: 'Especificaciones correctas, cada pedido' },
    card3: { en: 'Strategic Location', es: 'Ubicación Estratégica' },
    card3b: { en: 'Panama City & Colón offices', es: 'Oficinas en Ciudad de Panamá y Colón' },
    card4: { en: 'Trusted Brands', es: 'Marcas Confiables' },
    card4b: { en: 'DeWalt, 3M, Sea Contractor & more', es: 'DeWalt, 3M, Sea Contractor y más' },
  },
  categories: {
    badge: { en: 'Operational Capabilities', es: 'Capacidades Operacionales' },
    headline: {
      en: 'Everything a vessel\nneeds to operate.',
      es: 'Todo lo que una embarcación\nnecesita para operar.',
    },
    sub: {
      en: 'Specialized supply across 12 critical maritime categories. Not a catalog — an operational partner.',
      es: 'Suministro especializado en 12 categorías marítimas críticas. No un catálogo — un socio operacional.',
    },
    viewAll: { en: 'Request Full Catalog', es: 'Solicitar Catálogo Completo' },
    food: { en: 'Vessel Support Services', es: 'Servicios de Apoyo' },
    foodSub: {
      en: 'Additional food & beverage supply as vessel support — not our primary specialization.',
      es: 'Suministro adicional de alimentos y bebidas como apoyo — no es nuestra especialización principal.',
    },
    items: {
      packing: {
        name: { en: 'Packing & Jointing', es: 'Empaques y Juntas' },
        desc: { en: 'Industrial sealing for engine rooms, valve systems, and high-pressure applications.', es: 'Sellado industrial para cuartos de máquinas, sistemas de válvulas y aplicaciones de alta presión.' },
      },
      valves: {
        name: { en: 'Valves & Cocks', es: 'Válvulas y Grifos' },
        desc: { en: 'Full range of marine-grade valves for fluid control across vessel systems.', es: 'Amplia gama de válvulas marineras para control de fluidos en sistemas de embarcaciones.' },
      },
      safety: {
        name: { en: 'Safety Equipment', es: 'Equipos de Seguridad' },
        desc: { en: 'SOLAS-grade life-saving and fire-safety equipment for vessel compliance.', es: 'Equipos salvavidas y contra incendios certificados SOLAS para cumplimiento normativo.' },
      },
      flags: {
        name: { en: 'Flags & Bunting', es: 'Banderas y Gallardetes' },
        desc: { en: 'International signal flags, courtesy flags, and maritime pennants.', es: 'Banderas de señales internacionales, banderas de cortesía y flámulas marítimas.' },
      },
      clothing: {
        name: { en: 'Clothing & Maritime Wear', es: 'Ropa y Uniformes' },
        desc: { en: 'Workwear, PPE, and maritime clothing for deck and engine room crews.', es: 'Ropa de trabajo, EPP e indumentaria marítima para tripulaciones de cubierta y sala de máquinas.' },
      },
      cooking: {
        name: { en: 'Electrical Cooking Appliances', es: 'Aparatos de Cocina Eléctricos' },
        desc: { en: 'Marine-grade galley equipment built for vessel electrical systems.', es: 'Equipos de cocina marineros diseñados para los sistemas eléctricos de embarcaciones.' },
      },
      tools: {
        name: { en: 'Pneumatic & Electrical Tools', es: 'Herramientas Eléctricas y Neumáticas' },
        desc: { en: 'Professional-grade power tools for maintenance and repair operations.', es: 'Herramientas eléctricas profesionales para operaciones de mantenimiento y reparación.' },
      },
      hand: {
        name: { en: 'Hand Tools', es: 'Herramientas Manuales' },
        desc: { en: 'Complete hand tool sets from trusted brands including DeWalt and Sea Contractor.', es: 'Juegos completos de herramientas manuales de marcas confiables como DeWalt y Sea Contractor.' },
      },
      measuring: {
        name: { en: 'Measuring Tools', es: 'Herramientas de Medición' },
        desc: { en: 'Precision instruments for engineering, inspection, and technical operations.', es: 'Instrumentos de precisión para ingeniería, inspección y operaciones técnicas.' },
      },
      hose: {
        name: { en: 'Hose & Couplings', es: 'Mangueras y Acoplamientos' },
        desc: { en: 'Marine hose assemblies and coupling systems for fuel, water, and hydraulic lines.', es: 'Conjuntos de mangueras y sistemas de acoplamiento para líneas de combustible, agua e hidráulicas.' },
      },
      rope: {
        name: { en: 'Rope & Hawsers', es: 'Cabos y Estachas' },
        desc: { en: 'High-strength mooring lines, towing hawsers, and general-purpose rope.', es: 'Cabos de amarre de alta resistencia, estachas de remolque y cuerda de uso general.' },
      },
      electrical: {
        name: { en: 'Electrical Equipment', es: 'Equipos Eléctricos' },
        desc: { en: 'Marine electrical components, cables, and systems for vessel power needs.', es: 'Componentes eléctricos marineros, cables y sistemas para las necesidades energéticas de embarcaciones.' },
      },
    },
  },
  why: {
    badge: { en: 'Why Atlantic EEE Supply', es: 'Por Qué Atlantic EEE Supply' },
    headline: {
      en: 'The standard serious\nmaritime operations require.',
      es: 'El estándar que las operaciones\nmarítimas serias exigen.',
    },
    item1h: { en: 'Speed Without Compromise', es: 'Velocidad Sin Compromisos' },
    item1b: { en: 'Vessel schedules run on tight windows. We source and deliver with the urgency maritime operations demand — no delays, no excuses.', es: 'Los itinerarios de las embarcaciones son ajustados. Abastecemos y entregamos con la urgencia que las operaciones marítimas exigen.' },
    item2h: { en: 'Technical Accuracy', es: 'Precisión Técnica' },
    item2b: { en: 'Marine supply is unforgiving. Wrong specs mean downtime. Our team verifies every order against technical requirements before it leaves our hands.', es: 'El suministro marino no admite errores. Especificaciones incorrectas significan paradas. Nuestro equipo verifica cada pedido contra los requisitos técnicos.' },
    item3h: { en: 'Premium Brands, Fair Pricing', es: 'Marcas Premium, Precios Justos' },
    item3b: { en: 'We supply from trusted manufacturers — DeWalt, 3M, Sea Contractor, Collebon — without the markup that comes with disorganized channels.', es: 'Suministramos de fabricantes confiables — DeWalt, 3M, Sea Contractor, Collebon — sin el sobrecosto de canales desorganizados.' },
    item4h: { en: 'Strategic Canal Position', es: 'Posición Estratégica en el Canal' },
    item4b: { en: 'Panama City and Colón give us Atlantic and Pacific access. Ships transiting the Canal, anchored at anchorages, or calling at Balboa and Cristóbal are within our operational reach.', es: 'Ciudad de Panamá y Colón nos dan acceso Atlántico y Pacífico. Barcos en tránsito por el Canal, fondeados o atracados en Balboa y Cristóbal están dentro de nuestro alcance operativo.' },
    item5h: { en: 'Direct Communication', es: 'Comunicación Directa' },
    item5b: { en: 'No call centers, no ticketing systems. You speak directly with the people handling your order — by phone, WhatsApp, or email.', es: 'Sin call centers, sin sistemas de tickets. Hablas directamente con quienes manejan tu pedido — por teléfono, WhatsApp o correo electrónico.' },
    item6h: { en: 'Broad Category Coverage', es: 'Cobertura Amplia de Categorías' },
    item6b: { en: 'From packing seals to safety gear to cooking appliances — we consolidate your vessel supply needs under one trusted relationship.', es: 'Desde empaques hasta equipos de seguridad y aparatos de cocina — consolidamos las necesidades de suministro de tu embarcación en una relación de confianza.' },
  },
  panama: {
    badge: { en: 'The Panama Advantage', es: 'La Ventaja de Panamá' },
    headline: {
      en: "At the crossroads of\nglobal maritime trade.",
      es: 'En la intersección del\ncomercio marítimo global.',
    },
    body: {
      en: 'The Panama Canal is the most important maritime chokepoint in the Western Hemisphere. Every vessel that transits it — thousands each year — is a potential client with operational supply needs. We are here, positioned at both ends.',
      es: 'El Canal de Panamá es el punto de paso marítimo más importante del hemisferio occidental. Cada embarcación que lo transita — miles cada año — es un cliente potencial con necesidades de suministro operacional. Estamos aquí, posicionados en ambos extremos.',
    },
    stat1: { en: 'Vessels transit the Canal annually', es: 'Embarcaciones transitan el Canal anualmente' },
    stat1v: { en: '14,000+', es: '14,000+' },
    stat2: { en: 'Operational offices', es: 'Oficinas operacionales' },
    stat2v: { en: '2', es: '2' },
    stat3: { en: 'Ocean access points', es: 'Puntos de acceso oceánico' },
    stat3v: { en: 'Atl. & Pac.', es: 'Atl. y Pac.' },
    atlanticTitle: { en: 'Atlantic Side — Colón', es: 'Lado Atlántico — Colón' },
    atlanticBody: { en: 'Plaza Silver City, Local N25. Serving vessels entering from the Caribbean and Atlantic trade routes.', es: 'Plaza Silver City, Local N25. Atendiendo embarcaciones que ingresan desde el Caribe y rutas comerciales del Atlántico.' },
    pacificTitle: { en: 'Pacific Side — Panama City', es: 'Lado Pacífico — Ciudad de Panamá' },
    pacificBody: { en: 'Av. Juan Pablo II, Calle 2059. Serving vessels transiting from the Pacific and operational headquarters.', es: 'Av. Juan Pablo II, Calle 2059. Atendiendo embarcaciones del Pacífico y sede operacional principal.' },
  },
  map: {
    badge: { en: 'Operational Presence', es: 'Presencia Operacional' },
    headline: {
      en: 'Where we operate.',
      es: 'Dónde operamos.',
    },
    sub: {
      en: 'Panama City, Colón, and extending reach to Cartagena — serving vessels across the Caribbean and Central American maritime corridor.',
      es: 'Ciudad de Panamá, Colón y alcance hacia Cartagena — atendiendo embarcaciones en el corredor marítimo del Caribe y Centroamérica.',
    },
    popup1: { en: 'Panama City — HQ', es: 'Ciudad de Panamá — Sede' },
    popup2: { en: 'Colón — Atlantic Office', es: 'Colón — Oficina Atlántica' },
    popup3: { en: 'Cartagena — Operational Reach', es: 'Cartagena — Alcance Operacional' },
  },
  brands: {
    badge: { en: 'Trusted Manufacturers', es: 'Fabricantes de Confianza' },
    headline: {
      en: 'The brands behind\nevery order.',
      es: 'Las marcas detrás\nde cada pedido.',
    },
    sub: {
      en: 'We supply from manufacturers with established quality standards. No substitutes, no knockoffs.',
      es: 'Suministramos de fabricantes con estándares de calidad establecidos. Sin sustitutos, sin imitaciones.',
    },
  },
  quote: {
    badge: { en: 'Request a Quote', es: 'Solicitar Cotización' },
    headline: {
      en: 'Ready to supply\nyour vessel.',
      es: 'Listos para abastecer\ntu embarcación.',
    },
    sub: {
      en: 'Fill out the form and our team will respond within 24 hours with pricing and availability.',
      es: 'Completa el formulario y nuestro equipo responderá en 24 horas con precios y disponibilidad.',
    },
    name: { en: 'Full Name', es: 'Nombre Completo' },
    company: { en: 'Company / Vessel Name', es: 'Empresa / Nombre del Buque' },
    email: { en: 'Email Address', es: 'Correo Electrónico' },
    phone: { en: 'Phone / WhatsApp', es: 'Teléfono / WhatsApp' },
    category: { en: 'Product Category', es: 'Categoría de Producto' },
    message: { en: 'Describe your requirements', es: 'Describe tus requerimientos' },
    messagePh: { en: 'Include product specifications, quantities, vessel name, and delivery port if known.', es: 'Incluye especificaciones del producto, cantidades, nombre del buque y puerto de entrega si lo conoces.' },
    submit: { en: 'Send Quote Request', es: 'Enviar Solicitud' },
    sending: { en: 'Sending...', es: 'Enviando...' },
    success: { en: 'Request sent. We\'ll be in touch within 24 hours.', es: 'Solicitud enviada. Nos pondremos en contacto en 24 horas.' },
    catPlaceholder: { en: 'Select a category', es: 'Selecciona una categoría' },
  },
  contact: {
    badge: { en: 'Get in Touch', es: 'Contacto' },
    headline: { en: 'Two offices.\nOne team.', es: 'Dos oficinas.\nUn equipo.' },
    sub: { en: 'Reach us through any channel — phone, WhatsApp, or email. We respond fast.', es: 'Contáctanos por cualquier canal — teléfono, WhatsApp o correo. Respondemos rápido.' },
    panama: { en: 'Panama City', es: 'Ciudad de Panamá' },
    colon: { en: 'Colón Office', es: 'Oficina de Colón' },
    whatsapp: { en: 'WhatsApp', es: 'WhatsApp' },
    email: { en: 'Email', es: 'Correo' },
    directions: { en: 'Get Directions', es: 'Cómo Llegar' },
  },
  footer: {
    tagline: { en: 'Operational maritime supply at global standards.', es: 'Suministro marítimo operacional a estándares globales.' },
    links: { en: 'Quick Links', es: 'Enlaces' },
    products: { en: 'Products', es: 'Productos' },
    legal: { en: 'Panama City, Republic of Panama', es: 'Ciudad de Panamá, República de Panamá' },
    credit: { en: 'Built with Claude Web Builder by', es: 'Construido con Claude Web Builder por' },
    rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
  },
}

export function getText(key: { en: string; es: string }, lang: Lang): string {
  return key[lang]
}
