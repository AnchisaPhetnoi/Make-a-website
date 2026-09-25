(() => {
  const inHtmlFolder = /[\\/]HTML[\\/]/i.test(window.location.pathname);
  const isEmbeddedContent = window.self !== window.top;
  const homePath = inHtmlFolder ? '../index.html' : './index.html';
  const pagePath = (fileName) => inHtmlFolder ? `./${fileName}` : `./HTML/${fileName}`;
  const theme = document.createElement('link');
  theme.rel = 'stylesheet';
  theme.href = inHtmlFolder ? '../CSS/theme.css' : './CSS/theme.css';
  document.head.appendChild(theme);
  const decoratePage = () => {
    const isHome = !inHtmlFolder && /(?:\/|\/index\.html)$/.test(window.location.pathname);
    if (!isHome) document.body.classList.add('cute-theme');
    if (isEmbeddedContent) document.body.classList.add('embedded-lesson');
    if (document.querySelector('.landing-page > .content > .container > .info')) document.body.classList.add('home-page');
    if (document.querySelector('.landing-page > .container > .content')) document.body.classList.add('lesson-page');
  };
  if (document.body) decoratePage();
  else document.addEventListener('DOMContentLoaded', decoratePage);

  if (inHtmlFolder) {
    const lessonScript = document.createElement('script');
    lessonScript.src = '../Js/lesson-lab.js';
    document.head.appendChild(lessonScript);
  }

  const appliedMath1 = [
    ['ฟังก์ชัน', 'ฟังชันท์1.html'],
    ['เมทริกซ์', 'เมทริค1.html'],
    ['จำนวนเชิงซ้อน', 'จำนวนเชิงซ้อน.html'],
    ['ตรรกศาสตร์', 'ตรรกศาสตร์.html'],
    ['ฟังก์ชันตรีโกณมิติ', 'ฟังก์ชันตรีโกณมิติ.html'],
    ['เวกเตอร์ในสามมิติ', 'เวกเตอร์ในสามมิติ.html'],
    ['จำนวนจริงและพหุนาม', 'จำนวนจริงและพหุนาม.html'],
    ['ลำดับและอนุกรม', 'ลำดับและอนุกรม.html'],
    ['แคลคูลัสเบื้องต้น', 'แคลคูลัสเบื้องต้น.html'],
    ['เรขาคณิตวิเคราะห์', 'เรขาคณิตวิเคราะห์.html'],
    ['เซต', 'เซต.html'],
    ['สถิติ', 'สถิติ.html'],
    ['หลักการนับเบื้องต้น', 'หลักการนับเบื้องต้น.html'],
    ['การแจกแจงความน่าจะเป็นเบื้องต้น', 'การแจกแจงความน่าจะเป็นเบื้องต้น.html'],
    ['ฟังก์ชันเอกซ์โพเนนเชียลและฟังก์ชันลอการิทึม', 'ฟังก์ชันเอกซ์โพเนเชียว และ ฟังก์ชันลอการิทึม.html']
  ];

  const appliedMath2 = [
    ['เซต', 'เซต.html'],
    ['ฟังก์ชัน', 'ฟังชันท์1.html'],
    ['สถิติ', 'สถิติ.html'],
    ['ลำดับและอนุกรม', 'ลำดับและอนุกรม.html'],
    ['เลขยกกำลัง', 'เลขยกกำลัง.html'],
    ['หลักการนับเบื้องต้น', 'หลักการนับเบื้องต้น.html'],
    ['ตรรกศาสตร์เบื้องต้น', 'ตรรกศาสตร์เบื้องต้น.html'],
    ['ความน่าจะเป็น', 'ความน่าจะเป็น.html'],
    ['ดอกเบี้ยและมูลค่าของเงิน', 'ดอกเบี้ยและมูลค่าของเงิน.html']
  ];

  const styles = `
    .site-header {
      position: relative;
      z-index: 5;
      min-height: 80px;
      display: flex;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #eee;
      font-family: Arial, sans-serif;
    }
    body.subject-view-page,
    body.course-overview-page {
      background: #fff !important;
    }
    .site-header__inner {
      width: min(1170px, calc(100% - 30px));
      min-height: 80px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .site-brand {
      display: inline-flex;
      align-items: center;
      gap: 11px;
      color: #232054;
      font-family: 'Trebuchet MS', Arial, sans-serif;
      font-size: 27px;
      font-weight: 800;
      letter-spacing: -1.1px;
      line-height: 1;
      text-decoration: none;
      white-space: nowrap;
    }
    .site-brand__mark {
      display: grid;
      place-items: center;
      width: 43px;
      height: 43px;
      flex-shrink: 0;
      color: #fff;
      background: linear-gradient(145deg, #6c63ff, #6c63ff);
      border: 1px solid #ffffff70;
      border-radius: 14px 14px 14px 5px;
      box-shadow: 0 5px 12px #6c63ff26, inset 0 1px 0 #ffffff40;
    }
    .site-brand__mark svg { width: 29px; height: 29px; }
    .site-brand__word { display: inline-flex; gap: 5px; align-items: baseline; }
    .site-brand__word span { color: #6c63ff; font-weight: 600; }
    .site-brand:hover .site-brand__word { color: #6c63ff; }
    .site-brand:focus-visible { outline: 3px solid #a5a0f5; outline-offset: 6px; border-radius: 8px; }
    .site-nav { display: flex; align-items: center; gap: 30px; }
    .site-nav a, .category-toggle {
      color: #25252d;
      font: inherit;
      font-size: 14px;
      text-decoration: none;
      background: none;
      border: 0;
      cursor: pointer;
      padding: 8px 0;
    }
    .site-nav a:hover, .category-toggle:hover { color: #6c63ff; }
    .category-toggle::after { content: '⌄'; margin-left: 6px; color: #6c63ff; }
    .category-wrap { position: relative; }
    .category-panel {
      position: absolute;
      z-index: 1;
      top: calc(100% + 10px);
      right: -12px;
      width: min(650px, calc(100vw - 24px));
      padding: 14px 16px 16px;
      background: #fff;
      border: 1px solid #d9d7f4;
      border-radius: 24px;
      box-shadow: 0 12px 28px rgba(108, 99, 255, 0.2);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .category-panel[hidden] { display: none; }
    .category-column h2 {
      display: inline-block;
      margin: 0 0 10px;
      padding: 6px 12px;
      color: #fff;
      background: #6c63ff;
      border-radius: 8px;
      font-size: 20px;
      font-weight: 700;
      text-align: left;
    }
    .category-column { text-align: left; }
    .category-list { display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 5px 13px; text-align: left; }
    .category-list a { color: #6c63ff; font-size: 14px; font-weight: 400; line-height: 1.3; text-align: left; }
    .category-list a:hover,
    .category-list a:focus-visible {
      padding: 3px 8px;
      color: #6c63ff;
      background: #cfccff;
      border-radius: 20px;
      text-decoration: none;
    }
    @media (max-width: 700px) {
      .site-header__inner { align-items: flex-start; flex-direction: column; gap: 5px; padding: 10px 0; }
      .site-nav { width: 100%; justify-content: space-between; gap: 12px; }
      .site-nav a, .category-toggle { font-size: 13px; }
      .category-panel { position: fixed; top: 104px; left: 12px; right: 12px; width: auto; max-height: calc(100vh - 120px); overflow: auto; grid-template-columns: 1fr; }
    }
    .subject-layout {
      width: min(1450px, calc(100% - 16px));
      min-height: calc(100vh - 80px);
      margin: 0 auto;
      padding: 0 0 48px;
      display: grid;
      grid-template-columns: minmax(250px, 390px) minmax(0, 1fr);
      gap: 54px;
    }
    .subject-menu {
      align-self: start;
      min-height: 500px;
      padding: 22px 32px 28px;
      color: #fff;
      background: #6c63ff;
      border-radius: 0 0 5px 5px;
    }
    .subject-menu h1 {
      margin: 0 0 22px;
      font-size: 18px;
      line-height: 1.35;
      font-weight: 700;
    }
    .subject-menu a {
      display: block;
      margin: 0 0 11px;
      color: #fff;
      font-size: 15px;
      line-height: 1.3;
      font-weight: 400;
      text-decoration: none;
    }
    .subject-menu a:hover { text-decoration: underline; }
    .subject-viewer {
      min-width: 0;
      padding-top: 24px;
    }
    .lesson-title {
      width: fit-content;
      max-width: 100%;
      margin: 0 auto 20px;
      padding: 9px 18px;
      color: #fff;
      background: #6c63ff;
      border-radius: 20px;
      font-size: 18px;
      line-height: 1.3;
      font-weight: 700;
      text-align: center;
    }
    .subject-viewer iframe {
      display: block;
      width: 100%;
      height: 3600px;
      min-height: 0;
      border: 0;
      background: #fff;
      opacity: 1;
      filter: none;
      overflow: hidden;
    }
    @media (max-width: 900px) {
      .subject-layout { grid-template-columns: 1fr; gap: 20px; }
      .subject-menu { min-height: auto; }
      .subject-viewer iframe { min-height: 520px; height: 70vh; }
    }
    .course-overview {
      width: min(900px, calc(100% - 32px));
      margin: 30px auto 60px;
      padding: 24px 20px 34px;
      background: #fff;
      color: #6c63ff;
    }
    .course-section + .course-section { margin-top: 42px; }
    .course-heading {
      width: fit-content;
      margin: 0 auto 22px;
      padding: 8px 18px;
      color: #fff;
      background: #6c63ff;
      border: 0;
      border-radius: 20px;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
    }
    .course-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px 18px;
    }
    .course-link {
      display: block;
      padding: 8px 12px;
      border: 1px solid #6c63ff;
      border-radius: 20px;
      background: #cfccff;
      color: #6c63ff;
      box-shadow: 0 2px 3px rgba(50, 47, 92, 0.2);
      font-size: 15px;
      line-height: 1.35;
      text-align: center;
      text-decoration: none;
    }
    .course-link:hover,
    .course-link:focus-visible {
      background: #cfccff;
      color: #6c63ff;
      outline: none;
    }
    @media (max-width: 600px) {
      .course-list { grid-template-columns: 1fr; }
      .course-heading { font-size: 18px; }
    }
  `;

  const renderLinks = (items, targetPage) => items.map(([label, fileName]) => {
    const href = targetPage
      ? `${pagePath(targetPage)}?lesson=${encodeURIComponent(fileName)}`
      : pagePath(fileName);
    return `<a href="${href}">${label}</a>`;
  }).join('');

  const renderCourseLinks = (items, targetPage) => items.map(([label, fileName]) =>
    `<a class="course-link" href="${pagePath(targetPage)}?lesson=${encodeURIComponent(fileName)}">${label}</a>`
  ).join('');

  function mountHeader() {
    if (isEmbeddedContent || !document.body || document.querySelector('.site-header')) return;
    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);
    document.querySelectorAll('header').forEach((header) => header.remove());

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="site-header__inner">
        <a class="site-brand" href="${homePath}" aria-label="Cute math — หน้าหลัก">
          <span class="site-brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 17l5 6 6-15h11" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 16l6 7m0-7l-6 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
              <circle cx="6" cy="8" r="1.6" fill="currentColor" opacity=".65"/>
            </svg>
          </span>
          <span class="site-brand__word">Cute <span>math</span></span>
        </a>
        <nav class="site-nav" aria-label="เมนูหลัก">
          <a href="${homePath}">หน้าหลัก</a>
          <a href="${pagePath('แบบทดสอบ.html')}">แบบทดสอบ</a>
          <div class="category-wrap">
            <button class="category-toggle" type="button" aria-expanded="false" aria-controls="category-panel">หมวดหมู่</button>
            <div class="category-panel" id="category-panel" hidden>
              <section class="category-column">
                <h2>คณิตศาสตร์ประยุกต์ 1</h2>
                <div class="category-list">${renderLinks(appliedMath1, 'คณิต 1.html')}</div>
              </section>
              <section class="category-column">
                <h2>คณิตศาสตร์ประยุกต์ 2</h2>
                <div class="category-list">${renderLinks(appliedMath2, 'คณิต 2.html')}</div>
              </section>
            </div>
          </div>
        </nav>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    const toggle = header.querySelector('.category-toggle');
    const panel = header.querySelector('.category-panel');
    toggle.addEventListener('click', () => {
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function mountSubjectViewer() {
    if (isEmbeddedContent) return;
    const currentFile = decodeURIComponent(window.location.pathname.split(/[\\/]/).pop() || '');
    const topics = currentFile === 'คณิต 1.html' ? appliedMath1 : currentFile === 'คณิต 2.html' ? appliedMath2 : null;
    if (!topics || document.querySelector('.subject-layout')) return;
    const requestedLesson = new URLSearchParams(window.location.search).get('lesson');
    const selectedTopic = topics.find(([, fileName]) => fileName === requestedLesson) || topics[0];

    document.body.classList.add('subject-view-page');
    document.querySelectorAll('body > :not(.site-header):not(script):not(style)').forEach((element) => {
      element.hidden = true;
    });

    const layout = document.createElement('main');
    layout.className = 'subject-layout';
    layout.innerHTML = `
      <aside class="subject-menu">
        <h1>${currentFile === 'คณิต 1.html' ? 'คณิตศาสตร์ประยุกต์ 1' : 'คณิตศาสตร์ประยุกต์ 2'}</h1>
        ${renderLinks(topics)}
      </aside>
      <section class="subject-viewer" aria-label="พื้นที่แสดงเนื้อหา">
        <h2 class="lesson-title">${selectedTopic[0]}</h2>
        <iframe title="เนื้อหาคณิตศาสตร์" src="${pagePath(selectedTopic[1])}?subject=${encodeURIComponent(currentFile === 'คณิต 1.html' ? 'คณิตศาสตร์ประยุกต์ 1' : 'คณิตศาสตร์ประยุกต์ 2')}"></iframe>
      </section>
    `;
    document.querySelector('.site-header').after(layout);

    const frame = layout.querySelector('iframe');
    const lessonTitle = layout.querySelector('.lesson-title');
    const styleEmbeddedContent = () => {
      const embeddedDocument = frame.contentDocument;
      if (!embeddedDocument) return;
      if (!embeddedDocument.querySelector('[data-cut-math-content-style]')) {
        const contentStyle = embeddedDocument.createElement('style');
        contentStyle.dataset.cutMathContentStyle = 'true';
        contentStyle.textContent = `
          html, body { opacity: 1 !important; filter: none !important; background: #fff !important; height: auto !important; overflow: visible !important; }
          body { color: #2f2f2f !important; font-family: Arial, sans-serif !important; }
          p, li, h1, h2, h3, h4, h5, h6 { opacity: 1 !important; filter: none !important; }
          .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 { color: #6c63ff !important; }
        `;
        embeddedDocument.head.appendChild(contentStyle);
      }
      frame.setAttribute('scrolling', 'no');
      const resizeFrame = () => {
        const documentElement = embeddedDocument.documentElement;
        const body = embeddedDocument.body;
        const elementBottom = Math.max(
          0,
          ...[...body.querySelectorAll('*')].map((element) => element.getBoundingClientRect().bottom)
        );
        const contentHeight = Math.max(
          documentElement.scrollHeight,
          documentElement.offsetHeight,
          body.scrollHeight,
          body.offsetHeight,
          elementBottom,
          3600
        );
        frame.style.height = `${contentHeight + 24}px`;
      };
      resizeFrame();
      requestAnimationFrame(resizeFrame);
      window.setTimeout(resizeFrame, 100);
      if (window.ResizeObserver) {
        const observer = new ResizeObserver(resizeFrame);
        observer.observe(embeddedDocument.body);
      }
    };
    frame.addEventListener('load', styleEmbeddedContent);
    styleEmbeddedContent();
    layout.querySelectorAll('.subject-menu a').forEach((link) => {
      if (decodeURIComponent(link.getAttribute('href')).endsWith(selectedTopic[1])) link.setAttribute('aria-current', 'page');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        layout.querySelectorAll('.subject-menu a').forEach((item) => item.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
        lessonTitle.textContent = link.textContent;
        const lessonUrl = new URL(link.href);
        lessonUrl.searchParams.set('subject', currentFile === 'คณิต 1.html' ? 'คณิตศาสตร์ประยุกต์ 1' : 'คณิตศาสตร์ประยุกต์ 2');
        frame.src = lessonUrl.href;
      });
    });
  }

  function mountCourseOverview() {
    const currentFile = decodeURIComponent(window.location.pathname.split(/[\\/]/).pop() || '');
    if (isEmbeddedContent || currentFile !== 'หน้าแรก.html' || document.querySelector('.course-overview')) return;
    const requestedCourse = new URLSearchParams(window.location.search).get('course');

    document.body.classList.add('course-overview-page');
    document.querySelectorAll('body > :not(.site-header):not(script):not(style)').forEach((element) => {
      element.hidden = true;
    });
    const overview = document.createElement('main');
    overview.className = 'course-overview';
    overview.innerHTML = `
      <section class="course-section" data-course="1">
        <h1 class="course-heading">คณิตศาสตร์ประยุกต์ 1</h1>
        <div class="course-list">${renderCourseLinks(appliedMath1, 'คณิต 1.html')}</div>
      </section>
      <section class="course-section" data-course="2">
        <h2 class="course-heading">คณิตศาสตร์ประยุกต์ 2</h2>
        <div class="course-list">${renderCourseLinks(appliedMath2, 'คณิต 2.html')}</div>
      </section>
    `;
    document.querySelector('.site-header').after(overview);
    if (requestedCourse === '1' || requestedCourse === '2') {
      overview.querySelector(`[data-course="${requestedCourse}"]`)?.scrollIntoView({ block: 'start' });
    }
  }

  if (isEmbeddedContent) {
    const embeddedStyle = document.createElement('style');
    embeddedStyle.textContent = 'header, .site-header { display: none !important; } body { padding-top: 0 !important; }';
    document.head.appendChild(embeddedStyle);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      mountHeader();
      mountSubjectViewer();
      mountCourseOverview();
    });
  } else {
    mountHeader();
    mountSubjectViewer();
    mountCourseOverview();
  }
})();
