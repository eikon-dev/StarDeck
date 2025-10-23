import {useMemo, useState} from "react";
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskList.tsx";
import TaskFilter from "./components/TaskFilter.tsx";
import type {Task, Priority} from "./types/task.ts";
import './index.css';

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Priority | 'all'>('all');

    function addTask(title: string, priority: Priority) {
        const t: Task = {
            id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
            title,
            done: false,
            createdAt: Date.now(),
            priority,
        };
        setTasks(prev => [t, ...prev]);
    }

    function handleFilterChange(priority: Priority | 'all') {
        setFilter(priority);
    }

    function toggleTask(id: string) {
        setTasks(prev => prev.map(t => (t.id === id ? {...t, done: !t.done} : t)));
    }

    function removeTask(id: string) {
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    const stats = useMemo(() => {
        const total = tasks.length;
        const done = tasks.filter(t => t.done).length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        return {total, done, pct};
    }, [tasks]);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.priority === filter;
    });

    return (
        <div style={{maxWidth: 720, margin: '40px auto', padding: '0 16px'}}>
            <header
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12}}>
                <h1>StarDeck</h1>
                <small style={{opacity: 0.7}}>{stats.done}/{stats.total} • {stats.pct}%</small>
            </header>

            <TaskForm onAdd={addTask}/>

            <div style={{height: 12}}/>
            <TaskFilter onFilterChange={handleFilterChange}/>
            <TaskList item={filteredTasks} onToggle={toggleTask} onRemove={removeTask}/>
        </div>
    );
}

