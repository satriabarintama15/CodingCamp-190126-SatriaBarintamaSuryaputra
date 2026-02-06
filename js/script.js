let todos = JSON.parse(localStorage.getItem('eva_tactical_data')) || [];

const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput'); 
const addBtn = document.getElementById('addBtn');
const taskGrid = document.getElementById('taskGrid');
const filterInput = document.getElementById('filterInput');
const noTaskMsg = document.getElementById('noTaskMsg');
const deleteAllBtn = document.getElementById('deleteAllBtn');

function renderTodos(data = todos) {
    taskGrid.innerHTML = '';
    
    noTaskMsg.style.display = data.length === 0 ? 'block' : 'none';

    data.forEach((item, index) => {
        
        const row = `
            <div class="task-card">
                <div class="task-info">
                    <h4>${item.task}</h4>
                    <p>DEADLINE: ${item.date} | STATUS: Pending</p>
                </div>
                <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
            </div>
        `;
        taskGrid.innerHTML += row;
    });

    localStorage.setItem('eva_tactical_data', JSON.stringify(todos));
}


addBtn.addEventListener('click', () => {
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        alert("Peringatan: Data tugas dan tanggal harus sinkron!");
        return;
    }

    todos.push({ task, date });
    todoInput.value = '';
    dateInput.value = ''; 
    renderTodos();
});


filterInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = todos.filter(t => t.task.toLowerCase().includes(keyword));
    renderTodos(filtered);
});

function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

deleteAllBtn.onclick = () => {
    if (confirm("Hapus semua log tugas?")) {
        todos = [];
        renderTodos();
    }
};

renderTodos();