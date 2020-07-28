import { LocationOn } from '@material-ui/icons';
import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const TOKEN = "pk.eyJ1Ijoidm9pZGUiLCJhIjoiY2tkMGo4OHlvMDMwajJ6bndrM3kzeHc3ayJ9.98RHSZplyVH31FF16QsRTw";

const Map = props => {

    const [viewPort, setviewPort] = useState({
        latitude: props.location.lat,
        longitude: props.location.lng,
        height: '70vh',
        width: '80vw',
        zoom: 10
    });


    return (
        <div>
            <ReactMapGL {...viewPort}
                mapboxApiAccessToken={TOKEN}
                mapStyle="mapbox://styles/voide/ckd1nvdnd0uha1imlhejf2g7p"
                onViewportChange={nextViewport => setviewPort(nextViewport)}>
                <Marker latitude={props.location.lat} longitude={props.location.lng}>
                    <LocationOn style={{ color: 'red', fontSize: '40'}} />
                </Marker>
            </ReactMapGL>
        </div>
    )
}

export default Map;