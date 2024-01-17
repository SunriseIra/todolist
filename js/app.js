
const itemsFromStor = localStorage.getItem('todos') ?
    JSON.parse(window.localStorage.getItem('todos')) : [];

// console.log(itemsFromStor);

let input = document.querySelector('.new-todo');
let todolist = document.querySelector(".todo-list");
let main = document.querySelector(".main");
let todo_count = document.querySelector(".todo-count");
let clearCompleted = document.querySelector('.clear-completed');
let filters = document.querySelector(".filters");
let filterall = Array.from(filters)
let menu = document.querySelectorAll('.filters li a');
let menuAll = Array.from(menu);

const newArray = [];
const checkArray = [];

const obj = new Object();

if (!itemsFromStor.length) {
    console.log("there is no")
} else {
    itemsFromStor.forEach(newtask);
    console.log("there is")
}

function newObj(obj, liText) {
    let timeInMs = Date.now();
    obj.id = timeInMs;
    obj.title = liText;
    obj.completed = false;
    console.log(obj)
}

input.addEventListener('keypress', function (event) {
    const obj = new Object();

    if (event.key === 'Enter') {
        event.preventDefault();
        let liText = input.value;
        if (liText == "") {
            alert("please add Some Text");
        } else {
            main.classList.add("block");
            newArray.push(obj);
            newObj(obj, liText);
            itemget(obj);
            newtask(obj);
        }
    }
    return obj
});

function itemget(obj) {
    itemsFromStor.push(obj);
    localStorage.setItem('todos', JSON.stringify(itemsFromStor));
}

function newtask(obj) {
    let task = document.createElement("li");
    let view = document.createElement("div");
    let toggle = document.createElement("input");
    let label = document.createElement("label");
    let destroy = document.createElement("button");
    let count = itemsFromStor.length;
    todo_count.textContent = `${count} items left`;
    let iden = obj.id;
    task.dataset.name = iden;

    view.classList.add("view");
    toggle.classList.add("toggle");
    toggle.setAttribute('type', 'checkbox');
    destroy.classList.add("destroy");
    label.textContent = obj.title;

    todolist.appendChild(task);
    task.appendChild(view);
    view.appendChild(toggle);
    view.appendChild(label);
    view.appendChild(destroy);

    if (obj.completed === true) {
        toggle.checked = true;
        task.classList.add('completed');
        clearCompleted.style.display = 'block';
    }

    let delButton = document.querySelectorAll(".destroy");
    let alldelButton = Array.from(delButton);
    alldelButton.forEach((elemen) => {
        elemen.addEventListener("click", function (event) {
            event.preventDefault();
            let btnelem = event.target.parentElement;
            let btnelem2 = btnelem.parentNode;
            let btnelem3 = btnelem2.dataset.name;
            let elemdata = elemen.dataset.name;
            elemdata = +btnelem3;
            obj.id === +task.dataset.name;
            if (obj.id === elemdata) {
                const ind = itemsFromStor.indexOf(obj);
                btnelem2.remove(task);
                itemsFromStor.splice([ind], 1);
                localStorage.setItem('todos', JSON.stringify(itemsFromStor));
                // console.log(itemsFromStor);
                let count = itemsFromStor.length;
                todo_count.textContent = `${count} items left`;
            }
        })
    })
    todolist.addEventListener('click', checked);

    let toggleAll = document.querySelector('.toggle-all')
    toggleAll.addEventListener('click', (event) => {
        itemsFromStor.forEach((ele) => {
            let checkbox = document.querySelectorAll('.toggle');
            let checkboxAll = Array.from(checkbox);
            const ind = itemsFromStor.indexOf(ele);
            for (var i = 0; i < checkboxAll.length; i++) {
                let check = checkboxAll[i];
                let checkpar = check.parentElement;
                let checkparent = checkpar.parentNode;
                check.dataset.name = checkparent.dataset.name;
                if (ele.id === +check.dataset.name) { 
                    if (event.target.checked === true) {
                    check.checked = this.checked;
                    ele.completed = true;
                    checkparent.classList.add('completed');
                    clearCompleted.style.display = 'block';
                    localStorage.setItem('todos', JSON.stringify(itemsFromStor));
                    countItems();
                    } else
                        if (event.target.checked === false) {
                    check.checked = this.unchecked;
                    ele.completed = false;
                    checkparent.classList.remove('completed');
                    clearCompleted.style.display = 'none';
                    localStorage.setItem('todos', JSON.stringify(itemsFromStor));
                    countItems();
                    }
                }
            }
    });     
    });

    filters.addEventListener('click', (event) => {
        let parentAdd = event.target.parentElement;
        let select = parentAdd.querySelector(".filters li a");
        let href = select.href;
        const hrefName = event.target.hasAttribute('href');
        let aclas = document.querySelectorAll(".filters li a");
        let acsarr = Array.from(aclas);

        if (hrefName === true) {
            acsarr.forEach((ele) => { 
                ele.classList.remove('selected');
                if (event.target.classList.contains('selected') === false) {
                     ele.classList.add('selected');
                 }
            })

            if (href.includes("#/active")) {
                return active();
            } else
                if (href.includes("#/completed")) {
                    return complited()
                }
                else
                    if (href.includes("#/")) {
                        task.style.display = 'block';
                        countItems();
                    } 
        }
    })

    function active() {
        itemsFromStor.forEach((ele) => {
            if (ele.completed === false && ele.id === +task.dataset.name) {
                task.style.display = 'block';
                countItems();
            } else
                if (ele.completed === true && ele.id === +task.dataset.name) {
                    task.style.display = 'none';
                }
        })
    }

    function complited() {
        itemsFromStor.forEach((ele) => {
            if (ele.completed === true && ele.id === +task.dataset.name) {
                task.style.display = 'block';
            } else
                if (ele.completed === false && ele.id === +task.dataset.name) {
                    task.style.display = 'none';
                }
        })
    }

    clearCompl();
    input.value = '';
    input.focus();
}

function checked(event) {
    let checkbox = event.target.closest('.toggle');
    let checkpar = event.target.parentElement;
    let checkparent = checkpar.parentNode;
    checkbox.dataset.name = checkparent.dataset.name;
    if (checkbox) {
        itemsFromStor.forEach((ele) => {
            if (ele.id === +checkbox.dataset.name) {
                const ind = itemsFromStor.indexOf(ele);
                if (checkbox.checked) {
                    checkparent.classList.add('completed');
                    ele.completed = true;
                    clearCompleted.style.display = 'block';
                    itemsFromStor.splice([ind], 1, ele);
                    localStorage.setItem('todos', JSON.stringify(itemsFromStor));
                    countItems();
                } else {
                    checkpar.parentNode.classList.remove('completed');
                    ele.completed = false;
                    localStorage.setItem('todos', JSON.stringify(itemsFromStor));
                    countItems();
                }
            }
        })
    };
}

function clearCompl() {  
    clearCompleted.addEventListener('click', (event) => {
        itemsFromStor.forEach((ele) => {   
            if (ele.completed === true) {
                const ind = itemsFromStor.indexOf(ele);
                itemsFromStor.splice([ind], 1);
                localStorage.setItem('todos', JSON.stringify(itemsFromStor));
            }
        })
        let taskAll = document.querySelectorAll('.completed');
        let task = Array.from(taskAll)
        task.forEach((element) => {
            element.remove(element);  
        })
        let count = itemsFromStor.length;
        todo_count.textContent = `${count} items left`;
        clearCompleted.style.display = 'none';
    })
}

function countItems() {
    let i = 0
    itemsFromStor.forEach((el) => {
        if (el.completed === false) {
            return i++
        }
    })
    let count = i;
    todo_count.textContent = `${count} items left`;
}













