import RewardEngine from "./engines/RewardEngine.tsx";
import StarDeckScene from "@/components/scene/StarDeckScene.tsx";
import ModalTaskForm from "@/components/tasks/ModalTaskForm.tsx";

// Уже внедряю графику

export default function App() {
    return (
        <div className="min-h-screen bg-bg-deep text-slate-50 flex flex-col">
            <RewardEngine/>
            <main className="flex-1 flex items-center justify-center">
                
                <StarDeckScene/>
                <ModalTaskForm/>
            </main>
        </div>
    );
}
