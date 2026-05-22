interface Props {
  label: string
  year: string
  videoId: string
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function CollectionItem({ label, year, videoId, isHovered, onMouseEnter, onMouseLeave }: Props) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playlist=${videoId}`

  return (
    <>
      <div
        className="collectionItem"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span className="collectionItemLabel">{label}</span>
        <span className="collectionItemYear">{year}</span>
      </div>
      {isHovered && (
        <div className="videoModal">
          <iframe
            src={embedUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={label}
          />
        </div>
      )}
    </>
  )
}
