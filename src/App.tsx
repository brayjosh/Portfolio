import { useState } from 'react'
import './index.css'
import { CollectionItem } from './components/CollectionItem'

interface CollectionItemData {
  id: number
  logoSrc: string
  companyName: string
  videoSrc: string
  label: string
  year: string
}

const items: CollectionItemData[] = [
  { id: 1, logoSrc: '/images/power-platform.svg', companyName: 'Power Platform', videoSrc: '/videos/custom-connector.mp4',label: 'Custom Connector', year: '2026' },
  { id: 2, logoSrc: '/images/power-apps.svg', companyName: 'Power Apps', videoSrc: '/videos/pcf.mp4', label: 'PCF', year: '2026' },
  { id: 3, logoSrc: '/images/power-apps.svg', companyName: 'Power Apps', videoSrc: '/videos/colour-canvas-game.mp4', label: 'Power App', year: '2026' },
  { id: 4, logoSrc: '/images/sharepoint.svg', companyName: 'SharePoint Online', videoSrc: '/videos/spfx.mp4', label: 'SPFx', year: '2026' }
]

function App() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return <div className="homeMainColumn">
    <div className="homeLeftColumn">
      <div className="stickyMenu">
        <div>
          <div className="collectionList" role="list">
              {items.map((item) => (
                <CollectionItem key={item.id} logoSrc={item.logoSrc} companyName={item.companyName} videoSrc={item.videoSrc}  label={item.label} year={item.year} hideNavButtons={hoveredId !== null} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)}/>
              ))}
          </div>
        </div>
      </div>
    </div>
    <div className="homeRightColumn widthColumnMedium">
      <div className={`innerRightColumn${hoveredId !== null ? ' hidden' : ''}`}>
        <div className="contentRightColumn">
          <div className="textBlock">
            Joshua Bray,
            <br />
            Developer at
            <span className="link"> </span>
            <a href="https://computacenter.com" target="_blank">
              <span className="link">Computacenter</span>
            </a>
          </div>
        </div>
        <div className="secondaryLink">
          <a href="" target="_blank">About</a>
          <a href="mailto:jborsahy@computacenter.com">Email</a>
          <a href="https://www.linkedin.com/in/brayjosh" target="_blank">LinkedIn</a>
          <a href="https://www.youtube.com/@brayjosh" target="_blank">YouTube</a>
        </div>
      </div>
    </div>
  </div>
}

export default App