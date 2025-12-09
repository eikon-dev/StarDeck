import type {Task} from "@/types/task.ts";
import useTasksStore from "@/store/useTasksStore.ts";
import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
// import {ChevronDown, MoreHorizontal} from "lucide-react";
import {PRIORITY_LABEL} from "@/constants/priorityLabel.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils.ts";
import {Accordion, AccordionContent, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {AccordionItem} from "@/components/ui/accordion.tsx";

type Props = {
    task: Task,
}

export default function TaskItem({task}: Props) {
    const {title, done, description, priority} = task;

    const onRemove = useTasksStore(s => s.removeTask);
    const onToggle = useTasksStore(s => s.toggleTask);

    function onDelete() {
        onRemove(task.id)
    }

    function onToggleDone() {
        onToggle(task.id)
    }
    //TODO: Улучшить позиционирование, решить проблему с переносом строк.
    return (
        <Accordion className={cn("rounded-xl border border-white/5 bg-slate-900/40")} type="single" collapsible>
            <div className="flex items-center gap-3 px-4 py-2 ">
                <AccordionItem value="item-1" className="flex-2 truncate text-sm">
                    <div className="flex flex-3 items-center gap-3">
                        <Checkbox checked={done} onCheckedChange={onToggleDone}/>
                        <AccordionTrigger className="flex items-center truncate text-sm">
                            {title}
                            <Badge
                                className="truncate text-sm "
                                variant="secondary">
                                {PRIORITY_LABEL[priority]}
                            </Badge>
                        </AccordionTrigger>

                    </div>
                    <AccordionContent className="flex items-center gap-3">
                        <p>
                            {description || "Описание пока пустое"}
                        </p>
                        <Button variant="destructive" size="sm" onClick={onDelete}>Удалить</Button>
                    </AccordionContent>
                </AccordionItem>
            </div>
        </Accordion>
    );
}

// <Collapsible
//     open={open}
//     onOpenChange={setOpen}
//     className={cn("rounded-xl border border-white/5 bg-slate-900/40")}>
//     {/* Свернутое состояние — “строка” */}
//     <div className="flex items-center gap-3 px-4 py-2">
//         <Checkbox checked={done} onCheckedChange={onToggleDone}/>
//         <div className="flex-1 truncate text-sm">{title}</div>
//         <Badge
//             className="truncate text-sm"
//             variant="secondary">
//             {PRIORITY_LABEL[priority]}</Badge>
//
//         {/* кнопка раскрытия */}
//         <CollapsibleTrigger asChild>
//             <Button variant="ghost" size="icon">
//                 <ChevronDown className="w-4 h-4"/>
//             </Button>
//         </CollapsibleTrigger>
//     </div>
//
//     {/* Раскрытая часть */}
//     <CollapsibleContent forceMount
//                         className={cn(
//                             " transition-all duration-300 ease-in-out",
//                             open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
//                         )}>
//         <div className="px-4 pb-4 space-y-2 text-sm">
//             <div className="text-sm text-slate-400">Описание</div>
//             <p className="min-h-[3rem] whitespace-pre-wrap">
//                 {description || "Описание пока пустое"}
//             </p>
//
//             <div className="flex items-center justify-end gap-4">
//                 <Button variant="ghost" size="icon">
//                     <MoreHorizontal className="w-4 h-4"/>
//                 </Button>
//                 <Button variant="destructive" size="sm" onClick={onDelete}>
//                     Удалить
//                 </Button>
//             </div>
//         </div>
//     </CollapsibleContent>
// </Collapsible>