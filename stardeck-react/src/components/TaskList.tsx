import TaskItem from "./TaskItem.tsx";
import type {Task} from "../types/task.ts";

type Props = {
    item: Task[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function TaskList({item, onToggle, onRemove}: Props) {
    if (item.length === 0) {
        return <p style={{opacity: 0.7}}>Пока задач нет - добавь первую ↑</p>;
    }
    return (
        <ul style={{display: 'grid', gap: 8, margin: 0, padding: 0, listStyle: 'none'}}>
            {item.map(t => (
                <TaskItem key={t.id} task={t} onToggle={onToggle} onRemove={onRemove}/>
            ))}
        </ul>
    );
}