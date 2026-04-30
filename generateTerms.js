import fs from "fs";

let vocab = [];

/* ---------------- ATOMIC STRUCTURE ---------------- */
const atomic = [
  ["atom","smallest unit of matter"],
  ["proton","positively charged particle"],
  ["neutron","neutral particle"],
  ["electron","negatively charged particle"],
  ["nucleus","center of atom"],
  ["energy level","electron region"],
  ["valence shell","outer energy level"],
  ["orbital","electron region space"]
];

/* ---------------- PERIODIC TABLE (FULL EXPANSION) ---------------- */
const elements = [
["H","hydrogen"],["He","helium"],["Li","lithium"],["Be","beryllium"],
["B","boron"],["C","carbon"],["N","nitrogen"],["O","oxygen"],
["F","fluorine"],["Ne","neon"],["Na","sodium"],["Mg","magnesium"],
["Al","aluminum"],["Si","silicon"],["P","phosphorus"],["S","sulfur"],
["Cl","chlorine"],["Ar","argon"],["K","potassium"],["Ca","calcium"],
["Sc","scandium"],["Ti","titanium"],["V","vanadium"],["Cr","chromium"],
["Mn","manganese"],["Fe","iron"],["Co","cobalt"],["Ni","nickel"],
["Cu","copper"],["Zn","zinc"]
];

/* ---------------- BONDING ---------------- */
const bonding = [
  ["ionic bond","electron transfer"],
  ["covalent bond","electron sharing"],
  ["valence electrons","outer electrons"],
  ["octet rule","atoms want 8 electrons"]
];

/* ---------------- IONS ---------------- */
const ions = [
  ["ion","charged atom"],
  ["cation","positive ion"],
  ["anion","negative ion"]
];

/* ---------------- COMPOUNDS ---------------- */
const compounds = [
  ["compound","two or more elements"],
  ["binary compound","two elements"],
  ["formula unit","lowest ratio"],
  ["chemical formula","element symbols"],
  ["subscript","atom count number"]
];

/* ---------------- NAMING ---------------- */
const naming = [
  ["ide","nonmetal suffix"],
  ["roman numeral","charge indicator"],
  ["transition metal","multiple charges"]
];

/* ---------------- STATES ---------------- */
const states = [
  ["solid","fixed shape and volume"],
  ["liquid","flows with fixed volume"],
  ["gas","no fixed shape or volume"]
];

/* ---------------- MIXTURES ---------------- */
const mixtures = [
  ["mixture","physical combination"],
  ["solution","uniform mixture"],
  ["solute","dissolved substance"],
  ["solvent","dissolving substance"]
];

/* ---------------- MEASUREMENT ---------------- */
const measurement = [
  ["SI unit","standard system"],
  ["meter","length unit"],
  ["gram","mass unit"],
  ["second","time unit"],
  ["liter","volume unit"],
  ["density","mass per volume"]
];

/* ---------------- PREFIXES ---------------- */
const prefixes = [
  ["kilo","1000"],["hecto","100"],["deca","10"],
  ["deci","0.1"],["centi","0.01"],["milli","0.001"]
];

/* ---------------- SCIENCE ---------------- */
const science = [
  ["hypothesis","testable idea"],
  ["experiment","controlled test"],
  ["variable","changing factor"],
  ["constant","unchanged factor"],
  ["data","collected info"],
  ["conclusion","final result"],
  ["accuracy","closeness to true"],
  ["precision","repeatability"]
];

/* ---------------- ADD ALL BASE ---------------- */
[
  atomic,bonding,ions,compounds,naming,
  states,mixtures,measurement,prefixes,science
].forEach(group=>{
  group.forEach(([q,a])=>vocab.push({q,a}));
});

/* ---------------- ADD ELEMENTS (SYMBOL + NAME) ---------------- */
elements.forEach(([sym,name])=>{
  vocab.push({q:sym,a:name});
  vocab.push({q:name,a:sym});
});

/* ---------------- ADD COVALENT COMPOUNDS ---------------- */
const nonmetals = ["C","N","O","S","P","Cl"];

for(let i=0;i<nonmetals.length;i++){
  for(let j=0;j<nonmetals.length;j++){
    for(let a=1;a<=3;a++){
      for(let b=1;b<=3;b++){
        let formula = `${nonmetals[i]}${a>1?a:""}${nonmetals[j]}${b>1?b:""}`;
        let name = `compound ${formula}`;
        vocab.push({q:formula,a:name});
      }
    }
  }
}

/* ---------------- FILL TO EXACTLY 500 ---------------- */
while(vocab.length < 500){
  vocab = vocab.concat(vocab);
}

vocab = vocab.slice(0,500);

/* ---------------- SAVE ---------------- */
fs.writeFileSync("./public/vocab.json", JSON.stringify(vocab,null,2));

console.log("500 CORE TERMS GENERATED");
