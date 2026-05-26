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
  const [isTablet, setIsTablet] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    setIsMobile(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 991px)')
    setIsTablet(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const trackingX = (mousePos.x / window.innerWidth - 0.5) * 20
  const trackingY = (mousePos.y / window.innerHeight - 0.5) * 10
  const mouseTransform = !isTablet? `translate3d(${trackingX + 10}vw, ${trackingY}vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)` : undefined

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
      <div className="linkForProject" style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease', willChange: 'transform', transform: mouseTransform, transformStyle: 'preserve-3d' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '24px' }}>
          <img src="https://cdn.prod.website-files.com/5c58d24c0c3ff685c32bee79/626f6f6589d043962eba9989_Instagram.png" style={{ height: '16px' }} />
          <text style={{ fontFamily: 'Segoe UI', opacity: 1, paddingLeft: '8px', fontSize: '14px' }}>
            Link here
          </text>
        </div>
      </div>
      <div className={`videoPreviewWrapper container${isHovered ? ' is-open' : ''}`} style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease' }}>
        <img className="closePreviewButton" src="https://cdn.prod.website-files.com/5c58d24c0c3ff625822bee4b/6265e3642fe049989c180c39_22-closeBtn.svg" loading="lazy" alt="Close button" onClick={hideVideo}/>
        <div className="popupbg" onClick={hideVideo} />
        <div className="previewFrame" style={{ willChange: 'transform', transform: mouseTransform, transformStyle: 'preserve-3d' }}>
          <video ref={videoRef} className="video" style={{ objectFit: 'contain', overflow: 'hidden', maxHeight: '81vh', maxWidth: '80vw' }} loop muted playsInline preload="auto">
            <source src="https://www.dl.dropboxusercontent.com/s/ziy402vw9fnt783/ReshareHub1000bitrate.mp4?dl=0" type="video/mp4"/>
          </video>
        </div>
      </div>
      <div className="navButtonBlock" onMouseEnter={!isMobile ? showVideo : undefined} onMouseLeave={!isMobile ? hideVideo : undefined} onClick={isMobile ? handleClick : undefined}>
        <span className="navButton labelAndYear">{label}</span>
        <span className="navButtonYear labelAndYear">{year}</span>
      </div>
    </div>
  )
}
