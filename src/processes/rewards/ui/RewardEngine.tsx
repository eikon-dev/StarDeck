import useLongRewardEngine from "../model/useLongRewardEngine.ts";
import useDailyRewardEngine from "../model/useDailyRewardEngine.ts";
//reward-pipeline когда наград станет больше
export default function RewardEngine() {
  useLongRewardEngine();
  useDailyRewardEngine();

  return null;
}