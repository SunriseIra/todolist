
const itemsFromStor = localStorage.getItem('todos') ?
    JSON.parse(window.localStorage.getItem('todos')) : [];

// console.log(itemsFromStor);

let input = document.querySelector('.new-todo');
let todolist = document.querySelector(".todo-list");
let main = document.querySelector(".main");
let todo_count = document.querySelector(".todo-count");

const newArray = [];
const obj = new Object();

if (!itemsFromStor.length) {
    console.log("there is no")
} else {
    itemsFromStor.forEach(newtask);
    console.log("there is")
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
            function newObj(obj) {
                let timeInMs = Date.now();
                obj.id = timeInMs;
                obj.title = liText;
                obj.completed = false;
                console.log(obj)
            }

            newArray.push(obj);
            newObj(obj);
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

    let delButton = document.querySelectorAll(".destroy");
    let alldelButton = Array.from(delButton);
    alldelButton.forEach((elemen) => {
        elemen.addEventListener("click", function (event) {
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
                console.log(itemsFromStor);
                let count = itemsFromStor.length;
                todo_count.textContent = `${count} items left`;
            }
        })
    })

    function checked(event) {
        let checkbox = event.target.closest('.toggle');
        let checkpar = event.target.parentElement;
        let checkparent = checkpar.parentNode;
        let ided = checkbox.getAttribute('id');
        ided = checkparent.dataset.name;

        if (checkbox) {
            itemsFromStor.forEach((ele) => {
                if (ele.id === +ided) {
                    if (checkbox.checked) {
                        checkparent.classList.add('completed');
                        ele.completed = true;
                        localStorage.setItem('todos', JSON.stringify(itemsFromStor));
                    } else {
                        checkpar.parentNode.classList.remove('completed');
                        ele.completed = false;
                        localStorage.setItem('todos', JSON.stringify(itemsFromStor));
                    }
                }
            })
        };
    }
    todolist.addEventListener('click', checked);


    input.value = '';
    input.focus();
}