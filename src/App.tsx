import { useState } from 'react'
import './index.css'
import { CollectionItem } from './components/CollectionItem'

interface CollectionItemData {
  id: number
  label: string
  year: string
  videoId: string
}

const items: CollectionItemData[] = [
  { id: 1, label: 'UK Police - Custom Connector', year: '2026', videoId: 'MFRV32xG6RE' },
  { id: 2, label: 'Traffic Light - PCF', year: '2026', videoId: '' }
]

function App() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return <div className="homeMainColumn">
    <div className="homeLeftColumn">
      <div className="stickyMenu">
        <div>
          <div className="collectionList" role="list">
              {items.map((item) => (
                <CollectionItem
                  key={item.id}
                  label={item.label}
                  year={item.year}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
    <div className="homeRightColumn">
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
          <a href="https://www.youtube.com/@joshua-bray" target="_blank">YouTube</a>
        </div>
      </div>
    </div>
  </div>
}

export default App