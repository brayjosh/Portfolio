import { useRef, useState, useEffect } from 'react'

interface Props {
  label: string
  year: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function CollectionItem({ label, year, onMouseEnter, onMouseLeave }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    setIsMobile(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const showVideo = () => {
    setIsHovered(true)
    videoRef.current?.play()
    onMouseEnter()
  }

  const hideVideo = () => {
    setIsHovered(false)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    onMouseLeave()
  }

  const handleClick = () => {
    if (isHovered) {
      hideVideo()
    } else {
      showVideo()
    }
  }

  return (
    <div className="collectionItem" role="listitem">
      <div className="linkForProject" style={{ opacity: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '24px' }}>
          <text style={{ fontFamily: 'Segoe UI', opacity: 1, paddingLeft: '8px', fontSize: '14px' }}>
            Link here
          </text>
        </div>
      </div>
      <div className={`videoPreviewWrapper container${isHovered ? ' is-open' : ''}`} style={{ opacity: isHovered ? 1 : 0 }}>
        <img className="closePreviewButton" src="https://cdn.prod.website-files.com/5c58d24c0c3ff625822bee4b/6265e3642fe049989c180c39_22-closeBtn.svg" loading="lazy" alt="Close button" onClick={hideVideo}/>
        <div className="popupbg" />
        <div className="previewFrame">
          <video ref={videoRef} className="video" style={{ objectFit: 'contain', overflow: 'hidden', maxHeight: '81vh', maxWidth: '80vw' }} loop muted playsInline preload="auto">
            <source src="https://www.dl.dropboxusercontent.com/s/ziy402vw9fnt783/ReshareHub1000bitrate.mp4?dl=0" type="video/mp4"/>
          </video>
        </div>
      </div>
      <div className="navButtonBlock" onMouseEnter={!isMobile ? showVideo : undefined} onMouseLeave={!isMobile ? hideVideo : undefined} onClick={isMobile ? handleClick : undefined}>
        <span className="navButton">{label}</span>
        <span className="navButtonYear">{year}</span>
      </div>
    </div>
  )
}
