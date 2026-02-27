import {RewardEngine} from "@/processes/rewards";
import StarDeckScene from "@/pages/scene/StarDeckScene.tsx";
import ModalTaskForm from "@/widgets/task-model/ui/ModalTaskForm.tsx";
import {ResetDailyEngine} from "@/processes/reset-day";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-deep text-slate-50 flex flex-col">
      <ResetDailyEngine/>

      <RewardEngine/>
      <main className="flex-1 flex items-center justify-center">

        <StarDeckScene/>
        <ModalTaskForm/>
      </main>
    </div>
  );
}