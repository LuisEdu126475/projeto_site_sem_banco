# ☕ Croma — Vitrine Digital de Luxo & Conversão Direta para Cafeterias (HTML + CSS + JS)

> **Template White-Label de Alto Padrão (Sem Banco de Dados · Custo Zero de Servidor)**
> Desenvolvido em **HTML5 Semântico, CSS3 Modular (Design Tokens) e JavaScript Vanilla (ES6+)** para cafeterias especiais, microtorrefações, casas de brunch e confeitarias artesanais.

---

## 💼 Estratégia Comercial: Escada de Valor (R$ 1.000 vs. R$ 2.000)

Este repositório contém a versão **Vitrine Digital & Conversão Direta (R$ 1.000 a R$ 1.400)** — ideal para cafeterias que desejam presença digital de luxo, carregamento instantâneo, **zero mensalidade de hospedagem** e conversão direta no **WhatsApp, Instagram, Google Maps e Waze**.

| Recurso / Entregável | **Plano 01 · Vitrine & Conversão (Este Projeto)** | **Plano 02 · Gestão & Banco de Dados** |
| :--- | :--- | :--- |
| **Investimento sugerido** | **R$ 1.000 a R$ 1.400** (setup único) | **R$ 2.000 a R$ 2.800** (setup + backend) |
| **Stack tecnológica** | HTML5 + CSS3 + JavaScript Puro (Estático) | Node.js + Express + SQLite WAL + API REST |
| **Custo mensal de servidor** | **R$ 0,00 / mês** (GitHub Pages, Vercel, Netlify) | Servidor VPS / Render / Railway |
| **Cardápio Digital Interativo** | ✅ 4 modelos + filtro por abas + seleção de itens | ✅ Carregado via banco de dados SQL |
| **Pedidos & Encomendas** | ✅ Monta a bandeja e envia formatado no **WhatsApp** | ✅ Salva no banco + envia no WhatsApp |
| **Reservas de Mesa** | ✅ Concierge direto no **WhatsApp** + arquivo `.ics` | ✅ Salva protocolo no banco + painel admin |
| **Canais de Conversão Direta** | ✅ WhatsApp, Instagram, Google Maps, Waze, Telefone | ✅ Completo + Painel Administrativo |

---

## ✨ Funcionalidades Principais

1. **Cardápio Digital Interativo com Seleção de Itens (`+ Escolher no Cardápio`)**
   - **4 Modelos de Cafeteria prontos para demonstração:**
     - `Casa Completa` (24 itens em 6 categorias)
     - `Torrefação & Filtrados` (foco em microlotes V60, Origami, Chemex e Espresso Bar)
     - `Café & All-Day Brunch` (foco em Eggs Benedict, Avocado Toast e cozinha matinal)
     - `Pâtisserie & Viennoiserie` (foco em confeitaria fina, tortas autorais e folhados)
   - **Seleção de produtos (`− 1 +`):** o cliente escolhe os itens no cardápio, visualiza o subtotal em tempo real na bandeja flutuante e envia o pedido pronto para o **WhatsApp da cafeteria** ou anexa os itens à reserva de mesa.

2. **Concierge de Reservas via WhatsApp + Lembrete na Agenda (`.ics`)**
   - Formulário com máscara automática de telefone, escolha de data, horário, número de pessoas, ambiente (`Salão Principal`, `Jardim Pet Friendly`, `Balcão Brew Bar`, `Mesa Work`) e modalidade.
   - Ao enviar, abre o WhatsApp da cafeteria com a mensagem estruturada e oferece download de lembrete `.ics` para Apple/Google Calendar.

3. **Status de Funcionamento Ao Vivo (`Aberto agora` / `Fechado`)**
   - Calculado automaticamente em JavaScript a partir dos horários configurados em `js/config.js`, destacando o dia atual (`Hoje`) na tabela semanal.

4. **Hub de Localização & Redes Sociais**
   - Integração direta com **Google Maps** (mapa interativo + botão traçar rota), **Waze**, botão **Copiar Endereço em 1 clique** e vitrine dedicada ao **Instagram** da cafeteria.

5. **3 Paletas de Cores de Luxo (`css/tokens.css`)**
   - `noir`: Obsidian & Ouro Champanhe (Microtorrefações & Espresso Bars)
   - `terra`: Nogueira Tostada & Cobre (Cafés de Brunch & Padarias Artesanais)
   - `creme`: Creme Parisiense & Verde Sálvia (Pâtisseries & Boutiques Claras)

6. **Estúdio de Demonstração Comercial (`✦ Personalizar Demo p/ Cafeteria`)**
   - Painel flutuante no canto inferior esquerdo que permite digitar o **Nome da Cafeteria**, **Cidade**, **@Instagram**, **Modelo de Cardápio** e **Paleta de Cores** ao vivo e copiar um link personalizado para enviar ao dono da cafeteria.

---

## 📁 Estrutura de Arquivos

```text
cafeteria_projeto_site/
├── index.html                  # Estrutura HTML5 semântica, acessível e otimizada para SEO local
├── favicon.svg                 # Ícone vetorial minimalista
├── css/
│   ├── tokens.css              # Fontes locais (@font-face) + variáveis CSS dos 3 temas de luxo
│   └── styles.css              # Layout editorial responsivo, animações e componentes
├── js/
│   ├── config.js               # Arquivo único de configuração (dados da cafeteria, horários e cardápio)
│   └── main.js                 # Motor interativo (cardápio, bandeja WhatsApp, status ao vivo, Demo Studio)
├── fonts/                      # Fontes variáveis locais (Cormorant Garamond + Manrope em WOFF2)
└── images/                     # Fotografia autoral de alta resolução otimizada (~1 MB total)
```

---

## 🚀 Como Executar e Personalizar em 5 Minutos

### 1. Abrir localmente
Não requer instalação de Node.js nem banco de dados:
- Basta dar **duplo clique em `index.html`**, ou
- Usar a extensão **Live Server** no VS Code.

### 2. Personalizar para uma cafeteria cliente
Abra apenas o arquivo [`js/config.js`](js/config.js) e edite:
- `brand`: nome da cafeteria, subtítulo e CNPJ;
- `theme`: `'noir'`, `'terra'` ou `'creme'`;
- `contact`: número do WhatsApp (`55DDD999999999`), `@instagram`, endereço e links do Google Maps/Waze;
- `hours`: horários de abertura e fechamento de domingo a sábado;
- `menu`: categorias, itens, notas sensoriais e preços em centavos (`priceCents: 2600` = `R$ 26,00`).

### 3. Enviar demonstração personalizada para prospectar clientes
Com o site hospedado gratuitamente (no GitHub Pages, Vercel ou Netlify), você pode enviar links personalizados via WhatsApp ou Direct do Instagram usando parâmetros na URL:

```text
https://seu-usuario.github.io/cafeteria/?cliente=Atelier+do+Gr%C3%A3o&cidade=S%C3%A3o+Paulo&insta=@atelierdograo&conceito=patisserie&tema=creme
```

Ou simplesmente abrir o botão **`✦ Personalizar Demo p/ Cafeteria`** no canto inferior esquerdo do site, preencher os dados do cliente e clicar em **"Copiar Link Personalizado p/ Cliente"**.

