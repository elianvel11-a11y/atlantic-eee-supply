/**
 * Pre-computes SVG path data for the Caribbean / Panama region
 * from Natural Earth 50m TopoJSON (world-atlas).
 *
 * Run: node scripts/gen-caribbean-map.mjs
 * Output: src/data/caribbean-map.json
 */

import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = resolve(__dir, '..')

const W = 1200
const H = 680

// Viewport: lng -84 to -72 (12°), centered at [-78, 10.5]
// scale = W * 180 / (lngRange * π)  →  fills width exactly with 12° of longitude
const LNG_CENTER = -78
const LAT_CENTER = 10.5
const LNG_RANGE  = 12
const scale = W * 180 / (LNG_RANGE * Math.PI)

const proj = geoMercator()
  .center([LNG_CENTER, LAT_CENTER])
  .scale(scale)
  .translate([W / 2, H / 2])

const pathGen = geoPath(proj)

// ── Countries to include (ISO 3166-1 numeric) ────────────────────────────────
const INCLUDE = {
  591: 'panama',
  170: 'colombia',
  188: 'costaRica',
  558: 'nicaragua',
  340: 'honduras',
  320: 'guatemala',
  862: 'venezuela',
  332: 'haiti',
  214: 'dominicanRepublic',
  388: 'jamaica',
  192: 'cuba',
  630: 'puertoRico',
  52:  'barbados',
  780: 'trinidad',
  28:  'antigua',
  662: 'stLucia',
  308: 'grenada',
}

// ── Load 50m world data ───────────────────────────────────────────────────────
const worldPath = resolve(root, 'node_modules/world-atlas/countries-50m.json')
const world = JSON.parse(readFileSync(worldPath, 'utf8'))
const countries = feature(world, world.objects.countries)

// ── Generate paths ────────────────────────────────────────────────────────────
const paths = {}
for (const f of countries.features) {
  const name = INCLUDE[Number(f.id)]
  if (name) {
    const d = pathGen(f)
    if (d) paths[name] = d
  }
}

// ── Project key points ────────────────────────────────────────────────────────
function pt(lng, lat) {
  const [x, y] = proj([lng, lat])
  return { x: +x.toFixed(1), y: +y.toFixed(1) }
}

const locs = {
  panamacity: pt(-79.5199, 8.9824),
  colon:      pt(-79.9014, 9.3592),
  cartagena:  pt(-75.4794, 10.391),
}

// ── Route paths ───────────────────────────────────────────────────────────────
// Canal: Panama City → Colón, slight curve west (through the canal zone)
const canalCtrl = pt(-79.78, 9.22)
// Caribbean: Colón → Cartagena, arc north through the Caribbean Sea
const caribCtrl = pt(-78.2, 11.4)

const routes = {
  canal: `M ${locs.panamacity.x},${locs.panamacity.y} Q ${canalCtrl.x},${canalCtrl.y} ${locs.colon.x},${locs.colon.y}`,
  carib: `M ${locs.colon.x},${locs.colon.y} Q ${caribCtrl.x},${caribCtrl.y} ${locs.cartagena.x},${locs.cartagena.y}`,
}

// ── Grid lines ────────────────────────────────────────────────────────────────
const latLines = [8, 9, 10, 11, 12, 13].map(lat => ({
  lat,
  y: +proj([0, lat])[1].toFixed(1),
}))

const lngLines = [-83, -82, -81, -80, -79, -78, -77, -76, -75, -74, -73].map(lng => ({
  lng,
  x: +proj([lng, 0])[0].toFixed(1),
}))

// ── Write ─────────────────────────────────────────────────────────────────────
const outDir = resolve(root, 'src/data')
mkdirSync(outDir, { recursive: true })
writeFileSync(
  resolve(outDir, 'caribbean-map.json'),
  JSON.stringify({ paths, locs, routes, latLines, lngLines }, null, 2)
)

console.log('Generated src/data/caribbean-map.json')
console.log('Countries:', Object.keys(paths).join(', '))
console.log('Points:', JSON.stringify(locs, null, 2))
console.log('Routes:', JSON.stringify(routes, null, 2))
