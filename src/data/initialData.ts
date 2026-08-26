import {
  Category,
  Product,
  Banner,
  InspirePost,
  LookBundle,
  Review,
  FAQ,
  HomeSection,
  SiteSettings,
  MediaItem
} from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-body', name: 'Body', slug: 'body', order: 1, icon: 'Shirt', description: 'Bodys em 100% algodão ultramacio com abotoamento prático', isActive: true, isFeatured: true },
  { id: 'cat-macacoes', name: 'Macacões', slug: 'macacoes', order: 2, icon: 'Package', description: 'Macacões aconchegantes com pezinho e zíper protetor', isActive: true, isFeatured: true },
  { id: 'cat-saida', name: 'Saída Maternidade', slug: 'saida-maternidade', order: 3, icon: 'Sparkles', description: 'Kits completos e delicados para o primeiro dia do bebê', isActive: true, isFeatured: true },
  { id: 'cat-vestidos', name: 'Vestidos', slug: 'vestidos', order: 4, icon: 'Heart', description: 'Vestidinhos leves, rodadinhos e confortáveis para momentos especiais', isActive: true, isFeatured: true },
  { id: 'cat-conjuntos', name: 'Conjuntos', slug: 'conjuntos', order: 5, icon: 'Layers', description: 'Combinações fofas de camiseta, blusa, calça e tapa-fralda', isActive: true, isFeatured: false },
  { id: 'cat-meninas', name: 'Meninas', slug: 'meninas', order: 6, icon: 'Smile', description: 'Coleção delicada em tons suaves de rosa, lilás e florais', isActive: true, isFeatured: false },
  { id: 'cat-meninos', name: 'Meninos', slug: 'meninos', order: 7, icon: 'Smile', description: 'Estampas alegres de bichinhos, azul celeste, verde sálvia e neutros', isActive: true, isFeatured: false },
  { id: 'cat-promocoes', name: 'Promoções', slug: 'promocoes', order: 8, icon: 'Tag', description: 'Descontos imperdíveis com a mesma qualidade e carinho de sempre', isActive: true, isFeatured: true },
  { id: 'cat-lancamentos', name: 'Lançamentos', slug: 'lancamentos', order: 9, icon: 'Star', description: 'Novidades quentinhas da coleção mais doce do ano', isActive: true, isFeatured: true },
];

export const INITIAL_PRODUCTS: Product[] = [
  // --------------------------------------------------------------------------
  // BODYS (7 LOOKS)
  // --------------------------------------------------------------------------
  {
    id: 'prod-body-1',
    sku: 'PX-BDY-001',
    name: 'Kit 3 Bodys 100% Algodão Nuvenzinha',
    slug: 'kit-3-bodys-100-algodao-nuvenzinha',
    price: 89.90,
    originalPrice: 119.90,
    discountPercentage: 25,
    installments: 'até 6x de R$ 14,98',
    stock: 45,
    weight: 0.25,
    dimensions: { length: 20, width: 15, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-body',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Branco & Rosa Soft', hex: '#FFD6E8' },
      { name: 'Azul Celeste & Nuvem', hex: '#E0F2FE' },
      { name: 'Creme Aconchego', hex: '#FEF3C7' }
    ],
    description: 'Toque aveludado e puro aconchego. Confeccionado em 100% Algodão de altíssima qualidade, este kit conta com abotoamento por botões de pressão livres de níquel que não irritam a pele sensível do seu bebê.',
    shortDescription: 'Kit de 3 bodys em 100% Algodão hipoalergênico.',
    details: [
      '100% Algodão macio certificado',
      'Gola americana expansível para facilitar a troca',
      'Botões de pressão antialérgicos na virilha',
      'Estampa artesanal antidesbotamento'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isBestSeller: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 48
  },
  {
    id: 'prod-body-2',
    sku: 'PX-BDY-002',
    name: 'Body Manga Longa Ursinho Carinhoso',
    slug: 'body-manga-longa-ursinho-carinhoso',
    price: 49.90,
    originalPrice: 65.00,
    discountPercentage: 23,
    installments: 'até 3x de R$ 16,63',
    stock: 28,
    weight: 0.18,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-body',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G'],
    colors: [
      { name: 'Amarelo Suave', hex: '#FFECB3' },
      { name: 'Verde Sálvia', hex: '#C8E6C9' }
    ],
    description: 'Um abraço quentinho para os dias mais frios. Possui punhos dobráveis protetores nas mãos para evitar arranhões involuntários no rosto nos tamanhos RN e P.',
    shortDescription: 'Body aconchegante com vira-luva nos tamanhos RN e P.',
    details: [
      '100% Algodão penteado ultra suave',
      'Vira-luva integrada nos tamanhos RN e P',
      'Costuras externas super macias que não incomodam'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 32
  },
  {
    id: 'prod-body-3',
    sku: 'PX-BDY-003',
    name: 'Body Regata Verão Algodão Doce',
    slug: 'body-regata-verao-algodao-doce',
    price: 39.90,
    originalPrice: 55.00,
    discountPercentage: 27,
    installments: 'até 2x de R$ 19,95',
    stock: 40,
    weight: 0.15,
    images: [
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-body',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Rosa Pastel', hex: '#FFD1DC' },
      { name: 'Branco Neve', hex: '#FFFFFF' }
    ],
    description: 'Leve, fresquinho e super respirável para os dias ensolarados. Malha ribana 100% algodão de alta elasticidade.',
    shortDescription: 'Body regatinha leve em malha ribana 100% algodão.',
    details: [
      '100% Algodão respirável',
      'Malha ribana super flexível',
      'Ideal para dias mais quentes'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 'prod-body-4',
    sku: 'PX-BDY-004',
    name: 'Body Manga Curta Estampa Coelhinho',
    slug: 'body-manga-curta-estampa-coelhinho',
    price: 44.90,
    originalPrice: 59.90,
    discountPercentage: 25,
    installments: 'até 2x de R$ 22,45',
    stock: 35,
    weight: 0.16,
    images: [
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-body',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G'],
    colors: [
      { name: 'Creme Baunilha', hex: '#FFF8DC' },
      { name: 'Cinza Mescla', hex: '#D3D3D3' }
    ],
    description: 'Com estampa fofa de coelhinho desenhada à mão em tinta atóxica à base de água. Conforto total para brincar e tirar a soneca.',
    shortDescription: 'Body com estampa artesanal atóxica e gola expansível.',
    details: [
      'Estampa toque zero livre de chumbo',
      'Gola transpassada tipo envelope',
      'Botões de pressão reforçados'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 30
  },
  {
    id: 'prod-body-5',
    sku: 'PX-BDY-005',
    name: 'Kit 2 Bodys Canelados Macios',
    slug: 'kit-2-bodys-canelados-macios',
    price: 69.90,
    originalPrice: 89.90,
    discountPercentage: 22,
    installments: 'até 4x de R$ 17,47',
    stock: 30,
    weight: 0.22,
    images: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-body',
    brand: 'Pixulinhos',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Terracota Soft', hex: '#E07A5F' },
      { name: 'Verde Menta', hex: '#A8DADC' }
    ],
    description: 'Modelagem ajustada e super estilosa em malha canelada de puro algodão. Um coringa indispensável para compor diversos lookinhos.',
    shortDescription: 'Kit de 2 bodys canelados em algodão nobre.',
    details: [
      'Malha canelada elastizada',
      'Super fácil de vestir',
      'Toque macio aveludado'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 19
  },
  {
    id: 'prod-body-6',
    sku: 'PX-BDY-006',
    name: 'Body Gola Bordada Rococó',
    slug: 'body-gola-bordada-rococo',
    price: 54.90,
    originalPrice: 75.00,
    discountPercentage: 27,
    installments: 'até 3x de R$ 18,30',
    stock: 25,
    weight: 0.17,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-body',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G'],
    colors: [
      { name: 'Branco Clássico', hex: '#FFFFFF' },
      { name: 'Rosa Delicado', hex: '#FFE4E1' }
    ],
    description: 'Elegância artesanal para colocar por baixo de macacões ou usar sozinho. Gola com delicado bordado em ponto rococó feito à mão.',
    shortDescription: 'Body com gola delicadamente bordada à mão.',
    details: [
      '100% Algodão Premium',
      'Gola de favo com bordado manual',
      'Ideal para montar composições finas'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 38
  },
  {
    id: 'prod-body-7',
    sku: 'PX-BDY-007',
    name: 'Body Basiquinho 100% Algodão Branco',
    slug: 'body-basiquinho-100-algodao-branco',
    price: 34.90,
    originalPrice: 45.00,
    discountPercentage: 22,
    installments: 'até 2x de R$ 17,45',
    stock: 60,
    weight: 0.14,
    images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-body',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Branco Puríssimo', hex: '#FFFFFF' }
    ],
    description: 'O essencial que toda mamãe precisa ter na mala do bebê. Super macio, neutro, hipoalergênico e extremamente durável pós-lavagem.',
    shortDescription: 'Body branco básico essencial 100% algodão.',
    details: [
      '100% Algodão natural e leve',
      'Não deformar nem desbota',
      'Livre de etiquetas internas grossas'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 42
  },

  // --------------------------------------------------------------------------
  // MACACÕES (7 LOOKS)
  // --------------------------------------------------------------------------
  {
    id: 'prod-macacao-1',
    sku: 'PX-MAC-001',
    name: 'Macacão Soft Plush Orelhinhas de Coelho',
    slug: 'macacao-soft-plush-orelhinhas-de-coelho',
    price: 119.90,
    originalPrice: 149.90,
    discountPercentage: 20,
    installments: 'até 6x de R$ 19,98',
    stock: 50,
    weight: 0.35,
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-macacoes',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Rosa Bebê', hex: '#FBCFE8' },
      { name: 'Cinza Nuvens', hex: '#E2E8F0' },
      { name: 'Creme Doce', hex: '#FFF7ED' }
    ],
    description: 'O macacão mais amado das mamães! Feito em fofíssimo plush aveludado com capuz adornado por orelhinhas de coelho. Zíper frontal bidirecional com proteção interna.',
    shortDescription: 'Macacão fofíssimo de plush térmico com zíper duplo.',
    details: [
      'Tecido Plush térmico ultra macio',
      'Zíper duplo com protetor de queixo',
      'Pezinho reversível',
      'Ideal para noites de soninho tranquilo'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 89
  },
  {
    id: 'prod-macacao-2',
    sku: 'PX-MAC-002',
    name: 'Macacão Zíper 100% Algodão Estampa Estrelinhas',
    slug: 'macacao-ziper-100-algodao-estampa-estrelinhas',
    price: 99.90,
    originalPrice: 129.90,
    discountPercentage: 23,
    installments: 'até 6x de R$ 16,65',
    stock: 35,
    weight: 0.30,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-macacoes',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G'],
    colors: [
      { name: 'Azul Céu Noturno', hex: '#1E3A8A' },
      { name: 'Cinza Estelar', hex: '#64748B' }
    ],
    description: 'Praticidade total na hora da troca com zíper da gola aos pés. Tecido de algodão super macio que proporciona conforto máximo durante a soneca.',
    shortDescription: 'Macacão 100% algodão com zíper prático de duas vias.',
    details: [
      'Zíper bidirecional protegido',
      '100% Algodão respirável',
      'Pezinho fechado com antiderrapante'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 45
  },
  {
    id: 'prod-macacao-3',
    sku: 'PX-MAC-003',
    name: 'Macacão Tricô Maternidade Aconchego',
    slug: 'macacao-trico-maternidade-aconchego',
    price: 139.90,
    originalPrice: 169.90,
    discountPercentage: 18,
    installments: 'até 6x de R$ 23,31',
    stock: 22,
    weight: 0.38,
    images: [
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-macacoes',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Vermelho Paixão', hex: '#DC2626' },
      { name: 'Creme Nuvens', hex: '#FEF3C7' }
    ],
    description: 'Tramas de tricô artesanal macio com toque térmico suave que não Pinica. Perfeito para registrar as primeiras memórias do bebê.',
    shortDescription: 'Macacão em tricô de algodão hipoalergênico.',
    details: [
      'Tricô 100% algodão hipoalergênico',
      'Botões de madeira ecológica',
      'Acompanha golinha bordada embutida'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 67
  },
  {
    id: 'prod-macacao-4',
    sku: 'PX-MAC-004',
    name: 'Macacão Pezinho Reversível Urso Pardo',
    slug: 'macacao-pezinho-reversivel-urso-pardo',
    price: 89.90,
    originalPrice: 115.00,
    discountPercentage: 22,
    installments: 'até 5x de R$ 17,98',
    stock: 28,
    weight: 0.28,
    images: [
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-macacoes',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Marrom Caramelo', hex: '#B45309' },
      { name: 'Cinza Mescla', hex: '#94A3B8' }
    ],
    description: 'Inovador sistema de pezinho reversível: vira sapatinho fechado para dormir ou vira punho aberto para o bebê engatinhar.',
    shortDescription: 'Macacão funcional com barra vira-pé inteligente.',
    details: [
      'Vira-pé inteligente que se adapta ao crescimento',
      '100% Algodão sustentável',
      'Fechamento prático por botões laterais'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'prod-macacao-5',
    sku: 'PX-MAC-005',
    name: 'Macacão Jardineira em Malha Canelada',
    slug: 'macacao-jardineira-em-malha-canelada',
    price: 94.90,
    originalPrice: 119.90,
    discountPercentage: 21,
    installments: 'até 6x de R$ 15,81',
    stock: 25,
    weight: 0.32,
    images: [
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-macacoes',
    brand: 'Pixulinhos',
    sizes: ['P', 'M', 'G', 'GG', '1'],
    colors: [
      { name: 'Verde Sálvia', hex: '#059669' },
      { name: 'Mostarda Vintage', hex: '#D97706' }
    ],
    description: 'Visual retrô encantador! Macacão estilo jardineira acoplada a um body de mangas compridas em malha canelada super macia.',
    shortDescription: 'Jardineira em malha canelada retrô super charmosa.',
    details: [
      'Alças reguláveis com botões de caseados',
      'Abotoamento prático na virilha',
      'Tecido canelado macio em algodão'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 36
  },
  {
    id: 'prod-macacao-6',
    sku: 'PX-MAC-006',
    name: 'Macacão Manga Longa Sálvia & Nuvens',
    slug: 'macacao-manga-longa-salvia-nuvens',
    price: 84.90,
    originalPrice: 109.90,
    discountPercentage: 23,
    installments: 'até 5x de R$ 16,98',
    stock: 32,
    weight: 0.29,
    images: [
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-macacoes',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G'],
    colors: [
      { name: 'Verde Sálvia Suave', hex: '#A7F3D0' },
      { name: 'Branco Perolado', hex: '#F8FAFC' }
    ],
    description: 'Estampa delicada de nuvens flutuantes. Malha interlock 100% algodão que oferece flexibilidade e toque aveludado único.',
    shortDescription: 'Macacão leve em algodão interlock respirável.',
    details: [
      'Malha interlock dupla encorpada',
      'Botões de pressão antialérgicos',
      'Fácil lavagem e secagem rápida'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 41
  },
  {
    id: 'prod-macacao-7',
    sku: 'PX-MAC-007',
    name: 'Macacão Algodão Pima Suave Floral',
    slug: 'macacao-algodao-pima-suave-floral',
    price: 109.90,
    originalPrice: 139.90,
    discountPercentage: 21,
    installments: 'até 6x de R$ 18,31',
    stock: 20,
    weight: 0.31,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-macacoes',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Rosa Floral', hex: '#F472B6' },
      { name: 'Lilás Sonho', hex: '#C084FC' }
    ],
    description: 'Luxo e maciez extrema! Algodão pima de fibra extra longa que abraça a pele delicada como uma segunda camada de proteção.',
    shortDescription: 'Macacão em algodão pima fibra longa ultra macio.',
    details: [
      'Algodão Pima certificado',
      'Toque seda aveludado',
      'Modelagem exclusiva Pixulinhos'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 53
  },

  // --------------------------------------------------------------------------
  // SAÍDA MATERNIDADE (7 LOOKS)
  // --------------------------------------------------------------------------
  {
    id: 'prod-saida-1',
    sku: 'PX-SDM-001',
    name: 'Kit Saída Maternidade Princesa Manta & Tiara',
    slug: 'kit-saida-maternidade-princesa-manta-tiara',
    price: 189.90,
    originalPrice: 229.90,
    discountPercentage: 17,
    installments: 'até 6x de R$ 31,65',
    stock: 20,
    weight: 0.50,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-saida',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Vermelho Amuleto', hex: '#EF4444' },
      { name: 'Rosa Suave', hex: '#F472B6' },
      { name: 'Branco Perolado', hex: '#FFFFFF' }
    ],
    description: 'O momento da saída da maternidade merece a roupinha mais inesquecível da vida! Inclui macacão bordado em rococó artesanal, manta forrada combinando e faixa de cabelo.',
    shortDescription: 'Kit de saída maternidade bordado em rococó artesanal.',
    details: [
      'Bordado artesanal feito com fio de algodão',
      'Manta forrada tamanho 80x80cm inclusa',
      'Acompanha tiara de lacinho super macia',
      'Caixa presenteável linda da Pixulinhos'
    ],
    isFeatured: true,
    isNew: true,
    isPromotion: true,
    isExclusive: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 112
  },
  {
    id: 'prod-saida-2',
    sku: 'PX-SDM-002',
    name: 'Saída Maternidade Príncipe Tricô Azul Real',
    slug: 'saida-maternidade-principe-trico-azul-real',
    price: 199.90,
    originalPrice: 249.90,
    discountPercentage: 20,
    installments: 'até 6x de R$ 33,31',
    stock: 18,
    weight: 0.55,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-saida',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Azul Real & Branco', hex: '#1D4ED8' },
      { name: 'Azul Marinho', hex: '#1E3A8A' }
    ],
    description: 'Conjunto requintado com macacão em tricô ponto favo de mel, body gola bordada com coroinha e manta coordenada com acabamento em babadinhos.',
    shortDescription: 'Kit nobre de saída maternidade em tricô azul real.',
    details: [
      'Macacão em tricô de algodão puro',
      'Body gola bordada com monograma',
      'Manta 85x85cm quentinha e leve'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 78
  },
  {
    id: 'prod-saida-3',
    sku: 'PX-SDM-003',
    name: 'Saída Maternidade Doce Sonho Vermelho Amuleto',
    slug: 'saida-maternidade-doce-sonho-vermelho-amuleto',
    price: 189.90,
    originalPrice: 229.90,
    discountPercentage: 17,
    installments: 'até 6x de R$ 31,65',
    stock: 15,
    weight: 0.52,
    images: [
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-saida',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Vermelho Proteção', hex: '#EF4444' }
    ],
    description: 'A tradição do vermelho da sorte na saída da maternidade! Acompanha macacão de tricô hipoalergênico, manta aveludada e naninha de urso combinando.',
    shortDescription: 'Kit saída maternidade vermelho da sorte com naninha.',
    details: [
      'Tradição de proteção e boa sorte',
      'Naninha combinando inclusa no kit',
      'Manta forrada em algodão ultra macio'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 94
  },
  {
    id: 'prod-saida-4',
    sku: 'PX-SDM-004',
    name: 'Saída Maternidade Neutra Amarelo Sol & Manta',
    slug: 'saida-maternidade-neutra-amarelo-sol-manta',
    price: 179.90,
    originalPrice: 219.90,
    discountPercentage: 18,
    installments: 'até 6x de R$ 29,98',
    stock: 22,
    weight: 0.48,
    images: [
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-saida',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Amarelo Iluminação', hex: '#FACC15' },
      { name: 'Creme Marfim', hex: '#FEF08A' }
    ],
    description: 'Opção unissex perfeita para mamães que preferem deixar a revelação do sexo para a hora do parto. Tons de amarelo pastel que simbolizam prosperidade.',
    shortDescription: 'Kit saída maternidade unissex amarelo prosperidade.',
    details: [
      'Design unissex atemporal',
      'Manta em ponto jacquard macio',
      'Algodão 100% livre de substâncias nocivas'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 61
  },
  {
    id: 'prod-saida-5',
    sku: 'PX-SDM-005',
    name: 'Kit Saída Maternidade Renda & Pérolas',
    slug: 'kit-saida-maternidade-renda-perolas',
    price: 219.90,
    originalPrice: 269.90,
    discountPercentage: 18,
    installments: 'até 6x de R$ 36,65',
    stock: 12,
    weight: 0.58,
    images: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-saida',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Rosa Chiclete Soft', hex: '#F472B6' },
      { name: 'Branco Perolado', hex: '#F8FAFC' }
    ],
    description: 'Verdadeira joia em tecido! Detalhes em renda guipure delicada com aplicação manual de micro pérolas antialérgicas que não soltam.',
    shortDescription: 'Kit com aplicação manual de renda guipure e pérolas.',
    details: [
      'Pérolas com costura reforçada de segurança',
      'Acompanha saia embutida no macacão',
      'Manta tamanho família 90x90cm'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 88
  },
  {
    id: 'prod-saida-6',
    sku: 'PX-SDM-006',
    name: 'Saída Maternidade Verde Sálvia Botões de Madeira',
    slug: 'saida-maternidade-verde-salvia-botoes-madeira',
    price: 184.90,
    originalPrice: 229.90,
    discountPercentage: 19,
    installments: 'até 6x de R$ 30,81',
    stock: 16,
    weight: 0.50,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-saida',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Verde Sálvia Orgânico', hex: '#059669' }
    ],
    description: 'Conceito boho chic moderno! Cor verde sálvia relaxante com botões frontais em madeira natural ecologicamente tratada.',
    shortDescription: 'Kit saída maternidade boho chic verde sálvia.',
    details: [
      'Estilo boho chic moderno',
      'Tricô em algodão orgânico macio',
      'Manta de toque térmico aconchegante'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 47
  },
  {
    id: 'prod-saida-7',
    sku: 'PX-SDM-007',
    name: 'Saída Maternidade Flor de Cerejeira Rosa Clássico',
    slug: 'saida-maternidade-flor-de-cerejeira-rosa-classico',
    price: 195.90,
    originalPrice: 239.90,
    discountPercentage: 18,
    installments: 'até 6x de R$ 32,65',
    stock: 14,
    weight: 0.53,
    images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-saida',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P'],
    colors: [
      { name: 'Rosa Cerejeira', hex: '#F472B6' }
    ],
    description: 'Inspiração japonesa romântica com delicadas flores bordadas no peito. O macacão possui abotoamento escondido facilitando o manuseio.',
    shortDescription: 'Kit de saída maternidade bordado flor de cerejeira.',
    details: [
      'Bordados delicados em rococó',
      'Manta aveludada dupla face',
      'Acompanha tiara com laço estruturado'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 65
  },

  // --------------------------------------------------------------------------
  // VESTIDOS (7 LOOKS)
  // --------------------------------------------------------------------------
  {
    id: 'prod-vestido-1',
    sku: 'PX-VST-001',
    name: 'Vestido Rodado Floral Doce Primavera',
    slug: 'vestido-rodado-floral-doce-primavera',
    price: 99.90,
    originalPrice: 129.90,
    discountPercentage: 23,
    installments: 'até 6x de R$ 16,65',
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-vestidos',
    brand: 'Pixulinhos',
    sizes: ['P', 'M', 'G', 'GG', '1', '2', '3'],
    colors: [
      { name: 'Rosa Floral', hex: '#F472B6' },
      { name: 'Amarelo Girassol', hex: '#FBBF24' }
    ],
    description: 'Leveza e charme em cada giro! Confeccionado em tricolina 100% algodão respirável com calcinha tapa-fralda embutida combinando.',
    shortDescription: 'Vestido rodadinho em tricoline 100% algodão.',
    details: [
      'Tricoline 100% Algodão Premium',
      'Acompanha calcinha tapa-fralda',
      'Abotoamento traseiro facilitado'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 52
  },
  {
    id: 'prod-vestido-2',
    sku: 'PX-VST-002',
    name: 'Vestido Rendado Princesinha com Tapa-Fralda',
    slug: 'vestido-rendado-princesinha-com-tapa-fralda',
    price: 119.90,
    originalPrice: 149.90,
    discountPercentage: 20,
    installments: 'até 6x de R$ 19,98',
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-vestidos',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G', '1'],
    colors: [
      { name: 'Branco Renda', hex: '#FFFFFF' },
      { name: 'Rosa Bebê', hex: '#FBCFE8' }
    ],
    description: 'Para celebrações especiais como batizados e aniversários. Busto trabalhado em renda guipure macia com forro em percal 100% algodão.',
    shortDescription: 'Vestido luxuoso para batizados e festas especiais.',
    details: [
      'Forro 100% algodão toque suave',
      'Acompanha calcinha tapa-fralda com babados',
      'Laço posterior removível'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 44
  },
  {
    id: 'prod-vestido-3',
    sku: 'PX-VST-003',
    name: 'Vestido de Festa Poá Rosa Suave & Tiara',
    slug: 'vestido-de-festa-poa-rosa-suave-tiara',
    price: 129.90,
    originalPrice: 159.90,
    discountPercentage: 18,
    installments: 'até 6x de R$ 21,65',
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-vestidos',
    brand: 'Pixulinhos',
    sizes: ['P', 'M', 'G', 'GG', '1', '2'],
    colors: [
      { name: 'Rosa Poá Branco', hex: '#F472B6' }
    ],
    description: 'Estampa poá clássica retrô! Saia rodadinha em godê duplo com armação suave e tiara de lacinho fofinho inclusa.',
    shortDescription: 'Vestido rodadinho de poá com tiara combinando.',
    details: [
      'Saia com armação macia sem espetar',
      'Tiara com elástico revestido',
      'Fechamento por botões perolados'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 39
  },
  {
    id: 'prod-vestido-4',
    sku: 'PX-VST-004',
    name: 'Vestido Trapézio Algodão Floral Lilás',
    slug: 'vestido-trapezio-algodao-floral-lilas',
    price: 89.90,
    originalPrice: 109.90,
    discountPercentage: 18,
    installments: 'até 5x de R$ 17,98',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1519702777435-c19738d85920?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1519702777435-c19738d85920?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-vestidos',
    brand: 'Pixulinhos',
    sizes: ['P', 'M', 'G', 'GG', '1'],
    colors: [
      { name: 'Lilás Lavanda', hex: '#A855F7' }
    ],
    description: 'Corte trapézio super confortável que não prende as perninhas na hora de engatinhar ou dar os primeiros passos.',
    shortDescription: 'Vestido trapézio leve e soltinho em algodão floral.',
    details: [
      'Modelagem trapézio ampla',
      'Tricoline 100% algodão leve',
      'Estampa aquarelada exclusiva'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 27
  },
  {
    id: 'prod-vestido-5',
    sku: 'PX-VST-005',
    name: 'Vestido de Babadeiros Vermelho Moranguinho',
    slug: 'vestido-de-babadeiros-vermelho-moranguinho',
    price: 94.90,
    originalPrice: 119.90,
    discountPercentage: 21,
    installments: 'até 6x de R$ 15,81',
    stock: 25,
    weight: 0.26,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-vestidos',
    brand: 'Pixulinhos',
    sizes: ['RN', 'P', 'M', 'G'],
    colors: [
      { name: 'Vermelho Vibrante', hex: '#DC2626' }
    ],
    description: 'Babadinhos fofos nas mangas e na barra. Tecido macio com textura acetinada de algodão penteado que se destaca nas fotos.',
    shortDescription: 'Vestidinho vermelho alegre com babados delicados.',
    details: [
      'Babados duplos nos ombrinhos',
      'Abotoamento prático',
      'Super leve para o verão'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 33
  },
  {
    id: 'prod-vestido-6',
    sku: 'PX-VST-006',
    name: 'Vestido Linho Leve Creme Aconchego',
    slug: 'vestido-linho-leve-creme-aconchego',
    price: 104.90,
    originalPrice: 134.90,
    discountPercentage: 22,
    installments: 'até 6x de R$ 17,48',
    stock: 20,
    weight: 0.28,
    images: [
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-vestidos',
    brand: 'Pixulinhos',
    sizes: ['P', 'M', 'G', 'GG', '1', '2'],
    colors: [
      { name: 'Creme Marfim', hex: '#FEF08A' },
      { name: 'Bege Areia', hex: '#F5F5DC' }
    ],
    description: 'Sofisticação natural! Mistura nobre de linho e algodão com toque amaciado que proporciona frescor térmico e visual elegante.',
    shortDescription: 'Vestido rústico chique em linho e algodão amaciado.',
    details: [
      'Mistura nobre de linho e algodão',
      'Botões de coco artesanais',
      'Excelente caimento natural'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'prod-vestido-7',
    sku: 'PX-VST-007',
    name: 'Vestido Manguinha Evasê Girassol',
    slug: 'vestido-manguinha-evase-girassol',
    price: 84.90,
    originalPrice: 109.90,
    discountPercentage: 23,
    installments: 'até 5x de R$ 16,98',
    stock: 28,
    weight: 0.25,
    images: [
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-vestidos',
    brand: 'Pixulinhos',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Amarelo Sol', hex: '#EAB308' }
    ],
    description: 'Alegria radiante! Estampa de girassóis amarelos com modelagem evasê soltinha e manguinhas fofas princesa.',
    shortDescription: 'Vestido solar com estampa alegre de girassol.',
    details: [
      'Manguinhas estilo princesa',
      '100% Algodão super macio',
      'Acompanha tapa-fralda amarelo'
    ],
    isNew: true,
    isFeatured: true,
    isPromotion: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 37
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Coleção Saída Maternidade Inesquecível',
    subtitle: 'Roupas em 100% Algodão bordadas à mão com o carinho e a delicadeza que o seu bebê merece.',
    buttonText: '💚 Ver Saídas Maternidade',
    buttonLink: '#catalog-section',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    badgeText: '✨ LANÇAMENTO EXCLUSIVO',
    categorySlug: 'saida-maternidade',
    priority: 1,
    active: true,
    isFeatured: true
  },
  {
    id: 'banner-2',
    title: 'Kits Bodys & Macacões Aconchego',
    subtitle: 'Conforto absoluto para o dia a dia. Compre 3 e leve frete grátis para todo o Brasil!',
    buttonText: '🛍️ Garantir Meu Kit',
    buttonLink: '#catalog-section',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    badgeText: '🔥 OFERTA DA SEMANA',
    categorySlug: 'body',
    priority: 2,
    active: true,
    isFeatured: false
  },
  {
    id: 'banner-3',
    title: 'Vestidos & Rompers Doce Infância',
    subtitle: 'Estampas exclusivas e tricoline ultramacia para o seu bebê brilhar em todas as ocasiões.',
    buttonText: '💕 Descobrir Vestidos',
    buttonLink: '#catalog-section',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
    badgeText: '🌸 COLEÇÃO PRIMAVERA',
    categorySlug: 'vestidos',
    priority: 3,
    active: true,
    isFeatured: false
  }
];

export const INITIAL_INSPIRE_POSTS: InspirePost[] = [
  {
    id: 'inspire-1',
    babyName: 'Helena',
    age: '3 meses',
    city: 'Florianópolis / SC',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    productName: 'Kit Saída Maternidade Princesa Manta & Tiara',
    productId: 'prod-saida-1',
    caption: 'Primeiros dias no colinho com essa roupinha divina da Pixulinhos!',
    likes: 342,
    date: '2026-07-20',
    isActive: true
  },
  {
    id: 'inspire-2',
    babyName: 'Noah',
    age: '5 meses',
    city: 'Curitiba / PR',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    productName: 'Macacão Soft Plush Orelhinhas de Coelho',
    productId: 'prod-macacao-1',
    caption: 'Nosso coelhinho mais gostoso e aquecido!',
    likes: 512,
    date: '2026-07-18',
    isActive: true
  },
  {
    id: 'inspire-3',
    babyName: 'Alice',
    age: '2 meses',
    city: 'São Paulo / SP',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    productName: 'Vestido Rodado Floral Doce Primavera',
    productId: 'prod-vestido-1',
    caption: 'Completamente apaixonada por esse vestidinho!',
    likes: 289,
    date: '2026-07-15',
    isActive: true
  }
];

export const INITIAL_LOOK_BUNDLES: LookBundle[] = [
  {
    id: 'look-safari',
    title: 'Look Safari do Urso',
    theme: 'Safari',
    coverImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    price: 219.90,
    originalPrice: 269.90,
    savingsText: 'Economize R$ 50,00',
    description: 'O combo perfeito de aventura e fofura. Inclui todas as peças coordenadas para o seu pequeno explorador!',
    items: [
      { name: 'Body Gola Bordada Leãozinho', type: 'Body' },
      { name: 'Calça Culotte Verde Sálvia', type: 'Calça' },
      { name: 'Touquinha Anatômica de Orelhinha', type: 'Touca' },
      { name: 'Manta Fofinha Tricô Safari (80x80cm)', type: 'Manta' },
      { name: 'Sapatinho de Linho Ajustável', type: 'Sapatinho' }
    ],
    isActive: true,
    order: 1
  },
  {
    id: 'look-princesa',
    title: 'Look Princesa Real',
    theme: 'Princesa',
    coverImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    price: 239.90,
    originalPrice: 289.90,
    savingsText: 'Economize R$ 50,00',
    description: 'Um look digno de conto de fadas em tons delicados de rosa suave e detalhes rendados em 100% algodão.',
    items: [
      { name: 'Vestido Rendado Algodão Doce', type: 'Vestido' },
      { name: 'Calcinha Tapa-Fralda Rendada', type: 'Tapa-Fralda' },
      { name: 'Tiara Laço de Seda Confort', type: 'Faixa' },
      { name: 'Manta Bordada Rococó', type: 'Manta' }
    ],
    isActive: true,
    order: 2
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Camila Rodrigues',
    babyInfo: 'Mãe da Maitê, 2 meses',
    rating: 5,
    comment: 'Comprei a Saída Maternidade Princesa e fiquei apaixonada! A qualidade do tecido é surreal de macia, não deu nenhuma alergia na Maitê e as fotos ficaram divinas. Chegou super rápido e embalado com um cheirinho de bebê maravilhoso!',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    productName: 'Kit Saída Maternidade Princesa',
    verifiedPurchase: true,
    date: 'Há 3 dias',
    isActive: true
  },
  {
    id: 'rev-2',
    authorName: 'Fernanda & Marcelo',
    babyInfo: 'Pais do Gael, 4 meses',
    rating: 5,
    comment: 'Os bodys em 100% algodão são os melhores que já compramos até hoje. O gola americana facilita demais na hora de vestir sem machucar as orelhinhas. E o atendimento pelo WhatsApp foi sensacional e carinhoso!',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    productName: 'Kit 3 Bodys 100% Algodão Nuvenzinha',
    verifiedPurchase: true,
    date: 'Há 1 semana',
    isActive: true
  },
  {
    id: 'rev-3',
    authorName: 'Stella Lopes',
    babyInfo: 'Mãe do bebê',
    rating: 5,
    comment: 'Os bodys de algodão são os melhores que já compramos até hoje. O gola americana facilita demais na hora de vestir sem machucar as orelhinhas. E o atendimento pelo WhatsApp foi sensacional e carinhoso!',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    productName: 'Saída Maternidade',
    verifiedPurchase: true,
    date: 'Há 2 dias',
    isActive: true
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Qual o tipo de algodão utilizado nas roupinhas?',
    answer: 'Utilizamos 100% Algodão puro e macio de alta qualidade. São tecidos de toque extremamente suave, respiráveis e hipoalergênicos, ideais para evitar irritações na pele sensível do bebê.',
    category: 'Produtos & Tecidos',
    order: 1,
    isActive: true
  },
  {
    id: 'faq-2',
    question: 'Como funciona o envio e prazo de entrega?',
    answer: 'Enviamos para todo o Brasil via Correios (Sedex e PAC) e transportadoras parceiras. O prazo é calculado automaticamente no checkout do pedido pelo WhatsApp, e compras acima de R$ 199 possuem Frete Grátis!',
    category: 'Entrega & Frete',
    order: 2,
    isActive: true
  },
  {
    id: 'faq-3',
    question: 'Posso efetuar a troca caso o tamanho não sirva?',
    answer: 'Sim! A primeira troca é 100% Grátis em até 30 dias após o recebimento. Garantimos um processo simples e carinhoso direto com nossa equipe via WhatsApp.',
    category: 'Trocas & Devoluções',
    order: 3,
    isActive: true
  },
  {
    id: 'faq-4',
    question: 'Quais as formas de pagamento aceitas?',
    answer: 'Aceitamos PIX com 5% de desconto, cartões de crédito em até 6x sem juros (Visa, Mastercard, Elo, Hipercard) e boleto bancário.',
    category: 'Pagamentos',
    order: 4,
    isActive: true
  }
];

export const INITIAL_HOME_SECTIONS: HomeSection[] = [
  { id: 'sec-hero', sectionKey: 'hero', title: 'Banner Hero Principal', order: 1, isActive: true },
  { id: 'sec-banners', sectionKey: 'banners', title: 'Carrossel de Banners Promocionais', order: 2, isActive: true },
  { id: 'sec-catalog', sectionKey: 'netflix_catalog', title: 'Catálogo por Categorias (Estilo Netflix)', order: 3, isActive: true },
  { id: 'sec-inspire', sectionKey: 'inspire', title: 'Galeria Inspire-se de Nossos Bebês', order: 4, isActive: true },
  { id: 'sec-bundles', sectionKey: 'bundles', title: 'Looks Completos & Kits com Desconto', order: 5, isActive: true },
  { id: 'sec-reviews', sectionKey: 'reviews', title: 'Avaliações Reais de Mamães & Papais', order: 6, isActive: true },
  { id: 'sec-faq', sectionKey: 'faq', title: 'Perguntas Frequentes (FAQ)', order: 7, isActive: true },
  { id: 'sec-trust', sectionKey: 'payment_trust', title: 'Selos de Confiança & Formas de Pagamento', order: 8, isActive: true },
  { id: 'sec-cta', sectionKey: 'final_cta', title: 'Chamada Final Emocional', order: 9, isActive: true },
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: 'banner_saida_maternidade.jpg',
    url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    size: 485000,
    folder: 'Banners',
    createdAt: '2026-07-20'
  },
  {
    id: 'med-2',
    name: 'kit_bodys_algodao.jpg',
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    size: 320000,
    folder: 'Produtos',
    createdAt: '2026-07-21'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  storeName: 'Pixulinhos',
  logoUrl: '',
  faviconUrl: '',
  whatsappNumber: '5548991147392',
  phoneNumber: '(48) 99114-7392',
  email: 'contato@pixulinhos.com.br',
  storeAddress: 'Florianópolis / SC • Entregamos para todo o Brasil com amor',
  mapEmbedUrl: '',
  topAnnouncement: '🚚 FRETE GRÁTIS para todo o Brasil em compras acima de R$ 199 • Parcelamos em até 6x sem juros! 💚',
  heroTitle: 'Roupas que vestem carinho e abraçam cada momento do seu bebê',
  heroSubheadline: 'Peças em 100% Algodão, hipoalergênicas, com toque de nuvem e design autoral feito para encantar mamães e papais.',
  heroBadgeText: '✨ Coleção Doce Infância 2026',
  heroImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
  footerText: 'Pixulinhos — Conforto, carinho e magia em cada pontinho de costura.',
  instagramUrl: 'https://instagram.com',
  tiktokUrl: 'https://tiktok.com',
  facebookUrl: 'https://facebook.com',
  pinterestUrl: 'https://pinterest.com',
  exchangePolicy: 'Sua primeira troca é 100% grátis em até 30 dias após a entrega! Entre em contato conosco via WhatsApp.',
  privacyPolicy: 'Seus dados pessoais estão seguros. Utilizamos criptografia SSL para garantir a total privacidade e segurança das suas compras.',
  termsPolicy: 'Termos e Condições de Uso da loja Pixulinhos.',
  cookiesPolicy: 'Utilizamos cookies para personalizar seu aprendizado e navegação em nossa loja.',
  globalMetaTitle: 'Pixulinhos - Roupas que Vestem Carinho | Moda Infantil Premium',
  globalMetaDescription: 'Compre roupinhas de bebê em 100% Algodão, Saídas de Maternidade, Bodys, Macacões e Kits promocionais com entrega rápida.',
  globalMetaKeywords: 'roupas de bebê, saída maternidade, 100% algodão, body bebê, moda infantil',
  googleAnalyticsId: 'G-XXXXXXX',
  metaPixelId: '1234567890',
  gtmId: 'GTM-XXXXXXX'
};
