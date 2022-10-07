import create from 'zustand'
import {nanoid} from "nanoid"

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [
        {
            key: nanoid(),
            pos: [1, 0, 2],
            texture: 'dirt',
        },
        {
            key: nanoid(),
            pos: [2, 0, 2],
            texture: 'dirt',
        }
    ],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture,
                }
            ]
        }))
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos
                return !(x === X && y === Y && z === Z)
            })
        }))
    },
    setTexture: (texture) => {
        set((prev) => ({
            texture
        }))
    },
    saveWorld: () => {},
    resetWorld: () => {},
}))