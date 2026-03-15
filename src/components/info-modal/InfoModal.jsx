import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './InfoModal.css';

const InfoModal = ({ isOpen, onClose, data, type }) => {
    useEffect(() => {
        if (isOpen && data) {
            const overlay = document.querySelector('.modal-overlay');
            if (overlay) overlay.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen, data]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen || !data) return null;

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content magic-border" onClick={e => e.stopPropagation()}>
                <div className="modal-bg-pattern"></div>
                <button className="close-button" onClick={onClose}>&times;</button>
                
                <div className="modal-grid">
                    <div className="modal-image-col">
                        <img src={data.image} alt={data.name || data.title} />
                    </div>
                    
                    <div className="modal-info-col">
                        <h1>{data.name || data.title}</h1>
                        
                        <div className="stat-pills">
                            {type === 'character' && (
                                <>
                                    <span className="stat-pill">{data.race}</span>
                                    <span className="stat-pill gold">{data.role}</span>
                                </>
                            )}
                            {type === 'item' && <span className="stat-pill red">Reliquia Legendaria</span>}
                            {type === 'game' && <span className="stat-pill gold">{data.year}</span>}
                        </div>

                        <div className="modal-stats">
                            <p className="modal-desc">"{data.description}"</p>
                            
                            {type === 'character' && (
                                <>
                                    <div className="modal-section">
                                        <h3>Habilidades</h3>
                                        <ul>
                                            {data.abilities?.map((a, i) => <li key={i}>{a}</li>)}
                                        </ul>
                                    </div>
                                    <div className="modal-origin">
                                        <strong>Visto en:</strong> {data.game}
                                    </div>
                                </>
                            )}

                            {type === 'item' && (
                                <div className="modal-section">
                                    <h3>Poder Ancestral</h3>
                                    <p className="function-text">{data.function}</p>
                                </div>
                            )}

                            {type === 'game' && (
                                <>
                                    <div className="modal-section">
                                        <h3>Plataformas</h3>
                                        <div className="platforms-list">
                                            {data.availablePlatforms?.slice(0, 6).map((p, i) => <span key={i} className="stat-pill">{p}</span>)}
                                        </div>
                                    </div>
                                    <div className="modal-rating">
                                        Calificación: <span className="gold-text">{data.rating}/100</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.getElementById('modal-root'));
};

export default InfoModal;
