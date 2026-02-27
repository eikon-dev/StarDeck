import useBottomPanelUiStore from "@/widgets/bottom-panel/model/useBottomPanelUiStore.ts";
import {Button} from "@/shared/ui/button.tsx";
import {cn} from "@/shared/lib";
import TaskListContainer from "@/widgets/task-list/ui/TaskListContainer";
import {ProgressBarContainer} from "@/widgets/progress-bar/ui/ProgressBarContainer";

export default function BottomPanel() {
  const isOpenPanel = useBottomPanelUiStore(s => s.isOpenPanel);
  const togglePanel = useBottomPanelUiStore(s => s.togglePanel);
  const openTaskForm = useBottomPanelUiStore(s => s.openModal);

  return (

    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30",
        "max-w-3xl mx-auto",                                // прибили книзу
        "h-[76vh] rounded-t-3xl",                           // скругление сверху
        "border border-t border-white/10",                // тонкая рамка
        "bg-bg-panel/95 backdrop-blur-sm",                  // тёмный фон + blur
        "shadow-[0_-24px_60px_rgba(0,0,0,0.8)]",            // тень сверху
        "transition-transform duration-500",                // плавный выезд
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center ">
          <h2 className="text-xs uppercase tracking-[0.25em] text-white/60">
            Ежедневные · Долговременные
          </h2>
          {/* тут потом можно добавить счётчик задач, фильтры и т.п. */}
        </div>

        <Button
          onClick={openTaskForm}
          className="m-4 p-2 self-stretch text-xs uppercase tracking-[0.18em]"
        >
          Добавить задачу
        </Button>

        <div className="pl-4 max-w-1/2">
          <ProgressBarContainer/>
        </div>

        <div className="p-4 max-h-[50vh] overflow-y-auto">
          <TaskListContainer/>
        </div>
      </div>
    </div>
  );
}