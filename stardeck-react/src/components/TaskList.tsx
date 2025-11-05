import TaskItem from "./TaskItem.tsx";
import type {Task} from "../types/task.ts";
import { useMemo } from 'react';
import s from "./TaskList.module.css";

type Props = {
    tasks: Task[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function TaskList({tasks, onToggle, onRemove}: Props) {

    const {daily, long} = useMemo(() => {
        const daily: Task[] = [];
        const long: Task[] = [];

        for (const t of tasks) (t.cycle === "daily" ? daily : long).push(t);

        const sort = (a: Task, b: Task) =>
            Number(a.done) - Number(b.done) || b.createdAt - a.createdAt;

        daily.sort(sort);
        long.sort(sort);

        return { daily, long };
    }, [tasks])

    if (tasks.length === 0) {
        return <p style={{opacity: 0.7}}>Пока задач нет - добавь первую ↑</p>;
    }
    return (
        <div className={s.grid}>
            <section className={s.column}>
                <div className={s.headingRow}>
                    <h3 className={s.heading}>Ежедневные</h3>
                    <span className={s.count}>{daily.length}</span>
                </div>
                {daily.length ? (
                    <ul className={s.list}>
                        {daily.map(t => (
                            <TaskItem key={t.id} task={t}  onToggle={onToggle} onRemove={onRemove} />
                        ))}
                    </ul>
                ) : (
                    <p className={s.empty}>Нет ежедневных задач</p>
                )}
            </section>

            <section className={s.column}>
                <div className={s.headingRow}>
                    <h3 className={s.heading}>Долгосрочные</h3>
                    <span className={s.count}>{long.length}</span>
                </div>
                {long.length ? (
                    <ul className={s.list}>
                        {long.map(t => (
                            <TaskItem key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />
                        ))}
                    </ul>
                ) : (
                    <p className={s.empty}>Нет долгосрочных задач</p>
                )}
            </section>
        </div>
    );
}