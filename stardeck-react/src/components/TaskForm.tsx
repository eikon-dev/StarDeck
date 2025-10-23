import { useState } from "react";
import type { Priority } from "../types/task.ts";
import * as React from "react";

type Props = {
    onAdd: (title: string, priority: Priority) => void;
};

export default function TaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Priority>('med');

    function submit(event: React.FormEvent){
        event.preventDefault();
        const t = title.trim();
        if(!t) return;
        onAdd(t, priority);
        setTitle('');
        setPriority('med');
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setPriority(event.target.value as Priority);
    }

    return (
        <form onSubmit={ submit } style={{ display: 'grid', gap:8, gridTemplateColumns: '1fr auto auto'}}>
            <input
                placeholder={ "Новая задача" }
                value={ title }
                onChange={ handleTitleChange }
                aria-label={ "Название задачи" }
            />
            <select value={ priority }
                    onChange={ handleSelectChange }
                    aria-label={ "Приоритет" }>
                <option value={'low'}></option>
                <option value={'med'}></option>
                <option value={'high'}></option>
            </select>
            <button type="submit">Добавить</button>
        </form>
    );
}