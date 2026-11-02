// Draws start-position boards: <div class="board" data-fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"></div>
const G={K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
document.querySelectorAll('.board').forEach(el=>{
  const rows=el.dataset.fen.split('/');
  rows.forEach((row,r)=>{let c=0;for(const ch of row){
    if(/\d/.test(ch)){for(let i=0;i<+ch;i++)add(r,c++,'')}else add(r,c++,G[ch])}});
  function add(r,c,t){const d=document.createElement('div');d.className=(r+c)%2?'d':'l';d.textContent=t;el.appendChild(d)}
});
