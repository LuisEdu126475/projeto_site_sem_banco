/* ==========================================================================
   MOTOR INTERATIVO · VITRINE DE LUXO & CONVERSÃO DIRETA · js/main.js
   --------------------------------------------------------------------------
   100% HTML + CSS + JavaScript puro (sem banco de dados e sem dependências).
   Funciona tanto abrindo index.html direto (file://) quanto em qualquer
   hospedagem estática (GitHub Pages, Vercel, Netlify, Cloudflare Pages).
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const baseConfig = window.CAFE_CONFIG || {};
  const state = {
    brandName: baseConfig.brand?.name || 'Croma',
    descriptor: baseConfig.brand?.descriptor || 'Specialty Coffee Roasters',
    city: baseConfig.contact?.address?.city || 'Brasília',
    stateCode: baseConfig.contact?.address?.state || 'DF',
    street: baseConfig.contact?.address?.street || 'SHCS CLS 405, Bloco C, Loja 38',
    district: baseConfig.contact?.address?.district || 'Asa Sul',
    zip: baseConfig.contact?.address?.zip || '70239-030',
    whatsapp: (baseConfig.contact?.whatsapp || '5561999999999').replace(/\D/g, ''),
    phoneDisplay: baseConfig.contact?.phoneDisplay || '(61) 99999-9999',
    instagramHandle: baseConfig.contact?.instagramHandle || '@croma.cafe',
    instagramUrl: baseConfig.contact?.instagramUrl || 'https://instagram.com/croma.cafe',
    email: baseConfig.contact?.email || 'contato@croma.cafe',
    googleMapsUrl:
      baseConfig.contact?.googleMapsUrl ||
      'https://www.google.com/maps/search/?api=1&query=CLS+405+Bloco+C+Brasilia+DF',
    wazeUrl:
      baseConfig.contact?.wazeUrl || 'https://waze.com/ul?q=CLS%20405%20Bloco%20C%20Brasilia',
    mapEmbedUrl:
      baseConfig.contact?.mapEmbedUrl ||
      'https://www.google.com/maps?q=CLS+405+Bloco+C+Brasilia+DF&output=embed',
    theme: baseConfig.theme || 'noir',
    concept: 'completo',
    activeCategory: 'all',
    selectedItems: new Map(), // itemId -> qty
    lastReservation: null,
  };

  // Mapa rápido de todos os itens do cardápio por ID
  const itemDirectory = new Map();
  (baseConfig.menu || []).forEach((category) => {
    (category.items || []).forEach((item) => {
      itemDirectory.set(item.id, { ...item, categorySlug: category.slug, categoryName: category.name });
    });
  });

  /* ------------------------------------------------------------------------
     Utilitários de Formatação
     ------------------------------------------------------------------------ */
  function formatBRL(cents) {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildWhatsAppUrl(customMessage) {
    const cleanPhone = state.whatsapp.replace(/\D/g, '');
    const text =
      customMessage ||
      `Olá, equipe da ${state.brandName}! Vi o site e gostaria de atendimento.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }

  function normalizeInstaHandle(raw) {
    const trimmed = String(raw || '').trim();
    if (!trimmed) return '@croma.cafe';
    return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
  }

  function buildInstaUrl(handle) {
    const username = handle.replace(/^@+/, '').trim();
    return `https://instagram.com/${encodeURIComponent(username)}`;
  }

  /* ------------------------------------------------------------------------
     Leitura de Parâmetros da URL (Modo Demonstração Comercial)
     ------------------------------------------------------------------------ */
  function readUrlParams() {
    const params = new URLSearchParams(window.location.search);

    const cliente = params.get('cliente') || params.get('nome');
    const cidade = params.get('cidade');
    const insta = params.get('insta') || params.get('instagram');
    const whats = params.get('whats') || params.get('whatsapp');
    const conceito = params.get('conceito') || params.get('modelo');
    const tema = params.get('tema');

    if (cliente && cliente.trim()) {
      state.brandName = cliente.trim().slice(0, 48);
    }
    if (cidade && cidade.trim()) {
      state.city = cidade.trim().slice(0, 40);
    }
    if (insta && insta.trim()) {
      state.instagramHandle = normalizeInstaHandle(insta.slice(0, 40));
      state.instagramUrl = buildInstaUrl(state.instagramHandle);
    }
    if (whats && whats.replace(/\D/g, '').length >= 10) {
      state.whatsapp = whats.replace(/\D/g, '').slice(0, 15);
    }
    if (conceito && baseConfig.concepts && baseConfig.concepts[conceito]) {
      state.concept = conceito;
      if (baseConfig.concepts[conceito].theme) {
        state.theme = baseConfig.concepts[conceito].theme;
      }
    }
    if (tema && ['noir', 'terra', 'creme'].includes(tema)) {
      state.theme = tema;
    }
  }

  /* ------------------------------------------------------------------------
     Aplicação de Tema, Marca e Links Diretos (WhatsApp, Instagram, Mapas)
     ------------------------------------------------------------------------ */
  function applyTheme(themeName) {
    if (!['noir', 'terra', 'creme'].includes(themeName)) return;
    state.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);

    document.querySelectorAll('[data-demo-theme]').forEach((btn) => {
      const isMatch = btn.getAttribute('data-demo-theme') === themeName;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });
  }

  function syncBrandAndChannels() {
    const shortAddress = `${state.street} · ${state.district}, ${state.city}`;
    const fullAddress = `${state.street} — ${state.district}, ${state.city} - ${state.stateCode}, CEP ${state.zip}`;

    document.title = `${state.brandName} — ${state.descriptor} | ${state.city}`;

    document.querySelectorAll('[data-brand-name]').forEach((el) => {
      el.textContent = state.brandName;
    });

    document.querySelectorAll('[data-brand-descriptor]').forEach((el) => {
      el.textContent = state.descriptor;
    });

    document.querySelectorAll('[data-brand-city]').forEach((el) => {
      el.textContent = state.city;
    });

    document.querySelectorAll('[data-brand-address-short]').forEach((el) => {
      el.textContent = shortAddress;
    });

    document.querySelectorAll('[data-brand-address-full]').forEach((el) => {
      el.textContent = fullAddress;
    });

    document.querySelectorAll('[data-phone-display]').forEach((el) => {
      el.textContent = state.phoneDisplay;
    });

    document.querySelectorAll('[data-insta-handle]').forEach((el) => {
      el.textContent = state.instagramHandle;
    });

    document.querySelectorAll('[data-insta-link]').forEach((el) => {
      el.setAttribute('href', state.instagramUrl);
    });

    document.querySelectorAll('[data-maps-link]').forEach((el) => {
      el.setAttribute('href', state.googleMapsUrl);
    });

    document.querySelectorAll('[data-waze-link]').forEach((el) => {
      el.setAttribute('href', state.wazeUrl);
    });

    document.querySelectorAll('[data-email-link]').forEach((el) => {
      el.setAttribute('href', `mailto:${state.email}`);
      if (el.hasAttribute('data-email-text')) {
        el.textContent = state.email;
      }
    });

    document.querySelectorAll('[data-whatsapp-link]').forEach((el) => {
      const customTemplate = el.getAttribute('data-whatsapp-msg');
      const msg = customTemplate
        ? customTemplate.replace(/\{cafe\}/g, state.brandName).replace(/\{cidade\}/g, state.city)
        : `Olá, equipe da ${state.brandName}! Vi o site e gostaria de mais informações.`;
      el.setAttribute('href', buildWhatsAppUrl(msg));
    });

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  /* ------------------------------------------------------------------------
     Horário de Funcionamento Ao Vivo (Aberto Agora / Fechado)
     ------------------------------------------------------------------------ */
  function parseMinutes(hhmm) {
    if (!hhmm) return null;
    const parts = hhmm.split(':').map(Number);
    if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) return null;
    return parts[0] * 60 + parts[1];
  }

  function renderHoursAndLiveStatus() {
    const hoursConfig = baseConfig.hours || {};
    const now = new Date();
    const todayIndex = now.getDay(); // 0 = Dom ... 6 = Sáb
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todaySchedule = hoursConfig[todayIndex];
    let isOpenNow = false;
    let statusText = 'Consulte horários de atendimento';

    if (todaySchedule && todaySchedule.open && todaySchedule.close) {
      const openMin = parseMinutes(todaySchedule.open);
      const closeMin = parseMinutes(todaySchedule.close);
      if (openMin !== null && closeMin !== null) {
        if (currentMinutes >= openMin && currentMinutes < closeMin) {
          isOpenNow = true;
          statusText = `Aberto agora · até ${todaySchedule.close.replace(':00', 'h')}`;
        } else if (currentMinutes < openMin) {
          statusText = `Fechado agora · abre hoje às ${todaySchedule.open.replace(':00', 'h')}`;
        }
      }
    }

    if (!isOpenNow && statusText === 'Consulte horários de atendimento') {
      // Procura próximo dia de funcionamento
      for (let offset = 1; offset <= 7; offset += 1) {
        const nextDay = (todayIndex + offset) % 7;
        const sched = hoursConfig[nextDay];
        if (sched && sched.open) {
          const dayLabel = offset === 1 ? 'amanhã' : sched.label.split('-')[0];
          statusText = `Fechado agora · abre ${dayLabel} às ${sched.open.replace(':00', 'h')}`;
          break;
        }
      }
    }

    document.querySelectorAll('[data-live-status]').forEach((el) => {
      el.textContent = statusText;
    });

    document.querySelectorAll('[data-status-dot]').forEach((dot) => {
      dot.classList.toggle('is-open', isOpenNow);
    });

    // Atualiza tabela semanal de horários
    const tbody = document.getElementById('hours-tbody');
    if (tbody) {
      const order = [2, 3, 4, 5, 6, 0, 1]; // Terça a Segunda
      tbody.innerHTML = order
        .map((dayIdx) => {
          const item = hoursConfig[dayIdx];
          if (!item) return '';
          const isToday = dayIdx === todayIndex;
          const timeRange =
            item.open && item.close ? `${item.open} às ${item.close}` : 'Fechado (Torra Interna)';
          return `<tr class="${isToday ? 'is-today' : ''}" data-day="${dayIdx}">
            <td>${escapeHtml(item.label)}</td>
            <td>${escapeHtml(timeRange)}</td>
          </tr>`;
        })
        .join('');
    }
  }

  /* ------------------------------------------------------------------------
     Cardápio Digital Interativo (4 Modelos + Abas + Seleção p/ WhatsApp)
     ------------------------------------------------------------------------ */
  function getActiveCategoriesForConcept(conceptKey) {
    const allCategories = baseConfig.menu || [];
    const conceptObj = baseConfig.concepts?.[conceptKey];
    if (!conceptObj || !Array.isArray(conceptObj.categories) || conceptObj.categories.length === 0) {
      return allCategories;
    }

    const bySlug = new Map(allCategories.map((c) => [c.slug, c]));
    return conceptObj.categories.map((slug) => bySlug.get(slug)).filter(Boolean);
  }

  function renderMenuTabs() {
    const tabsContainer = document.getElementById('menu-tabs');
    if (!tabsContainer) return;

    const visibleCategories = getActiveCategoriesForConcept(state.concept);
    const activeStillExists =
      state.activeCategory === 'all' ||
      visibleCategories.some((cat) => cat.slug === state.activeCategory);

    if (!activeStillExists) {
      state.activeCategory = 'all';
    }

    const totalCount = visibleCategories.reduce(
      (acc, cat) => acc + (cat.items ? cat.items.length : 0),
      0
    );

    const tabsHtml = [
      `<button type="button" class="menu-tab ${
        state.activeCategory === 'all' ? 'is-active' : ''
      }" role="tab" aria-selected="${
        state.activeCategory === 'all'
      }" data-category-tab="all">Todos (${totalCount})</button>`,
      ...visibleCategories.map((cat) => {
        const isSelected = state.activeCategory === cat.slug;
        const count = cat.items ? cat.items.length : 0;
        return `<button type="button" class="menu-tab ${
          isSelected ? 'is-active' : ''
        }" role="tab" aria-selected="${isSelected}" data-category-tab="${escapeHtml(
          cat.slug
        )}">${escapeHtml(cat.name)} (${count})</button>`;
      }),
    ].join('');

    tabsContainer.innerHTML = tabsHtml;
  }

  function renderMenuCatalog() {
    const catalogContainer = document.getElementById('menu-catalog');
    if (!catalogContainer) return;

    const visibleCategories = getActiveCategoriesForConcept(state.concept);
    const filteredCategories =
      state.activeCategory === 'all'
        ? visibleCategories
        : visibleCategories.filter((cat) => cat.slug === state.activeCategory);

    catalogContainer.innerHTML = filteredCategories
      .map((cat) => {
        const cardsHtml = (cat.items || [])
          .map((item) => {
            const qty = state.selectedItems.get(item.id) || 0;
            const isSelected = qty > 0;
            return `<article class="menu-card ${isSelected ? 'is-selected' : ''}" data-item-id="${escapeHtml(
              item.id
            )}">
              <div>
                <div class="menu-card-top">
                  <h4 class="menu-item-name">${escapeHtml(item.name)}</h4>
                  <span class="menu-item-price">${formatBRL(item.priceCents)}</span>
                </div>
                <p class="menu-item-origin">${escapeHtml(item.origin)}</p>
                <p class="menu-item-desc">${escapeHtml(item.description)}</p>
              </div>
              <div>
                <div class="menu-card-footer">
                  <span class="tasting-notes">Notas: ${escapeHtml(item.tastingNotes)}</span>
                  <span class="menu-badges">
                    ${
                      item.isSignature
                        ? '<span class="badge-signature">Assinatura</span>'
                        : ''
                    }
                    <span class="badge-volume">${escapeHtml(item.volume)}</span>
                  </span>
                </div>
                <div class="menu-card-actions">
                  <span style="font-size:0.74rem;color:var(--text-subtle);">
                    ${isSelected ? 'Selecionado no seu pedido' : 'Peça pelo WhatsApp ou inclua na reserva'}
                  </span>
                  <button
                    type="button"
                    class="item-pick-btn"
                    data-pick-item="${escapeHtml(item.id)}"
                    ${isSelected ? 'hidden' : ''}
                  >
                    + Escolher no Cardápio
                  </button>
                  <div class="item-stepper" data-stepper-for="${escapeHtml(item.id)}" ${
              isSelected ? '' : 'hidden'
            }>
                    <button
                      type="button"
                      class="stepper-btn"
                      data-step-item="${escapeHtml(item.id)}"
                      data-step-delta="-1"
                      aria-label="Diminuir quantidade de ${escapeHtml(item.name)}"
                    >−</button>
                    <span class="stepper-qty" aria-live="polite">${qty}</span>
                    <button
                      type="button"
                      class="stepper-btn"
                      data-step-item="${escapeHtml(item.id)}"
                      data-step-delta="1"
                      aria-label="Aumentar quantidade de ${escapeHtml(item.name)}"
                    >+</button>
                  </div>
                </div>
              </div>
            </article>`;
          })
          .join('');

        return `<section class="menu-category-block" data-category-section="${escapeHtml(
          cat.slug
        )}">
          <header class="menu-category-header">
            <h3 class="menu-category-title">${escapeHtml(cat.name)}</h3>
            <p class="menu-category-desc">${escapeHtml(cat.description)}</p>
          </header>
          <div class="menu-grid">
            ${cardsHtml}
          </div>
        </section>`;
      })
      .join('');
  }

  function applyConcept(conceptKey, options = { updateTheme: true }) {
    const concepts = baseConfig.concepts || {};
    if (!concepts[conceptKey]) return;

    state.concept = conceptKey;
    const concept = concepts[conceptKey];

    if (concept.descriptor) {
      state.descriptor = concept.descriptor;
    }

    if (options.updateTheme && concept.theme) {
      applyTheme(concept.theme);
    }

    // Atualiza textos do Hero se existirem
    const eyebrowEl = document.getElementById('hero-eyebrow');
    const line1El = document.getElementById('hero-title-line1');
    const line2El = document.getElementById('hero-title-line2');
    const leadEl = document.getElementById('hero-lead');

    if (eyebrowEl && concept.eyebrow) eyebrowEl.textContent = concept.eyebrow;
    if (line1El && concept.titleLine1) line1El.textContent = concept.titleLine1;
    if (line2El && concept.titleLine2) line2El.textContent = concept.titleLine2;
    if (leadEl && concept.lead) leadEl.textContent = concept.lead;

    // Atualiza estado visual dos cartões de modelo de cardápio e do Demo Studio
    document.querySelectorAll('[data-concept-select]').forEach((btn) => {
      const isMatch = btn.getAttribute('data-concept-select') === conceptKey;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    document.querySelectorAll('[data-demo-concept]').forEach((btn) => {
      const isMatch = btn.getAttribute('data-demo-concept') === conceptKey;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    syncBrandAndChannels();
    renderMenuTabs();
    renderMenuCatalog();
  }

  /* ------------------------------------------------------------------------
     Gestão de Itens Selecionados (Bandeja Flutuante + Integração Reserva)
     ------------------------------------------------------------------------ */
  function getSelectedSummary() {
    const entries = [];
    let totalCents = 0;
    let totalUnits = 0;

    state.selectedItems.forEach((qty, itemId) => {
      const item = itemDirectory.get(itemId);
      if (!item || qty <= 0) return;
      const lineTotal = item.priceCents * qty;
      totalCents += lineTotal;
      totalUnits += qty;
      entries.push({
        ...item,
        qty,
        lineTotal,
      });
    });

    return { entries, totalCents, totalUnits };
  }

  function updateItemQuantity(itemId, newQty) {
    const clamped = Math.max(0, Math.min(20, newQty));
    if (clamped === 0) {
      state.selectedItems.delete(itemId);
    } else {
      state.selectedItems.set(itemId, clamped);
    }

    // Atualiza o card específico no DOM sem precisar reconstruir a página inteira
    const card = document.querySelector(`.menu-card[data-item-id="${CSS.escape(itemId)}"]`);
    if (card) {
      const isSelected = clamped > 0;
      card.classList.toggle('is-selected', isSelected);
      const pickBtn = card.querySelector('[data-pick-item]');
      const stepper = card.querySelector('[data-stepper-for]');
      const qtySpan = card.querySelector('.stepper-qty');
      if (pickBtn) pickBtn.hidden = isSelected;
      if (stepper) stepper.hidden = !isSelected;
      if (qtySpan) qtySpan.textContent = String(clamped);
    }

    syncSelectionTrayAndForm();
  }

  function syncSelectionTrayAndForm() {
    const { entries, totalCents, totalUnits } = getSelectedSummary();

    const tray = document.getElementById('selection-tray');
    const trayTitle = document.getElementById('selection-tray-title');
    const traySub = document.getElementById('selection-tray-sub');
    const trayWhatsappBtn = document.getElementById('selection-tray-whatsapp');

    const formBox = document.getElementById('selected-menu-box');
    const formList = document.getElementById('selected-menu-list');
    const formTotal = document.getElementById('selected-menu-total');

    if (entries.length === 0) {
      if (tray) tray.hidden = true;
      if (formBox) formBox.hidden = true;
      return;
    }

    const shortList = entries.map((e) => `${e.qty}x ${e.name}`).join(' · ');

    if (tray) {
      tray.hidden = false;
      if (trayTitle) {
        trayTitle.textContent = `${totalUnits} ${
          totalUnits === 1 ? 'item escolhido' : 'itens escolhidos'
        } · ${formatBRL(totalCents)}`;
      }
      if (traySub) {
        traySub.textContent = shortList;
      }
      if (trayWhatsappBtn) {
        const orderLines = entries
          .map((e) => `• ${e.qty}x ${e.name} (${formatBRL(e.lineTotal)})`)
          .join('\n');
        const message = [
          `Olá, equipe da *${state.brandName}*!`,
          `Escolhi os seguintes itens no cardápio digital:`,
          '',
          orderLines,
          '',
          `*Total estimado:* ${formatBRL(totalCents)}`,
          '',
          `Gostaria de saber sobre disponibilidade / encomenda ou consumo na casa.`,
        ].join('\n');
        trayWhatsappBtn.setAttribute('href', buildWhatsAppUrl(message));
      }
    }

    if (formBox && formList && formTotal) {
      formBox.hidden = false;
      formList.textContent = shortList;
      formTotal.textContent = formatBRL(totalCents);
    }
  }

  function clearSelectedItems() {
    state.selectedItems.clear();
    renderMenuCatalog();
    syncSelectionTrayAndForm();
  }

  /* ------------------------------------------------------------------------
     Concierge de Reserva & Encomenda via WhatsApp + Arquivo .ICS (Calendário)
     ------------------------------------------------------------------------ */
  function formatPhoneMask(value) {
    const digits = String(value || '')
      .replace(/\D/g, '')
      .slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function formatDateBR(isoDate) {
    if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
    const [y, m, d] = isoDate.split('-');
    return `${d}/${m}/${y}`;
  }

  function generateIcsContent(reservation) {
    const [year, month, day] = reservation.date.split('-').map(Number);
    const [hour, minute] = reservation.time.split(':').map(Number);

    const pad = (n) => String(n).padStart(2, '0');
    const dtStart = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
    const endHour = Math.min(23, hour + 1);
    const dtEnd = `${year}${pad(month)}${pad(day)}T${pad(endHour)}${pad(minute)}00`;

    const descriptionLines = [
      `Reserva na ${state.brandName} (${state.descriptor})`,
      `Cliente: ${reservation.name}`,
      `Pessoas: ${reservation.guests}`,
      `Ambiente: ${reservation.area}`,
      `Experiência: ${reservation.experience}`,
      reservation.menuSummary ? `Itens do Cardápio: ${reservation.menuSummary}` : '',
      `WhatsApp da Cafeteria: ${state.phoneDisplay}`,
    ]
      .filter(Boolean)
      .join('\\n');

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Cafeteria Vitrine de Luxo//PT-BR',
      'BEGIN:VEVENT',
      `SUMMARY:Reserva · ${state.brandName}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `LOCATION:${state.street}, ${state.district}, ${state.city} - ${state.stateCode}`,
      `DESCRIPTION:${descriptionLines}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  }

  function setupReservationForm() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    const dateInput = document.getElementById('res-date');
    const phoneInput = document.getElementById('res-phone');
    const feedbackBox = document.getElementById('booking-feedback');
    const feedbackText = document.getElementById('booking-feedback-text');
    const downloadIcsBtn = document.getElementById('download-ics-btn');

    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const isoToday = `${yyyy}-${mm}-${dd}`;
      dateInput.min = isoToday;
      if (!dateInput.value) {
        dateInput.value = isoToday;
      }
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        e.target.value = formatPhoneMask(e.target.value);
      });
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = (document.getElementById('res-name')?.value || '').trim();
      const phone = (document.getElementById('res-phone')?.value || '').trim();
      const date = (document.getElementById('res-date')?.value || '').trim();
      const time = (document.getElementById('res-time')?.value || '').trim();
      const guests = (document.getElementById('res-guests')?.value || '2 pessoas').trim();
      const area = (document.getElementById('res-area')?.value || 'Salão Principal').trim();
      const experience = (
        document.getElementById('res-experience')?.value || 'Mesa no Salão & Brunch'
      ).trim();
      const notes = (document.getElementById('res-notes')?.value || '').trim();

      if (!name || !date || !time) {
        return;
      }

      const { entries, totalCents } = getSelectedSummary();
      const menuLines =
        entries.length > 0
          ? [
              '',
              '*Itens escolhidos no Cardápio:*',
              ...entries.map((e) => `• ${e.qty}x ${e.name} (${formatBRL(e.lineTotal)})`),
              `*Subtotal do cardápio:* ${formatBRL(totalCents)}`,
            ]
          : [];

      const messageLines = [
        `Olá, equipe da *${state.brandName}*! Gostaria de solicitar uma reserva pelo site:`,
        '',
        `• *Nome:* ${name}`,
        phone ? `• *WhatsApp:* ${phone}` : null,
        `• *Data:* ${formatDateBR(date)} às *${time}*`,
        `• *Pessoas:* ${guests}`,
        `• *Ambiente:* ${area}`,
        `• *Experiência:* ${experience}`,
        ...menuLines,
        notes ? `\n*Observações:* ${notes}` : null,
        '',
        `Aguardo a confirmação da disponibilidade. Obrigado(a)!`,
      ].filter((line) => line !== null);

      const whatsappUrl = buildWhatsAppUrl(messageLines.join('\n'));

      state.lastReservation = {
        name,
        phone,
        date,
        time,
        guests,
        area,
        experience,
        menuSummary: entries.map((e) => `${e.qty}x ${e.name}`).join(', '),
      };

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      if (feedbackBox && feedbackText) {
        feedbackText.textContent = `Perfeito, ${name}! Abrimos o WhatsApp da ${state.brandName} com os dados da sua reserva para ${formatDateBR(
          date
        )} às ${time}.`;
        feedbackBox.hidden = false;
      }
    });

    if (downloadIcsBtn) {
      downloadIcsBtn.addEventListener('click', () => {
        if (!state.lastReservation) return;
        const ics = generateIcsContent(state.lastReservation);
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reserva-${state.brandName.toLowerCase().replace(/\s+/g, '-')}.ics`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
      });
    }
  }

  /* ------------------------------------------------------------------------
     Estúdio de Demonstração Comercial (Personalização Ao Vivo p/ Clientes)
     ------------------------------------------------------------------------ */
  function setupDemoStudio() {
    const toggleBtn = document.getElementById('demo-toggle-btn');
    const closeBtn = document.getElementById('demo-close-btn');
    const panel = document.getElementById('demo-panel');
    const nameInput = document.getElementById('demo-name');
    const cityInput = document.getElementById('demo-city');
    const instaInput = document.getElementById('demo-insta');
    const copyUrlBtn = document.getElementById('demo-copy-url');
    const resetBtn = document.getElementById('demo-reset');

    if (nameInput) nameInput.value = state.brandName;
    if (cityInput) cityInput.value = state.city;
    if (instaInput) instaInput.value = state.instagramHandle;

    if (toggleBtn && panel) {
      toggleBtn.addEventListener('click', () => {
        const willOpen = panel.hidden;
        panel.hidden = !willOpen;
        toggleBtn.setAttribute('aria-expanded', String(willOpen));
      });
    }

    if (closeBtn && panel && toggleBtn) {
      closeBtn.addEventListener('click', () => {
        panel.hidden = true;
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    }

    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        state.brandName = val || baseConfig.brand?.name || 'Croma';
        syncBrandAndChannels();
        syncSelectionTrayAndForm();
      });
    }

    if (cityInput) {
      cityInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        state.city = val || baseConfig.contact?.address?.city || 'Brasília';
        syncBrandAndChannels();
      });
    }

    if (instaInput) {
      instaInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        state.instagramHandle = normalizeInstaHandle(
          val || baseConfig.contact?.instagramHandle || '@croma.cafe'
        );
        state.instagramUrl = buildInstaUrl(state.instagramHandle);
        syncBrandAndChannels();
      });
    }

    if (copyUrlBtn) {
      copyUrlBtn.addEventListener('click', async () => {
        const url = new URL(window.location.href);
        url.searchParams.set('cliente', state.brandName);
        url.searchParams.set('cidade', state.city);
        url.searchParams.set('insta', state.instagramHandle);
        url.searchParams.set('conceito', state.concept);
        url.searchParams.set('tema', state.theme);

        const shareable = url.toString();
        try {
          await navigator.clipboard.writeText(shareable);
          const originalText = copyUrlBtn.textContent;
          copyUrlBtn.textContent = '✓ Link Personalizado Copiado!';
          setTimeout(() => {
            copyUrlBtn.textContent = originalText;
          }, 2400);
        } catch {
          window.prompt('Copie o link personalizado para enviar à cafeteria:', shareable);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.brandName = baseConfig.brand?.name || 'Croma';
        state.city = baseConfig.contact?.address?.city || 'Brasília';
        state.instagramHandle = baseConfig.contact?.instagramHandle || '@croma.cafe';
        state.instagramUrl =
          baseConfig.contact?.instagramUrl || 'https://instagram.com/croma.cafe';
        if (nameInput) nameInput.value = state.brandName;
        if (cityInput) cityInput.value = state.city;
        if (instaInput) instaInput.value = state.instagramHandle;
        applyTheme(baseConfig.theme || 'noir');
        applyConcept('completo', { updateTheme: false });
        if (window.history.replaceState) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     Interações Globais (Delegação de Eventos, Header, Drawer, Copiar Endereço)
     ------------------------------------------------------------------------ */
  function setupGlobalInteractions() {
    // Delegação de cliques para o Cardápio, Conceitos e Temas
    document.addEventListener('click', (event) => {
      const conceptBtn = event.target.closest('[data-concept-select]');
      if (conceptBtn) {
        const key = conceptBtn.getAttribute('data-concept-select');
        applyConcept(key, { updateTheme: true });
        return;
      }

      const demoConceptBtn = event.target.closest('[data-demo-concept]');
      if (demoConceptBtn) {
        const key = demoConceptBtn.getAttribute('data-demo-concept');
        applyConcept(key, { updateTheme: true });
        return;
      }

      const demoThemeBtn = event.target.closest('[data-demo-theme]');
      if (demoThemeBtn) {
        const theme = demoThemeBtn.getAttribute('data-demo-theme');
        applyTheme(theme);
        return;
      }

      const catTab = event.target.closest('[data-category-tab]');
      if (catTab) {
        state.activeCategory = catTab.getAttribute('data-category-tab') || 'all';
        renderMenuTabs();
        renderMenuCatalog();
        return;
      }

      const pickBtn = event.target.closest('[data-pick-item]');
      if (pickBtn) {
        const itemId = pickBtn.getAttribute('data-pick-item');
        if (itemId) updateItemQuantity(itemId, 1);
        return;
      }

      const stepBtn = event.target.closest('[data-step-item]');
      if (stepBtn) {
        const itemId = stepBtn.getAttribute('data-step-item');
        const delta = Number(stepBtn.getAttribute('data-step-delta') || 0);
        if (itemId && delta) {
          const current = state.selectedItems.get(itemId) || 0;
          updateItemQuantity(itemId, current + delta);
        }
        return;
      }

      const clearBtn = event.target.closest('[data-clear-selection]');
      if (clearBtn) {
        clearSelectedItems();
      }
    });

    // Botão Copiar Endereço
    const copyAddressBtn = document.getElementById('copy-address-btn');
    if (copyAddressBtn) {
      copyAddressBtn.addEventListener('click', async () => {
        const fullAddress = `${state.street} — ${state.district}, ${state.city} - ${state.stateCode}, CEP ${state.zip}`;
        try {
          await navigator.clipboard.writeText(fullAddress);
          const original = copyAddressBtn.textContent;
          copyAddressBtn.textContent = '✓ Endereço copiado!';
          setTimeout(() => {
            copyAddressBtn.textContent = original;
          }, 2200);
        } catch {
          window.prompt('Copie o endereço da cafeteria:', fullAddress);
        }
      });
    }

    // Cabeçalho fixo ao rolar
    const header = document.getElementById('site-header');
    if (header) {
      const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Menu Mobile (Drawer)
    const menuToggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');

    const closeDrawer = () => {
      if (!drawer || !menuToggle) return;
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    if (menuToggle && drawer) {
      menuToggle.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('is-open');
        drawer.setAttribute('aria-hidden', String(!isOpen));
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });

      drawer.addEventListener('click', (e) => {
        if (e.target === drawer || e.target.closest('a')) {
          closeDrawer();
        }
      });
    }

    if (drawerClose) {
      drawerClose.addEventListener('click', closeDrawer);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    });

    // Animações suaves de entrada (IntersectionObserver)
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length > 0) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }

  /* ------------------------------------------------------------------------
     Inicialização Principal
     ------------------------------------------------------------------------ */
  function init() {
    readUrlParams();
    applyTheme(state.theme);
    applyConcept(state.concept, { updateTheme: false });
    renderHoursAndLiveStatus();
    setupReservationForm();
    setupDemoStudio();
    setupGlobalInteractions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

