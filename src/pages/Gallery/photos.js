
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

export default photos;
