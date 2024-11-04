import React from 'react';
import ServiceCard from './services/ServiceCards';

const Services = () => {
    const services = [
        {
            title: "Architectural Consultation",
            imgSrc: "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg"
        },
        {
            title: "Construction Management",
            imgSrc: "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg"
        },
        {
            title: "Real Estate Expert",
            imgSrc: "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg"
        },
        {
            title: "Renovation and Remodeling",
            imgSrc: "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg"
        }
    ];

    return (
        <>
        <div className="p-3">
            <div className="accordion" id="servicesAccordion">
            {services.map((service, index) => (
                <ServiceCard 
                    key={index} 
                    title={service.title} 
                    imgSrc={service.imgSrc} 
                    index={index} 
                />
            ))}
        </div>
        </div>
        </>
    );
};

export default Services;
