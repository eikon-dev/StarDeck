import useLongRewardEngine from "./useLongRewardEngine.ts";
import useDailyRewardEngine from "./useDailyRewardEngine.ts";
//reward-pipeline когда наград станет больше
export default function RewardEngine() {
    useLongRewardEngine();
    useDailyRewardEngine();

    return null;
}