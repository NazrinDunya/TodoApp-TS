export {}
const todoInput = document.querySelector('.todo_input') as HTMLInputElement
const todoButton = document.querySelector('.todo_button')
const todoList = document.querySelector('.todo_list')

todoButton!.addEventListener('click',addTodo)
todoList!.addEventListener('click',deleteCheck)
document.addEventListener("DOMContentLoaded", getTodos);


function addTodo(event){
    event.preventDefault()
    const todoDiv = document.createElement('div') 
    todoDiv!.classList.add('todo') 
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value
    newTodo.classList.add('todo_item')
    todoDiv!.appendChild(newTodo)
    saveLocalTodos(todoInput.value);
    
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="bi bi-check2"></i>'
    completedButton.classList.add('complete_btn')
    todoDiv!.appendChild(completedButton)
    
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="bi bi-trash"></i>'
    trashButton.classList.add('trash_btn')
    todoDiv!.appendChild(trashButton)
    todoList!.appendChild(todoDiv)
    
    todoInput.value = ''
}
function deleteCheck(e){
    const item = e.target;
    
    if(item.classList[0] === 'trash_btn'){
        const todo = item.parentElement; 
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove()
        })
    }
    
    if(item.classList[0] === 'complete_btn'){
        const todo = item.parentElement
        todo.classList.add('completed')
    }
}



function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos  = JSON.parse(localStorage.getItem("todos") as any);
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function getTodos(){
      let todos;
      if(localStorage.getItem('todos') === null){
          todos = [];
      }else{
          todos  = JSON.parse(localStorage.getItem("todos") as any);
      }
      todos.forEach(function(todo){

   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");
   
   const newTodo = document.createElement("li");
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo_item');
   todoDiv.appendChild(newTodo);

   
   const complateButton = document.createElement('button');
   complateButton.innerHTML = '<i class="fas fa-check"></i>';
   complateButton.classList.add("complate_btn");
   todoDiv.appendChild(complateButton);

   
   const trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add("trash_btn");
   todoDiv.appendChild(trashButton);

   todoList!.appendChild(todoDiv);
      });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos  = JSON.parse(localStorage.getItem("todos") as any);
    }  
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
