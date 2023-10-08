import React from 'react';

function ResultCard({ result }) {
    // Cette fonction divise le résultat en un tableau de sections.
    const splitResultsByLink = (result) => {
        const sections = [];
        let linkPattern = /(\[.*?\])\((https:\/\/www\.google\.com\/maps\/.*?)\)/g;

        let splitContent = result.split(linkPattern).filter(Boolean);

        splitContent.forEach((item, idx) => {
            if (idx % 3 === 0) {
                sections.push([]);
            }
            sections[sections.length - 1].push(item.trim());
        });

        return sections;
    };

    const sections = splitResultsByLink(result);

    return (
        <>
            {sections.map((section, idx) => (
                <div key={idx} className="card mb-4">
                    <div className="card-body">
                        {section.map((line, index) => {
                            if (index === 0) {
                                return <p key={index}>{line}</p>;
                            } else if (index === 2) {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => window.open(line, '_blank')}
                                        className="btn btn-primary mt-2"
                                    >
                                        Voir sur Google Maps
                                    </button>
                                );
                            }
                            return null;  // Pour traiter tous les cas dans le map.
                        })}
                    </div>
                </div>
            ))}
        </>
    );
}

export default ResultCard;
