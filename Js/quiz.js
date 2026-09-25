(() => {
  'use strict';
  const app = document.getElementById('quiz-app');
  const data = window.quizData;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groups = [];
  for (const q of data) if (!groups.some(g => g.subject === q.subject && g.topic === q.topic)) groups.push({subject:q.subject,topic:q.topic});
  const DRAFT = 'cute-math-quiz-draft-v1', HISTORY = 'cute-math-quiz-history-v1';
  let selected = 0, difficulty = 'ปานกลาง', count = 10, active = null, interval, result, toast;
  const requested = new URLSearchParams(window.location?.search || '');
  const requestedGroup = groups.findIndex(g => g.topic === requested.get('topic') && g.subject === requested.get('subject'));
  if (requestedGroup >= 0) selected = requestedGroup;
  const dialog = document.getElementById('quiz-dialog');
  let confirmAction = null;
  function dismissDialog() { confirmAction=null; dialog.close(); }
  function ask(title,description,label,action) {
    if(dialog.open)return;
    document.getElementById('dialog-title').textContent=title;
    document.getElementById('dialog-description').textContent=description;
    document.getElementById('dialog-confirm').textContent=label;
    confirmAction=action;
    dialog.showModal();
    document.getElementById('dialog-cancel').focus();
  }
  document.getElementById('dialog-cancel').addEventListener('click',dismissDialog);
  document.getElementById('dialog-close').addEventListener('click',dismissDialog);
  dialog.addEventListener('cancel',()=>{confirmAction=null;});
  document.getElementById('dialog-confirm').addEventListener('click',()=>{
    const action=confirmAction;
    dismissDialog();
    if(action)action();
  });
  function hideNotice() { clearTimeout(toast); document.getElementById('notice').hidden=true; }
  document.getElementById('notice-close').addEventListener('click',hideNotice);
  function notify(message) {
    clearTimeout(toast);
    const notice=document.getElementById('notice');
    const error=/ไม่พร้อม|ไม่สำเร็จ/.test(message);
    notice.classList.toggle('notice-error',error);
    document.getElementById('notice-icon').textContent=error?'!':'✓';
    document.getElementById('notice-message').textContent=message;
    notice.hidden=false;
    if(!error)toast=setTimeout(hideNotice,6000);
  }
  function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
  function write(key,value) { try { localStorage.setItem(key,JSON.stringify(value)); return true; } catch { notify('พื้นที่บันทึกไม่พร้อมใช้งาน กรุณาดาวน์โหลดผลสอบเพื่อเก็บไว้'); return false; } }
  function removeDraft() { try { localStorage.removeItem(DRAFT); } catch {} }
  function valid(a) { return a && Array.isArray(a.ids) && a.ids.length > 0 && a.ids.every(id=>Number.isInteger(id)&&data[id]) && Array.isArray(a.answers) && Number.isFinite(a.deadline) && Number.isFinite(a.started); }
  function draft() { const a=read(DRAFT,null); return valid(a)?a:null; }
  function history() { const list=read(HISTORY,[]); return Array.isArray(list)?list.filter(a=>valid(a)&&Number.isFinite(a.finished)):[]; }
  function time(seconds) { const s=Math.max(0,Math.floor(seconds)); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
  function rating(percent) { return percent>=90?'ดีเยี่ยม':percent>=80?'ดีมาก':percent>=70?'ดี':percent>=60?'ปานกลาง':percent>=50?'พอใช้':'ควรปรับปรุง'; }
  function ratingClass(percent) { return percent>=90?'excellent':percent>=80?'great':percent>=70?'good':percent>=60?'average':percent>=50?'fair':'improve'; }
  function score(a) { return a.ids.filter((id,i)=>data[id].correct_answer===a.answers[i]).length; }
  const button = (action,label,style='secondary',extra='') => '<button type="button" class="'+style+'" data-action="'+action+'" '+extra+'>'+label+'</button>';
  function stop() {clearInterval(interval);}
  function library() {
    stop(); active=null; app.className='quiz-selection';
    const pending=draft();
    app.innerHTML='<a class="selection-home-button" href="../index.html">← กลับไปหน้าหลัก</a>'+
      (pending?'<div class="card resume"><span>มีแบบทดสอบที่ยังไม่เสร็จ · '+esc(pending.topic)+'<br><small>เวลายังคงเดินต่อเมื่อออกจากหน้า</small></span>'+button('resume','ทำต่อ','primary')+'</div>':'')+
      '<div class="hero"><div><span class="selection-eyebrow">PRACTICE LAB · ฝึกวันละนิด เก่งขึ้นทุกวัน</span><h1>เลือกเนื้อหาที่ต้องการทำแบบทดสอบ</h1><p class="muted">เลือกเนื้อหาเพียง 1 หัวข้อ แล้วเริ่มทดสอบความรู้ของคุณได้เลย</p><div class="selection-steps"><span><b>1</b> เลือกหัวข้อ</span><span><b>2</b> ตั้งค่าข้อสอบ</span><span><b>3</b> เริ่มท้าทายตัวเอง</span></div></div><div class="selection-art" aria-hidden="true"><svg viewBox="0 0 180 140" fill="none"><circle cx="91" cy="70" r="62" fill="currentColor" opacity=".08"/><rect x="45" y="29" width="83" height="100" rx="12" fill="white" stroke="currentColor" stroke-width="2" transform="rotate(-8 45 29)"/><path d="M65 58h41M65 76h30M65 94h24" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="106" y="59" width="53" height="58" rx="14" fill="currentColor"/><path d="m120 88 9 9 17-21" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M143 23v14m-7-7h14M25 85v10m-5-5h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></div></div><div class="layout"><section>'+
      '<div class="hint">ⓘ เลือกได้ 1 เนื้อหาเท่านั้น · คลังข้อสอบ 1,440 ข้อ</div><div class="subjects">'+
      [...new Set(groups.map(g=>g.subject))].map(subject=>'<section class="card subject"><h2><span class="subject-icon" aria-hidden="true">▤</span> '+esc(subject)+'</h2><small>เลือกหัวข้อเดียวเพื่อเริ่มแบบทดสอบ · '+groups.filter(g=>g.subject===subject).length+' หัวข้อ</small><div class="topics">'+groups.map((g,i)=>g.subject===subject?'<label class="topic"><input type="radio" name="topic" value="'+i+'" '+(selected===i?'checked':'')+'>'+esc(g.topic)+'</label>':'').join('')+'</div></section>').join('')+
      '</div><div class="section-title"><span class="muted">บันทึกประวัติในเบราว์เซอร์เครื่องนี้</span>'+button('history','◷ ประวัติการทำแบบทดสอบ')+'</div></section><aside class="card summary"><h2>▤ สรุปการตั้งค่าแบบทดสอบ</h2><div id="summary"></div></aside></div>';
    summary();
  }
  function summary() {
    const g=groups[selected];
    document.getElementById('summary').innerHTML='<div class="field"><span>▣ วิชา</span><strong>'+esc(g?.subject||'—')+'</strong></div><div class="field"><span>☷ หัวข้อ</span><strong>'+esc(g?.topic||'ยังไม่ได้เลือก')+'</strong></div>'+
      '<label class="field">จำนวนข้อ<select id="count">'+[10,20].map(n=>'<option '+(n===count?'selected':'')+'>'+n+'</option>').join('')+'</select></label>'+
      '<label class="field">ระดับความยาก<select id="difficulty">'+['ง่าย','ปานกลาง','ยาก'].map(d=>'<option '+(d===difficulty?'selected':'')+'>'+d+'</option>').join('')+'</select></label>'+
      '<div class="field"><span>◷ เวลาทำข้อสอบ</span><b>'+count*1.5+' นาที</b></div><div class="divider">'+button('start','▶ เริ่มทำแบบทดสอบ →','primary wide',g?'':'disabled')+button('clear','↶ ล้างการเลือก','secondary wide')+'</div><p class="criteria">สุ่มข้อสอบใหม่จากหัวข้อและระดับที่เลือก<br>คะแนน: ต่ำกว่า 50% ควรปรับปรุง · 50–59% พอใช้ · 60–69% ปานกลาง · 70–79% ดี · 80–89% ดีมาก · 90–100% ดีเยี่ยม</p>';
  }
  function start(confirmed=false) {
    if(selected===null)return;
    if(draft()&&!confirmed){
      ask('เริ่มแบบทดสอบชุดใหม่?', 'คุณมีแบบทดสอบที่ยังทำไม่เสร็จ หากเริ่มชุดใหม่ คำตอบที่บันทึกไว้ของชุดเดิมจะถูกแทนที่', 'เริ่มชุดใหม่', ()=>start(true));
      return;
    }
    const g=groups[selected];
    const ids=data.map((q,i)=>q.subject===g.subject&&q.topic===g.topic&&q.difficulty===difficulty?i:-1).filter(i=>i>=0);
    for(let i=ids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]];}
    const started=Date.now();
    active={...g,difficulty,ids:ids.slice(0,count),answers:Array(count).fill(null),index:0,started,deadline:started+count*90*1000,id:String(started)+'-'+Math.random().toString(36).slice(2)};
    write(DRAFT,active); run();
  }
  function run() {
    stop(); app.className='runner'; renderQuestion(); tick(); if(active) interval=setInterval(tick,1000);
  }
  function renderQuestion() {
    if(!active)return;
    const a=active,q=data[a.ids[a.index]], n=a.ids.length, answered=a.answers.filter(Boolean).length;
    app.innerHTML=button('leave','← กลับไปเลือกหัวข้อ','back')+
      '<div class="layout"><section><div class="card metadata"><div><small>วิชา</small><strong>'+esc(a.subject)+'</strong></div><div><small>หัวข้อ</small><strong>'+esc(a.topic)+'</strong></div><div><small>จำนวนข้อ</small><strong>'+n+' ข้อ</strong></div><div><small>เวลา</small><strong>'+n*1.5+' นาที</strong></div></div>'+
      '<div class="progress-line"><span>ตอบแล้ว '+answered+' จาก '+n+' ข้อ</span><progress max="'+n+'" value="'+answered+'" aria-label="จำนวนข้อที่ตอบแล้ว"></progress><b>'+Math.round(answered/n*100)+'%</b></div>'+
      '<section class="card question"><span class="badge">ข้อ '+(a.index+1)+' จาก '+n+' · '+esc(a.difficulty)+'</span><h1 tabindex="-1" id="question-title">ข้อ '+(a.index+1)+' : '+esc(q.question)+'</h1><div role="radiogroup" aria-labelledby="question-title">'+Object.entries(q.choices).map(([key,value])=>'<label class="choice"><input type="radio" name="answer" value="'+esc(key)+'" '+(a.answers[a.index]===key?'checked':'')+'><span><b>'+esc(key)+'.</b> '+esc(value)+'</span></label>').join('')+'</div>'+
      '<div class="actions">'+button('previous','← ข้อก่อนหน้า','secondary',a.index===0?'disabled':'')+button('next','ข้อถัดไป →','soft',a.index===n-1?'disabled':'')+'</div></section></section>'+
      '<aside><div class="card timer"><span class="clock">◷</span><div><small>เวลาที่เหลือ</small><strong id="timer"></strong></div></div><section class="card"><h3>☷ แผนผังข้อสอบ</h3><div class="numbers">'+a.ids.map((_,i)=>'<button class="number '+(a.answers[i]?'answered ':'')+(a.index===i?'current':'')+'" data-index="'+i+'" aria-label="ข้อ '+(i+1)+(a.answers[i]?' ตอบแล้ว':' ยังไม่ได้ตอบ')+'" '+(a.index===i?'aria-current="step"':'')+'>'+(i+1)+'</button>').join('')+'</div><div class="legend"><span><i class="dot purple"></i>ข้อปัจจุบัน</span><span><i class="dot"></i>ยังไม่ได้ตอบ</span><span><i class="dot green"></i>ตอบแล้ว</span></div></section>'+
      '<div class="controls">'+button('save','▣ บันทึกคำตอบ','primary wide')+'<div class="divider">'+button('submit','➤ ส่งคำตอบ','secondary wide')+'</div><p class="criteria">บันทึกอัตโนมัติเมื่อเลือกคำตอบ<br>หมดเวลาแล้วระบบจะส่งคำตอบทันที</p></div></aside></div>';
    updateClock();
  }
  function updateClock() { const el=document.getElementById('timer'); if(el&&active){const seconds=Math.max(0,Math.ceil((active.deadline-Date.now())/1000));el.textContent=time(seconds);el.closest('.timer').classList.toggle('urgent',seconds<=60);} }
  function tick() { if(active&&Date.now()>=active.deadline)finish(true);else updateClock(); }
  function finish(expired=false,confirmed=false) {
    if(!active)return;
    const unanswered=active.answers.filter(x=>!x).length;
    if(!expired&&!confirmed){
      ask(unanswered?'ยังเหลืออีก '+unanswered+' ข้อ':'พร้อมดูผลสอบแล้วหรือยัง?', unanswered?'คุณยังไม่ได้ตอบ '+unanswered+' ข้อ สามารถกลับไปทำต่อ หรือส่งคำตอบตอนนี้ได้ โดยข้อที่ไม่ได้ตอบจะไม่ได้คะแนน':'ส่งคำตอบเพื่อดูคะแนน เวลาที่ใช้ และเฉลย หลังส่งแล้วจะไม่สามารถแก้คำตอบชุดนี้ได้', 'ส่งคำตอบ', ()=>finish(Date.now()>=active.deadline,true));
      return;
    }
    if(dialog.open)dismissDialog();
    stop();
    result={...active,finished:Math.min(Date.now(),active.deadline),expired};
    const records=history();
    if(!records.some(r=>r.id===result.id))records.unshift(result);
    const saved=write(HISTORY,records);
    if(saved)removeDraft();
    active=null; showResult(result);
    if(!saved)notify('บันทึกประวัติไม่สำเร็จ กรุณาดาวน์โหลดผลสอบ');
  }
  function showResult(a) {
    stop(); result=a; app.className='';
    const points=score(a),total=a.ids.length,percent=points/total*100;
    app.innerHTML='<section class="card result result-'+ratingClass(percent)+'"><span class="badge">ทำแบบทดสอบเสร็จแล้ว'+(a.expired?' · หมดเวลา':'')+'</span><h1>'+esc(a.topic)+'</h1><p class="muted">'+esc(a.subject)+' · '+esc(a.difficulty)+'</p><div class="score-orbit" style="--progress:'+percent+'%"><div class="score-core"><small>คะแนนที่ได้</small><div class="score">'+points+' / '+total+'</div><span>'+Math.round(percent)+'%</span></div></div><h2 class="rating-label">'+rating(percent)+'</h2><p class="result-caption">ทุกครั้งที่ฝึก คืออีกก้าวของความเข้าใจ</p><div class="stats"><div><small>ตอบถูก</small><strong>'+points+' ข้อ</strong></div><div><small>ตอบผิด</small><strong>'+a.ids.filter((id,i)=>a.answers[i]&&a.answers[i]!==data[id].correct_answer).length+' ข้อ</strong></div><div><small>ไม่ได้ตอบ</small><strong>'+a.answers.filter(x=>!x).length+' ข้อ</strong></div><div><small>เวลาที่ใช้</small><strong>'+time((a.finished-a.started)/1000)+'</strong></div></div><p class="criteria">ต่ำกว่า 50% ควรปรับปรุง · 50–59% พอใช้ · 60–69% ปานกลาง · 70–79% ดี · 80–89% ดีมาก · 90–100% ดีเยี่ยม</p><div class="actions">'+button('library','← ย้อนกลับ')+button('retry','↻ ทำใหม่','primary')+button('review','ดูคำตอบและเฉลย','soft')+button('history','ประวัติแบบทดสอบ')+button('download','ดาวน์โหลดผลสอบ')+'</div></section><section id="review" hidden></section>';
    window.scrollTo(0,0);
  }
  function review() {
    const area=document.getElementById('review');
    area.hidden=!area.hidden;
    if(area.hidden)return;
    area.innerHTML='<h2>คำตอบของคุณและเฉลย</h2>'+result.ids.map((id,i)=>{
      const q=data[id],answer=result.answers[i],correct=answer===q.correct_answer;
      return '<article class="card review-item '+(correct?'correct':'')+'"><span class="badge">ข้อ '+(i+1)+' · '+(correct?'✓ ถูก':answer?'✕ ผิด':'— ไม่ได้ตอบ')+'</span><h3>'+esc(q.question)+'</h3>'+Object.entries(q.choices).map(([key,value])=>'<div class="review-choice '+(key===q.correct_answer?'right':key===answer?'wrong':'')+'">'+esc(key)+'. '+esc(value)+(key===answer?' <b>← คุณตอบ</b>':'')+(key===q.correct_answer?' <b>✓ คำตอบที่ถูก</b>':'')+'</div>').join('')+'<p><b>คำอธิบาย:</b> '+esc(q.explanation)+'</p></article>';
    }).join('');
    area.scrollIntoView({behavior:'smooth'});
  }
  function showHistory() {
    stop();app.className='';
    const records=history();
    app.innerHTML=button('library','← กลับไปเลือกหัวข้อ','back')+'<h1>ประวัติการทำแบบทดสอบ</h1><p class="muted">บันทึกไว้ในเบราว์เซอร์เครื่องนี้ · เปิดดูคำตอบ คะแนน และเวลาที่ใช้ได้ทุกครั้ง</p>'+
      (records.length?records.map((a,i)=>'<article class="card history-item"><div><h2>'+esc(a.topic)+'</h2><p>'+esc(a.subject)+' · '+esc(a.difficulty)+'</p><small>'+new Date(a.finished).toLocaleString('th-TH')+' · ใช้เวลา '+time((a.finished-a.started)/1000)+'</small></div><div><h2>'+score(a)+' / '+a.ids.length+' · <span class="rating-text result-'+ratingClass(score(a)/a.ids.length*100)+'">'+rating(score(a)/a.ids.length*100)+'</span></h2>'+button('open-result','ดูผลและคำตอบ','soft','data-record="'+i+'"')+'</div></article>').join(''):'<div class="card empty">ยังไม่มีประวัติการทำแบบทดสอบ<br><p class="muted">เริ่มทำข้อสอบชุดแรก แล้วกลับมาดูพัฒนาการได้ที่นี่</p></div>');
  }
  app.addEventListener('change',e=>{
    const el=e.target;
    if(el.name==='topic'){selected=Number(el.value);summary();}
    if(el.id==='count'){count=Number(el.value);summary();}
    if(el.id==='difficulty'){difficulty=el.value;}
    if(el.name==='answer'&&active){if(Date.now()>=active.deadline){finish(true);return;}active.answers[active.index]=el.value;write(DRAFT,active);const focusValue=el.value;renderQuestion();app.querySelector('input[name="answer"][value="'+focusValue+'"]')?.focus();}
  });
  app.addEventListener('click',e=>{
    const el=e.target.closest('button');if(!el)return;
    if(active&&Date.now()>=active.deadline){finish(true);return;}
    if(el.dataset.index!==undefined&&active){active.index=Number(el.dataset.index);write(DRAFT,active);renderQuestion();return;}
    switch(el.dataset.action){
      case 'library':library();break;
      case 'start':start();break;
      case 'clear':selected=null;library();break;
      case 'history':showHistory();break;
      case 'resume':active=draft();if(active)run();break;
      case 'leave':write(DRAFT,active);library();notify('บันทึกคำตอบแล้ว เวลายังคงเดินต่อ สามารถกลับมาทำต่อได้');break;
      case 'save':if(write(DRAFT,active))notify('บันทึกคำตอบแล้ว');break;
      case 'previous':case 'next':active.index+=el.dataset.action==='next'?1:-1;write(DRAFT,active);renderQuestion();document.getElementById('question-title').focus();break;

      case 'submit':finish();break;
      case 'review':review();break;
      case 'retry':selected=groups.findIndex(g=>g.subject===result.subject&&g.topic===result.topic);difficulty=result.difficulty;count=result.ids.length;start();break;
      case 'open-result':showResult(history()[Number(el.dataset.record)]);break;
      case 'download':{
        const payload={...result,score:score(result),rating:rating(score(result)/result.ids.length*100),elapsed_seconds:Math.floor((result.finished-result.started)/1000),questions:result.ids.map((id,i)=>({...data[id],your_answer:result.answers[i]}))};
        const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
        const link=document.createElement('a');link.href=url;link.download='ผลแบบทดสอบ-'+result.id+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);break;
      }
    }
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
  library();
  const pending=draft();
  if(pending&&Date.now()>=pending.deadline&&!requested.has('topic')){active=pending;finish(true);}
  if(requestedGroup>=0 && requested.get('start')==='1')start();
})();
