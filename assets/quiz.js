// <div class="quiz" data-q="Question?" data-a="Right" data-w="Wrong1|Wrong2" data-why="Explanation"></div>
document.querySelectorAll('.quiz').forEach((el,n)=>{
  const opts=[el.dataset.a,...el.dataset.w.split('|')].sort((a,b)=>(a.charCodeAt(1)*7+n)%5-(b.charCodeAt(1)*7+n)%5);
  el.innerHTML='<strong></strong>';el.firstChild.textContent=el.dataset.q;
  const fb=document.createElement('p');fb.className='fb';
  opts.forEach(o=>{const b=document.createElement('button');b.textContent=o;
    b.onclick=()=>{if(o===el.dataset.a){b.className='right';fb.textContent='Correct. '+el.dataset.why}
      else{b.className='wrong';fb.textContent='Not quite. Try another answer.'}};el.appendChild(b)});
  el.appendChild(fb);
});
