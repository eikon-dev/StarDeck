import {type Task} from '@/entities/task';

interface DailyStats {
  totalDaily: number;
  doneDaily: number;
  shouldRewardDaily: boolean;
}

export function selectDailyStats(tasks: Task[]): DailyStats {
  const dailyTasks = tasks.filter(t => t.cycle === 'daily');
  const totalDaily = dailyTasks.length;
  const doneDaily = dailyTasks.filter(t => t.done).length;
  const shouldRewardDaily = totalDaily > 0 && doneDaily === totalDaily;

  return {
    totalDaily,
    doneDaily,
    shouldRewardDaily,
  }
}
