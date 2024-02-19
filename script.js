const createBtn = document.getElementById('create-btn');
const list =document.getElementById('list');
 
let todos = [{
    id: new Date().getTime(),
    text: '',
    complete: false
}];

createBtn.addEventListener('click', createNewTodo)

function createNewTodo () {
    //새로운 아이템 객체 생성.
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }

    // 배열에 처음에 새로운 아이템 추가
    todos. unshift(item);

    // 요소 생성하기(요소가 많으면 때서 작업하는게 좋음)
    const {
        itemEl,
        inputEl,
        editBtnEl,
        removeBtnEl
    } = createTodoElement(item)


    // 리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl);

    // disabled 속성 제거
    inputEl.removeAttribute('disabled');

    //임의로 포커스 주기
    inputEl.focus();

}

function createTodoElement (item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete; //새로고침 이후에도 체크가 되어있어야한다.

    if (item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl =document.createElement('input');
    inputEl.type ='text';
    inputEl.value = item.text;
    inputEl.setAttribute("disabled","");


    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons','remove-btn');
    removeBtnEl.innerText = 'remove_circle';


    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }

        saveToLocalStorage();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
        });

    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
    
        saveToLocalStorage();
    });
    
    editBtnEl.addEventListener("click", () => {
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });
    
    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);
        itemEl.remove();
    
        saveToLocalStorage();
    });

    // 요소에 요소를 넣는것.
    // push 메소드와 비슷한 경우.
    // 순서대로 넣어줄 것.
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {
        itemEl,
        inputEl,
        editBtnEl,
        removeBtnEl
    }
}

    function displayTodos() {
        loadFromLocalStorage();
    
        for (let i = 0; i < todos.length; i++) {
            const item = todos[i];
    
            const { itemEl } = createTodoElement(item);
    
            list.append(itemEl);
        }
}

//내용 저장.
displayTodos();

function saveToLocalStorage() {
	const data = JSON.stringify(todos);

	localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
	const data = localStorage.getItem("my_todos");

	if (data) {
		todos = JSON.parse(data);
	}
}
