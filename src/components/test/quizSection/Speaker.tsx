import React, {useRef, useState} from 'react'
import Image from 'next/image'
import styles from './QuizSection.module.css'

function Speaker({file}:{file:string}) {
  const speaker = useRef<HTMLAudioElement|null>(null)
  const [available, setAvailable] = useState(2)
  const isAvailable = available > 0
  const listenHint = () => {
    if (!isAvailable) return
    setAvailable((prev) => prev - 1)
    speaker.current?.play()
  }

  return (
    <>
      <div className={'absolute right-[0px] bottom-[16px]'} onClick={listenHint}>
        <div className={styles.badge}>{available}</div>
        {isAvailable ? (
          <Image src={'/icon/speaker.svg'} width={64} height={64} alt={'hint_speaker'} />
        ) : (
          <Image src={'/icon/speaker_disabled.svg'} width={64} height={64} alt={'hint_disabled'} />
        )}
      </div>

      <audio ref={speaker} src={file} type="audio/wav"/>
    </>
  )
}

export default Speaker
