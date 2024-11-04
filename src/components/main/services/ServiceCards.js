
export default function ServiceCard ({ title, imgSrc, index }){
  return (  
    <div className="card mb-3 border-0 border-bottom rounded-0">
    <div 
        className="card-header border-0" 
        id={`heading${index}`} 
        data-bs-toggle="collapse" 
        data-bs-target={`#collapse${index}`} 
        aria-expanded="false" 
        aria-controls={`collapse${index}`}
        style={{ cursor: 'pointer' }}
    >
        <h5 className="mb-0">{title}</h5>
    </div>
    <div 
        id={`collapse${index}`} 
        className="collapse" 
        aria-labelledby={`heading${index}`} 
        data-bs-parent="#servicesAccordion"
    >
        <div className="card-body">
            <div 
                className="position-relative" 
                style={{ height: '200px', overflow: 'hidden' }}
            >
                <img
                    src={imgSrc}
                    alt={title}
                    className="img-fluid position-absolute"
                    style={{
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.25rem',
                        objectFit: 'cover',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                    }}
                />
                <div 
                    className="hover-overlay"
                    onMouseEnter={(e) => {
                        const img = e.currentTarget.previousElementSibling;
                        if (img) img.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                        const img = e.currentTarget.previousElementSibling;
                        if (img) img.style.opacity = 0;
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.25rem',
                    }}
                />
            </div>
        </div>
    </div>
</div>
    )
};

