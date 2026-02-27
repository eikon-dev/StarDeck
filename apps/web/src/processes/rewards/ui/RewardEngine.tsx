import useLongRewardEngine from "../model/useLongRewardEngine.ts";
import useDailyRewardEngine from "../model/useDailyRewardEngine.ts";
//reward-pipeline когда наград станет больше
export function RewardEngine() {
  useLongRewardEngine();
  useDailyRewardEngine();

  return null;
}