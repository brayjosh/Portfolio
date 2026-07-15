import { useState } from 'react'
import './index.css'
import { CollectionItem } from './components/CollectionItem'

interface CollectionItemData {
  id: number
  logoSrc: string
  technology: string
  videoSrc: string
  label: string
  contribution: string
}

const items: CollectionItemData[] = [
  { id: 1, logoSrc: '/images/power-platform.svg', technology: 'Power Platform', videoSrc: '/videos/custom-connector.mp4',label: 'Police UK', contribution: 'microsoft/PowerPlatformConnectors' },
  { id: 2, logoSrc: '/images/power-apps.svg', technology: 'Power Apps', videoSrc: '/videos/pcf.mp4', label: 'Traffic Light', contribution: 'pcf.gallery' },
  { id: 3, logoSrc: '/images/power-apps.svg', technology: 'Power Apps', videoSrc: '/videos/colour-canvas-game.mp4', label: 'Colour', contribution: 'pnp/powerplatform-samples' },
  { id: 4, logoSrc: '/images/sharepoint.svg', technology: 'SharePoint Online', videoSrc: '/videos/spfx.mp4', label: 'Power Platform Environments', contribution: 'pnp/sp-dev-fx-webparts' }
]

function App() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return <div className="homeMainColumn">
    <div className="homeLeftColumn">
      <div className="stickyMenu">
        <div>
          <div className="collectionList" role="list">
              {items.map((item) => (
                <CollectionItem key={item.id} logoSrc={item.logoSrc} technology={item.technology} videoSrc={item.videoSrc}  label={item.label} contribution={item.contribution} hideNavButtons={hoveredId !== null} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)}/>
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
          <a href="mailto:jborsahy@computacenter.com">Email</a>
          <a href="https://www.linkedin.com/in/brayjosh" target="_blank">LinkedIn</a>
          <a href="https://github.com/brayjosh" target="_blank">GitHub</a>
          <a href="https://www.youtube.com/@brayjosh" target="_blank">YouTube</a>
        </div>
      </div>
    </div>
  </div>
}

export default App