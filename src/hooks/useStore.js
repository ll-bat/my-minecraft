import create from 'zustand'
import {nanoid} from "nanoid"

const storage = localStorage
const CUBES_LEN = 80
const CUBE_DELTA = 360
let counter = 0

function nextPos(i) {
    i++;
    if (i === CUBES_LEN) {
        i = 0;
    }
    return i;
}

function createPos(i, _3d = false) {
    // let currentCounter = counter;
    // counter++;

    // const toAdd = Math.abs(CUBE_DELTA / 2 - (currentCounter % CUBE_DELTA))

    return [
        i * (Math.cos(i)),
        i * (Math.sin(i)) + 50,
        _3d
            ? -i * (Math.sin(i * Math.PI / 100)) - 400
            : -150
    ]
}

function createCube(i) {
    const texture = 'dirt';
    return {
        key: nanoid(),
        pos: createPos(i),
        texture: texture,
        index: i,
    }
}

function updateCube(i, updateCubeCallback) {
    updateCubeCallback.call(
        this,
        i,
        createPos(i)
    )
}

export const useStore = create((set, get) => ({
    texture: 'dirt',
    cubes: (function () {
        const cubes = []
        setTimeout(() => {
            let i = 0;
            // for (let ind = 0; ind < CUBES_LEN; ind++) {
            //     setInterval(function tmpInterval() {
            //         i = nextPos(i)
            //         updateCube.call(this,
            //             i,
            //             get().updateCubePos
            //         )
            //     }, 200)
            // }
            if (false) {
                const addCube = () => {
                    if (i === CUBES_LEN) {
                        return true;
                    }
                    const pos = createPos(i++)
                    get().addCube(...pos, i)
                    return false;
                }
                const createCubeInterval = setInterval(() => {
                    const finish = addCube()
                    if (finish) {
                        clearInterval(createCubeInterval)
                        startMoving()
                    }
                }, 0)
                const startMoving = () => {
                    const movingInterval = setInterval(() => {
                        const cubes = get().cubes
                        if (cubes.length < 2 * CUBES_LEN) {
                            for (let ind = 0; ind < cubes.length; ind++) {
                                const cube = cubes[ind]
                                const newCube = createCube(cube.index + 1)
                                get().updateCube(ind, newCube)
                            }
                            get().addCube(...createPos(0), 0)
                        } else {
                            clearInterval(movingInterval)
                            removeCubes()
                        }
                    }, 10)

                    const removeCubes = () => {
                        const cubes = get().cubes
                        let ind = 0;
                        const removeCubesInterval = setInterval(() => {
                            get().removeCube(...cubes[ind++].pos)
                            if (ind === 2 * CUBES_LEN) {
                                clearInterval(removeCubesInterval)
                                createStaticCubes()
                            }
                        }, 10)
                    }
                }
            }

            const createStaticCubes = () => {
                const addCube = get().addCube
                for (let i = 0; i < 10 * CUBES_LEN; i++) {
                    setTimeout(() => {
                        addCube(...createPos(i, true), i)
                    }, i)
                }
            }

            if (true) {
                createStaticCubes()
            }


        })

        return cubes
    })(),
    updateCube: (index, newCube) => {
        set((prev) => {
            const cubes = prev.cubes.slice()
            cubes[index] = newCube
            return {
                cubes
            }
        })
    },
    addCube: (x, y, z, index) => {
        set((prev) => {
            const cubes = [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture,
                    index: index,
                }
            ]
            return {
                cubes
            }
        })
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
        set(_ => ({
            texture
        }))
    },
    saveWorld: () => {
        set((store) => {
            storage.setItem("cubes", JSON.stringify(store.cubes))
            return store;
        })
    },
    resetWorld: () => {
        set((store) => {
            storage.setItem("cubes", JSON.stringify([]))
            return store;
        })
    },
}))