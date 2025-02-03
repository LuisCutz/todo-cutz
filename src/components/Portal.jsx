import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const PORTAL_ROOT_ID = 'portal-root';

export function Portal({ children }) {
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    let element = document.getElementById(PORTAL_ROOT_ID);
    
    if (!element) {
      element = document.createElement('div');
      element.id = PORTAL_ROOT_ID;
      document.body.appendChild(element);
    }
    
    setPortalRoot(element);

    return () => {
      if (!element.childNodes.length) {
        element.remove();
      }
    };
  }, []);

  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
}