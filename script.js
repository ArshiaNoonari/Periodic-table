



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


const CATEGORY_MEMBERS = {
  n: [1, 6, 7, 8, 15, 16, 34],
  g: [2, 10, 18, 36, 54, 86, 118],
  h: [9, 17, 35, 53, 85, 117],
  a: [3, 11, 19, 37, 55, 87],
  e: [4, 12, 20, 38, 56, 88],
  m: [5, 14, 32, 33, 51, 52],
  p: [13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116],
};

const STATE_NAMES = { solid: '🧊 Solid', liquid: '💧 Liquid', gas: '☁️ Gas', unknown: '❔ Unknown' };

const GASES = [1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86];
const LIQUIDS = [35, 80];

const CATEGORY_SAYS = {
  n: 'Nonmetals are the building blocks of life! 🌱',
  g: 'Noble gases are shy, they rarely react with anyone! 🤫',
  h: 'Halogens love grabbing electrons! 🧲',
  a: 'Alkali metals are so excited, they explode in water! 💥',
  e: 'Alkaline earth metals are strong and shiny! ✨',
  m: 'Metalloids can’t decide: half metal, half nonmetal! 🤔',
  p: 'Post-transition metals are soft and chill. 😌',
  t: 'Transition metals make colorful things and strong magnets! 🎨',
  l: 'Lanthanides sit in the bottom row to keep the table tidy! 🙈',
  c: 'Actinides are radioactive, handle with care! ☢️',
};


const SPECIAL_SAYS = {
  1: 'I’m the lightest element and the most common in the universe! 🌌',
  2: 'I make balloons float and voices squeaky! 🎈',
  6: 'Diamonds and pencils are both me! 💎✏️',
  8: 'You breathe me every single second! 🫁',
  11: 'Mix me with chlorine and you get table salt! 🧂',
  14: 'Sand and computer chips are made of me! 💻',
  17: 'I keep swimming pools clean! 🏊',
  20: 'I build your bones and teeth! 🦴',
  26: 'I’m in your blood and in every steel bridge! 🌉',
  79: 'Shiny, rare and I never rust. Call me gold! 👑',
  80: 'I’m the only metal that is liquid at room temperature! 💧',
  92: 'I power nuclear reactors! ⚡',
};


const SHELL_EXCEPTIONS = {
  24: '2,8,13,1',   29: '2,8,18,1',
  41: '2,8,18,12,1', 42: '2,8,18,13,1', 44: '2,8,18,15,1', 45: '2,8,18,16,1',
  46: '2,8,18,18',   47: '2,8,18,18,1',
  57: '2,8,18,18,9,2', 58: '2,8,18,19,9,2', 64: '2,8,18,25,9,2',
  78: '2,8,18,32,17,1', 79: '2,8,18,32,18,1',
  89: '2,8,18,32,18,9,2', 90: '2,8,18,32,18,10,2', 91: '2,8,18,32,20,9,2',
  92: '2,8,18,32,21,9,2', 93: '2,8,18,32,22,9,2', 96: '2,8,18,32,25,9,2',
  103: '2,8,18,32,32,8,3',
};


const SUBSHELLS = [
  [1, 2], [2, 2], [2, 6], [3, 2], [3, 6], [4, 2], [3, 10], [4, 6], [5, 2], [4, 10],
  [5, 6], [6, 2], [4, 14], [5, 10], [6, 6], [7, 2], [5, 14], [6, 10], [7, 6],
];


const COMPOUNDS = {
  '1+1': 'Hydrogen gas (H₂) 🎈',
  '7+7': 'Nitrogen gas (N₂), 78% of the air 🌬️',
  '8+8': 'Oxygen gas (O₂), the air you breathe 🫁',
  '17+17': 'Chlorine gas (Cl₂), pool smell 🏊',
  '1+8': 'Water (H₂O) 💧',
  '1+6': 'Methane (CH₄), cooking gas 🔥',
  '1+7': 'Ammonia (NH₃), cleaning spray 🧴',
  '1+9': 'Hydrofluoric acid (HF), super dangerous! ⚠️',
  '1+16': 'Hydrogen sulfide (H₂S), the rotten egg smell 🥚',
  '1+17': 'Hydrochloric acid (HCl), found in your stomach 🍋',
  '6+8': 'Carbon dioxide (CO₂), the bubbles in soda 🥤',
  '7+8': 'Nitrogen dioxide (NO₂), orange smog 🟠',
  '8+11': 'Sodium oxide (Na₂O) 🧼',
  '8+12': 'Magnesium oxide (MgO), the bright flash in fireworks ✨',
  '8+13': 'Aluminium oxide (Al₂O₃), rubies and sapphires 💎',
  '8+14': 'Silicon dioxide (SiO₂), sand and quartz 🏖️',
  '8+16': 'Sulfur dioxide (SO₂), from volcanoes 🌋',
  '8+20': 'Quicklime (CaO) 🧱',
  '8+22': 'Titanium dioxide (TiO₂), white paint 🎨',
  '8+26': 'Rust (Fe₂O₃) 🟤',
  '8+30': 'Zinc oxide (ZnO), sunscreen! ☀️',
  '11+17': 'Table salt (NaCl) 🧂',
  '17+19': 'Potassium chloride (KCl), a salt substitute 🥗',
  '17+20': 'Calcium chloride (CaCl₂), melts ice on roads ❄️',
  '16+47': 'Silver sulfide (Ag₂S), why silver turns dark 🥄',
  '16+80': 'Cinnabar (HgS), a bright red mineral 🔴',
};






function getCategory(z) {
  if (z >= 57 && z <= 71) return 'l';   
  if (z >= 89 && z <= 103) return 'c';  

  for (const [key, numbers] of Object.entries(CATEGORY_MEMBERS)) {
    if (numbers.includes(z)) return key;
  }
  return 't';                           
}


function getPosition(z) {
  if (z === 1) return [1, 1];
  if (z === 2) return [1, 18];

  if (z <= 4)   return [2, z - 2];     
  if (z <= 10)  return [2, z + 8];
  if (z <= 12)  return [3, z - 10];     
  if (z <= 18)  return [3, z];
  if (z <= 36)  return [4, z - 18];    
  if (z <= 54)  return [5, z - 36];     
  if (z <= 56)  return [6, z - 54];     
  if (z <= 71)  return [9, z - 54];     
  if (z <= 86)  return [6, z - 68];
  if (z <= 88)  return [7, z - 86];    
  if (z <= 103) return [10, z - 86];    
  return [7, z - 100];
}


function getPeriod(z) {
  if (z <= 2)  return 1;
  if (z <= 10) return 2;
  if (z <= 18) return 3;
  if (z <= 36) return 4;
  if (z <= 54) return 5;
  if (z <= 86) return 6;
  return 7;
}


function getStateKey(z) {
  if (z >= 104) return 'unknown';
  if (GASES.includes(z)) return 'gas';
  if (LIQUIDS.includes(z)) return 'liquid';
  return 'solid';
}

function getState(z) {
  return STATE_NAMES[getStateKey(z)];
}


function getBlock(el) {
  const col = el.position[1];
  if (el.category === 'l' || el.category === 'c') return 'f';
  if (col <= 2 || el.number === 2) return 's';
  if (col >= 13) return 'p';
  return 'd';
}


function getShells(z) {
  if (SHELL_EXCEPTIONS[z]) return SHELL_EXCEPTIONS[z].split(',').map(Number);

  const shells = [];
  let left = z;
  for (const [shell, capacity] of SUBSHELLS) {
    if (left <= 0) break;
    const put = Math.min(capacity, left);
    shells[shell - 1] = (shells[shell - 1] || 0) + put;
    left -= put;
  }
  return shells;
}






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
      node: null,   
    };
  });

const grid = document.getElementById('grid');

document.getElementById('title').innerHTML = '<span class="grad">Periodic Table</span> 🧪';

// one tile per element
elements.forEach((el) => {
  const [row, col] = el.position;

  const tile = document.createElement('div');
  tile.className = 'el';
  tile.style.setProperty('--bg', `var(--${el.category})`);
  tile.style.gridRow = row;
  tile.style.gridColumn = col;
  tile.style.animationDelay = `${col * 28 + row * 45}ms`;   
  tile.innerHTML = `
    <span class="z">${el.number}</span>
    <div class="s">${el.symbol}</div>
    <div class="nm">${el.name}</div>
  `;
  tile.addEventListener('click', () => onTileClick(el));

  el.node = tile;
  grid.appendChild(tile);
});


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





const root = document.documentElement;
const themeButton = document.getElementById('theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? '☀️' : '🌙';
  try {
    localStorage.setItem('pt-theme', theme);
  } catch (error) { /* storage not available, that's fine */ }
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem('pt-theme');
} catch (error) { /* ignore */ }

setTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));





const legend = document.getElementById('legend');
const modeBar = document.getElementById('modes');
const searchBox = document.getElementById('search');


const MODES = {
  category: {
    label: '🎨 Category',
    keyOf: (el) => el.category,
    names: CATEGORY_NAMES,
    colors: null,
  },
  state: {
    label: '🧊 State',
    keyOf: (el) => getStateKey(el.number),
    names: STATE_NAMES,
    colors: { solid: 't', liquid: 'm', gas: 'g', unknown: 'e' },
  },
  block: {
    label: '🧩 Block',
    keyOf: (el) => getBlock(el),
    names: { s: 's-block', p: 'p-block', d: 'd-block', f: 'f-block' },
    colors: { s: 'a', p: 'h', d: 't', f: 'l' },
  },
};

let mode = 'category';
let activeKey = null;   
let searchText = '';

const colorFor = (key) => (MODES[mode].colors ? MODES[mode].colors[key] : key);


Object.entries(MODES).forEach(([name, info]) => {
  const button = document.createElement('button');
  button.className = 'chip';
  button.textContent = info.label;
  button.dataset.mode = name;
  button.addEventListener('click', () => setMode(name));
  modeBar.appendChild(button);
});


function buildLegend() {
  legend.innerHTML = '';

  Object.entries(MODES[mode].names).forEach(([key, label]) => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = label;
    chip.style.setProperty('--bg', `var(--${colorFor(key)})`);

    chip.addEventListener('click', () => {
      // clicking the same chip again turns the filter off
      activeKey = activeKey === key ? null : key;

      [...legend.children].forEach((c) => c.classList.remove('on'));
      if (activeKey) chip.classList.add('on');

      applyFilters();
    });

    legend.appendChild(chip);
  });
}


function setMode(name) {
  mode = name;
  activeKey = null;

  elements.forEach((el) => {
    el.node.style.setProperty('--bg', `var(--${colorFor(MODES[mode].keyOf(el))})`);
  });

  [...modeBar.children].forEach((b) => b.classList.toggle('on', b.dataset.mode === mode));
  buildLegend();
  applyFilters();
}

searchBox.addEventListener('input', (event) => {
  searchText = event.target.value.trim().toLowerCase();
  applyFilters();
});


function applyFilters() {
  elements.forEach((el) => {
    const symbol = el.symbol.toLowerCase();
    const name = el.name.toLowerCase();

    const matchesGroup = !activeKey || MODES[mode].keyOf(el) === activeKey;
    const matchesSearch = !searchText || name.includes(searchText) || symbol.startsWith(searchText);

    el.node.classList.toggle('dim', !(matchesGroup && matchesSearch));
  });
}





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

    <div class="orbit"><div class="big">${el.symbol}</div><div class="face"><i></i><i></i></div></div>
    <p class="say">${SPECIAL_SAYS[el.number] || CATEGORY_SAYS[el.category]}</p>
    <h2>${el.name}</h2>
    <span class="tag">${CATEGORY_NAMES[el.category]}</span>

    <div class="info">
      <div>Atomic number<b>${el.number}</b></div>
      <div>Atomic mass<b>${el.mass}</b></div>
      <div>Period<b>${getPeriod(el.number)}</b></div>
      <div>Group<b>${isFBlock ? 'f-block' : el.position[1]}</b></div>
      <div>State<b>${getState(el.number)}</b></div>
      <div>Block<b>${getBlock(el)}</b></div>
      <div class="wide">Electrons per shell<b>${getShells(el.number).join(' · ')}</b></div>
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


function showNext() {
  openCard(currentNumber === TOTAL ? 1 : currentNumber + 1);
}

function showPrevious() {
  openCard(currentNumber === 1 ? TOTAL : currentNumber - 1);
}


modal.addEventListener('click', (event) => {
  if (event.target === modal) closeCard();
});


document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('show')) return;

  if (event.key === 'Escape') closeCard();
  if (event.key === 'ArrowRight') showNext();
  if (event.key === 'ArrowLeft') showPrevious();
});






let audio = null;

function beep(notes) {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    notes.forEach((freq, i) => {
      const start = audio.currentTime + i * 0.12;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
  } catch (error) { /* no sound, that's fine */ }
}


let collected = new Set(loadCollected());

function loadCollected() {
  try {
    return JSON.parse(localStorage.getItem('pt-collected')) || [];
  } catch (error) {
    return [];
  }
}

function collect(el) {
  collected.add(el.number);
  el.node.classList.add('got');
  try {
    localStorage.setItem('pt-collected', JSON.stringify([...collected]));
  } catch (error) { /* storage not available, that's fine */ }
}

collected.forEach((number) => elements[number - 1].node.classList.add('got'));

const playButton = document.getElementById('play');
const quizBar = document.getElementById('quiz');

let quiz = null;   
let bestScore = 0;

playButton.addEventListener('click', () => (quiz ? stopQuiz() : startQuiz()));

function startQuiz() {
  if (lab) stopLab();
  quiz = { target: null, score: 0, streak: 0, message: '' };
  quizBar.hidden = false;
  playButton.textContent = '✋ Stop';
  nextQuestion();
}

function stopQuiz() {
  quiz = null;
  quizBar.hidden = true;
  playButton.textContent = '🎮 Play';
  elements.forEach((el) => el.node.classList.remove('right', 'wrong'));
}

function nextQuestion() {
  elements.forEach((el) => el.node.classList.remove('right', 'wrong'));
  quiz.target = elements[Math.floor(Math.random() * TOTAL)];
  quiz.message = '';
  quiz.question = null;
  renderQuiz();
}

function renderQuiz() {
  const { target, score, streak, message } = quiz;
  
  if (!quiz.question) {
    quiz.question = Math.random() < 0.5 ? target.name : `element #${target.number}`;
  }
  quizBar.innerHTML = `
    <span>🎯 Find: <b>${quiz.question}</b></span>
    <span>⭐ ${score}</span>
    <span>🔥 ${streak}</span>
    <span>🏆 ${bestScore}</span>
    <span>📒 ${collected.size}/${TOTAL}</span>
    ${message ? `<span>${message}</span>` : ''}
  `;
}


function onTileClick(el) {
  if (lab) return labPick(el);
  if (!quiz) return openCard(el.number);

  if (el === quiz.target) {
    quiz.score++;
    quiz.streak++;
    bestScore = Math.max(bestScore, quiz.score);
    el.node.classList.add('right');
    collect(el);
    sparkle(el.node);
    beep([660, 880, 1100]);
    quiz.message = quiz.streak % 5 === 0 ? '🔥 On fire!' : '💖 Yay!';
    renderQuiz();
    setTimeout(() => quiz && nextQuestion(), 900);
  } else {
    quiz.streak = 0;
    el.node.classList.add('wrong');
    setTimeout(() => el.node.classList.remove('wrong'), 500);
    quiz.message = '💭 Try again';
    beep([220]);
    renderQuiz();
  }
}


function sparkle(node) {
  const box = node.getBoundingClientRect();
  ['✨', '💖', '⭐', '🌸', '✨', '💫', '🎀', '⭐'].forEach((emoji, i) => {
    const spark = document.createElement('span');
    const angle = (i / 8) * Math.PI * 2;
    spark.className = 'spark';
    spark.textContent = emoji;
    spark.style.left = `${box.left + box.width / 2}px`;
    spark.style.top = `${box.top + box.height / 2}px`;
    spark.style.setProperty('--dx', `${Math.cos(angle) * 60}px`);
    spark.style.setProperty('--dy', `${Math.sin(angle) * 60}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  });
}





const labBar = document.getElementById('lab');
const labButton = document.getElementById('labbtn');
let lab = null;   // null = lab is off, otherwise { picks: [element, element] }

labButton.addEventListener('click', () => (lab ? stopLab() : startLab()));

function startLab() {
  if (quiz) stopQuiz();
  lab = { picks: [] };
  labBar.hidden = false;
  labButton.textContent = '✋ Leave lab';
  renderLab();
}

function stopLab() {
  lab = null;
  labBar.hidden = true;
  labButton.textContent = '🧪 Lab';
  elements.forEach((el) => el.node.classList.remove('picked'));
}

function labPick(el) {
  if (lab.picks.length === 2) lab.picks = [];   
  lab.picks.push(el);

  elements.forEach((e) => e.node.classList.toggle('picked', lab.picks.includes(e)));
  renderLab();

  if (lab.picks.length === 2) {
    beep([520, 780]);
    sparkle(labBar);
  }
}

function mix(a, b) {
  const key = [a.number, b.number].sort((x, y) => x - y).join('+');
  if (COMPOUNDS[key]) return COMPOUNDS[key];
  if (a === b) return `Just more ${a.name}! 🫧`;
  return 'Nothing famous happens… try another pair! 🤷';
}

function renderLab() {
  const [a, b] = lab.picks;
  const slot = (el) => `<span class="slot${el ? '' : ' empty'}">${el ? el.symbol : '?'}</span>`;

  labBar.innerHTML = `
    ${slot(a)} <span>+</span> ${slot(b)}
    ${a && b ? `<span>=</span><b>${mix(a, b)}</b>` : '<span>Tap two elements to mix them 🧪</span>'}
  `;
}





// 🎲 Random button
document.getElementById('random').addEventListener('click', () => {
  if (quiz) stopQuiz();
  openCard(1 + Math.floor(Math.random() * TOTAL));
});

// hover (mouse only): light up the same group (column) and period (row)
elements.forEach((el) => {
  el.node.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'mouse') return;
    const [row, col] = el.position;
    const fRow = row >= 9;

    elements.forEach((other) => {
      const [r, c] = other.position;
      const samePeriod = r === row;
      const sameGroup = !fRow && c === col && r < 9;
      other.node.classList.toggle('rel', samePeriod || sameGroup);
    });
  });

  el.node.addEventListener('pointerleave', () => {
    elements.forEach((other) => other.node.classList.remove('rel'));
  });
});


elements.forEach((el) => {
  el.node.tabIndex = 0;
  el.node.setAttribute('role', 'button');
  el.node.setAttribute('aria-label', `${el.name}, atomic number ${el.number}`);
  el.node.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onTileClick(el);
    }
  });
});





setMode('category');
