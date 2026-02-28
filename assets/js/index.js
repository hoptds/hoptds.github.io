const offcanvas = document.getElementById("offcanvas");
const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");

function openOffcanvas() {
  offcanvas.classList.remove("pointer-events-none", "opacity-0");
  offcanvas.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closeOffcanvas() {
  openBtn.focus();

  offcanvas.classList.add("pointer-events-none", "opacity-0");
  offcanvas.setAttribute("aria-hidden", "true");
}

openBtn.addEventListener("click", openOffcanvas);
closeBtn.addEventListener("click", closeOffcanvas);

const statesData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "01",
      properties: { name: "Ormoc City", density: 94.65 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [124.74796, 11.08335],
            [124.72938, 11.10243],
            [124.72382, 11.10729],
            [124.71822, 11.11338],
            [124.71143, 11.12075],
            [124.70439, 11.12766],
            [124.69567, 11.13692],
            [124.67773, 11.15655],
            [124.65743, 11.15323],
            [124.642, 11.1418],
            [124.62904, 11.13319],
            [124.62552, 11.12496],
            [124.62075, 11.10852],
            [124.61909, 11.10653],
            [124.61288, 11.10677],
            [124.60291, 11.10934],
            [124.58908, 11.11114],
            [124.58109, 11.11243],
            [124.56098, 11.1161],
            [124.55516, 11.12443],
            [124.55329, 11.12832],
            [124.55179, 11.13305],
            [124.54964, 11.13678],
            [124.54729, 11.1392],
            [124.54425, 11.14032],
            [124.54127, 11.14032],
            [124.5384, 11.13966],
            [124.53349, 11.13816],
            [124.5295, 11.13686],
            [124.52016, 11.13298],
            [124.51141, 11.12914],
            [124.50555, 11.12082],
            [124.50038, 11.11298],
            [124.4999737, 11.1124596],
            [124.49386, 11.10463],
            [124.47717, 11.07931],
            [124.49589, 11.05117],
            [124.50195, 11.04085],
            [124.5069, 11.03303],
            [124.51242, 11.02477],
            [124.5183, 11.01527],
            [124.5303, 10.99798],
            [124.53259, 10.99404],
            [124.54036, 10.98066],
            [124.5432864871438, 10.981549379302763],
            [124.54875570889334, 10.982773634170641],
            [124.55509002958945, 10.986448148225264],
            [124.56123303529307, 10.991818906415801],
            [124.61900943387326, 10.99282644795052],
            [124.61996921413578, 10.98962317768094],
            [124.61977855862136, 10.986890711117908],
            [124.62045018985265, 10.98462943655349],
            [124.62179488871487, 10.980388938439333],
            [124.62313868166359, 10.978598601864803],
            [124.62707284317361, 10.976997363015698],
            [124.62937524200925, 10.975866985602138],
            [124.6311018126363, 10.974830144151255],
            [124.63167755820888, 10.973793777550497],
            [124.63330862058007, 10.972474712153584],
            [124.63551634010668, 10.970307880734893],
            [124.63532567661196, 10.969271512533922],
            [124.63676522602162, 10.968517742298062],
            [124.63964422469672, 10.966256453764743],
            [124.64137289380096, 10.963523732545553],
            [124.64243040763114, 10.960319351553025],
            [124.64550079625911, 10.95862358057147],
            [124.64885802393513, 10.956928282142627],
            [124.6508738394412, 10.954666714609544],
            [124.65202692900317, 10.953064187353831],
            [124.65306165433577, 10.951063020623337],
            [124.65489330616487, 10.949768187175195],
            [124.67073, 10.94532],
            [124.68395, 10.96146],
            [124.684491, 10.962114],
            [124.69912, 10.97978],
            [124.71352, 10.99824],
            [124.7384729, 11.0000537],
            [124.7897305, 11.0037794],
            [124.78374, 11.03055],
            [124.7766, 11.04824],
            [124.7757, 11.05267],
            [124.76493, 11.06397],
            [124.74796, 11.08335]
          ]
        ]
      }
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("coverageMap");
  if (!el) return;

  const map = L.map("coverageMap", { zoomControl: true });

  // Base imagery (bottom)
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics", maxZoom: 19 }
  ).addTo(map);

  // Labels (top)
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Labels © Esri" }
  ).addTo(map);

  // Coverage polygon (the inside highlight)
  const coverage = L.geoJSON(statesData, {
    style: () => ({
      fillColor: "#00b4a4",
      fillOpacity: 0.15,
      color: "#ffffff",
      weight: 2,
      dashArray: "5,5"
    })
  }).addTo(map);

  // --- MASK (outside area) ---
  // 1) A world rectangle polygon
  const world = [
    [-90, -180],
    [-90,  180],
    [ 90,  180],
    [ 90, -180]
  ];

  // 2) Get the Ormoc polygon coordinates from your GeoJSON
  // GeoJSON uses [lng, lat], Leaflet wants [lat, lng], so flip.
  const ormoRingLngLat = statesData.features[0].geometry.coordinates[0];
  const ormoRingLatLng = ormoRingLngLat.map(([lng, lat]) => [lat, lng]);

  // 3) MultiPolygon with a "hole": [ outerWorldRing, innerHoleRing ]
  const maskGeoJson = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        world.map(([lat, lng]) => [lng, lat]),           // back to [lng, lat] for GeoJSON
        ormoRingLatLng.map(([lat, lng]) => [lng, lat])   // hole ring in [lng, lat]
      ]
    }
  };

  // 4) Draw the mask
  const mask = L.geoJSON(maskGeoJson, {
    style: () => ({
      fillColor: "#000000",
      fillOpacity: 0.45, // darkness outside
      stroke: false
    }),
    interactive: false
  }).addTo(map);

  // Fit to coverage
  map.fitBounds(coverage.getBounds(), { padding: [20, 20] });

  setTimeout(() => map.invalidateSize(), 50);
});