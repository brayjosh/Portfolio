import { useRef, useState, useEffect } from 'react'

interface Props {
  logoSrc: string
  technology: string
  videoSrc: string
  label: string
  contribution: string
  hideNavButtons: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function CollectionItem({ logoSrc, technology, videoSrc, label, contribution, hideNavButtons, onMouseEnter, onMouseLeave }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const isMobileLike = isMobile || isTablet

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
  const mouseTransform = !isMobileLike ? `translate3d(${trackingX + 7}vw, ${trackingY}vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)` : undefined

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
          <img src={`${logoSrc}`} style={{ height: '16px' }} />
          <text style={{ fontFamily: 'Segoe UI', opacity: 1, paddingLeft: '8px', fontSize: '14px' }}>
            {technology}
          </text>
        </div>
      </div>
      <div className={`videoPreviewWrapper container${isHovered ? ' is-open' : ''}`} style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease' }}>
        <img className="closePreviewButton" src="/images/close-btn.svg" loading="lazy" alt="Close button" onClick={hideVideo}/>
        <div className="popupbg" onClick={hideVideo} />
        <div className="previewFrame" style={{ willChange: 'transform', transform: mouseTransform, transformStyle: 'preserve-3d' }}>
          <video ref={videoRef} className="video" style={{ objectFit: 'contain', overflow: 'hidden', maxHeight: '81vh', maxWidth: '80vw' }} loop muted playsInline preload="auto">
            <source src={`${videoSrc}`} type="video/mp4"/>
          </video>
        </div>
      </div>
      <div className={`navButtonBlock${hideNavButtons && !isMobileLike ? ' hidden' : ''}`} onMouseEnter={!isMobileLike ? showVideo : undefined} onMouseLeave={!isMobileLike ? hideVideo : undefined} onClick={isMobileLike ? handleClick : undefined} style={{ transition: 'opacity 0.2s ease' }}>
        <span className="navButton labelAndCon">{label}</span>
        <span className="navButtonContribution labelAndCon contributionLabel">{contribution}</span>
      </div>
    </div>
  )
}
