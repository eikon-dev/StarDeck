import useLongRewardEngine from "./useLongRewardEngine.ts";
import useDailyRewardEngine from "./useDailyRewardEngine.ts";

export default function RewardEngine() {
    useLongRewardEngine();
    useDailyRewardEngine();

    return null;
}