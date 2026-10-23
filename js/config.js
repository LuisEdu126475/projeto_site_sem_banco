/* ==========================================================================
   CONFIGURAÇÃO WHITE-LABEL DA CAFETERIA · js/config.js
   --------------------------------------------------------------------------
   Edite apenas este arquivo para entregar o site personalizado para uma nova
   cafeteria em menos de 10 minutos (nome, WhatsApp, Instagram, endereço,
   horários, paleta de cores e cardápio).
   ========================================================================== */

window.CAFE_CONFIG = {
  brand: {
    name: 'Croma',
    descriptor: 'Specialty Coffee Roasters',
    legalName: 'Croma Cafés Especiais LTDA',
    cnpj: '00.000.000/0001-00',
    foundedYear: 2019,
  },

  // Tema visual padrão: 'noir' (Escuro & Ouro), 'terra' (Cobre & Nogueira) ou 'creme' (Claro Parisiense)
  theme: 'noir',

  contact: {
    whatsapp: '5561999999999', // Somente números com DDI (55) + DDD
    phoneDisplay: '(61) 99999-9999',
    instagramHandle: '@croma.cafe',
    instagramUrl: 'https://instagram.com/croma.cafe',
    email: 'contato@croma.cafe',
    address: {
      street: 'SHCS CLS 405, Bloco C, Loja 38',
      district: 'Asa Sul',
      city: 'Brasília',
      state: 'DF',
      zip: '70239-030',
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=CLS+405+Bloco+C+Brasilia+DF',
    wazeUrl: 'https://waze.com/ul?q=CLS%20405%20Bloco%20C%20Brasilia',
    mapEmbedUrl: 'https://www.google.com/maps?q=CLS+405+Bloco+C+Brasilia+DF&output=embed',
  },

  // Horário de funcionamento (0 = Domingo, 1 = Segunda ... 6 = Sábado)
  // null = Fechado naquele dia
  hours: {
    0: { label: 'Domingo', open: '09:00', close: '18:00' },
    1: { label: 'Segunda-feira', open: null, close: null },
    2: { label: 'Terça-feira', open: '08:00', close: '19:00' },
    3: { label: 'Quarta-feira', open: '08:00', close: '19:00' },
    4: { label: 'Quinta-feira', open: '08:00', close: '19:00' },
    5: { label: 'Sexta-feira', open: '08:00', close: '21:00' },
    6: { label: 'Sábado', open: '09:00', close: '21:00' },
  },

  // Perfis de cafeteria para o Modo Demonstração Comercial
  concepts: {
    completo: {
      theme: null,
      descriptor: 'Specialty Coffee Roasters',
      eyebrow: 'Specialty Coffee · Torrefação & Cozinha',
      titleLine1: 'O ritual do café,',
      titleLine2: 'elevado à arte.',
      lead: 'Microlotes de pontuação 86+ na escala SCA, brunch autoral de fermentação natural e confeitaria laminada diariamente.',
      categories: null,
    },
    torrefacao: {
      theme: 'noir',
      descriptor: 'Specialty Coffee Roasters',
      eyebrow: 'Microtorrefação · Grãos 86+ SCA',
      titleLine1: 'Cada safra rara,',
      titleLine2: 'torrada à perfeição.',
      lead: 'Lotes rastreáveis de produtores parceiros, extraídos sob medida em Hario V60, Origami, Chemex e La Marzocco.',
      categories: ['assinaturas', 'filtrados', 'espresso-bar', 'confeitaria'],
    },
    brunch: {
      theme: 'terra',
      descriptor: 'Café & All-Day Brunch',
      eyebrow: 'Cozinha Matinal & Cafés Especiais',
      titleLine1: 'Manhãs sem pressa,',
      titleLine2: 'mesa farta e café fresco.',
      lead: 'Pães de fermentação natural de 36h, ovos caipiras orgânicos, queijos de produtores locais e cafés especiais.',
      categories: ['brunch-cozinha', 'espresso-bar', 'assinaturas', 'confeitaria'],
    },
    patisserie: {
      theme: 'creme',
      descriptor: 'Haute Pâtisserie & Café',
      eyebrow: 'Confeitaria Franco-Brasileira',
      titleLine1: 'A delicadeza da pâtisserie,',
      titleLine2: 'em harmonia com o café.',
      lead: 'Viennoiserie laminada em 72h com manteiga francesa, entremets autorais e extrações calibradas na hora.',
      categories: ['patisserie-fina', 'confeitaria', 'espresso-bar', 'assinaturas'],
    },
  },

  // Cardápio Digital (6 categorias · 24 itens)
  menu: [
    {
      slug: 'assinaturas',
      name: 'Assinaturas da Casa',
      description: 'Criações autorais desenvolvidas pelos nossos baristas para exaltar cada safra.',
      items: [
        {
          id: 'ass-1',
          name: 'Espresso Tonic Imperial',
          origin: 'Catuaí Vermelho · Mantiqueira de Minas',
          description:
            'Duplo ristretto extraído sobre água tônica botânica artesanal, infusão de casca de laranja-baía desidratada e ramo de alecrim fresco.',
          tastingNotes: 'Flor de laranjeira · Bergamota · Final cítrico refrescante',
          volume: '240 ml',
          priceCents: 2600,
          isSignature: true,
        },
        {
          id: 'ass-2',
          name: 'Cortado no Caramelo de Missô',
          origin: 'Bourbon Amarelo · Carmo de Minas',
          description:
            'Espresso duplo equilibrado com redução artesanal de caramelo salgado ao missô branco e microespuma aveludada de leite.',
          tastingNotes: 'Caramelo tostado · Umami sutil · Avelã',
          volume: '130 ml',
          priceCents: 2400,
          isSignature: true,
        },
        {
          id: 'ass-3',
          name: 'Cold Brew Barrel Aged',
          origin: 'Geisha · Fazenda Primavera (Chapada de Minas)',
          description:
            'Infusão a frio por 18 horas de grãos maturados em barris de carvalho antes da torra. Servido sobre esfera de gelo cristalino.',
          tastingNotes: 'Baunilha · Cacau nibs · Licor de ameixa',
          volume: '180 ml',
          priceCents: 3200,
          isSignature: true,
        },
        {
          id: 'ass-4',
          name: 'Affogato ao Gelato de Fior di Latte',
          origin: 'Blend Nº 01 · Cerrado & Mogiana',
          description:
            'Gelato artesanal de creme fresco batido diariamente, afogado na hora por um espresso duplo quente e finalizado com praliné de pecã.',
          tastingNotes: 'Creme fresco · Chocolate 70% · Noz-pecã caramelizada',
          volume: '160 g',
          priceCents: 2900,
          isSignature: true,
        },
      ],
    },
    {
      slug: 'filtrados',
      name: 'Filtrados de Microlote',
      description: 'Lotes raros com pontuação 87+ SCA, extraídos sob encomenda no método que melhor revela seu terroir.',
      items: [
        {
          id: 'fil-1',
          name: 'Hario V60 · Geisha Florada',
          origin: 'Fazenda Santa Margarida · Araponga, MG · 1.380 m',
          description:
            'Processamento lavado com fermentação controlada de 48h. Bebida de limpidez cristalina, corpo delicado de chá branco e acidez vibrante.',
          tastingNotes: 'Jasmim · Pêssego branco · Mel de laranjeira',
          volume: '200 ml',
          priceCents: 2800,
          isSignature: true,
        },
        {
          id: 'fil-2',
          name: 'Origami Dripper · Arara Natural',
          origin: 'Sítio Alto da Serra · Piatã, Chapada Diamantina · 1.420 m',
          description:
            'Secagem lenta em terreiro suspenso à sombra. Doçura intensa e acidez málica elegante que evolui conforme a bebida esfria na taça.',
          tastingNotes: 'Frutas vermelhas · Maçã verde · Rapadura',
          volume: '200 ml',
          priceCents: 2600,
          isSignature: false,
        },
        {
          id: 'fil-3',
          name: 'Chemex · Paraíso Fermentado',
          origin: 'Fazenda Bom Retiro · São Sebastião da Grama, SP · 1.260 m',
          description:
            'Filtro triplo de papel que entrega uma xícara sedosa e aromática, ideal para apreciar em dois tempos — quente e morna.',
          tastingNotes: 'Maracujá doce · Damasco · Chá preto Darjeeling',
          volume: '250 ml',
          priceCents: 2900,
          isSignature: false,
        },
        {
          id: 'fil-4',
          name: 'Prensa Francesa · Mundo Novo',
          origin: 'Fazenda Sertãozinho · Cristina, MG · 1.290 m',
          description:
            'Imersão total em malha metálica que preserva os óleos essenciais do café. Textura licorosa e retrogosto prolongado.',
          tastingNotes: 'Melaço de cana · Amêndoas torradas · Cacau',
          volume: '320 ml',
          priceCents: 2500,
          isSignature: false,
        },
      ],
    },
    {
      slug: 'espresso-bar',
      name: 'Espresso Bar',
      description: 'Extrações calibradas a cada manhã em La Marzocco Linea PB com água remineralizada sob medida.',
      items: [
        {
          id: 'esp-1',
          name: 'Espresso Duplo',
          origin: 'Blend da Casa · Bourbon Amarelo & Catucaí 785',
          description:
            'Extração dupla curta e xaroposa, crema aveludada cor de avelã e equilíbrio clássico entre doçura, corpo e acidez baixa.',
          tastingNotes: 'Chocolate amargo · Avelã tostada · Caramelo',
          volume: '45 ml',
          priceCents: 1400,
          isSignature: false,
        },
        {
          id: 'esp-2',
          name: 'Flat White',
          origin: 'Duplo Ristretto · Leite integral fazenda local ou Aveia Barista',
          description:
            'Proporção australiana clássica: dois shots curtos envolvidos por camada fina e brilhante de microespuma a 62 °C.',
          tastingNotes: 'Ganache ao leite · Biscoito amanteigado',
          volume: '160 ml',
          priceCents: 2000,
          isSignature: false,
        },
        {
          id: 'esp-3',
          name: 'Cappuccino Italiano Clássico',
          origin: 'Blend da Casa · Cacau alcalino belga opcional',
          description:
            'Terços harmônicos de espresso, leite vaporizado e crema densa e elástica. Sem canela para preservar as notas da torra.',
          tastingNotes: 'Nozes · Caramelo · Creme doce',
          volume: '180 ml',
          priceCents: 1900,
          isSignature: false,
        },
        {
          id: 'esp-4',
          name: 'Latte de Baunilha de Madagascar',
          origin: 'Blend da Casa · Xarope artesanal de fava de baunilha real',
          description:
            'Espresso suave combinado a leite texturizado e redução própria feita com favas inteiras de baunilha Bourbon.',
          tastingNotes: 'Baunilha floral · Creme brûlée',
          volume: '240 ml',
          priceCents: 2300,
          isSignature: false,
        },
      ],
    },
    {
      slug: 'brunch-cozinha',
      name: 'Brunch & Cozinha Autoral',
      description: 'Pratos preparados na hora com pães de fermentação natural, ovos caipiras orgânicos e queijos artesanais.',
      items: [
        {
          id: 'bru-1',
          name: 'Eggs Benedict no Brioche Tostado',
          origin: 'Ovos caipiras pochê · Presunto Royale artesanal · Hollandaise cítrico',
          description:
            'Brioche de fermentação lenta dourado na manteiga clarificada, dois ovos pochê de gema cremosa e molho hollandaise com toque de limão-cravo.',
          tastingNotes: 'Amanteigado · Gema aveludada · Acidez delicada',
          volume: '260 g',
          priceCents: 4200,
          isSignature: true,
        },
        {
          id: 'bru-2',
          name: 'Avocado Toast & Ovo Mollet',
          origin: 'Levain 36h · Avocado Hass · Dukkah de pistache',
          description:
            'Fatia alta de pão rústico com avocado laminado, coalhada seca artesanal, ovo mollet de 6 minutos, azeite extravirgem e especiarias tostadas.',
          tastingNotes: 'Pistache tostado · Limão-siciliano · Ervas frescas',
          volume: '240 g',
          priceCents: 3800,
          isSignature: true,
        },
        {
          id: 'bru-3',
          name: 'Croque Monsieur ao Gruyère de Caverna',
          origin: 'Pão de miga artesanal · Bechamel com noz-moscada · Queijo meia-cura',
          description:
            'Sanduíche clássico francês gratinado no forno até borbulhar, servido com pequena salada de folhas orgânicas e mostarda Dijon.',
          tastingNotes: 'Queijo gratinado · Noz-moscada · Crocante',
          volume: '250 g',
          priceCents: 3900,
          isSignature: false,
        },
        {
          id: 'bru-4',
          name: 'Toast de Ricota Batida, Figos & Mel Nativo',
          origin: 'Pão de campanha · Figos frescos grelhados · Mel de jataí',
          description:
            'Ricota fresca aerada com raspas de laranja, figos caramelizados no maçarico, amêndoas laminadas e fio generoso de mel de abelha nativa.',
          tastingNotes: 'Figo maduro · Mel floral · Castanhas',
          volume: '210 g',
          priceCents: 3400,
          isSignature: false,
        },
      ],
    },
    {
      slug: 'confeitaria',
      name: 'Viennoiserie & Folhados',
      description: 'Fornadas diárias com manteiga francesa AOC, laminação de 72 horas e chocolates bean-to-bar brasileiros.',
      items: [
        {
          id: 'con-1',
          name: 'Croissant de Manteiga de Barratte',
          origin: 'Laminação de 72 horas · Manteiga extra seca 84%',
          description:
            'Casca dourada e estaladiça, alvéolos abertos em favo de mel e interior úmido e perfumado. Servido levemente aquecido.',
          tastingNotes: 'Manteiga noisette · Trigo fermentado',
          volume: '95 g',
          priceCents: 1900,
          isSignature: true,
        },
        {
          id: 'con-2',
          name: 'Pain au Chocolat Amargo 70%',
          origin: 'Cacau orgânico do Sul da Bahia · Duas barras internas',
          description:
            'Massa folhada de longa fermentação recheada com duas barras de chocolate 70% de origem única.',
          tastingNotes: 'Cacau intenso · Manteiga dourada',
          volume: '110 g',
          priceCents: 2200,
          isSignature: false,
        },
        {
          id: 'con-3',
          name: 'Kouign-Amann Caramelizado',
          origin: 'Clássico da Bretanha · Flor de sal de Mossoró',
          description:
            'Folhado bretão dobrado com açúcar demerara orgânico e manteiga com flor de sal, assado até formar uma crosta de caramelo crocante.',
          tastingNotes: 'Caramelo crocante · Flor de sal · Manteiga',
          volume: '105 g',
          priceCents: 2300,
          isSignature: true,
        },
        {
          id: 'con-4',
          name: 'Folhado de Pistache Iraniano & Framboesa',
          origin: 'Frangipane de pistache · Compota artesanal de framboesa',
          description:
            'Massa folhada crocante recheada com creme de pistache tostado na casa e coração ácido de framboesas frescas.',
          tastingNotes: 'Pistache verde · Framboesa ácida',
          volume: '120 g',
          priceCents: 2600,
          isSignature: false,
        },
      ],
    },
    {
      slug: 'patisserie-fina',
      name: 'Pâtisserie & Tortas Autorais',
      description: 'Confeitaria fina de vitrine pensada para harmonizar com cafés filtrados e espressos.',
      items: [
        {
          id: 'pat-1',
          name: 'Torta Basca de Queijo da Canastra',
          origin: 'Queijo Canastra meia-cura · Fava Tonka da Amazônia',
          description:
            'Topo intensamente caramelizado e centro cremoso quase líquido, perfumado com cumaru (fava tonka) ralado na hora.',
          tastingNotes: 'Caramelo queimado · Queijo curado · Cumaru',
          volume: '150 g',
          priceCents: 2800,
          isSignature: true,
        },
        {
          id: 'pat-2',
          name: 'Entremet Ópera de Café & Avelã',
          origin: 'Biscuit Joconde · Ganache 70% · Mousseline de espresso',
          description:
            'Seis camadas finas intercalando amêndoas embebidas em ristretto, ganache de chocolate amargo e creme leve de avelã do Piemonte.',
          tastingNotes: 'Ristretto · Avelã tostada · Cacau profundo',
          volume: '130 g',
          priceCents: 3100,
          isSignature: true,
        },
        {
          id: 'pat-3',
          name: 'Tartelette de Limão-Siciliano & Merengue Tostado',
          origin: 'Pâte sucrée de amêndoas · Curd cítrico · Merengue suíço',
          description:
            'Base crocante de farinha de amêndoas recheada com creme intenso de limão-siciliano e finalizada no maçarico.',
          tastingNotes: 'Cítrico vibrante · Baunilha · Amêndoas',
          volume: '125 g',
          priceCents: 2500,
          isSignature: false,
        },
        {
          id: 'pat-4',
          name: 'Éclair de Caramelo Salgado & Praliné',
          origin: 'Massa choux craquelin · Creme diplomata de caramelo',
          description:
            'Éclair crocante recheada na hora com creme leve de caramelo com flor de sal e crocante de castanha-de-caju caramelizada.',
          tastingNotes: 'Caramelo com flor de sal · Castanha tostada',
          volume: '115 g',
          priceCents: 2400,
          isSignature: false,
        },
      ],
    },
  ],
};

