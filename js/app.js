// 获取元素
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const icon = document.querySelector(".fa-plus-circle")

// 类名
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";

// 生命变量
let List, id;

// 储存数据
let data = localStorage.getItem("TODO")

// 检查数据是否为空
if (data) {
  List = JSON.parse(data);
  id = List.length
  loadList(List)
} else {
  List = [];
  id = 0;
}


// 将项目加载到界面
function loadList(array) {
  array.forEach(item => {
    addToDo(item.name, item.id, item.document, item.trash)
  });
}

//删除储存数据
clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
})

// 显示今天时间

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("cn-ZH", options)

// 增加功能
function addToDo(toDo, id, done, trash) {
  if (trash) { return; }

  const DONE = done ? check : uncheck;
  const LINE = done ? lineThrough : "";

  const item = `<li class="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
              `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item)
}

// 通过键盘enter键 添加项目至列表
document.addEventListener("keyup", function(even) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // 输入是否为空
    if (toDo) {
      addToDo(toDo, id, false, false);

      List.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      // 将数据保存
      localStorage.setItem("TODO", JSON.stringify(List))

      id++;
    }
    input.value = ""
  }
});

icon.addEventListener("click", () => {
  const toDo = input.value;
  // 输入是否为空
  if (toDo) {
    addToDo(toDo, id, false, false);

    List.push({
      name: toDo,
      id: id,
      done: false,
      trash: false
    });

    // 将数据保存
    localStorage.setItem("TODO", JSON.stringify(List))

    id++;
  }
})

function completeToDo(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);

  List[element.id].done = List[element.id].done ? false : true;
}

// 删除项目
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  List[element.id].trash = true;
}

list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }


  localStorage.setItem("TODO", JSON.stringify(List));
});