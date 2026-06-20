import React from 'react';

const ModuleHeader = ({ title, subtitle, profileText }) => (
  <div className="module-header">
    <div className="module-header-left">
      <div className="module-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
    {profileText && <div className="profile">{profileText}</div>}
  </div>
);

export default ModuleHeader;
