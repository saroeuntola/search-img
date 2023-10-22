import React from "react";

const Card = ({ info }) => {
  return (
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <img
                  key={info.id}
                  src={info.urls.regular}
                  alt={info.alt_description}
                />
                <a href={info.links.html} className="nav-link">
                  {info.alt_description}
                </a>
              </div>
            </div>
          </div>
  );
};

export default Card;
