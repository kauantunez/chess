// <div class="drill" data-piece="R" data-at="d4"></div>  Tap every square the piece can move to on an empty board, then Check.
const GL={K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙'},DIRS={R:[[1,0],[-1,0],[0,1],[0,-1]],B:[[1,1],[1,-1],[-1,1],[-1,-1]]};
DIRS.Q=[...DIRS.R,...DIRS.B];DIRS.K=DIRS.Q;
const KN=[[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];
const nm=(f,r)=>'abcdefgh'[f]+(r+1);
function legal(p,at,en){const f0='abcdefgh'.indexOf(at[0]),r0=+at[1]-1,out=new Set();
  if(p==='N'){for(const [df,dr] of KN){const f=f0+df,r=r0+dr;if(f>=0&&f<8&&r>=0&&r<8)out.add(nm(f,r))}return out}
  if(p==='P'){const one=nm(f0,r0+1);if(!en.has(one)){out.add(one);if(r0===1&&!en.has(nm(f0,3)))out.add(nm(f0,3))}
    for(const df of [-1,1]){const f=f0+df;if(f>=0&&f<8&&en.has(nm(f,r0+1)))out.add(nm(f,r0+1))}return out}
  for(const [df,dr] of DIRS[p]){let f=f0+df,r=r0+dr;
    while(f>=0&&f<8&&r>=0&&r<8){out.add(nm(f,r));if(p==='K')break;f+=df;r+=dr}}return out}
document.querySelectorAll('.drill').forEach(el=>{
  const p=el.dataset.piece,at=el.dataset.at,en=new Set((el.dataset.enemies||'').split(',').filter(Boolean)),ans=legal(p,at,en),sel=new Set(),cells={};
  const board=document.createElement('div');board.className='board';
  for(let r=7;r>=0;r--)for(let f=0;f<8;f++){const s=nm(f,r),b=document.createElement('button');
    b.className=(r+f)%2?'l':'d';b.setAttribute('aria-label',s);cells[s]=b;
    if(s===at)b.textContent=GL[p];else{if(en.has(s))b.textContent='♟';b.onclick=()=>{b.classList.remove('ok','miss','bad');sel.has(s)?(sel.delete(s),b.classList.remove('sel')):(sel.add(s),b.classList.add('sel'))}};
    board.appendChild(b)}
  const fb=document.createElement('p');fb.className='fb';
  const row=document.createElement('div');row.className='row';
  const chk=document.createElement('button');chk.textContent='Check';
  chk.onclick=()=>{let good=0,extra=0,miss=0;
    for(const s in cells){if(s===at)continue;const c=cells[s];c.classList.remove('ok','miss','bad');
      if(sel.has(s)&&ans.has(s)){c.classList.add('ok');good++}
      else if(sel.has(s)){c.classList.add('bad');extra++}
      else if(ans.has(s)){c.classList.add('miss');miss++}}
    fb.textContent=(extra+miss===0)?`Perfect: all ${ans.size} squares.`:`${good} right, ${extra} wrong (red), ${miss} missed (gold). Adjust and check again.`};
  const rst=document.createElement('button');rst.textContent='Reset';
  rst.onclick=()=>{sel.clear();for(const s in cells)cells[s].classList.remove('sel','ok','miss','bad');fb.textContent=''};
  row.append(chk,rst);el.append(board,row,fb);
});
