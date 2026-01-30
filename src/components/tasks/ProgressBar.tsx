import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import selectorDailyStats from "@/selectors/selectorDailyStats";
import useTasksStore from "@/store/useTasksStore";

export default function ProgressBar() {
    //TODO: current version v1 wait v2
    //TODO: Переработать визуальный стиль, расположение, добавить эффекты заполнения прогресса

    const tasks = useTasksStore(s => s.tasks);
    const { totalDaily, doneDaily } = selectorDailyStats(tasks);

    const progress = totalDaily > 0 ? Math.round((doneDaily / totalDaily) * 100) : 0;

    return (
        <div>
            <Field className="w-full max-w-sm">
                <FieldLabel htmlFor="progress-upload">
                    <span>Прогресс выполнения</span>
                    <span className="ml-auto">{doneDaily} из {totalDaily}</span>
                </FieldLabel>
                <Progress
                    value={progress}
                    id="progress-upload"
                    className="h-6 [&>div]:bg-green-500 bg-bg-deep"
                />
            </Field>
        </div>
    );
}