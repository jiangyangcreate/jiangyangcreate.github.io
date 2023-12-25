import Box from "@mui/material/Box";
import { PhotoAlbum ,LayoutType, Photo } from "react-photo-album";
import Layout from '@theme/Layout';
import React, { useState, useMemo, createContext, useContext, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


const unsplashLink = (id, width, height) =>
  `/gallery/${id}-${width}-${height}.jpg`;

const unsplashPhotos = [
  {'id': '2021071', 'width': 1934, 'height': 2579} ,
  {'id': '2021072', 'width': 1080, 'height': 1077} ,
  {'id': '2021073', 'width': 4032, 'height': 3024} ,
  {'id': '2021074', 'width': 4032, 'height': 3024} ,
  {'id': '2021075', 'width': 3464, 'height': 3464} ,
  {'id': '2021076', 'width': 4524, 'height': 2112} ,
  {'id': '2021077', 'width': 1920, 'height': 923} ,
  {'id': '2021078', 'width': 5792, 'height': 4344} ,
  {'id': '2021079', 'width': 1440, 'height': 1080} ,
  {'id': '2022081', 'width': 1422, 'height': 799} ,
  {'id': '2022082', 'width': 2738, 'height': 1280} ,
  {'id': '2022083', 'width': 1664, 'height': 935} ,
  {'id': '2022084', 'width': 1664, 'height': 935} ,
  {'id': '2022085', 'width': 1920, 'height': 1080} ,
  {'id': '20230705092828', 'width': 4032, 'height': 2268} ,
  {'id': '20230705092938', 'width': 1920, 'height': 1080} ,
  {'id': '20230705092949', 'width': 3188, 'height': 1792} ,
  {'id': '20230705093600', 'width': 2268, 'height': 1168} ,
  {'id': '20230705093711', 'width': 4032, 'height': 2268} ,
  {'id': '20230705093721', 'width': 4032, 'height': 2268} ,
  {'id': '20230705094040', 'width': 3979, 'height': 2236} ,
  {'id': '20230705094046', 'width': 2160, 'height': 2430} ,
  {'id': '20230705094050', 'width': 1080, 'height': 607} ,
  {'id': '2023071', 'width': 4032, 'height': 2268} ,
  {'id': '202308171', 'width': 1664, 'height': 935} ,
  {'id': '202308172', 'width': 1664, 'height': 935} ,
  {'id': '202308173', 'width': 1664, 'height': 935} ,
  {'id': '202311291', 'width': 2160, 'height': 7014} ,
  {'id': '202311292', 'width': 2160, 'height': 11824} ,
  {'id': 'ForestPark1', 'width': 1080, 'height': 1080} ,
  {'id': 'ForestPark2', 'width': 1080, 'height': 1860} ,
  {'id': 'ForestPark3', 'width': 1920, 'height': 1080} ,
  {'id': 'ForestPark4', 'width': 1918, 'height': 1080} ,
  {'id': 'ForestPark5', 'width': 1706, 'height': 960} ,
  {'id': 'ForestPark6', 'width': 1920, 'height': 1080} ,
  {'id': 'ForestPark7', 'width': 1920, 'height': 1080} ,
  {'id': 'nanxiangtown1', 'width': 4032, 'height': 2268} ,
  {'id': 'nanxiangtown2', 'width': 4032, 'height': 2268} ,
  {'id': 'nanxiangtown3', 'width': 3676, 'height': 2070} ,
  {'id': 'nanxiangtown4', 'width': 4032, 'height': 2268} ,
  {'id': 'Shanghai_Wildlife_Park1', 'width': 2160, 'height': 9712} ,  
  {'id': 'Shanghai_Wildlife_Park2', 'width': 2160, 'height': 7284} ,  
  {'id': 'Shanghai_Wildlife_Park3', 'width': 2160, 'height': 3641} ,  
  {'id': 'Shanghai_Wildlife_Park4', 'width': 2160, 'height': 4855} ,  
  {'id': 'Shanghai_Wildlife_Park5', 'width': 2160, 'height': 7285} ,  
  {'id': 'Shanghai_Wildlife_Park6', 'width': 2160, 'height': 7284} ,  
  {'id': 'Shanghai_Wildlife_Park7', 'width': 2160, 'height': 6069} ,  
  {'id': 'Shanghai_Wildlife_Park8', 'width': 2160, 'height': 4856} , 
];
// const breakpoints = [17280,8640,4320,2160,1080, 640, 384, 256, 128, 96, 64, 48];

// const photos = unsplashPhotos.map((photo) => ({
//   src: unsplashLink(photo.id, photo.width, photo.height),
//   width: photo.width,
//   height: photo.height,
//   srcSet: breakpoints.map((breakpoint) => {
//     const height = Math.round((photo.height / photo.width) * breakpoint);
//     return {
//       src: unsplashLink(photo.id, breakpoint, height),
//       width: breakpoint,
//       height,
//     };
//   }),
// }));

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
}));



const useLayoutEffect = typeof document !== "undefined" ? useEffect : useEffect;

function Filter({ children }) {
  return (
    <Grid item xs={12} sm={8} lg={6}>
      {children}
    </Grid>
  );
}

function SliderControl({
  name,
  min,
  max,
  step,
  value,
  onChange,
  disabled,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <FormControl margin="none" fullWidth>
      <InputLabel shrink variant="standard" focused={focused}>
        {name}
      </InputLabel>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        size="small"
        valueLabelDisplay="auto"
        marks={[
          { value: min, label: `${min}` },
          { value: max, label: `${max}` },
        ]}
        onChange={(e, value, activeThumb) => onChange(e, typeof value === "number" ? value : value[0], activeThumb)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{ mt: 2 }}
      />
    </FormControl>
  );
}

export const SettingsContext = createContext(null);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsContext");
  return context;
}

function Settings({ children }) {
  const [layout, setLayout] = useState("masonry");
  const [count, setCount] = useState(photos.length);
  const [targetRowHeight, setTargetRowHeight] = useState(300);
  const [columns, setColumns] = useState(5);
  const [spacing, setSpacing] = useState(10);
  const [padding, setPadding] = useState(5);
  const [width, setWidth] = useState(100);

  useLayoutEffect(() => {
    const viewportSize = window.innerWidth;
    setColumns(viewportSize < 480 ? 2 : viewportSize < 900 ? 3 : 5);
    setSpacing(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
    setPadding(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
    setTargetRowHeight(viewportSize < 480 ? 100 : viewportSize < 900 ? 150 : 200);
  }, []);

  const settings = useMemo(
    () => ({
      photos: photos.slice(0, count),
      layout,
      targetRowHeight,
      columns,
      spacing,
      padding,
      width,
    }),
    [layout, count, targetRowHeight, columns, spacing, padding, width],
  );

  return (
    <SettingsContext.Provider value={settings}>
      <Paper variant="outlined" sx={{ mb: 4, p: 2, textAlign: "left" }}>
        <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
          <Filter>
            <TextField
              select
              fullWidth
              label="Layout"
              variant="standard"
              margin="none"
              value={layout}
              onChange={(event) => setLayout(event.target.value)}
            >
              {[
                { value: "rows", title: "Rows" },
                { value: "columns", title: "Columns" },
                { value: "masonry", title: "Masonry" },
              ].map(({ value, title }) => (
                <MenuItem key={value} value={value}>
                  {title}
                </MenuItem>
              ))}
            </TextField>
          </Filter>

          <Filter>
            <SliderControl
              name="Photos"
              min={1}
              max={photos.length}
              value={count}
              onChange={(_, value) => setCount(value)}
            />
          </Filter>

          <Filter>
            <SliderControl name="Spacing" min={0} max={50} value={spacing} onChange={(_, value) => setSpacing(value)} />
          </Filter>

          <Filter>
            <SliderControl name="Padding" min={0} max={50} value={padding} onChange={(_, value) => setPadding(value)} />
          </Filter>

          <Filter>
            <SliderControl
              name="Row height"
              min={50}
              max={500}
              step={5}
              value={targetRowHeight}
              disabled={layout !== "rows"}
              onChange={(_, value) => setTargetRowHeight(value)}
            />
          </Filter>

          <Filter>
            <SliderControl
              name="Columns"
              min={1}
              max={10}
              value={columns}
              disabled={layout === "rows"}
              onChange={(_, value) => setColumns(value)}
            />
          </Filter>

          <Filter>
            <SliderControl
              name="Width (%)"
              min={10}
              max={100}
              step={5}
              value={width}
              onChange={(_, value) => setWidth(value)}
            />
          </Filter>
        </Grid>
      </Paper>

      {children}
    </SettingsContext.Provider>
  );
}


function Playground() {
  const { photos, layout, columns, targetRowHeight, spacing, padding, width } = useSettings();
  const [index, setIndex] = useState(-1);
  const renderPhoto = React.useCallback(
    ({ imageProps: { alt, style, ...rest } }) => (
      <img
        alt={alt}
        style={{
          ...style,
          borderRadius: padding > 2 ? "4px" : 0,
          boxShadow:
            spacing > 0
              ? "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
              : "none",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
        {...rest}
      />
    ),
    [spacing, padding],
  );

  return (

    <Box sx={{ width: `${width}%`, mx: "auto" }}>
      <PhotoAlbum
        photos={photos}
        layout={layout}
        columns={columns}
        spacing={spacing}
        padding={padding}
        targetRowHeight={targetRowHeight}
        renderPhoto={renderPhoto}
        // 点击放大
        onClick={({ index }) => setIndex(index)} 
      />
      <Lightbox
      slides={photos}
      open={index >= 0}
      index={index}
      close={() => setIndex(-1)}
      // enable optional lightbox plugins
      plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
    />
    </Box>

  );
}

export default function App() {
  return (
    <Layout>
    <Settings>
      <Playground />
    </Settings>
    </Layout>
  );
}
