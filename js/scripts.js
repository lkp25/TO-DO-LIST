//---------remove single item-------------------------------------------

const list = document.querySelector('.task-list')

list.addEventListener('click', removeItem)
 
function removeItem(e) {
    if(e.target.classList.contains('remove-icon')) {
        e.target.parentElement.remove()
    }}
   

//---------ADD NEW ITEM TO LIST-------------------------------------------

const addBtn = document.querySelector('.input-btn')
const inputField = document.querySelector('.input-field')


addBtn.addEventListener('click', addNewItem)

function addNewItem(e) {
   //check for the length of the list and alert the user if he added too many items
    const container = document.querySelector('.outer-container')
    const containerHeight = (parseInt(getComputedStyle(container).height))
    
    //no submit action(page reload)
    e.preventDefault()

    if(containerHeight > 700 && containerHeight < 750) {
        
        //modal.classList.add('modal-on')  - po staremu, statycznie
        modalWindow.openModal(modalOptions = {
            title:`No no no no noooo, wait, stop!`,
            content:`It is highly recommended that you complete some of the current tasks before commiting to new ones, don't you think?`
        })
    }
    else{ //default behavior - add item
       
        //but do not add anything if input value was empty
        if(inputField.value === ''){
            modalWindow.openModal(modalOptions = {
                title:`Hey there, no cheating!`,
                content:`Empty task is not a task, you can't count doing nothing for something`
            })
        }else
        {
        let newItem = document.createElement('li')
        newItem.className = 'single-task'
        newItem.innerHTML = ` ${inputField.value}
        <a class="remove-icon"><svg  class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg></a>`
        list.appendChild(newItem)
    }
    }
    
    
    
}


// -----------clear button------------------------------------------------
document.querySelector('.clear-btn').addEventListener('click', clearAll)

function clearAll() {
    //let listItems = document.querySelectorAll('.single-task')
    // listItems.forEach((item) =>{
    //     if(item.classList.contains('single-task')){
    //         item.remove()
    //     }
    
    // }
    //faster way to clear all -while there is true for first child on the list - remove it
    const taskList = document.querySelector('.task-list')
    while(taskList.firstChild){
        taskList.firstChild.remove()
        
    }
    }
    
    
//--------------modal-----------------------------
// const modal = document.querySelector('.modal-overlay')

// document.addEventListener('click', closeModal)

// function closeModal(e) {
//     if(e.target.classList.contains('modal-close')) {
//         modal.classList.remove('modal-on')
//     }
// }

//---------------------------------------------filter tasks------------------
const filter = document.querySelector('.filter-field')
filter.addEventListener('keyup', filterTasks)

function filterTasks(e){
    const text = e.target.value.toLowerCase()
    console.log(text);
    document.querySelectorAll('.single-task').forEach((task) =>{
        const item = task.firstChild.textContent.toLowerCase()
        //index of compares the text from filter with list text. if there is no match, the value is -1
        //if there is a match:
        if(item.indexOf(text) != -1){
            task.style.display = 'grid'
        }
        //if there is no match:
        else{
            task.style.display = 'none'
        }
    })
}









//--------------------------GLOBAAL MODAL--------------------------
const modalWindow = {
    init() {
        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal-close')) {
                const modalOverlay = document.querySelector('.modal-overlay')
                modalOverlay.remove()
            }
        })
    },
    getHTMLTemplate(modalOptions) {
        return `
        <div class="modal-overlay">
            <div class="modal-window">
            <div class="modal-title-bar">
                <span class="modal-title">${modalOptions.title}</span>
                <button class="modal-close material-icons">close</button>
                
            </div>
        
            <div class="modal-content">
            ${modalOptions.content}
            </div>
            </div>
        </div>
        `
    },
    openModal(modalOptions = {}){
        modalOptions = Object.assign({
            title:`modal title`,
            content:`modal content` 
        },modalOptions)
        const modalTemplate = this.getHTMLTemplate(modalOptions)
        document.body.insertAdjacentHTML('afterbegin', modalTemplate)
    }
}

//iportant for the close button to work! 
document.addEventListener('DOMContentLoaded', () => {modalWindow.init()})
