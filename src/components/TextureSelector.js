import {useEffect, useState} from "react";
import {useStore} from "../hooks/useStore";
import {useKeyboard} from "../hooks/useKeyboard";
import {dirtImg, grassImg, glassImg, logImg, woodImg} from "../images/images.js"

const imagesMap = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    log: logImg,
    wood: woodImg
}

export const TextureSelector = () => {
    const [visible, setVisible] = useState(false)
    const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture])

    const boxes = useKeyboard()

    useEffect(() => {
        for (const textureType in boxes) {
            if (boxes[textureType]) {
                console.log(textureType)
                setTexture(textureType)
            }
        }
    }, [boxes.dirt, boxes.grass, boxes.glass, boxes.wood, boxes.log])

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false)
        }, 250)
        setVisible(true)
        return () => {
            clearTimeout(visibilityTimeout)
        }
    }, [activeTexture])

    return (
        <>
            {visible && (
                <div className='absolute centered'>
                    {Object.entries(imagesMap).map(([k, src]) => {
                      return (
                          <img
                              key={k}
                              src={src}
                              alt={k}
                              width='100px'
                              height='100px'
                              className={`${activeTexture === k ? 'active-texture' : 'non-active-texture'}`}
                              />
                      )
                    })}
                </div>
            )}
        </>
    )
}