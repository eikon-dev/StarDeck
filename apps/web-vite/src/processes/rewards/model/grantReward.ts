import {useStarsStore} from "@/entities/reward";
import {type NewStarsInput} from "@/entities/reward/model/types";

/*
  TODO: Если появятся cash/api можно сделать Port-Adapters
  const { shouldRewardDaily } = selectDailyStats(tasks);
  тот кто использует функцию должен сам отслеживать shouldRewardDaily
  тут только пытаемся выдать награду
  Store проверяет на дубли,
  отдаем результат выдали/не выдали
*/

export function grantReward(props: NewStarsInput) {
  return useStarsStore.getState().addReward(props);
}