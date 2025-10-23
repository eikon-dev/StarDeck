import type {Priority} from "../types/task.ts";
import {useState} from "react";
import React from "react";

type Props = {
    onFilterChange: (priority: Priority | 'all') => void;
};

export default function TaskFilter({onFilterChange}: Props) {
    const [priority, setPriority] = useState<Priority | 'all'>('all');

    function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value as Priority | 'all';
        setPriority(value);
        onFilterChange(value);
    }

    return (
        <select
            value={priority}
            onChange={handlePriorityChange}>
            <option value={'all'}>All</option>
            <option value={'low'}>Low</option>
            <option value={'med'}>Med</option>
            <option value={'high'}>High</option>
        </select>
    );
}