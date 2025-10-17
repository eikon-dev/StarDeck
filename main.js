const KEY = 'stardeck_tasks'
const load = () => JSON.parse(localStorage.getItem(KEY) || '[]')
const save = (tasks) => localStorage.setItem(KEY, JSON.stringify(tasks))

let tasks = load()

const taskForm = document.querySelector('#taskForm')
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#taskList')
const canvas = document.querySelector('#starCanvas')
const ctx = canvas.getContext('2d')

function renderTask() {
    taskList.innerHTML = ''
    tasks.forEach((t, i) => {
        const li = document.createElement('li')
        li.className = 'task'
        li.dataset.i = i
        li.innerHTML = `
            <input type="checkbox" ${t.done ? 'checked' : ''} data-i="${i}">
            <span>${t.title}</span>
        `
        taskList.appendChild(li)
    })
}

function renderSky() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < 120; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const r = Math.random() * 1.2
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
    }

    const done = tasks.filter(t => t.done).length
    for (let i = 0; i < done; i++) {
        const x = (i + 1) * (canvas.width / (done + 1))
        const y = canvas.height * (0.3 + 0.4 * Math.random())
        const r = 2 + Math.random() * 2
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
    }
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = taskInput.value.trim()
    if (!title) return
    tasks.push({title, done: false})
    save(tasks)
    taskInput.value = ''
    renderTask()
    renderSky()
})

taskList.addEventListener('change', (e) => {
    if (e.target.matches('.task-toggle')) return
    const i = Number(e.target.dataset.i)
    if (Number.isNaN(i)) return
    tasks[i].done = e.target.checked
    save(tasks)
    renderTask()
    renderSky()
})

renderTask()
renderSky()