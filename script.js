// ---------- Navigation ----------
function showSection(id, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
    document.getElementById(id).classList.add('active-section');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else document.querySelector(`.nav-btn[onclick*="'${id}'"]`)?.classList.add('active');
}
function openTopic(id){ showSection(id); }

// ---------- Array ----------
let arr = [10, 20, 30, 40];
function renderArray(highlight=-1){
    const v=document.getElementById('arrayView'); v.innerHTML='';
    arr.forEach((x,i)=>{
        const d=document.createElement('div'); d.className='array-cell';
        if(i===highlight)d.style.background='#e9eaff';
        d.innerHTML=`<b>${x}</b><small>index ${i}</small>`; v.appendChild(d);
    });
}
function arrayInsert(){
    const val=Number(document.getElementById('arrayValue').value);
    const idx=document.getElementById('arrayIndex').value===''?arr.length:Number(document.getElementById('arrayIndex').value);
    if(!Number.isFinite(val)||idx<0||idx>arr.length){setStatus('arrayStatus','Enter a valid value/index');return}
    arr.splice(idx,0,val); renderArray(idx); setStatus('arrayStatus','Inserted '+val);
}
function arrayDelete(){
    const idx=Number(document.getElementById('arrayIndex').value);
    if(!Number.isInteger(idx)||idx<0||idx>=arr.length){setStatus('arrayStatus','Enter a valid index');return}
    const x=arr.splice(idx,1)[0]; renderArray(); setStatus('arrayStatus','Deleted '+x);
}
function arraySearch(){
    const val=Number(document.getElementById('arrayValue').value), idx=arr.indexOf(val);
    if(idx<0){renderArray();setStatus('arrayStatus',val+' not found')}
    else {renderArray(idx);setStatus('arrayStatus',val+' found at index '+idx)}
}
function resetArray(){arr=[10,20,30,40];renderArray();setStatus('arrayStatus','Reset')}

// ---------- Stack ----------
let stack=[10,20,30];
function renderStack(){const v=document.getElementById('stackView');v.innerHTML='';stack.forEach((x,i)=>{let d=document.createElement('div');d.className='stack-cell '+(i===stack.length-1?'top':'');d.textContent=x;v.appendChild(d)})}
function pushStack(){let x=Number(document.getElementById('stackValue').value);if(!Number.isFinite(x)){setStatus('stackStatus','Enter a value');return}stack.push(x);renderStack();setStatus('stackStatus','Pushed '+x)}
function popStack(){if(!stack.length){setStatus('stackStatus','Stack Underflow');return}let x=stack.pop();renderStack();setStatus('stackStatus','Popped '+x)}
function peekStack(){setStatus('stackStatus',stack.length?'Top = '+stack[stack.length-1]:'Stack is empty')}
function resetStack(){stack=[10,20,30];renderStack();setStatus('stackStatus','Reset')}

// ---------- Queue ----------
let queue=[10,20,30];
function renderQueue(){const v=document.getElementById('queueView');v.innerHTML='';queue.forEach(x=>{let d=document.createElement('div');d.className='queue-cell';d.textContent=x;v.appendChild(d)})}
function enqueue(){let x=Number(document.getElementById('queueValue').value);if(!Number.isFinite(x)){setStatus('queueStatus','Enter a value');return}queue.push(x);renderQueue();setStatus('queueStatus','Enqueued '+x)}
function dequeue(){if(!queue.length){setStatus('queueStatus','Queue is empty');return}let x=queue.shift();renderQueue();setStatus('queueStatus','Dequeued '+x)}
function frontQueue(){setStatus('queueStatus',queue.length?'Front = '+queue[0]:'Queue is empty')}
function resetQueue(){queue=[10,20,30];renderQueue();setStatus('queueStatus','Reset')}

// ---------- Linked List ----------
let list=[10,20,30];
function renderList(){const v=document.getElementById('listView');v.innerHTML='';if(!list.length){v.textContent='HEAD → NULL';return}let h=document.createElement('span');h.className='head-label';h.textContent='HEAD';v.appendChild(h);list.forEach((x,i)=>{let wrap=document.createElement('div');wrap.className='list-node';wrap.innerHTML=`<div class="node-box"><div class="node-data">${x}</div><div class="node-next">NEXT</div></div>${i<list.length-1?'<span class="arrow">→</span>':''}`;v.appendChild(wrap)});let n=document.createElement('span');n.className='arrow';n.textContent=' → NULL';v.appendChild(n)}
function getListVal(){return Number(document.getElementById('listValue').value)}
function listInsertHead(){let x=getListVal();if(!Number.isFinite(x)){setStatus('listStatus','Enter a value');return}list.unshift(x);renderList();setStatus('listStatus','Inserted '+x+' at head')}
function listInsertTail(){let x=getListVal();if(!Number.isFinite(x)){setStatus('listStatus','Enter a value');return}list.push(x);renderList();setStatus('listStatus','Inserted '+x+' at tail')}
function listInsertPosition(){let x=getListVal(),p=Number(document.getElementById('listPosition').value);if(!Number.isFinite(x)||!Number.isInteger(p)||p<1||p>list.length+1){setStatus('listStatus','Invalid value or position');return}list.splice(p-1,0,x);renderList();setStatus('listStatus','Inserted at position '+p)}
function listDelete(){let p=Number(document.getElementById('listPosition').value);if(!Number.isInteger(p)||p<1||p>list.length){setStatus('listStatus','Invalid position');return}let x=list.splice(p-1,1)[0];renderList();setStatus('listStatus','Deleted '+x)}
function resetList(){list=[10,20,30];renderList();setStatus('listStatus','Reset')}

// ---------- Tree ----------
let tree=null;
function node(v){return {v,left:null,right:null}}
function insert(t,v){if(!t)return node(v);if(v<t.v)t.left=insert(t.left,v);else if(v>t.v)t.right=insert(t.right,v);return t}
function minNode(t){while(t.left)t=t.left;return t}
function del(t,v){if(!t)return null;if(v<t.v)t.left=del(t.left,v);else if(v>t.v)t.right=del(t.right,v);else{if(!t.left)return t.right;if(!t.right)return t.left;let m=minNode(t.right);t.v=m.v;t.right=del(t.right,m.v)}return t}
function find(t,v){if(!t||t.v===v)return t;return v<t.v?find(t.left,v):find(t.right,v)}
function traversal(t,type,out=[]){if(!t)return out;if(type==='preorder')out.push(t.v);traversal(t.left,type,out);if(type==='inorder')out.push(t.v);traversal(t.right,type,out);if(type==='postorder')out.push(t.v);return out}
function treeInsert(){let v=Number(document.getElementById('treeValue').value);if(!Number.isFinite(v)){setStatus('treeStatus','Enter a value');return}tree=insert(tree,v);renderTree();setStatus('treeStatus','Inserted '+v)}
function treeDelete(){let v=Number(document.getElementById('treeValue').value);if(!find(tree,v)){setStatus('treeStatus','Value not found');return}tree=del(tree,v);renderTree();setStatus('treeStatus','Deleted '+v)}
function treeSearch(){let v=Number(document.getElementById('treeValue').value);setStatus('treeStatus',find(tree,v)?'Found '+v:'Value not found')}
function showTraversal(type){let a=traversal(tree,type,[]);document.getElementById('traversalOutput').textContent=(type[0].toUpperCase()+type.slice(1))+': '+(a.length?a.join(' → '):'Tree is empty')}
function renderTree(){
    const v=document.getElementById('treeView');
    if(!tree){v.innerHTML='<div style="color:#929aaa;font-size:13px">Tree is empty</div>';return}
    let nodes=[],edges=[],maxDepth=0;
    function walk(t,depth,x,parent){
        if(!t)return;
        maxDepth=Math.max(maxDepth,depth);
        nodes.push({v:t.v,depth,x});
        if(parent!==null)edges.push({a:parent,b:t.v});
        walk(t.left,depth+1,x-1/(depth+2),t.v);
        walk(t.right,depth+1,x+1/(depth+2),t.v);
    }
    walk(tree,0,.5,null);
    // Recalculate positions by depth to avoid excessive overlap
    let byDepth={}; nodes.forEach(n=>(byDepth[n.depth]??=[]).push(n));
    nodes.forEach(n=>{let level=byDepth[n.depth],idx=level.indexOf(n);n.x=(idx+1)/(level.length+1)});
    const w=700,h=Math.max(350,(maxDepth+1)*85);
    let svg=`<svg class="tree-svg" viewBox="0 0 ${w} ${h}">`;
    edges.forEach(e=>{let a=nodes.find(n=>n.v===e.a),b=nodes.find(n=>n.v===e.b);let x1=a.x*w,y1=55+a.depth*80,x2=b.x*w,y2=55+b.depth*80;svg+=`<line class="tree-edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`});
    nodes.forEach(n=>{let x=n.x*w,y=55+n.depth*80;svg+=`<circle class="tree-node" cx="${x}" cy="${y}" r="23"/><text class="tree-text" x="${x}" y="${y}">${n.v}</text>`});
    svg+='</svg>';v.innerHTML=svg;
}
function resetTree(){tree=null;[50,30,70,20,40,60,80].forEach(x=>tree=insert(tree,x));renderTree();setStatus('treeStatus','Reset')}

// ---------- Graph ----------
const N=8; let graph=Array.from({length:N},()=>Array(N).fill(0));
function addEdge(){let a=Number(document.getElementById('graphA').value)-1,b=Number(document.getElementById('graphB').value)-1;if(a<0||a>=N||b<0||b>=N||a===b){setStatus('graphStatus','Enter two different vertices 1-8');return}graph[a][b]=graph[b][a]=1;renderGraph();setStatus('graphStatus','Edge '+(a+1)+' — '+(b+1)+' added')}
function removeEdge(){let a=Number(document.getElementById('graphA').value)-1,b=Number(document.getElementById('graphB').value)-1;if(a<0||a>=N||b<0||b>=N||a===b){setStatus('graphStatus','Invalid vertices');return}graph[a][b]=graph[b][a]=0;renderGraph();setStatus('graphStatus','Edge removed')}
function renderGraph(visited=[]){
    const v=document.getElementById('graphView'),w=700,h=400,cx=350,cy=200,r=145;
    let pts=[];for(let i=0;i<N;i++){let ang=(Math.PI*2*i/N)-Math.PI/2;pts.push({x:cx+r*Math.cos(ang),y:cy+r*Math.sin(ang)})}
    let svg=`<svg class="graph-svg" viewBox="0 0 ${w} ${h}">`;
    for(let i=0;i<N;i++)for(let j=i+1;j<N;j++)if(graph[i][j])svg+=`<line class="graph-edge" x1="${pts[i].x}" y1="${pts[i].y}" x2="${pts[j].x}" y2="${pts[j].y}"/>`;
    for(let i=0;i<N;i++){let cls=visited.includes(i)?'graph-node visited-node':'graph-node';svg+=`<circle class="${cls}" cx="${pts[i].x}" cy="${pts[i].y}" r="25"/><text class="graph-label" x="${pts[i].x}" y="${pts[i].y}">${i+1}</text>`}
    svg+='</svg>';v.innerHTML=svg;
}
function startVertex(){let x=Number(document.getElementById('graphA').value)-1;return x>=0&&x<N?x:0}
function runBFS(){let s=startVertex(),vis=Array(N).fill(false),q=[s],order=[];vis[s]=true;while(q.length){let u=q.shift();order.push(u);for(let i=0;i<N;i++)if(graph[u][i]&&!vis[i]){vis[i]=true;q.push(i)}}renderGraph(order);document.getElementById('graphOutput').textContent='BFS: '+order.map(x=>x+1).join(' → ')}
function runDFS(){let s=startVertex(),vis=Array(N).fill(false),order=[];function dfs(u){vis[u]=true;order.push(u);for(let i=0;i<N;i++)if(graph[u][i]&&!vis[i])dfs(i)}dfs(s);renderGraph(order);document.getElementById('graphOutput').textContent='DFS: '+order.map(x=>x+1).join(' → ')}
function resetGraph(){graph=Array.from({length:N},()=>Array(N).fill(0));[[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,6],[5,7],[6,7]].forEach(([a,b])=>graph[a][b]=graph[b][a]=1);renderGraph();setStatus('graphStatus','Reset')}


const quizzes={
array:[["Which operation gives direct access to an array element?",["Indexing","Traversal","Sorting","Recursion"],"Indexing"],["Which is a common characteristic of an array?",["Elements use indexed positions","Every element needs a pointer","Elements are stored randomly","Only strings can be stored"],"Elements use indexed positions"]],
stack:[["Which principle does a stack follow?",["LIFO","FIFO","Random access","Priority order"],"LIFO"],["Which operation removes the top element?",["Pop","Push","Peek","Search"],"Pop"]],
queue:[["Which principle does a queue follow?",["FIFO","LIFO","Random access","Binary search"],"FIFO"],["Where is a new element added in a queue?",["Rear","Front","Middle","Root"],"Rear"]],
linkedlist:[["What does a linked-list node normally contain?",["Data and a link","Only an index","Only a value","A matrix"],"Data and a link"],["Which linked list has links in both directions?",["Doubly linked list","Singly linked list","Simple array","Binary tree"],"Doubly linked list"]],
tree:[["In a Binary Search Tree, smaller values are placed where?",["Left subtree","Right subtree","At the root only","Outside the tree"],"Left subtree"],["Which BST traversal produces sorted values?",["Inorder","Preorder","Postorder","Level order"],"Inorder"]],
graph:[["What are the two main components of a graph?",["Vertices and edges","Rows and columns","Root and leaves","Stacks and queues"],"Vertices and edges"],["Which traversal uses a queue in its standard implementation?",["BFS","DFS","Inorder","Postorder"],"BFS"]]
};
function buildQuizzes(){
Object.keys(quizzes).forEach(topic=>{quizzes[topic].forEach((q,i)=>{
const el=document.getElementById(topic+"Quiz"+(i+1)); let s="<p><b>"+(i+1)+". "+q[0]+"</b></p><div class='quiz-options'>";
q[1].forEach((opt,j)=>{s+="<label><input type='radio' name='"+topic+"q"+i+"' value='"+opt+"'> "+String.fromCharCode(65+j)+". "+opt+"</label>";});
el.innerHTML=s+"</div>";});});
}
function checkQuiz(topic){
let score=0; quizzes[topic].forEach((q,i)=>{const selected=document.querySelector("input[name='"+topic+"q"+i+"']:checked");if(selected&&selected.value===q[2])score++;});
document.getElementById(topic+"QuizResult").textContent="Score: "+score+"/"+quizzes[topic].length;
}

// ---------- Helpers / initial state ----------
function setStatus(id,msg){document.getElementById(id).textContent=msg}
renderArray();renderStack();renderQueue();renderList();resetTree();resetGraph();buildQuizzes();
