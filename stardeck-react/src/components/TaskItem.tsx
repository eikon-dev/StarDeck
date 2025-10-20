import type { Task } from "../types/task.ts";

type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onRemove }: Props) {
    return (
      <li style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', border:'1px solid #333', borderRadius:8 }}>
        <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
            aria-label="Отметить как выполненную"
        />
          <span style={{ flex:1, textDecoration: task.done ? 'line-though' : 'none', opacity: task.done ? 0.6 : 1}}>
            {task.title}
          </span>
          <small style={{ opacity: 0.7 }}>{task.priority}</small>
          <button onClick={() => onRemove(task.id)}>Удалить</button>
      </li>
    );
}