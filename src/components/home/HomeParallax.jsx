const HomeParallax = ({ scrollY }) => (
  <div className="global-parallax-system" aria-hidden="true">
    <div className="p-layer p-layer-1" style={{ transform: `translateY(${scrollY * 0.15}px)` }}></div>
    <div className="p-layer p-layer-2" style={{ transform: `translateY(${scrollY * 0.35}px)` }}></div>
    <div className="p-layer p-layer-3" style={{ transform: `translateY(${scrollY * 0.55}px)` }}></div>
    <div className="p-overlay-gradient"></div>
  </div>
)

export default HomeParallax
