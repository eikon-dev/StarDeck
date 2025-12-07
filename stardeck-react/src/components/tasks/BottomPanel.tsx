import TaskList from "./TaskList.tsx";
import useUiStore from "../../store/useUiStore.ts";
import {Button} from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

export default function BottomPanel() {
    const isOpenPanel = useUiStore(s => s.isOpenPanel);
    const togglePanel = useUiStore(s => s.togglePanel);
    const openTaskForm = useUiStore(s => s.openModal);

    return (

        <div
            className={cn(
                "fixed inset-x-0 bottom-0 z-30",
                "max-w-3xl mx-auto",              // прибили к низу
                "h-[70vh] rounded-t-3xl",                  // скругление сверху
                "border border-t border-white/10",             // тонкая рамка
                "bg-bg-panel/95 backdrop-blur-sm",            // тёмный фон + blur
                "shadow-[0_-24px_60px_rgba(0,0,0,0.8)]",       // тень сверху
                "transition-transform duration-500",           // плавный выезд
                isOpenPanel ? "translate-y-0" : "translate-y-[96%]" // открыта/закрыта
            )}
        >
            <button
                type="button"
                onClick={togglePanel}
                className="mx-auto mt-2 mb-3 block h-1.5 w-12 rounded-full bg-white/20 hover:bg-white/40"
            >
                {/* пусто, это просто полоска */}
            </button>
            <div className="px-4 pb-6 pt-1 flex flex-col gap-4">
                <div className="flex flex-col items-center ">
                    <h2 className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Ежедневные · Долговременные
                    </h2>
                    {/* тут потом можно добавить счётчик задач, фильтры и т.п. */}
                </div>

                <Button
                    onClick={openTaskForm}
                    className="self-stretch text-xs uppercase tracking-[0.18em]"
                >
                    Добавить задачу
                </Button>

                <div className="mt-2 max-h-[50vh] overflow-y-auto pr-1">
                    <TaskList />
                </div>
            </div>
        </div>

    );
}