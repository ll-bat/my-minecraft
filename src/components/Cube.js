import {useBox} from "@react-three/cannon"
import * as textures from "../images/textures.js";
import {useStore} from "../hooks/useStore";


export const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position
    }))

    const activeTexture = textures[texture + 'Texture']
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

    return (
        <mesh
            onClick={(e) => {
                e.stopPropagation();
                const clickedFace = Math.floor(e.faceIndex / 2)
                const [x, y, z] = ref.current.position
                if (e.altKey) {
                    removeCube(x, y, z);
                    return
                }
                if (clickedFace === 0) {
                    addCube(x + 1, y, z);
                } else if (clickedFace === 1) {
                    addCube(x - 1, y, z);
                } else if (clickedFace === 2) {
                    addCube(x, y + 1, z);
                } else if (clickedFace === 3) {
                    addCube(x - 1, y, z);
                } else if (clickedFace === 4) {
                    addCube(x, y, z + 1);
                } else if (clickedFace === 5) {
                    addCube(x, y, z - 1);
                }
                console.log(clickedFace)
            }}
            ref={ref}>
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial map={activeTexture} />
        </mesh>
    )
}