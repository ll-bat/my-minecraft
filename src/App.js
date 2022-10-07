import {Canvas} from "@react-three/fiber";
import {Sky} from "@react-three/drei";
import {Physics} from "@react-three/cannon";
import {Ground} from "./components/Ground";
import {Player} from "./components/Player";
import {FPV} from "./components/FPV";
import {Cubes} from "./components/Cubes";
import {TextureSelector} from "./components/TextureSelector";

function App() {
    return (
        <>
            <Canvas>
                <Sky sunPosition={[100, 100, 200]}/>
                <ambientLight intensity={.4}/>
                <FPV/>
                <Physics>
                    <Cubes/>
                    <Player/>
                    <Ground/>
                </Physics>
            </Canvas>
            <TextureSelector/>
            <div className='absolute centered cursor'/>
        </>
    )
}

export default App