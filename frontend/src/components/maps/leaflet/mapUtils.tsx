import { IProperty } from 'interfaces';
import L, { DivIcon, GeoJSON, LatLngExpression, Layer, Map, Marker } from 'leaflet';
import Supercluster from 'supercluster';

import { ICluster, PointFeature } from '../types';

// parcel icon (green)
export const parcelIcon = L.icon({
  iconUrl: require('assets/images/pins/land-reg.png').default ?? 'assets/images/pins/land-reg.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// parcel icon (green) highlighted
export const parcelIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/land-reg-highlight.png').default ??
    'assets/images/pins/land-reg-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/**
 * Creates map points (in GeoJSON format) for further clustering by `supercluster`
 * @param properties
 */
export const createPoints = (properties: IProperty[], type: string = 'Point') =>
  properties.map(x => {
    return {
      type: 'Feature',
      properties: {
        ...x,
        cluster: false,
        PROPERTY_ID: x.id,
      },
      geometry: {
        type: type,
        coordinates: [x.longitude, x.latitude],
      },
    } as PointFeature;
  });

/**
 * This function defines how GeoJSON points spawn Leaflet layers on the map.
 * It is called internally by the `GeoJSON` leaflet component.
 * @param feature
 * @param latlng
 */
export const pointToLayer = (feature: ICluster, latlng: LatLngExpression): Layer => {
  const { cluster: isCluster } = feature?.properties as Supercluster.ClusterProperties;
  if (!!isCluster) {
    return createClusterMarker(feature, latlng);
  }
  // we have a single point to render
  return createSingleMarker(feature, latlng);
};

/**
 * Get an icon type for the specified cluster property details (type, draft, erp, spp etc)
 */
export const getMarkerIcon = (feature: ICluster, selected?: boolean) => {
  if (selected) {
    return parcelIconSelect;
  }
  return parcelIcon;
};

/**
 * Creates a map pin for a single point; e.g. a parcel
 * @param feature the geojson object
 * @param latlng the point position
 */
export const createSingleMarker = (feature: ICluster, latlng: LatLngExpression): Layer => {
  const icon = getMarkerIcon(feature);
  return new Marker(latlng, { icon });
};

// Internal cache of cluster icons to avoid re-creating the same icon over and over again.
const iconsCache: Record<number, DivIcon> = {};

/**
 * Creates a marker for clusters on the map
 * @param feature the cluster geojson object
 * @param latlng the cluster position
 */
export const createClusterMarker = (feature: ICluster, latlng: LatLngExpression): Layer => {
  const {
    cluster: isCluster,
    point_count: count,
    point_count_abbreviated: displayValue,
  } = feature?.properties as Supercluster.ClusterProperties;

  if (!isCluster) {
    return (null as unknown) as Layer;
  }

  const size = count < 100 ? 'small' : count < 1000 ? 'medium' : 'large';
  let icon: DivIcon;

  if (!iconsCache[count]) {
    iconsCache[count] = new DivIcon({
      html: `<div><span>${displayValue}</span></div>`,
      className: `marker-cluster marker-cluster-${size}`,
      iconSize: [40, 40],
    });
  }

  icon = iconsCache[count];
  return new Marker(latlng, { icon });
};

/** Zooms to a cluster */
export const zoomToCluster = (cluster: ICluster, expansionZoom: number, map: Map) => {
  const latlng = GeoJSON.coordsToLatLng(cluster?.geometry?.coordinates as [number, number]);
  map?.setView(latlng, expansionZoom, { animate: true });
};

// we need to namespace the keys as IDs are not enough here.
// the same ID could be found on both the parcel collection and
export const generateKey = (p: IProperty) => `parcel-${p.id}`;

/** Creates a IProperty object from a GeoJSON point */
export const asProperty = (point: PointFeature): IProperty => {
  const { id, name } = point?.properties;
  const latlng = GeoJSON.coordsToLatLng(point?.geometry?.coordinates as [number, number]);
  return {
    ...point.properties,
    id,
    latitude: latlng.lat,
    longitude: latlng.lng,
    name,
  } as IProperty;
};

/**
 * Convert any object to a cql filter string, assuming the object's keys should be used as CQL filter properties.
 * AND all object keys together within the generated cql filter string.
 * @param object an object to convert to a cql filter string.
 */
export const toCqlFilter = (object: any) => {
  const cql: string[] = [];
  Object.keys(object).forEach((key: string) => {
    if (object[key]) {
      if (key === 'PID' && object[key]) {
        cql.push(`PIN ilike '%25${object[key]}%25' OR PID ilike '%25${object[key]}%25'`);
      } else {
        cql.push(`${key} ilike '%25${object[key]}%25'`);
      }
    }
  });
  return cql.length ? `cql_filter=${cql.join(' AND ')}` : '';
};
