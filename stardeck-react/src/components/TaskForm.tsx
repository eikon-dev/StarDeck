import React, {useState} from "react"; //добавил React чтоб IDE не жаловалась
import type {TaskCycle, Priority} from "../types/task.ts";
import s from "./TaskForm.module.css";
import useTasksStore from "../store/useTasksStore.ts";


//определись со скобками ""/''

export default function TaskForm() {

    const addTask = useTasksStore(s => s.addTask);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('med');
    const [kind, setKind] = useState<TaskCycle>('daily');

    function submit(event: React.FormEvent) {
        event.preventDefault();

        const t = title.trim();
        const d = description.trim();

        if (!t) return;

        const newTaskInput = {
            title: t,
            description: d,
            priority: priority,
            cycle: kind,
        }

        addTask(newTaskInput);

        const test = useTasksStore.getState().tasks
        console.log(test)


        setTitle('');
        setDescription('');
        setPriority('med');
        setKind('daily');
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setPriority(event.target.value as Priority);
    }

    function handleSelectKindChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setKind(event.target.value as TaskCycle);
    }

    function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }
    //вынести стили, стили нужно централизовывать для удобства и масштабируемости
    return (
        <div className={s.toolbar}>
            <form onSubmit={submit} style={{display: 'grid', gap: 8, gridTemplateColumns: '1fr auto auto auto'}}>
                <input
                    placeholder='Новая задача'
                    value={title}
                    onChange={handleTitleChange}
                    aria-label='Название задачи'
                />
                <input
                    placeholder='Описание (необязательно)'
                    value={description}
                    onChange={handleDescriptionChange}
                    aria-label='Описание задачи'
                />
                <select value={priority}
                        onChange={handlePriorityChange}
                        aria-label='Приоритет'>
                    <option value='low'>Низкий</option>
                    <option value='med'>Средний</option>
                    <option value='high'>Высокий</option>
                </select>
                <select value={kind}
                        onChange={handleSelectKindChange}
                        aria-label='Тип задачи'>
                    <option value='daily'>Ежедневная</option>
                    <option value='long'>Долговременная</option>
                </select>
                <button type='submit' disabled={!title.trim()}>Добавить</button>
            </form>
        </div>

    );
}