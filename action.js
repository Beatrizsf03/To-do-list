'use strict';

        let banco = [];
        

        const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
        const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

                const createItem = (tarefa, status, indice) => {
                    const item = document.createElement('label');
                    item.classList.add('todo-item');
                    item.innerHTML = ` <input type="checkbox" ${status} data-indice=${indice}>
                    <div>${tarefa}</div>
                    <input type="button" value="X" data-indice=${indice}>
                    `
                    document.getElementById('todoList').appendChild(item);
                }

                const cleanTask = () => {
                    const todoList = document.getElementById('todoList');
                    while(todoList.firstChild) {
                        todoList.removeChild(todoList.lastChild);
                    }

                }
                

                const refreshScreen = () => {
                    cleanTask();
                    const banco = getBanco();
                    banco.forEach ((item, indice) => createItem (item.tarefa, item.status, indice));
                }

                const insertItem = (evento) => {
                    const tecla = evento.key;
                    const texto = evento.target.value
                    if(tecla === 'Enter') {
                        const banco = getBanco();
                        banco.push({'tarefa': texto, 'status': ''});
                        setBanco(banco);
                        refreshScreen();
                        evento.target.value = ''; //Limpar tarefa ao insert item em to do list
                    }
                }
                
                const removeItem = (indice) => {
                    const banco = getBanco();
                    banco.splice (indice, 1);
                    setBanco(banco);
                    refreshScreen();
                }

                const updateItem = (indice) => {
                    const banco = getBanco();
                    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
                    setBanco(banco);
                    refreshScreen();
                }

                const clickItem = (evento) => {
                    const element = evento.target;
                    if(element.type === 'button'){
                        const indice = element.dataset.indice;
                        removeItem (indice);
                    } else if (element.type === 'checkbox') {
                        const indice = element.dataset.indice;
                        updateItem (indice);
                    }
                } 

                document.getElementById('newItem').addEventListener('keypress', insertItem);
                document.getElementById('todoList').addEventListener('click', clickItem);
                
                refreshScreen();