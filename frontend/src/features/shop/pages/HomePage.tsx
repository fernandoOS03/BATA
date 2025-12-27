import { BannerHero } from '../components/BannerHero';
import type { BannerData } from '../types/banner.types';

// --- CONFIGURACIÓN DE DATOS (Puedes mover esto a un archivo .mock o traerlo de una API) ---

const MAIN_CAROUSEL: BannerData = {
  id: 'main-1',
  categoryName: 'ZONA SALE 🏷️',
  offerText: '-60% OFF',
  backgroundImage: '/imagenes/nike-cuero.jpg',
  actions: [
    { label: 'Mujer', route: '/shop/mujer' },
    { label: 'Hombre', route: '/shop/hombre' },
    { label: 'Infantil', route: '/shop/infantil' },
  ]
};

const TRIPLE_BANNERS: BannerData[] = [
  {
    id: 't-1',
    categoryName: 'MUJER',
    offerText: 'HASTA -50% OFF',
    backgroundImage: '/imagenes/mujer.jpg',
    actions: [{ label: 'Zapatillas', route: '/shop/mujer/zapatillas' }, { label: 'Sandalias', route: '/shop/mujer/sandalias' }]
  },
  {
    id: 't-2',
    categoryName: 'HOMBRE',
    offerText: 'HASTA -50% OFF',
    backgroundImage: '/imagenes/hombre.jpg',
    actions: [{ label: 'Zapatillas', route: '/shop/hombre/zapatillas' }, { label: 'Casual', route: '/shop/hombre/casual' }]
  },
  {
    id: 't-3',
    categoryName: 'INFANTIL',
    offerText: 'HASTA -50% OFF',
    backgroundImage: '/imagenes/infantil.jpg',
    actions: [{ label: 'Niños', route: '/shop/infantil/ninos' }, { label: 'Niñas', route: '/shop/infantil/ninas' }]
  }
];

const DOUBLE_BANNERS: BannerData[] = [
  {
    id: 'd-1',
    categoryName: 'ZAPATILLAS',
    offerText: 'HASTA -60% OFF',
    backgroundImage: '/imagenes/zapatillas-blancas.jpg',
    actions: [{ label: 'Mujer', route: '/shop/mujer/zapatillas' }, { label: 'Hombre', route: '/shop/hombre/zapatillas' }]
  },
  {
    id: 'd-2',
    categoryName: 'SANDALIAS',
    offerText: 'HASTA -50% OFF',
    backgroundImage: '/imagenes/sandalias.jpg',
    actions: [{ label: 'Mujer', route: '/shop/mujer/sandalias' }, { label: 'Hombre', route: '/shop/hombre/sandalias' }]
  }
];

// --- COMPONENTE PRINCIPAL ---

export const HomePage = () => {
  return (
    <div className="w-full">
      
      {/* 1. SECCIÓN CARRUSEL (Ancho completo) */}
      <section className="w-full">
        {/* Aquí puedes envolverlo en un Swiper si quieres que deslice, 
            por ahora se ve como el Banner Principal de Bata */}
        <BannerHero data={MAIN_CAROUSEL} isFullHeight={true} />
      </section>

      {/* 2. SECCIÓN TRIPLE (MUJER | HOMBRE | INFANTIL) */}
      <section className="grid grid-cols-1 md:grid-cols-3 w-full">
        {TRIPLE_BANNERS.map((banner) => (
          <BannerHero key={banner.id} data={banner} />
        ))}
      </section>

      {/* 3. SECCIÓN DOBLE (ZAPATILLAS | SANDALIAS) */}
      <section className="grid grid-cols-1 md:grid-cols-2 w-full">
        {DOUBLE_BANNERS.map((banner) => (
          <BannerHero key={banner.id} data={banner} />
        ))}
      </section>

      {/* 4. PRODUCTOS (Con el margen de la tienda) */}
      <div className="container-main mt-16 mb-20">
        <h2 className="text-[22px] font-black uppercase tracking-tighter italic mb-8">
            Nuevos Lanzamientos
        </h2>
        {/* Aquí va tu ProductList */}
      </div>

    </div>
  );
};