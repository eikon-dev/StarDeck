import {selectDailyStats, useTasksStore} from "@/entities/task";
import ProgressBarView from "@/widgets/progress-bar/ui/ProgressBarView";

export function ProgressBarContainer() {
  const tasks = useTasksStore(s => s.tasks);
  const {totalDaily, doneDaily} = selectDailyStats(tasks);

  const progress = totalDaily > 0 ? Math.round((doneDaily / totalDaily) * 100) : 0;

  return (
    <ProgressBarView progress={progress} doneDaily={doneDaily} totalDaily={totalDaily}/>
  )
}