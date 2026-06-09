const normalizeUnits = manifest => {
  const deep = structuredClone(manifest);
  if (manifest.unit == "lb") {
    deep.containerId = manifest.containerId;
    deep.destination = manifest.destination;
    deep.weight = manifest.weight * 0.45;
    deep.unit = "kg";
    deep.hazmat = manifest.hazmat;
  }
  return deep;
};

const man1 = {
  containerId: 1,
  destination: "Palermo, Italy",
  weight: 831,
  unit: "lb",
  hazmat: false,
};

const man2 = {
  containerId: 2,
  destination: "Rome, Italy",
  weight: 1200,
  unit: "lb",
  hazmat: true,
};

const man3 = {
  containerId: 3,
  destination: "London, UK",
  weight: 429,
  unit: "kg",
  hazmat: false,
};

const man4 = {
  containerId: 0,
  destination: 405,
  weight: -84,
  unit: "pounds",
  hazmat: "no",
};

const man5 = {
  containerId: 1,
  destination: "Santa Cruz",
  weight: 304,
  unit: "kg",
  hazmat: false,
};

const man6 = { containerId: 3.5 };
const man7 = { destination: "  " };
const man8 = { weight: NaN };

const validateManifest = manifest => {
  const deep = {};
  const keys = ["containerId", "destination", "weight", "unit", "hazmat"];
  console.log(typeof 3);
  if (
    typeof manifest.containerId !== "number" ||
    manifest.containerId < 1 ||
    manifest.containerId.toString().includes(".")
  ) {
    deep.containerId = "Invalid";
  }

  if (
    typeof manifest.destination !== "string" ||
    manifest.destination.trim() === ""
  ) {
    deep.destination = "Invalid";
  }
  if (
    manifest.weight === NaN ||
    typeof manifest.weight !== "number" ||
    manifest.weight < 0
  ) {
    deep.weight = "Invalid";
  }
  if (!(manifest.unit === "lb" || manifest.unit === "kg")) {
    deep.unit = "Invalid";
  }
  if (typeof manifest.hazmat !== "boolean") {
    deep.hazmat = "Invalid";
  }

  if (keys.length !== Object.keys(manifest).length) {
    for (let k of keys) {
      if (!Object.keys(manifest).includes(k)) {
        deep[k] = "Missing";
      }
    }
  }

  return deep;
};
console.log(validateManifest(man8));
