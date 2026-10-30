/* =========================================================
   Cute Periodic Table - script.js
   Sections:
   1. Data (elements, categories)
   2. Helper functions
   3. Build the table
   4. Search & category filter
   5. Popup card
   ========================================================= */


/* ---------- 1. Data ---------- */

// Format: Symbol,Name,Atomic mass  (one period per line, in atomic-number order)
const ELEMENT_DATA = `
H,Hydrogen,1.008; He,Helium,4.0026;
Li,Lithium,6.94; Be,Beryllium,9.0122; B,Boron,10.81; C,Carbon,12.011; N,Nitrogen,14.007; O,Oxygen,15.999; F,Fluorine,18.998; Ne,Neon,20.180;
Na,Sodium,22.990; Mg,Magnesium,24.305; Al,Aluminium,26.982; Si,Silicon,28.085; P,Phosphorus,30.974; S,Sulfur,32.06; Cl,Chlorine,35.45; Ar,Argon,39.948;
K,Potassium,39.098; Ca,Calcium,40.078; Sc,Scandium,44.956; Ti,Titanium,47.867; V,Vanadium,50.942; Cr,Chromium,51.996; Mn,Manganese,54.938; Fe,Iron,55.845; Co,Cobalt,58.933; Ni,Nickel,58.693; Cu,Copper,63.546; Zn,Zinc,65.38; Ga,Gallium,69.723; Ge,Germanium,72.630; As,Arsenic,74.922; Se,Selenium,78.971; Br,Bromine,79.904; Kr,Krypton,83.798;
Rb,Rubidium,85.468; Sr,Strontium,87.62; Y,Yttrium,88.906; Zr,Zirconium,91.224; Nb,Niobium,92.906; Mo,Molybdenum,95.95; Tc,Technetium,98; Ru,Ruthenium,101.07; Rh,Rhodium,102.91; Pd,Palladium,106.42; Ag,Silver,107.87; Cd,Cadmium,112.41; In,Indium,114.82; Sn,Tin,118.71; Sb,Antimony,121.76; Te,Tellurium,127.60; I,Iodine,126.90; Xe,Xenon,131.29;
Cs,Caesium,132.91; Ba,Barium,137.33;
La,Lanthanum,138.91; Ce,Cerium,140.12; Pr,Praseodymium,140.91; Nd,Neodymium,144.24; Pm,Promethium,145; Sm,Samarium,150.36; Eu,Europium,151.96; Gd,Gadolinium,157.25; Tb,Terbium,158.93; Dy,Dysprosium,162.50; Ho,Holmium,164.93; Er,Erbium,167.26; Tm,Thulium,168.93; Yb,Ytterbium,173.05; Lu,Lutetium,174.97;
Hf,Hafnium,178.49; Ta,Tantalum,180.95; W,Tungsten,183.84; Re,Rhenium,186.21; Os,Osmium,190.23; Ir,Iridium,192.22; Pt,Platinum,195.08; Au,Gold,196.97; Hg,Mercury,200.59; Tl,Thallium,204.38; Pb,Lead,207.2; Bi,Bismuth,208.98; Po,Polonium,209; At,Astatine,210; Rn,Radon,222;
Fr,Francium,223; Ra,Radium,226;
Ac,Actinium,227; Th,Thorium,232.04; Pa,Protactinium,231.04; U,Uranium,238.03; Np,Neptunium,237; Pu,Plutonium,244; Am,Americium,243; Cm,Curium,247; Bk,Berkelium,247; Cf,Californium,251; Es,Einsteinium,252; Fm,Fermium,257; Md,Mendelevium,258; No,Nobelium,259; Lr,Lawrencium,266;
Rf,Rutherfordium,267; Db,Dubnium,268; Sg,Seaborgium,269; Bh,Bohrium,270; Hs,Hassium,277; Mt,Meitnerium,278; Ds,Darmstadtium,281; Rg,Roentgenium,282; Cn,Copernicium,285; Nh,Nihonium,286; Fl,Flerovium,289; Mc,Moscovium,290; Lv,Livermorium,293; Ts,Tennessine,294; Og,Oganesson,294
`;

// Category key -> label (the keys match the CSS color variables --n, --g, ...)
const CATEGORY_NAMES = {
  n: 'Nonmetal',
  g: 'Noble gas',
  h: 'Halogen',
  a: 'Alkali metal',
  e: 'Alkaline earth',
  m: 'Metalloid',
  p: 'Post-transition',
  t: 'Transition metal',
  l: 'Lanthanide',
  c: 'Actinide',
};

// Which atomic numbers belong to which category
// (lanthanides, actinides and transition metals are handled in getCategory)
const CATEGORY_MEMBERS = {
  n: [1, 6, 7, 8, 15, 16, 34],
  g: [2, 10, 18, 36, 54, 86, 118],
  h: [9, 17, 35, 53, 85, 117],
  a: [3, 11, 19, 37, 55, 87],
  e: [4, 12, 20, 38, 56, 88],
  m: [5, 14, 32, 33, 51, 52],
  p: [13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116],
};


/* ---------- 2. Helper functions ---------- */

// Returns the category key for an atomic number
function getCategory(z) {
  if (z >= 57 && z <= 71) return 'l';   // lanthanides
  if (z >= 89 && z <= 103) return 'c';  // actinides

  for (const [key, numbers] of Object.entries(CATEGORY_MEMBERS)) {
    if (numbers.includes(z)) return key;
  }
  return 't';                           // everything else = transition metal
}

// Returns [row, column] of an element in the grid
function getPosition(z) {
  if (z === 1) return [1, 1];
  if (z === 2) return [1, 18];

  if (z <= 4)   return [2, z - 2];      // period 2
  if (z <= 10)  return [2, z + 8];
  if (z <= 12)  return [3, z - 10];     // period 3
  if (z <= 18)  return [3, z];
  if (z <= 36)  return [4, z - 18];     // period 4
  if (z <= 54)  return [5, z - 36];     // period 5
  if (z <= 56)  return [6, z - 54];     // period 6
  if (z <= 71)  return [9, z - 54];     // lanthanides (separate row)
  if (z <= 86)  return [6, z - 68];
  if (z <= 88)  return [7, z - 86];     // period 7
  if (z <= 103) return [10, z - 86];    // actinides (separate row)
  return [7, z - 100];
}

// Returns the period (row number) of an element
function getPeriod(z) {
  if (z <= 2)  return 1;
  if (z <= 10) return 2;
  if (z <= 18) return 3;
  if (z <= 36) return 4;
  if (z <= 54) return 5;
  if (z <= 86) return 6;
  return 7;
}

// Turn the data text into a list of element objects
const elements = ELEMENT_DATA
  .split(';')
  .map((entry) => entry.trim())
  .filter(Boolean)
  .map((entry, index) => {
    const [symbol, name, mass] = entry.split(',');
    const number = index + 1;
    return {
      number,
      symbol,
      name,
      mass,
      category: getCategory(number),
      position: getPosition(number),
      node: null,   // the tile on the page (filled in below)
    };
  });


/* ---------- 3. Build the table ---------- */

const grid = document.getElementById('grid');

document.getElementById('title').textContent = 'Periodic Table 🧪';

// one tile per element
elements.forEach((el) => {
  const [row, col] = el.position;

  const tile = document.createElement('div');
  tile.className = 'el';
  tile.style.setProperty('--bg', `var(--${el.category})`);
  tile.style.gridRow = row;
  tile.style.gridColumn = col;
  tile.style.animationDelay = `${col * 28 + row * 45}ms`;   // staggered pop-in
  tile.innerHTML = `
    <span class="z">${el.number}</span>
    <div class="s">${el.symbol}</div>
    <div class="nm">${el.name}</div>
  `;
  tile.addEventListener('click', () => openCard(el.number));

  el.node = tile;
  grid.appendChild(tile);
});

// small "57-71" and "89-103" labels in the period 6 and 7 rows
[
  { text: '57–71',  row: 6, col: 3 },
  { text: '89–103', row: 7, col: 3 },
].forEach(({ text, row, col }) => {
  const label = document.createElement('div');
  label.className = 'mark';
  label.textContent = text;
  label.style.gridRow = row;
  label.style.gridColumn = col;
  grid.appendChild(label);
});


/* ---------- 4. Search & category filter ---------- */

const legend = document.getElementById('legend');
const searchBox = document.getElementById('search');

let activeCategory = null;   // currently selected category key (or null)
let searchText = '';

// one chip button per category
Object.entries(CATEGORY_NAMES).forEach(([key, label]) => {
  const chip = document.createElement('button');
  chip.className = 'chip';
  chip.textContent = label;
  chip.style.background = `var(--${key})`;

  chip.addEventListener('click', () => {
    // clicking the same chip again turns the filter off
    activeCategory = activeCategory === key ? null : key;

    [...legend.children].forEach((c) => c.classList.remove('on'));
    if (activeCategory) chip.classList.add('on');

    applyFilters();
  });

  legend.appendChild(chip);
});

searchBox.addEventListener('input', (event) => {
  searchText = event.target.value.trim().toLowerCase();
  applyFilters();
});

// dim every element that doesn't match the category + search text
function applyFilters() {
  elements.forEach((el) => {
    const symbol = el.symbol.toLowerCase();
    const name = el.name.toLowerCase();

    const matchesCategory = !activeCategory || el.category === activeCategory;
    const matchesSearch = !searchText || name.includes(searchText) || symbol.startsWith(searchText);

    el.node.classList.toggle('dim', !(matchesCategory && matchesSearch));
  });
}


/* ---------- 5. Popup card ---------- */

const modal = document.getElementById('modal');
const card = document.getElementById('card');
const TOTAL = elements.length;   // 118

let currentNumber = 1;

function openCard(number) {
  currentNumber = number;

  const el = elements[number - 1];
  const isFBlock = el.category === 'l' || el.category === 'c';

  card.style.setProperty('--bg', `var(--${el.category})`);
  card.innerHTML = `
    <button class="x" aria-label="Close">✕</button>

    <div class="orbit"><div class="big">${el.symbol}</div></div>
    <h2>${el.name}</h2>
    <span class="tag">${CATEGORY_NAMES[el.category]}</span>

    <div class="info">
      <div>Atomic number<b>${el.number}</b></div>
      <div>Atomic mass<b>${el.mass}</b></div>
      <div>Period<b>${getPeriod(el.number)}</b></div>
      <div>Group<b>${isFBlock ? 'f-block' : el.position[1]}</b></div>
    </div>

    <div class="nav">
      <button id="prev">← Prev</button>
      <button id="next">Next →</button>
    </div>
  `;

  card.querySelector('.x').addEventListener('click', closeCard);
  card.querySelector('#prev').addEventListener('click', showPrevious);
  card.querySelector('#next').addEventListener('click', showNext);

  modal.classList.add('show');
}

function closeCard() {
  modal.classList.remove('show');
}

// wrap around: after 118 comes 1, before 1 comes 118
function showNext() {
  openCard(currentNumber === TOTAL ? 1 : currentNumber + 1);
}

function showPrevious() {
  openCard(currentNumber === 1 ? TOTAL : currentNumber - 1);
}

// click on the dark background closes the card
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeCard();
});

// keyboard: Esc closes, arrow keys move between elements
document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('show')) return;

  if (event.key === 'Escape') closeCard();
  if (event.key === 'ArrowRight') showNext();
  if (event.key === 'ArrowLeft') showPrevious();
});
