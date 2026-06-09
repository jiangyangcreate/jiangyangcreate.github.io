import { PhotoAlbum } from "react-photo-album";
const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashLink = (id, width, height) =>
  `https://source.unsplash.com/${id}/${width}x${height}.webp`;

const unsplashPhotos = [
  { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
  { id: "twukN12EN7c", width: 1080, height: 694 },
  { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
  { id: "sEXGgun3ZiE", width: 1080, height: 720 },
  { id: "iMchCC-3_fE", width: 1080, height: 610 },
  { id: "GbLS6YVXj0U", width: 1080, height: 810 },
  { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
];

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: unsplashLink(photo.id, breakpoint, height),
      width: breakpoint,
      height,
    };
  }),
}));

export const PhotoAlbums = () => (
  <PhotoAlbum photos={photos} layout="rows" />
);
