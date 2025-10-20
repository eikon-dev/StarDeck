import { useState } from "react";
import type { Priority } from "../types/task.ts";

type Props = {
    onAdd: (title: string, priority: Priority) => void;
}

export default function TaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Priority>('med')

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const t = title.trim();
        if (!t) return;
        onAdd(t, priority);
        setTitle('');
        setPriority('med');
    }

    return (
        <form onSubmit={submit} style={{ display: 'grid', gap:8, gridTemplateColumns: '1fr auto auto'}}>
            <input
                placeholder="Новая задача..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Название задачи"
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} aria-label="Приоритет">
                <option value="low">Низкий</option>
                <option value="med">Средний</option>
                <option value="high">Высокий</option>
            </select>
            <button type="submit">Добавить</button>
        </form>
    );
}