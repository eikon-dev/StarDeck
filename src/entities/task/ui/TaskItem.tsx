import { type Task } from '@/entities/task';
import {Button} from "@/shared/ui/button.tsx";
import {Checkbox} from "@/shared/ui/checkbox.tsx";
import {PRIORITY_LABEL} from "@/entities/task/model/priorityLabel.ts";
import {Badge} from "@/shared/ui/badge.tsx";
import {cn} from "@/shared/lib";
import {Accordion, AccordionContent, AccordionTrigger} from "@/shared/ui/accordion.tsx";
import {AccordionItem} from "@/shared/ui/accordion.tsx";

type Props = {
    task: Task,
    onToggle: (id: string) => void,
    onDelete: (id: string) => void,
}

export default function TaskItem({task, onDelete, onToggle}: Props) {

    const {title, done, description, priority} = task;

    return (
        <Accordion className="w-full" type="single" collapsible>
            <AccordionItem
                value="item-1"
                className={cn(
                    "rounded-xl border border-white/10 bg-slate-900/35 backdrop-blur-md",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(255,255,255,0.04)]",
                    "hover:border-white/15 hover:bg-slate-900/45",
                    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(139,92,246,0.08)]",
                    "data-[state=open]:border-white/20 data-[state=open]:bg-slate-900/50",
                    "data-[state=open]:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(255,255,255,0.08),0_0_22px_rgba(139,92,246,0.12)]",
                    done && "border-white/8 bg-slate-900/25",
                )}
            >
                <div className="flex items-center gap-3 px-3 py-2.5 ">
                    <Checkbox checked={done} onCheckedChange={() => onToggle(task.id)} variant={done ? "checked" : "unchecked"} />

                    <span className={cn("min-w-0 flex-1 truncate text-sm", done ? "text-white/40 line-through" : "text-white/90 font-medium")}>
                        {title}
                    </span>

                    <Badge className="shrink-0" variant={done ? "completed" : priority}>
                        {PRIORITY_LABEL[priority]}
                    </Badge>

                    <AccordionTrigger
                        className={cn(
                            "ml-1 shrink-0 p-2 text-white/35 hover:text-white/70 transition-colors",
                            "[&>svg]:transition-transform [&>svg]:duration-300",
                            "data-[state=open]:text-white/70 data-[state=open]:[&>svg]:rotate-180"
                        )}
                    />
                </div>

                <AccordionContent className="px-3 pb-3">
                    <div className="rounded-lg border border-white/5 bg-white/3 p-3">
                        <p className="text-sm text-white/55 whitespace-pre-wrap break-words">
                            {description || "Описание пока пустое"}
                        </p>
                        <div className="mt-3 flex justify-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-300/80 hover:text-red-200 hover:bg-red-500/10"
                                onClick={() => onDelete(task.id)}
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

// function playingHolo() {
//     if (holoPlayed) return null;
//
//     useTasksStore.setState(s => ({
//             ...s,
//             tasks: s.tasks.map(t => t.id === task.id ? {...t, holoActive: true, holoPlayed: true} : t)
//     }))
//
//     if (holoActive) return;
//
//     window.setTimeout(() => {
//         useTasksStore.setState((s) => {
//             // если задачи уже нет — ничего не делаем
//             if (!s.tasks.some((t) => t.id === task.id)) return s;
//
//             return {
//                 ...s,
//                 tasks: s.tasks.map((t) =>
//                     t.id === task.id ? { ...t, holoActive: false } : t
//                 ),
//             };
//         });
//     }, 4500);
// }