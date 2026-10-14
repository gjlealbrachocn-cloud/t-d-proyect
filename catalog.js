// Los nombres y las imágenes son contenido inicial. Completar los tamaños y precios
// reales antes de habilitar Checkout Pro.
export const products = [
  { id: "xerjoff-naxos", name: "Naxos", house: "Xerjoff", family: "Ámbar · Aromático", description: "Miel, tabaco y lavanda en una composición envolvente.", variants: [{ size: "2 ml", unitPrice: null }, { size: "5 ml", unitPrice: null }, { size: "10 ml", unitPrice: null }] },
  { id: "jpg-le-male-elixir", name: "Le Male Elixir", house: "Jean Paul Gaultier", family: "Ámbar · Vainilla", description: "Dulce, cálido y magnético, con un fondo profundo.", variants: [{ size: "2 ml", unitPrice: null }, { size: "5 ml", unitPrice: null }, { size: "10 ml", unitPrice: null }] },
  { id: "jpg-le-male-le-parfum", name: "Le Male Le Parfum", house: "Jean Paul Gaultier", family: "Amaderado · Especiado", description: "Una estela elegante de cardamomo, lavanda y vainilla.", variants: [{ size: "2 ml", unitPrice: null }, { size: "5 ml", unitPrice: null }, { size: "10 ml", unitPrice: null }] },
  { id: "mandarin-sky", name: "Mandarin Sky", house: "Armaf · Odyssey", family: "Cítrico · Ámbar", description: "Mandarina luminosa con un corazón dulce y especiado.", variants: [{ size: "2 ml", unitPrice: null }, { size: "5 ml", unitPrice: null }, { size: "10 ml", unitPrice: null }] },
  { id: "his-confession", name: "His Confession", house: "Lattafa", family: "Ámbar · Vainilla", description: "Una mezcla intensa de especias, ámbar y notas dulces.", variants: [{ size: "2 ml", unitPrice: null }, { size: "5 ml", unitPrice: null }, { size: "10 ml", unitPrice: null }] }
];

export const publicProducts = products.map(({ id, name, house, family, description, variants }) => ({
  id, name, house, family, description, variants
}));