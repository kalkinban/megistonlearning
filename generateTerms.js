import fs from "fs";

let vocab = [];

/* ---------------- CORE TERMS ---------------- */
const base = [
  ["atom","smallest unit of matter"],
  ["proton","positively charged particle"],
  ["neutron","neutral particle"],
  ["electron","negatively charged particle"],
  ["nucleus","center of atom"],
  ["element","pure substance"],
  ["compound","two or more elements"],
  ["mixture","physical combination"],
  ["solution","uniform mixture"],
  ["solute","dissolved substance"],
  ["solvent","dissolving substance"],
  ["ionic bond","electron transfer"],
  ["covalent bond","electron sharing"],
  ["ion","charged atom"],
  ["cation","positive ion"],
  ["anion","negative ion"]
];

base.forEach(([q,a])=>vocab.push({q,a}));

/* ---------------- PERIODIC TABLE (AUTO) ---------------- */
const elements = [
  ["H","hydrogen"],["He","helium"],["Li","lithium"],["Be","beryllium"],
  ["B","boron"],["C","carbon"],["N","nitrogen"],["O","oxygen"],
  ["F","fluorine"],["Ne","neon"],["Na","sodium"],["Mg","magnesium"],
  ["Al","aluminum"],["Si","silicon"],["P","phosphorus"],["S","sulfur"],
  ["Cl","chlorine"],["Ar","argon"],["K","potassium"],["Ca","calcium"]
];

elements.forEach(([sym,name])=>{
  vocab.push({q:sym,a:name});
  vocab.push({q:name,a:sym});
});

/* ---------------- COVALENT COMBINATIONS ---------------- */
const nonmetals = [
  ["C","carbon"],["N","nitrogen"],["O","oxygen"],
  ["S","sulfur"],["P","phosphorus"],["Cl","chlorine"]
];

const prefixes = [
  ["mono","1"],["di","2"],["tri","3"],
  ["tetra","4"],["penta","5"],["hexa","6"]
];

nonmetals.forEach(([sym1,name1])=>{
  nonmetals.forEach(([sym2,name2])=>{
    prefixes.forEach(([p1,n1])=>{
      prefixes.forEach(([p2,n2])=>{

        let formula = `${sym1}${n1>1?n1:""}${sym2}${n2>1?n2:""}`;
        let name = `${p1==="mono"?"":p1}${name1} ${p2}${name2}ide`;

        vocab.push({q:formula,a:name});
        vocab.push({q:name,a:formula});

      });
    });
  });
});

/* ---------------- SIMPLE HYDROCARBONS ---------------- */
for(let i=1;i<=20;i++){
  let formula = `C${i}H${2*i+2}`;
  vocab.push({q:formula,a:`alkane ${i}`});
}

/* ---------------- EXPAND UNTIL HUGE ---------------- */
while(vocab.length < 1200){
  vocab = vocab.concat(vocab);
}

/* ---------------- CLEAN + TRIM ---------------- */
const seen = new Set();
let final = [];

vocab.forEach(v=>{
  if(!seen.has(v.q)){
    seen.add(v.q);
    final.push(v);
  }
});

final = final.slice(0,1000);

/* ---------------- SAVE ---------------- */
fs.writeFileSync("./public/vocab.json", JSON.stringify(final,null,2));

console.log("Generated", final.length, "TERMS");
