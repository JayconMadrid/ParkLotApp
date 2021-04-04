// A Slight improvment on the Module Pattern
   // Start with a self invoking function inside a variable. var myApp = (function(){...})();
   let todoApp = (function(){
    // This function has a set of elements that can be considered "Private" unless they are returned to the container variable (todoApp).
    // The following variables and functions cannot be referenced directly form outside since they are inside this function scope.
    let inputText = "";
    let todoListArray = [];
    
    function createListItem(){
      let id = 0;
      if(todoListArray.length > 0){
        let ids = [];
        todoListArray.forEach(x => ids.push(x.id));
        id = (Math.max(...ids)) + 1;
      }
      
      todoListArray.push({"id": id, "text": inputText});
      console.table(todoListArray);
      
      return todoListArray.find(x => x.id == id);
    }
    
    function listDraw(){
      // Create todo list block items
      let listItemsElements = "";
      if(todoListArray.length > 0){
        for (let element of todoListArray ){
          listItemsElements +=`
            <a id="toDoApp__List__item-${element.id}" class="toDoApp__List__item  list-group-item list-group-item-action d-flex justify-content-between">
              <span contenteditable="true">${element.text}</span>
              <div class="btn-group btn-group-sm" role="group">
                <button class="btn btn-primary" onClick="todoApp.edit(${element.id})" type="button">Rename</button>
                <button id="del-btn--${element.id}" class="btn btn-primary" onClick="todoApp.delete(${element.id})" type="button">Delete</button>
              </div>
            </a>
          `;
        }
        document.getElementById("toDoApp__List").innerHTML = listItemsElements;
      } else {
        listEmpty();
      }
      
    }
    
    function listEmpty(){
      let toDoList = document.getElementById("toDoApp__List");
        toDoList.classList.add("d-flex");
        toDoList.classList.add("align-items-center");
        toDoList.classList.add("justify-content-center");
        toDoList.innerHTML = `
            <p class = "text-muted text-monospace mt-5">
              Your list is empty
            </p>`;
    }
    
    function onTextFieldInput(){
      const value = document.getElementById('toDoApp__Add__text-input').value;
      inputText = value;
    }
    
    function addListItem(){
      createListItem();
        
        // Clean Input
        document.getElementById('toDoApp__Add__text-input').value = "";
        // Clean Todo list block
        let toDoList = document.getElementById("toDoApp__List");
        toDoList.classList.remove("d-flex");
        toDoList.classList.remove("align-items-center");
        toDoList.classList.remove("justify-content-center");
        
        listDraw();
    }
    
    function removeItem(id){
        console.log("removeItem: "+id);
        let listItem = todoListArray.find(x => x.id == id);
        let index = todoListArray.indexOf(listItem);
        if (index > -1) {
          todoListArray.splice(index, 1);
        }
        listDraw();
      }
    
    function renameItem(id){
        console.log("renameItem: "+id);
        let newText = document.getElementById(`toDoApp__List__item-${id}`)
          .querySelector("span").textContent;
        todoListArray.forEach(x => {
          if (x.id == id){
            x.text = newText;
          }
        });
        listDraw();
      }
    
    function init(){
        // Attach event listeners to private functions.
        document.getElementById("toDoApp__Add__text-input").addEventListener("change", onTextFieldInput);
        document.getElementById("toDoApp__Add__add-btn").addEventListener("click", addListItem);
        listEmpty();
      }
    
    // This function returns a set of "Public" functions to the container variable.
    return {
      // These are public functions, they can be accessed from outside (either inside an HTML element or via console) like so: todoApp.delete(_ID_);
      add: addListItem,
      delete: removeItem,
      edit: renameItem,
      start: init,
    };
  })();
  // There are many ways to use the Module Pattern but i like to start the app by setting event listeners on my static elements and cleaning up the list block.
  todoApp.start();