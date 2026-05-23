import { useRef, useState } from 'react'

interface Props {
  label: string
  year: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function CollectionItem({ label, year, onMouseEnter, onMouseLeave }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    videoRef.current?.play()
    onMouseEnter()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    onMouseLeave()
  }

  return (
    <div className="collectionItem" role="listitem">
      <div
        className="videoPreviewWrapper container"
        style={{ display: 'flex', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease' }}
      >
        <div className="popupbg" />
        <div className="previewFrame">
          <video ref={videoRef} className="video" style={{ objectFit: 'contain', overflow: 'hidden', maxHeight: '81vh', maxWidth: '80vw' }} loop muted playsInline preload="auto">
            <source src="" type="video/mp4"/>
          </video>
        </div>
      </div>
      <div
        className="navButtonBlock"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="navButton">{label}</span>
        <span className="navButtonYear">{year}</span>
      </div>
    </div>
  )
}
