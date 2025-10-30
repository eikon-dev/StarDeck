import {useState} from "react";
import type {TaskCycle, Priority} from "../types/task.ts";

type Props = {
    onAdd: (title: string, priority: Priority, kind: TaskCycle) => void;
    dailyCount?: number;
};

//определись со скобками ""/''

export default function TaskForm({onAdd}: Props) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Priority>('med');
    const [kind, setKind] = useState<TaskCycle>('daily');

    function submit(event: React.FormEvent) {
        event.preventDefault();
        const t = title.trim();
        if (!t) return;
        onAdd(t, priority, kind);
        setTitle('');
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
    //Нужны ли приоритеты для daily? скорее да чем нет
    return (
        <form onSubmit={submit} style={{display: 'grid', gap: 8, gridTemplateColumns: '1fr auto auto auto'}}>
            <input
                placeholder='Новая задача'
                value={title}
                onChange={handleTitleChange}
                aria-label='Название задачи'
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
    );
}