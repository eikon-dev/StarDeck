import type {Task} from "../types/task.ts";
import {PRIORITY_LABEL} from "../constants/priorityLabel.ts";

type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function TaskItem({task, onToggle, onRemove}: Props) {

    function handleToggle() {
        onToggle(task.id)
    }

    function handleDelete() {
        onRemove(task.id)
    }

    return (
        <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 10px',
            border: '1px solid #333',
            borderRadius: 8
        }}>
            <input
                type="checkbox"
                checked={task.done}
                onChange={handleToggle}
                aria-label="Отметить как выполненную"
            />
            <span style={{flex: 1, textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1}}>
            {task.title}
          </span>
            <small style={{opacity: 0.7}}>{PRIORITY_LABEL[task.priority]}</small>
            <button onClick={handleDelete} aria-label="Удалить Задачу">Удалить</button>
        </li>
    );
}