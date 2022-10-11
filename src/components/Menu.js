import {useStore} from "../hooks/useStore";

export const Menu = () => {
    const [saveWorld, resetWorld] = useStore((store) => [store.saveWorld, store.resetWorld])
    return (
        <>
            <div className='menu'>
                <button onClick={saveWorld()}> Save </button>
                <button onClick={resetWorld()}> Reset </button>
            </div>
        </>
    )
}