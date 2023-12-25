import React from "react";
import Box from "@mui/material/Box";
import { PhotoAlbum } from "react-photo-album";
import Settings, { useSettings } from "./Settings";
import Layout from '@theme/Layout'
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
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
