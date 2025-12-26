export const GENDER_OPTIONS = [
  { value: "HOMBRE", label: "Hombre" },
  { value: "MUJER", label: "Mujer" },
  { value: "NINO", label: "Niño" },
  { value: "NINA", label: "Niña" },
  { value: "UNISEX", label: "Unisex" },
] as const;
// 'as const' hace que TS sea más estricto con los tipos
// en resumen le dices es inmutable no generalices
// vuelve todo en readonly
