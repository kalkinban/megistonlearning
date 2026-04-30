import fs from "fs";

// --- CORE TERMS ---
const base = [
  ["atom","smallest unit of matter"],
  ["proton","positively charged particle"],
  ["neutron","neutral particle"],
  ["electron","negatively charged particle"],
  ["nucleus","center of atom"],
  ["element","pure substance of atoms"],
  ["period","row in periodic table"],
  ["group","column in periodic table"],
  ["ionic bond","transfer of electrons"],
  ["covalent bond","sharing electrons"],
  ["ion","charged atom"],
  ["cation","positive ion"],
  ["anion","negative ion"],
  ["compound","two or more elements"],
  ["solution","uniform mixture"],
  ["solute","dissolved substance"],
  ["solvent","dissolving substance"],
  ["SI unit","standard measurement"],
  ["meter","unit of length"],
  ["gram","unit of mass"]
];

// --- COVALENT COMPOUNDS ---
const covalent = [
  ["H2O","water"],["NH3","ammonia"],["CH4","methane"],
  ["CO2","carbon dioxide"],["CO","carbon monoxide"],
  ["NO2","nitrogen dioxide"],["SO2","sulfur dioxide"],
  ["SO3","sulfur trioxide"],["H2O2","hydrogen peroxide"],
  ["O3","ozone"],["CF4","carbon tetrafluoride"],
  ["CCl4","carbon tetrachloride"],["PCl3","phosphorus trichloride"],
  ["PCl5","phosphorus pentachloride"],["SF6","sulfur hexafluoride"]
];

let vocab = [];

// add base
base.forEach(([q,a])=>{
  vocab.push({q,a});
});

// expand compounds
covalent.forEach(([f,n])=>{
  vocab.push({q:f,a:n});
  vocab.push({q:n,a:f});
  vocab.push({q:`Name: ${f}`,a:n});
  vocab.push({q:`Formula: ${n}`,a:f});
});

// fill to 500
while(vocab.length < 500){
  vocab = vocab.concat(vocab);
}

vocab = vocab.slice(0,500);

fs.writeFileSync("./public/vocab.json", JSON.stringify(vocab,null,2));

console.log("Generated", vocab.length, "terms");
