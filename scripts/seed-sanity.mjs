#!/usr/bin/env node
/**
 * scripts/seed-sanity.mjs
 *
 * Populates Sanity with the current website fallback content so every
 * section becomes editable from /studio without changing the live design.
 *
 * Requirements:
 *   A Sanity API token with Editor (or higher) permissions.
 *   Create one at: https://www.sanity.io/manage
 *   → your project → API → Tokens → Add API token
 *
 * Usage (one-time):
 *   export SANITY_API_TOKEN=sk...
 *   node scripts/seed-sanity.mjs
 *
 * The script is idempotent — running it again overwrites with the same data.
 */

import { createClient } from '@sanity/client'
import { readFileSync }  from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Bootstrap env from .env.local ─────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
try {
  const raw = readFileSync(resolve(__dirname, '../.env.local'), 'utf-8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([^#=\s][^=]*?)\s*=\s*(.*?)\s*$/)
    if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '')
  }
} catch { /* .env.local is optional — env vars may already be exported */ }

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token     = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('\n❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set.')
  console.error('    Add it to .env.local or export it before running.\n')
  process.exit(1)
}
if (!token) {
  console.error('\n❌  SANITY_API_TOKEN is not set.')
  console.error('    1. Go to https://www.sanity.io/manage')
  console.error('    2. Select your project → API → Tokens → Add API token')
  console.error('    3. Choose "Editor" permissions, copy the token')
  console.error('    4. Run:  export SANITY_API_TOKEN=<your-token>')
  console.error('    5. Re-run this script.\n')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

// ── Document registry ─────────────────────────────────────────────────────────
const docs = []

// ── 1. Site Settings (singleton) ──────────────────────────────────────────────
docs.push({
  _id:   'siteSettings',
  _type: 'siteSettings',
  whatsapp:    '+507 6670-4578',
  phone:       '+507 6670-4578',
  emailSales:  'sales1@atlanticshipsuppliers.com',
  emailVentas: 'ventas@atlanticshipsuppliers.com',
  footerTagline: {
    en: 'Operational maritime supply at global standards.',
    es: 'Suministro marítimo operacional a estándares globales.',
  },
  officePanama: {
    address: 'Av. Juan Pablo II\nCalle 2059\nPanamá, Panamá',
    mapsUrl: 'https://maps.google.com/?q=Av+Juan+Pablo+II+Calle+2059+Panama',
  },
  officeColon: {
    address: 'Plaza Silver City\nLocal N25\nColón, Panamá',
    mapsUrl: 'https://maps.google.com/?q=Plaza+Silver+City+Colon+Panama',
  },
  // Social links — empty, ready to fill in Studio
  linkedin:  '',
  instagram: '',
  facebook:  '',
})

// ── 2. Contact Information — legacy singleton ─────────────────────────────────
docs.push({
  _id:   'contactInfo',
  _type: 'contactInfo',
  whatsapp:    '+507 6670-4578',
  phone:       '+507 6670-4578',
  emailSales:  'sales1@atlanticshipsuppliers.com',
  emailVentas: 'ventas@atlanticshipsuppliers.com',
  footerTagline: {
    en: 'Operational maritime supply at global standards.',
    es: 'Suministro marítimo operacional a estándares globales.',
  },
  officePanama: {
    address: 'Av. Juan Pablo II, Calle 2059, Panamá',
    mapsUrl: 'https://maps.google.com/?q=Av+Juan+Pablo+II+Calle+2059+Panama',
  },
  officeColon: {
    address: 'Plaza Silver City, Local N25, Colón',
    mapsUrl: 'https://maps.google.com/?q=Plaza+Silver+City+Colon+Panama',
  },
})

// ── 3. Hero Section (singleton) ───────────────────────────────────────────────
docs.push({
  _id:   'hero',
  _type: 'hero',
  badge: {
    en: 'Panama Maritime Corridor',
    es: 'Corredor Marítimo de Panamá',
  },
  headline: {
    en: 'Maritime Supply.\nDelivered Fast.',
    es: 'Suministro Marítimo.\nEntregado Rápido.',
  },
  subheading: {
    en: "Industrial and marine supply for vessels and operators across Panama's Atlantic and Pacific corridor. Right product, right spec, 24-hour response.",
    es: 'Suministro industrial y marino para embarcaciones y operadores en el corredor Atlántico y Pacífico de Panamá. Producto correcto, especificación correcta, respuesta en 24 horas.',
  },
  ctaPrimary:   { en: 'Request a Quote',  es: 'Solicitar Cotización' },
  ctaSecondary: { en: 'View Products',    es: 'Ver Productos'        },
  backgroundType: 'image',
  stats: [
    { _key: 'stat1', value: '12',          labelEn: 'Product Categories',      labelEs: 'Categorías de Productos'       },
    { _key: 'stat2', value: 'Atl. & Pac.', labelEn: 'Atlantic & Pacific Access', labelEs: 'Acceso Atlántico y Pacífico' },
    { _key: 'stat3', value: '2',           labelEn: 'Offices in Panama',        labelEs: 'Oficinas en Panamá'           },
  ],
})

// ── 4. About / Overview (singleton) ───────────────────────────────────────────
docs.push({
  _id:   'aboutContent',
  _type: 'aboutContent',
  badge:    { en: 'Who We Are',           es: 'Quiénes Somos'             },
  headline: { en: 'A different kind of maritime supplier.', es: 'Un proveedor marítimo diferente.' },
  body1: {
    en: "Atlantic EEE Supply isn't a catalog company. We're a dedicated supply partner for vessels and maritime operators who need the right product, on time, without friction.",
    es: 'Atlantic EEE Supply no es una empresa de catálogos. Somos un socio de suministro dedicado a embarcaciones y operadores marítimos que necesitan el producto correcto, a tiempo y sin complicaciones.',
  },
  body2: {
    en: "With offices in Panama City and Colón, we sit at the crossroads of Atlantic and Pacific trade routes. That position gives us a distinct advantage: faster sourcing, better access, and a team that understands the pressure of operational timelines.",
    es: 'Con oficinas en Ciudad de Panamá y Colón, estamos en la intersección de las rutas comerciales del Atlántico y el Pacífico. Esa posición nos da una ventaja clara: abastecimiento más rápido, mejor acceso y un equipo que entiende la presión de los plazos operativos.',
  },
  stats: [
    { _key: 's1', value: '12',      labelEn: 'Product categories',                    labelEs: 'Categorías de productos'                    },
    { _key: 's2', value: '14,000+', labelEn: 'Vessels transit the Canal annually',     labelEs: 'Embarcaciones transitan el Canal anualmente' },
    { _key: 's3', value: '2',       labelEn: 'Operational offices',                    labelEs: 'Oficinas operacionales'                     },
    { _key: 's4', value: '24h',     labelEn: 'Response time',                          labelEs: 'Tiempo de respuesta'                        },
  ],
  capabilities: [
    { _key: 'c1', headEn: 'Speed Without Compromise',    headEs: 'Velocidad Sin Compromisos',         bodyEn: 'Vessel schedules run on tight windows. We source and deliver with the urgency maritime operations demand — no delays, no excuses.',                                                bodyEs: 'Los itinerarios de las embarcaciones son ajustados. Abastecemos y entregamos con la urgencia que las operaciones marítimas exigen.'                                   },
    { _key: 'c2', headEn: 'Technical Accuracy',          headEs: 'Precisión Técnica',                 bodyEn: 'Marine supply is unforgiving. Wrong specs mean downtime. Our team verifies every order against technical requirements before it leaves our hands.',                              bodyEs: 'El suministro marino no admite errores. Especificaciones incorrectas significan paradas. Nuestro equipo verifica cada pedido contra los requisitos técnicos.'          },
    { _key: 'c3', headEn: 'Premium Brands, Fair Pricing', headEs: 'Marcas Premium, Precios Justos',   bodyEn: 'We supply from trusted manufacturers — DeWalt, 3M, Sea Contractor, Collebon — without the markup that comes with disorganized channels.',                                      bodyEs: 'Suministramos de fabricantes confiables — DeWalt, 3M, Sea Contractor, Collebon — sin el sobrecosto de canales desorganizados.'                                        },
    { _key: 'c4', headEn: 'Strategic Canal Position',    headEs: 'Posición Estratégica en el Canal', bodyEn: 'Panama City and Colón give us Atlantic and Pacific access. Ships transiting the Canal, anchored at anchorages, or calling at Balboa and Cristóbal are within our operational reach.', bodyEs: 'Ciudad de Panamá y Colón nos dan acceso Atlántico y Pacífico. Barcos en tránsito por el Canal, fondeados o atracados en Balboa y Cristóbal están dentro de nuestro alcance operativo.' },
    { _key: 'c5', headEn: 'Direct Communication',        headEs: 'Comunicación Directa',             bodyEn: 'No call centers, no ticketing systems. You speak directly with the people handling your order — by phone, WhatsApp, or email.',                                                 bodyEs: 'Sin call centers, sin sistemas de tickets. Hablas directamente con quienes manejan tu pedido — por teléfono, WhatsApp o correo electrónico.'                         },
    { _key: 'c6', headEn: 'Broad Category Coverage',     headEs: 'Cobertura Amplia de Categorías',   bodyEn: 'From packing seals to safety gear to cooking appliances — we consolidate your vessel supply needs under one trusted relationship.',                                              bodyEs: 'Desde empaques hasta equipos de seguridad y aparatos de cocina — consolidamos las necesidades de suministro de tu embarcación en una relación de confianza.'         },
  ],
})

// ── 5. Mission · Vision · Values (singleton) ──────────────────────────────────
docs.push({
  _id:   'missionVision',
  _type: 'missionVision',
  badge: {
    en: 'Mission · Vision · Core Values',
    es: 'Misión · Visión · Valores',
  },
  mission: {
    en: "We provide high-quality technical solutions and products to vessels transiting Panamanian waters, delivering reliable, agile service backed by the pride and commitment of local talent. At Atlantic EEE Supply, we focus on bringing real value to every maritime operation through expertise, close attention, and logistical excellence.",
    es: 'Proveer soluciones y productos técnicos de alta calidad a embarcaciones que transitan por aguas panameñas, ofreciendo un servicio confiable, ágil y respaldado por el orgullo y compromiso del talento local. En Atlantic EEE Supply nos enfocamos en aportar valor real a cada operación marítima mediante experiencia, atención cercana y excelencia logística.',
  },
  vision: {
    en: 'To be recognized in Panama and the region as one of the leading maritime supply providers — distinguished by our operational efficiency, constant innovation, and technical-industrial expertise. We aspire to lead with practical, reliable solutions aligned with the needs of the global maritime environment.',
    es: 'Ser reconocidos en Panamá y la región como uno de los principales proveedores de suministros marítimos, distinguidos por nuestra eficiencia operativa, innovación constante y experiencia técnico-industrial. Aspiramos a liderar con soluciones prácticas, confiables y alineadas con las necesidades del entorno marítimo global.',
  },
  values: [
    { _key: 'v1', iconKey: 'star',      titleEn: 'Excellence',      titleEs: 'Excelencia',      bodyEn: 'We hold every order to the highest standard, without exception.',                        bodyEs: 'Mantenemos cada pedido al más alto estándar, sin excepción.'                                                      },
    { _key: 'v2', iconKey: 'lightbulb', titleEn: 'Innovation',      titleEs: 'Innovación',      bodyEn: 'We continuously improve our processes, tools, and supply methods.',                      bodyEs: 'Mejoramos continuamente nuestros procesos, herramientas y métodos de suministro.'                                },
    { _key: 'v3', iconKey: 'anchor',    titleEn: 'Commitment',      titleEs: 'Compromiso',      bodyEn: 'We stay with every order from placement to delivery on your vessel.',                    bodyEs: 'Permanecemos con cada pedido desde la colocación hasta la entrega en su embarcación.'                            },
    { _key: 'v4', iconKey: 'scale',     titleEn: 'Integrity',       titleEs: 'Integridad',      bodyEn: "We tell you exactly what we have — and what we don't.",                                 bodyEs: 'Decimos exactamente lo que tenemos — y lo que no.'                                                               },
    { _key: 'v5', iconKey: 'zap',       titleEn: 'Speed',           titleEs: 'Rapidez',         bodyEn: '24-hour response. Tight vessel schedules are our normal.',                              bodyEs: 'Respuesta en 24 horas. Los plazos ajustados son nuestra normalidad.'                                             },
    { _key: 'v6', iconKey: 'shield',    titleEn: 'Quality',         titleEs: 'Calidad',         bodyEn: 'ISO and SOLAS-grade supply for any vessel registry.',                                   bodyEs: 'Suministro con estándares ISO y SOLAS para cualquier registro.'                                                  },
    { _key: 'v7', iconKey: 'briefcase', titleEn: 'Professionalism', titleEs: 'Profesionalismo', bodyEn: 'Expert staff, precise documentation, zero shortcuts.',                                  bodyEs: 'Personal experto, documentación precisa, cero atajos.'                                                           },
  ],
})

// ── 6. Operations Map (singleton) ─────────────────────────────────────────────
docs.push({
  _id:   'operationsMap',
  _type: 'operationsMap',
  badge: {
    en: 'Operational Presence',
    es: 'Presencia Operacional',
  },
  headline: {
    en: 'Where we operate.',
    es: 'Dónde operamos.',
  },
  subheading: {
    en: 'Panama City, Colón, and extending reach to Cartagena — serving vessels across the Caribbean and Central American maritime corridor.',
    es: 'Ciudad de Panamá, Colón y alcance hacia Cartagena — atendiendo embarcaciones en el corredor marítimo del Caribe y Centroamérica.',
  },
  nodes: [
    { _key: 'n1', id: 'panamacity', cityName: { en: 'Panama City',  es: 'Ciudad de Panamá' }, role: { en: 'HQ — Pacific Office',    es: 'Sede — Oficina Pacífico'    }, coordinates: '08°58′N · 79°31′W' },
    { _key: 'n2', id: 'colon',      cityName: { en: 'Colón',        es: 'Colón'            }, role: { en: 'Atlantic Office',         es: 'Oficina Atlántica'          }, coordinates: '09°21′N · 79°54′W' },
    { _key: 'n3', id: 'cartagena',  cityName: { en: 'Cartagena',    es: 'Cartagena'        }, role: { en: 'Operational Reach',       es: 'Alcance Operacional'        }, coordinates: '10°24′N · 75°31′W' },
  ],
})

// ── 7. Product Categories (12 individual documents) ───────────────────────────
const CATEGORY_DATA = [
  { id: 'packing',    order: 1,  featured: true,  nameEn: 'Packing & Jointing',            nameEs: 'Empaques y Juntas',                    descEn: 'Industrial sealing for engine rooms, valve systems, and high-pressure applications.',               descEs: 'Sellado industrial para cuartos de máquinas, sistemas de válvulas y aplicaciones de alta presión.',      brands: ['brand-collebon']                            },
  { id: 'valves',     order: 2,  featured: true,  nameEn: 'Valves & Cocks',                 nameEs: 'Válvulas y Grifos',                    descEn: 'Full range of marine-grade valves for fluid control across vessel systems.',                         descEs: 'Amplia gama de válvulas marineras para control de fluidos en sistemas de embarcaciones.',                brands: ['brand-sea-contractor']                      },
  { id: 'safety',     order: 3,  featured: true,  nameEn: 'Safety Equipment',               nameEs: 'Equipos de Seguridad',                 descEn: 'SOLAS-grade life-saving and fire-safety equipment for vessel compliance.',                            descEs: 'Equipos salvavidas y contra incendios certificados SOLAS para cumplimiento normativo.',                  brands: ['brand-msa-safety', 'brand-ansell', 'brand-3m'] },
  { id: 'flags',      order: 4,  featured: false, nameEn: 'Flags & Bunting',                nameEs: 'Banderas y Gallardetes',               descEn: 'International signal flags, courtesy flags, and maritime pennants.',                                   descEs: 'Banderas de señales internacionales, banderas de cortesía y flámulas marítimas.',                       brands: []                                            },
  { id: 'clothing',   order: 5,  featured: false, nameEn: 'Clothing & Maritime Wear',       nameEs: 'Ropa y Uniformes',                     descEn: 'Workwear, PPE, and maritime clothing for deck and engine room crews.',                                  descEs: 'Ropa de trabajo, EPP e indumentaria marítima para tripulaciones de cubierta y sala de máquinas.',       brands: ['brand-ansell', 'brand-3m']                  },
  { id: 'cooking',    order: 6,  featured: false, nameEn: 'Electrical Cooking Appliances',  nameEs: 'Aparatos de Cocina Eléctricos',        descEn: 'Marine-grade galley equipment built for vessel electrical systems.',                                    descEs: 'Equipos de cocina marineros diseñados para los sistemas eléctricos de embarcaciones.',                  brands: []                                            },
  { id: 'tools',      order: 7,  featured: false, nameEn: 'Pneumatic & Electrical Tools',   nameEs: 'Herramientas Eléctricas y Neumáticas', descEn: 'Professional-grade power tools for maintenance and repair operations.',                                  descEs: 'Herramientas eléctricas profesionales para operaciones de mantenimiento y reparación.',                  brands: ['brand-dewalt']                              },
  { id: 'hand',       order: 8,  featured: false, nameEn: 'Hand Tools',                    nameEs: 'Herramientas Manuales',                descEn: 'Complete hand tool sets from trusted brands including DeWalt and Sea Contractor.',                        descEs: 'Juegos completos de herramientas manuales de marcas confiables como DeWalt y Sea Contractor.',          brands: ['brand-dewalt', 'brand-sea-contractor']      },
  { id: 'measuring',  order: 9,  featured: false, nameEn: 'Measuring Tools',               nameEs: 'Herramientas de Medición',             descEn: 'Precision instruments for engineering, inspection, and technical operations.',                            descEs: 'Instrumentos de precisión para ingeniería, inspección y operaciones técnicas.',                         brands: []                                            },
  { id: 'hose',       order: 10, featured: false, nameEn: 'Hose & Couplings',              nameEs: 'Mangueras y Acoplamientos',            descEn: 'Marine hose assemblies and coupling systems for fuel, water, and hydraulic lines.',                       descEs: 'Conjuntos de mangueras y sistemas de acoplamiento para líneas de combustible, agua e hidráulicas.',     brands: []                                            },
  { id: 'rope',       order: 11, featured: false, nameEn: 'Rope & Hawsers',                nameEs: 'Cabos y Estachas',                     descEn: 'High-strength mooring lines, towing hawsers, and general-purpose rope.',                                  descEs: 'Cabos de amarre de alta resistencia, estachas de remolque y cuerda de uso general.',                   brands: []                                            },
  { id: 'electrical', order: 12, featured: false, nameEn: 'Electrical Equipment',          nameEs: 'Equipos Eléctricos',                   descEn: 'Marine electrical components, cables, and systems for vessel power needs.',                               descEs: 'Componentes eléctricos marineros, cables y sistemas para las necesidades energéticas de embarcaciones.', brands: []                                            },
]

for (const c of CATEGORY_DATA) {
  docs.push({
    _id:   `category-${c.id}`,
    _type: 'category',
    slug:  { _type: 'slug', current: c.id },
    name:        { en: c.nameEn, es: c.nameEs },
    description: { en: c.descEn, es: c.descEs },
    featured: c.featured,
    order:    c.order,
    gallery:  [],
    relatedBrands: c.brands.map(ref => ({ _type: 'reference', _ref: ref, _key: ref })),
  })
}

// ── 8. Brands (6 individual documents) ────────────────────────────────────────
const BRAND_DATA = [
  {
    id: 'dewalt', name: 'DeWalt', order: 1, featured: true, visible: true,
    catEn: 'Power & Hand Tools', catEs: 'Herramientas Eléctricas y Manuales',
    descEn: 'Professional-grade power tools and hand tools trusted by maritime maintenance crews worldwide.',
    descEs: 'Herramientas eléctricas y manuales de calidad profesional para tripulaciones de mantenimiento.',
    specialties: ['Power Tools', 'Hand Tools', 'Drill Bits', 'Accessories'],
  },
  {
    id: '3m', name: '3M', order: 2, featured: true, visible: true,
    catEn: 'Safety & PPE', catEs: 'Seguridad y EPP',
    descEn: 'Industry-standard personal protective equipment, safety tape, adhesives, and surface protection products.',
    descEs: 'Equipo de protección personal estándar, cinta de seguridad, adhesivos y protección de superficies.',
    specialties: ['PPE', 'Safety Tape', 'Adhesives', 'Respirators'],
  },
  {
    id: 'sea-contractor', name: 'Sea Contractor', order: 3, featured: true, visible: true,
    catEn: 'Marine Equipment', catEs: 'Equipos Marítimos',
    descEn: 'Specialized marine-grade equipment designed for demanding vessel environments.',
    descEs: 'Equipos marinos especializados para entornos exigentes de embarcaciones.',
    specialties: ['Marine Equipment', 'Vessel Systems', 'Deck Hardware'],
  },
  {
    id: 'collebon', name: 'Collebon', order: 4, featured: true, visible: true,
    catEn: 'Packing & Sealing', catEs: 'Empaques y Sellado',
    descEn: 'Industrial packing, gaskets, and sealing solutions for engine room and high-pressure systems.',
    descEs: 'Empaques industriales, juntas y soluciones de sellado para cuartos de máquinas y sistemas de alta presión.',
    specialties: ['Packing', 'Gaskets', 'Sealing Materials', 'High-Pressure Seals'],
  },
  {
    id: 'msa-safety', name: 'MSA Safety', order: 5, featured: false, visible: true,
    catEn: 'Fall Protection & Gas Detection', catEs: 'Protección contra Caídas y Detección de Gas',
    descEn: 'Head protection, fall arrest systems, and gas detection equipment for vessel safety compliance.',
    descEs: 'Protección de cabeza, sistemas de detención de caídas y equipos de detección de gas.',
    specialties: ['Hard Hats', 'Fall Arrest', 'Gas Detectors', 'Harnesses'],
  },
  {
    id: 'ansell', name: 'Ansell', order: 6, featured: false, visible: true,
    catEn: 'Protective Gloves & Apparel', catEs: 'Guantes y Ropa de Protección',
    descEn: 'Chemical-resistant gloves and protective clothing for crew safety in all vessel environments.',
    descEs: 'Guantes resistentes a productos químicos y ropa de protección para la seguridad de la tripulación.',
    specialties: ['Chemical-Resistant Gloves', 'Cut-Resistant Gloves', 'Protective Suits'],
  },
]

for (const b of BRAND_DATA) {
  docs.push({
    _id:   `brand-${b.id}`,
    _type: 'brand',
    name:     b.name,
    category: { en: b.catEn, es: b.catEs },
    description: { en: b.descEn, es: b.descEs },
    specialties: b.specialties,
    featured: b.featured,
    visible:  b.visible,
    order:    b.order,
  })
}

// ── 9. Gallery placeholder albums (published: false, ready to populate) ───────
const GALLERY_DATA = [
  { id: 'gallery-vessels',    category: 'vessels',    order: 1, titleEn: 'Vessel Operations',  titleEs: 'Operaciones en Buques'    },
  { id: 'gallery-ports',      category: 'ports',      order: 2, titleEn: 'Port Activities',    titleEs: 'Actividades Portuarias'   },
  { id: 'gallery-products',   category: 'products',   order: 3, titleEn: 'Product Catalog',    titleEs: 'Catálogo de Productos'    },
  { id: 'gallery-deliveries', category: 'deliveries', order: 4, titleEn: 'Deliveries',         titleEs: 'Entregas'                 },
  { id: 'gallery-offices',    category: 'offices',    order: 5, titleEn: 'Our Offices',        titleEs: 'Nuestras Oficinas'        },
  { id: 'gallery-warehouse',  category: 'warehouse',  order: 6, titleEn: 'Warehouse',          titleEs: 'Almacén'                  },
]

for (const g of GALLERY_DATA) {
  docs.push({
    _id:      g.id,
    _type:    'gallery',
    title:    { en: g.titleEn, es: g.titleEs },
    category: g.category,
    photos:   [],
    published: false, // flip to true in Studio after adding photos
    order:     g.order,
  })
}

// ── Execute ───────────────────────────────────────────────────────────────────
const total = docs.length
console.log(`\n🚢  Atlantic EEE Supply — Sanity Seed Script`)
console.log(`    Project : ${projectId}`)
console.log(`    Dataset : ${dataset}`)
console.log(`    Docs    : ${total}\n`)

const tx = client.transaction()
for (const doc of docs) tx.createOrReplace(doc)

try {
  await tx.commit({ visibility: 'async' })
  console.log(`✅  ${total} documents seeded successfully.\n`)
  console.log('    Singletons:')
  console.log('      siteSettings, contactInfo, hero, aboutContent, missionVision, operationsMap')
  console.log(`\n    Product Categories (${CATEGORY_DATA.length}):`)
  console.log('     ', CATEGORY_DATA.map(c => c.id).join(', '))
  console.log(`\n    Brands (${BRAND_DATA.length}):`)
  console.log('     ', BRAND_DATA.map(b => b.name).join(', '))
  console.log(`\n    Gallery Albums (${GALLERY_DATA.length}, unpublished):`)
  console.log('     ', GALLERY_DATA.map(g => g.category).join(', '))
  console.log('\n    Open /studio to edit all content.\n')
} catch (err) {
  console.error('\n❌  Seed failed:', err.message)
  if (err.statusCode === 401 || err.statusCode === 403) {
    console.error('    → Token is missing or lacks write permissions.')
    console.error('    → Create an "Editor" token at https://www.sanity.io/manage\n')
  }
  process.exit(1)
}
