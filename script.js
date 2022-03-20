const todo = document.querySelector("#todo");
const cookie = localStorage;
if(cookie.length > 0){
   var listFromCookie = JSON.parse(cookie.getItem("list"));
}
var c = -1;
var arrayList = [];
if (listFromCookie) {
  listFromCookie.forEach((list) => {
    addList(list);
  })
  arrayList = listFromCookie;
  if (arrayList.length > 0) {
    let formList = document.querySelector("#formList");
    let btnClear = `
      <button onclick="clearAll()" class="clearAllBtn" type="button">
        clear all
      </button>`;
    formList.insertAdjacentHTML("beforeend",btnClear);
  }
}
function addList(obj) {
  let value = obj.value;
  c += 1;
  if(obj.done){
     let list = `
        <div class="list done">
          <input value="${value}" readonly="false" type="text" />
          <input class="id" value="${c}" readonly="false" type="hidden" />
          <span class="doneCheck">
           <i class="fa fa-check"></i>
          </span>
        </div>`;
    todo.insertAdjacentHTML("beforeend",list);
  } else {
    let list = `
    <div class="list">
      <input value="${value}" readonly="false" type="text" />
      <input class="id" value="${c}" readonly="false" type="hidden" />
      <span class="doneBtn" onclick="done(this)"><i class="fa fa-check"></i></span>
      <span class="wbtn" onclick="wrt(this)"><i class="fa fa-pencil"></i></span>
     <span class="dbtn" onclick="del(this)"><i class="fa fa-remove"></i></span>
    </div>`;
    todo.insertAdjacentHTML("beforeend",list);
    
  }
}
function save(self){
  if (c == -1) {
    let formList = document.querySelector("#formList");
    let btnClear = `
      <button onclick="clearAll()" class="clearAllBtn" type="button">
        clear all
      </button>`;
    formList.insertAdjacentHTML("beforeend",btnClear);
  }
  let v = self.querySelector("#todoInput").value;
  c += 1;
  let list = `
   <div class="list">
      <input value="${v}" readonly="false" type="text" />
      <input value="${c}" type="hidden" class="id" />
      <span class="doneBtn" onclick="done(this)"><i class="fa fa-check"></i></span>
      <span class="wbtn" onclick="wrt(this)"><i class="fa fa-pencil"></i></span>
     <span class="dbtn" onclick="del(this)"><i class="fa fa-remove"></i></span>
    </div>`;
  let objectList = {
    "value": v,
    "done": false
  }
  arrayList.push(objectList);
  cookie.setItem("list", JSON.stringify(arrayList));
  document.querySelector("#todoInput").value="";
  todo.insertAdjacentHTML("beforeend",list);
}
function done(i){
  let e = i.parentElement;
  let index = parseInt(e.querySelector(".id").value);
  arrayList[index].done = true;
  cookie.setItem("list", JSON.stringify(arrayList));
  e.classList.add("done");
  e.querySelector("input").setAttribute("readonly",true);
  e.querySelectorAll("span").forEach((span) => {
    span.remove()
  });
  let check = `
  <span class="doneCheck">
   <i class="fa fa-check"></i>
  </span>`;
  e.insertAdjacentHTML("beforeend",check)
}
function del(i){
  let e = i.parentElement;
  e.classList.remove("spawn");
  e.classList.add("dispawn");
  e.style.animation="dispawn 1s";
  let index = parseInt(e.querySelector(".id").value);
  arrayList.splice(index, 1);
  cookie.setItem("list", JSON.stringify(arrayList));
  c -= 1;
  if (c == -1) {
    document.querySelector(".clearAllBtn").remove();
  }
  setTimeout(function() {
    e.remove();
  }, 500);
}
function afterWrt(self){
  let parent = self.parentElement;
  let index = parseInt(parent.querySelector(".id").value);
  console.log(self)
  arrayList[index].value = self.value;
  cookie.setItem("list", JSON.stringify(arrayList));
  self.setAttribute("readonly",true);
  self.setAttribute("onchange","");
}
function wrt(i){
  let e = i.parentElement.querySelector("input");
  e.removeAttribute("readonly");
  e.focus();
  e.setAttribute(`onchange`,"afterWrt(this)");
  document.querySelectorAll(".wbtn").forEach((el,i) => {
      el.setAttribute(`onclick`,`wrt(this)`);
    })
}
document.querySelectorAll(".list span").forEach((e) => {
  let w = e.offsetWidth
  e.style.height=`${w}px`
  //alert(e.offsetWidth)
})
function clearAll(){
  document.querySelectorAll(".list").forEach((e) => {
    c -= 1;
    e.classList.remove("spawn");
    e.classList.add("dispawn");
    e.style.animation="dispawn 1s";
    setTimeout(function() {
      e.remove();
    }, 500);
  })
  document.querySelector(".clearAllBtn").remove();
  cookie.clear();
}
document.querySelector("y").innerHTML=new Date().getFullYear();