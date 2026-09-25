(() => {
  'use strict';
  const lessons = {
    'ฟังชันท์1':['ฟังก์ชัน','line','ฟังก์ชันรับค่า x หนึ่งค่า แล้วให้ผลลัพธ์ y เพียงค่าเดียว','ตรวจโดเมนก่อนแทนค่าเสมอ|f(g(x)) ต้องทำ g ก่อน f|ฟังก์ชันผกผันไม่ใช่ 1/f(x)'],
    'เมทริค1':['เมทริกซ์','matrix','เมทริกซ์ช่วยจัดข้อมูลและแปลงตำแหน่งจุดอย่างเป็นระบบ','บวกได้เมื่อมิติเท่ากัน|คูณได้เมื่อจำนวนหลักตัวหน้าเท่าจำนวนแถวตัวหลัง|เมทริกซ์ผกผันมีได้เมื่อดีเทอร์มิแนนต์ไม่เป็นศูนย์'],
    'จำนวนเชิงซ้อน':['จำนวนเชิงซ้อน','complex','มอง a+bi เป็นจุด (a,b) บนระนาบ โดยแกนนอนเป็นส่วนจริงและแกนตั้งเป็นส่วนจินตภาพ','i²=−1|ขนาดของ a+bi คือ √(a²+b²)|สังยุคของ a+bi คือ a−bi'],
    'ตรรกศาสตร์':['ตรรกศาสตร์','logic','ประพจน์เป็นข้อความที่ตัดสินได้ว่าจริงหรือเท็จ','p∧q จริงเมื่อทั้งคู่จริง|p∨q เท็จเมื่อทั้งคู่เท็จ|p→q เท็จเฉพาะกรณีจริงไปเท็จ'],
    'ตรรกศาสตร์เบื้องต้น':['ตรรกศาสตร์เบื้องต้น','logic','เริ่มจากค่าความจริงของข้อความ แล้วจึงพิจารณาตัวเชื่อม','ปฏิเสธทำให้ค่าความจริงกลับกัน|และ ต้องจริงทั้งคู่|หรือ ต้องจริงอย่างน้อยหนึ่งข้อความ'],
    'ฟังก์ชันตรีโกณมิติ':['ฟังก์ชันตรีโกณมิติ','wave','คลื่นไซน์ขึ้นลงซ้ำ ๆ ความสูงของคลื่นและตำแหน่งเริ่มต้นปรับได้','sin²x+cos²x=1|sin และ cos มีคาบ 2π เรเดียน|ตรวจหน่วยองศาหรือเรเดียนและเครื่องหมายในควอดแรนต์'],
    'เวกเตอร์ในสามมิติ':['เวกเตอร์ในสามมิติ','vector','เวกเตอร์มีทั้งขนาดและทิศทาง ลากหมุนภาพเพื่อดูส่วนประกอบทั้งสามแกน','AB=B−A|ขนาด (x,y,z) คือ √(x²+y²+z²)|ดอตโปรดักต์เป็นศูนย์หมายถึงตั้งฉากเมื่อเวกเตอร์ไม่เป็นศูนย์'],
    'จำนวนจริงและพหุนาม':['จำนวนจริงและพหุนาม','parabola','พาราโบลาเป็นภาพของพหุนามดีกรีสอง จุดตัดแกน X คือรากจริงของสมการ','แยกตัวประกอบเพื่อหาราก|คูณหรือหารอสมการด้วยจำนวนลบต้องกลับเครื่องหมาย|เศษจากการหาร f(x) ด้วย x−r คือ f(r)'],
    'ลำดับและอนุกรม':['ลำดับและอนุกรม','sequence','ลำดับคือค่าทีละตำแหน่ง ส่วนอนุกรมคือผลบวกของค่าเหล่านั้น','เลขคณิตมีผลต่างร่วมคงที่|เรขาคณิตมีอัตราส่วนร่วมคงที่|อนุกรมเรขาคณิตอนันต์ใช้ได้เมื่อค่าสัมบูรณ์ของ r น้อยกว่า 1'],
    'แคลคูลัสเบื้องต้น':['แคลคูลัสเบื้องต้น','calculus','อนุพันธ์บอกความชัน ณ จุดหนึ่ง ลองขยับจุดแล้วสังเกตเส้นสัมผัส','ลิมิตคือค่าที่เข้าใกล้|อนุพันธ์บอกอัตราการเปลี่ยนแปลง|ปริพันธ์จำกัดเขตให้พื้นที่แบบมีเครื่องหมาย'],
    'เรขาคณิตวิเคราะห์':['เรขาคณิตวิเคราะห์','parabola','ใช้สมการอธิบายรูปร่างบนระนาบ ลองเลื่อนจุดยอดของพาราโบลา','ระยะระหว่างจุดใช้ทฤษฎีพีทาโกรัส|ความชัน=(y₂−y₁)/(x₂−x₁) เมื่อ x₂≠x₁|อ่านจุดศูนย์กลางหรือจุดยอดจากรูปมาตรฐาน'],
    'เซต':['เซต','sets','เซตรวบรวมสมาชิกโดยไม่สนลำดับและไม่นับสมาชิกซ้ำ','ยูเนียนรวมสมาชิกทั้งสองเซต|อินเตอร์เซกชันเลือกสมาชิกที่อยู่ทั้งสองเซต|n(A∪B)=n(A)+n(B)−n(A∩B)'],
    'สถิติ':['สถิติ','statistics','ค่ากลางสรุปข้อมูลได้ต่างมุม ลองเพิ่มค่าสุดท้ายเพื่อดูผลต่อค่าเฉลี่ย','ค่าเฉลี่ย=ผลรวม/จำนวนข้อมูล|มัธยฐานต้องเรียงข้อมูลก่อน|ข้อมูลสุดโต่งกระทบค่าเฉลี่ยมากกว่ามัธยฐาน'],
    'หลักการนับเบื้องต้น':['หลักการนับเบื้องต้น','counting','ถ้างานมีหลายขั้น ให้คูณจำนวนทางเลือกแต่ละขั้น','ทางเลือกแยกกรณีใช้การบวก|หลายขั้นต่อกันใช้การคูณ|เรียงสับเปลี่ยนสนลำดับ แต่จัดหมู่ไม่สนลำดับ'],
    'การแจกแจงความน่าจะเป็นเบื้องต้น':['การแจกแจงความน่าจะเป็นเบื้องต้น','distribution','ความน่าจะเป็นแจกแจงว่าแต่ละผลลัพธ์เกิดบ่อยเพียงใด','ความน่าจะเป็นแต่ละค่าอยู่ระหว่าง 0 กับ 1|ผลรวมความน่าจะเป็นเท่ากับ 1|ค่าคาดหมายคือผลรวมของค่า × ความน่าจะเป็น'],
    'ฟังก์ชันเอกซ์โพเนเชียว และ ฟังก์ชันลอการิทึม':['ฟังก์ชันเอกซ์โพเนนเชียลและฟังก์ชันลอการิทึม','exponential','เอกซ์โพเนนเชียลเติบโตตามอัตราส่วน ส่วนลอการิทึมถามย้อนว่าเลขชี้กำลังเป็นเท่าไร','ฐานต้องเป็นบวกและไม่เท่ากับ 1|logₐx=y หมายถึง aʸ=x|จำนวนภายใน log ต้องมากกว่า 0'],
    'เลขยกกำลัง':['เลขยกกำลัง','exponential','ฐานเดียวกันคูณกันให้นำเลขชี้กำลังมาบวก','aᵐaⁿ=aᵐ⁺ⁿ|a⁰=1 เมื่อ a≠0|a⁻ⁿ=1/aⁿ เมื่อ a≠0'],
    'ความน่าจะเป็น':['ความน่าจะเป็น','distribution','กรณีที่ผลลัพธ์มีโอกาสเท่ากัน ความน่าจะเป็นคือจำนวนผลที่ต้องการหารด้วยจำนวนผลทั้งหมด','0≤P(A)≤1|P(Aᶜ)=1−P(A)|เหตุการณ์อิสระมี P(A∩B)=P(A)P(B)'],
    'ดอกเบี้ยและมูลค่าของเงิน':['ดอกเบี้ยและมูลค่าของเงิน','interest','ดอกเบี้ยทบต้นเพิ่มทั้งเงินต้นและดอกเบี้ยสะสม จึงโตเป็นเส้นโค้ง','ดอกเบี้ยอย่างง่ายคิดจากเงินต้นเดิม|ทบต้นใช้ A=P(1+r)ⁿ เมื่อ r เป็นอัตราต่องวด|ต้องใช้หน่วยเวลาและอัตราดอกเบี้ยให้ตรงกัน']
  };
  const file=decodeURIComponent(location.pathname.split('/').pop()).replace(/\.html$/,'');
  const lesson=lessons[file],content=document.querySelector('.landing-page > .container > .content');
  if(!lesson||!content)return;
  const [topic,kind,intro,summary]=lesson;
  const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const css=document.createElement('link');css.rel='stylesheet';css.href='../CSS/lesson-lab.css';document.head.appendChild(css);
  const panel=document.createElement('section');panel.className='lesson-lab';
  const graphKinds=['line','wave','parabola','calculus','vector','complex','matrix','exponential','interest','sequence'];
  const graph=graphKinds.includes(kind);
  const configs={
    line:['ความชัน a',-3,3,.1,1,'จุดตัดแกน Y: b',-3,3,.1,0],
    wave:['ความสูง A',.5,3,.1,1,'เลื่อนคลื่น h (เรเดียน)',-3,3,.1,0],
    parabola:['จุดยอดแนวนอน h',-3,3,.1,0,'จุดยอดแนวตั้ง k',-3,3,.1,0],
    calculus:['ตำแหน่งจุดสัมผัส x',-2,2,.1,1,'เลื่อนกราฟแนวตั้ง k',-2,2,.1,0],
    vector:['ส่วนประกอบ X',-3,3,.1,2,'ส่วนประกอบ Y',-3,3,.1,2],
    complex:['ส่วนจริง a',-3,3,.1,2,'ส่วนจินตภาพ b',-3,3,.1,1],
    matrix:['ขยายแกน X',.5,3,.1,1,'ขยายแกน Y',.5,3,.1,1],
    exponential:['ฐาน a',1.1,3,.1,2,'เลื่อนแนวตั้ง k',-2,2,.1,0],
    interest:['ดอกเบี้ยต่องวด (%)',0,20,1,5,'เงินต้น (พันบาท)',1,3,.1,1],
    sequence:['พจน์แรก',-2,2,.1,1,'ผลต่างร่วม',-.5,.5,.1,.3],
    statistics:['ข้อมูลตัวสุดท้าย',1,20,1,5,'ข้อมูลตัวแรก',1,10,1,2],
    counting:['ตัวเลือกขั้นแรก',1,5,1,3,'ตัวเลือกขั้นที่สอง',1,5,1,2],
    distribution:['จำนวนครั้งที่โยนเหรียญ',1,8,1,4,'โอกาสออกหัว',.1,.9,.1,.5],
    sets:['สมาชิกใน A ตั้งแต่ 1 ถึง',1,8,1,4,'สมาชิกใน B ตั้งแต่ 4 ถึง',4,10,1,7],
    logic:['p: 0 เท็จ / 1 จริง',0,1,1,1,'q: 0 เท็จ / 1 จริง',0,1,1,0]
  };
  const c=configs[kind];
  const slider=(id,label,min,max,step,value)=>'<label>'+label+' <output id="'+id+'-value">'+value+'</output><input id="'+id+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'"></label>';
  panel.innerHTML='<span class="lab-kicker">ลองปรับ แล้วสังเกต</span><h3>เข้าใจ '+esc(topic)+' ผ่านภาพ</h3><p>'+esc(intro)+'</p><div class="lab-layout"><div><canvas tabindex="0" aria-label="ภาพประกอบบทเรียน ใช้ตัวปรับค่าด้านข้างเพื่อเปลี่ยนภาพ"></canvas><p class="lab-help">'+(graph?'ลากเพื่อหมุนภาพ · ปุ่มมุมมองตรงช่วยอ่านค่า X/Y · กราฟสองมิติวางบนระนาบ z=0':'ปรับค่าด้านข้าง แล้วดูผลลัพธ์และคำอธิบายด้านล่าง')+'</p></div><div class="lab-controls">'+slider('lab-a',...c.slice(0,5))+slider('lab-b',...c.slice(5))+(graph?slider('lab-x','เลื่อนมุมมองแกน X',-3,3,.1,0)+slider('lab-y','เลื่อนมุมมองแกน Y',-3,3,.1,0)+slider('lab-zoom','ขยายภาพ',25,65,1,42)+'<button type="button" data-view="front">มุมมองตรง X/Y</button><button type="button" data-view="3d">มุมมอง 3 มิติ</button>':'')+'<button type="button" data-view="reset">คืนค่าเริ่มต้น</button></div></div><p class="lab-observation" role="status" aria-live="polite"></p>';
  const first=content.querySelector('section');content.insertBefore(panel,first);
  let subject=new URLSearchParams(location.search).get('subject');
  if(!['คณิตศาสตร์ประยุกต์ 1','คณิตศาสตร์ประยุกต์ 2'].includes(subject))subject=['เลขยกกำลัง','ตรรกศาสตร์เบื้องต้น','ความน่าจะเป็น','ดอกเบี้ยและมูลค่าของเงิน'].includes(topic)?'คณิตศาสตร์ประยุกต์ 2':'คณิตศาสตร์ประยุกต์ 1';
  const end=document.createElement('section');end.className='lesson-recap';
  end.innerHTML='<span class="lab-kicker">ทบทวนก่อนทำข้อสอบ</span><h3>สรุป '+esc(topic)+'</h3><ul>'+summary.split('|').map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul><p>พร้อมแล้ว ลองใช้ความเข้าใจนี้ทำแบบทดสอบเฉพาะบท</p><a target="_top" href="./แบบทดสอบ.html?'+new URLSearchParams({subject,topic,start:'1'})+'">เริ่มทำแบบทดสอบเรื่องนี้ →</a>';
  content.appendChild(end);
  const canvas=panel.querySelector('canvas'),ctx=canvas.getContext('2d');
  const inputs=[...panel.querySelectorAll('input')];
  let yaw=0,pitch=0,width=600,height=330,drag=null;
  const get=id=>Number(panel.querySelector('#lab-'+id)?.value||0);
  function point(x,y,z=0){
    x-=get('x');y-=get('y');
    const u=x*Math.cos(yaw)-z*Math.sin(yaw),depth=x*Math.sin(yaw)+z*Math.cos(yaw);
    return [width/2+u*(get('zoom')||42),height/2-(y*Math.cos(pitch)-depth*Math.sin(pitch))*(get('zoom')||42)];
  }
  function line(points,color='#6c63ff',weight=2){ctx.beginPath();points.forEach((p,i)=>{const v=point(...p);i?ctx.lineTo(...v):ctx.moveTo(...v)});ctx.strokeStyle=color;ctx.lineWidth=weight;ctx.stroke();}
  function text(s,x,y,color='#393653'){ctx.fillStyle=color;ctx.font='13px Tahoma';ctx.fillText(s,x,y);}
  function draw(){
    const a=get('a'),b=get('b');let info='';
    inputs.forEach(input=>panel.querySelector('#'+input.id+'-value').textContent=input.value);
    ctx.clearRect(0,0,width,height);ctx.fillStyle='#fafaff';ctx.fillRect(0,0,width,height);
    if(graph){
      for(let i=-6;i<=6;i++){line([[i,-6,0],[i,6,0]],'#e8e7f5',1);line([[-6,i,0],[6,i,0]],'#e8e7f5',1);}
      line([[-6,0,0],[6,0,0]],'#9994b5',1.5);line([[0,-6,0],[0,6,0]],'#9994b5',1.5);
      text('X',...point(5.8,0));text('Y',...point(0,3.5));
      for(let i=-3;i<=3;i++){if(i){let p=point(i,0);text(String(i),p[0],p[1]+16);p=point(0,i);text(String(i),p[0]+5,p[1]);}}
      if(kind==='vector'||kind==='complex'){const z=kind==='vector'?2:0;if(z){line([[0,0,-3],[0,0,3]],'#9994b5');text('Z',...point(0,0,3));}line([[0,0,0],[a,b,z]],'#6c63ff',4);const p=point(a,b,z);ctx.beginPath();ctx.arc(...p,6,0,Math.PI*2);ctx.fillStyle='#6c63ff';ctx.fill();info=kind==='vector'?'เวกเตอร์ ('+a+', '+b+', 2) มีขนาด '+Math.hypot(a,b,2).toFixed(2):'z = '+a+' + ('+b+')i มีขนาด '+Math.hypot(a,b).toFixed(2);}
      else if(kind==='matrix'){line([[0,0],[1,0],[1,1],[0,1],[0,0]],'#aaa5c9');line([[0,0],[a,0],[a,b],[0,b],[0,0]],'#6c63ff',3);info='เมทริกซ์แนวทแยง ['+a+', 0; 0, '+b+'] แปลงสี่เหลี่ยมหน่วยเป็นกว้าง '+a+' สูง '+b+' พื้นที่ = '+(a*b).toFixed(2);}
      else {
        const f=x=>kind==='line'?a*x+b:kind==='wave'?a*Math.sin(x-b):kind==='parabola'?(x-a)**2+b:kind==='calculus'?x*x+b:kind==='exponential'?a**x+b:kind==='interest'?b*(1+a/100)**x:a+(x-1)*b;
        if(kind==='sequence'){for(let n=1;n<=6;n++){const p=point(n,f(n));ctx.beginPath();ctx.arc(...p,4,0,Math.PI*2);ctx.fillStyle='#6c63ff';ctx.fill();}info='ลำดับเลขคณิต aₙ = '+a+' + (n−1)('+b+') แสดงเป็นจุด เพราะ n เป็นจำนวนเต็มบวก';}
        else {let path=[];for(let x=-6;x<=6;x+=.03){const y=f(x);if(Math.abs(y)<12&&(kind!=='interest'||x>=0))path.push([x,y]);else if(path.length){line(path);path=[];}}if(path.length)line(path);
        info=kind==='wave'?'y = '+a+' sin(x − '+b+') ความสูงคลื่น '+a+' คาบ 2π เรเดียน':kind==='parabola'?'y = (x − '+a+')² + '+b+' จุดยอด ('+a+', '+b+')':kind==='line'?'y = '+a+'x + '+b+' เมื่อ x=1 ได้ y='+(a+b).toFixed(2):kind==='exponential'?'y = '+a+'ˣ + '+b:kind==='interest'?'แกน X = งวด แกน Y = พันบาท เงินหลัง 5 งวด = '+(f(5)*1000).toFixed(2)+' บาท':'y = x² + '+b+' ที่ x='+a+' ความชัน f′(x)=2x = '+(2*a).toFixed(2);
        if(kind==='calculus'){line([[-4,2*a*(-4-a)+f(a)],[4,2*a*(4-a)+f(a)]],'#aaa5c9',2);const p=point(a,f(a));ctx.beginPath();ctx.arc(...p,5,0,Math.PI*2);ctx.fillStyle='#6c63ff';ctx.fill();}}
      }
    }else{
      let values=[];
      if(kind==='logic'){const rows=[['p',!!a],['q',!!b],['p ∧ q',!!(a&&b)],['p ∨ q',!!(a||b)],['p → q',!!(!a||b)]];rows.forEach((r,i)=>{text(r[0],40,45+i*52);text(r[1]?'จริง':'เท็จ',width/2,45+i*52,r[1]?'#6c63ff':'#777');});info='p→q จะเท็จเฉพาะ p จริง และ q เท็จ ลองเลื่อนค่า 0 และ 1 เพื่อเทียบผล';}
      if(kind==='sets'){const A=Array.from({length:a},(_,i)=>i+1),B=Array.from({length:b-3},(_,i)=>i+4);ctx.fillStyle='#6c63ff22';for(const x of [width/2-55,width/2+55]){ctx.beginPath();ctx.arc(x,145,90,0,Math.PI*2);ctx.fill();}text('A',width/2-110,60);text('B',width/2+100,60);text(A.filter(x=>!B.includes(x)).join(', '),width/2-125,150);text(A.filter(x=>B.includes(x)).join(', '),width/2-25,175);text(B.filter(x=>!A.includes(x)).join(', '),width/2+65,150);info='A={'+A+'}, B={'+B+'} ส่วนร่วม A∩B={'+A.filter(x=>B.includes(x))+'}';}
      if(kind==='counting'){for(let i=0;i<a;i++)for(let j=0;j<b;j++){ctx.fillStyle='#6c63ff';ctx.fillRect(40+i*48,30+j*48,32,32);}info='แต่ละช่องแทนหนึ่งคู่ทางเลือก รวม '+a+' × '+b+' = '+a*b+' วิธี';}
      if(kind==='statistics'){values=[b,3,4,4,a];info='ข้อมูล '+values.join(', ')+' ค่าเฉลี่ย = '+(values.reduce((s,n)=>s+n,0)/5).toFixed(2)+' มัธยฐาน = '+[...values].sort((x,y)=>x-y)[2];}
      if(kind==='distribution'){const factorial=n=>n<2?1:n*factorial(n-1);values=Array.from({length:a+1},(_,k)=>factorial(a)/factorial(k)/factorial(a-k)*b**k*(1-b)**(a-k));info='ทวินาม: โยนเหรียญอิสระ '+a+' ครั้ง โอกาสหัว '+b+' แกน X = จำนวนหัว แกน Y = ความน่าจะเป็น ผลรวม = '+values.reduce((s,n)=>s+n,0).toFixed(2);}
      if(values.length){const max=kind==='distribution'?1:20;values.forEach((v,i)=>{const w=(width-80)/values.length,h=v/max*235;ctx.fillStyle='#6c63ff';ctx.fillRect(40+i*w,275-h,w-12,h);text(kind==='distribution'?v.toFixed(3):String(v),40+i*w,265-h);text(String(kind==='distribution'?i:i+1),40+i*w,299);});}
    }
    panel.querySelector('.lab-observation').textContent=info;
  }
  const resize=()=>{width=Math.max(240,canvas.getBoundingClientRect().width);height=330;const dpr=devicePixelRatio||1;canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();};
  inputs.forEach(input=>input.addEventListener('input',draw));
  panel.addEventListener('click',e=>{const action=e.target.dataset.view;if(!action)return;yaw=action==='3d'?.55:0;pitch=action==='3d'?.35:0;if(action==='reset')inputs.forEach(input=>input.value=input.defaultValue);draw();});
  if(graph){
    canvas.style.touchAction='none';
    canvas.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener('pointermove',e=>{if(!drag)return;yaw+=(e.clientX-drag[0])*.008;pitch=Math.max(-1.2,Math.min(1.2,pitch+(e.clientY-drag[1])*.008));drag=[e.clientX,e.clientY];draw();});
    for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>drag=null);
    canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();yaw+=e.key==='ArrowLeft'?-.1:e.key==='ArrowRight'?.1:0;pitch=Math.max(-1.2,Math.min(1.2,pitch+(e.key==='ArrowUp'?.1:e.key==='ArrowDown'?-.1:0)));draw();});
  }
  new ResizeObserver(resize).observe(canvas);resize();
})();
