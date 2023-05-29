import { useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function MainMap({searchResults}) {
 

 

  const [viewState, setViewState] = useState({
    longitude: 	36.080025,
    latitude: -0.303099,
    zoom: 11,
  });

  return ( 
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
     
      mapStyle="mapbox://styles/miki007/clgcabeu3001m01mmogi3u0wv"
      mapboxAccessToken={process.env.mapbox_key}
    >
    
        <div >
          <Marker
            longitude={36.080025}
            latitude={ -0.303099}
          
          >
            <p
              role='img'
              className="cursor-pointer text-2xl animate-bounce"
              aria-label='push-pin'
            >📌</p>
          </Marker>

        </div>
   
    </Map>
  );
}

export default MainMap;