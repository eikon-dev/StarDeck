import './index.css';
// import s from "./App.module.css";
import RewardEngine from "./engines/RewardEngine.tsx";
import StarDeckScene from "./components/NewUIDev/scene/StarDeckScene.tsx";

// Уже внедряю графику

export default function App() {
    return (
        <>
            <RewardEngine/>

            <StarDeckScene/>
        </>
    );
}
