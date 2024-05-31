import Box from "@mui/material/Box";
import { PhotoAlbum } from "react-photo-album";
import Layout from "@theme/Layout";
import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useColorMode } from "@docusaurus/theme-common";
//定义图片路径
const unsplashLink = (id, width, height) =>
  `/pages/gallery/${id}-${width}-${height}.webp`;
//定义相册图片
const unsplashPhotos = [
  {
    id: "Newyear",
    width: 4624,
    height: 3948,
    title: "上海",
    description: "新年的烟火",
  },
  {
    id: "2021071",
    width: 1934,
    height: 2579,
    title: "广东",
    description: "深圳的夏天",
  },
  {
    id: "2021072",
    width: 1080,
    height: 1077,
    title: "广东",
    description: "塘朗山的花",
  },
  {
    id: "2021073",
    width: 4032,
    height: 3024,
    title: "广东",
    description: "塘朗山的山顶",
  },
  {
    id: "2021074",
    width: 4032,
    height: 3024,
    title: "广东",
    description: "塘朗山的亭子",
  },
  {
    id: "2021075",
    width: 3464,
    height: 3464,
    title: "广东",
    description: "塘朗山的栈道",
  },
  {
    id: "2021076",
    width: 4524,
    height: 2112,
    title: "广东",
    description: "东宝大厦的双彩虹",
  },
  {
    id: "2021077",
    width: 1920,
    height: 923,
    title: "广东",
    description: "深圳的主干道",
  },
  {
    id: "2021078",
    width: 5792,
    height: 4344,
    title: "上海",
    description: "上海的鱼鳞云",
  },
  {
    id: "2021079",
    width: 1440,
    height: 1080,
    title: "广东",
    description: "南山区的堡垒云",
  },
  {
    id: "2022081",
    width: 1422,
    height: 799,
    title: "上海",
    description: "上海白天的月亮",
  },
  {
    id: "2022082",
    width: 2738,
    height: 1280,
    title: "上海",
    description: "全景下红蓝分裂的天空",
  },
  {
    id: "2022083",
    width: 1664,
    height: 935,
    title: "上海",
    description: "上海的晚霞",
  },
  {
    id: "2022084",
    width: 1664,
    height: 935,
    title: "上海",
    description: "上海的公园",
  },
  {
    id: "2022085",
    width: 1920,
    height: 1080,
    title: "上海",
    description: "上海开往郊区的地铁",
  },
  {
    id: "20230705092828",
    width: 4032,
    height: 2268,
    title: "江苏",
    description: "水乡乌镇",
  },
  {
    id: "20230705092938",
    width: 1920,
    height: 1080,
    title: "甘肃",
    description: "中山桥",
  },
  {
    id: "20230705092949",
    width: 3188,
    height: 1792,
    title: "上海",
    description: "上海金色的晚霞",
  },
  {
    id: "20230705093600",
    width: 2268,
    height: 1168,
    title: "浙江",
    description: "嵊泗岛的路牌",
  },
  {
    id: "20230705093711",
    width: 4032,
    height: 2268,
    title: "浙江",
    description: "嵊泗岛的晚霞",
  },
  {
    id: "20230705093721",
    width: 4032,
    height: 2268,
    title: "浙江",
    description: "嵊泗岛的渔场",
  },
  {
    id: "20230705094040",
    width: 3979,
    height: 2236,
    title: "浙江",
    description: "嵊泗岛的清晨",
  },
  {
    id: "20230705094046",
    width: 2160,
    height: 2430,
    title: "浙江",
    description: "嵊泗岛的民宿",
  },
  {
    id: "20230705094050",
    width: 1080,
    height: 607,
    title: "浙江",
    description: "嵊泗岛的绿野仙踪",
  },
  {
    id: "2023071",
    width: 2268,
    height: 4032,
    title: "上海",
    description: "佘山的塔",
  },
  {
    id: "202308171",
    width: 1664,
    height: 935,
    title: "江苏",
    description: "苏州金鸡湖",
  },
  {
    id: "202308172",
    width: 1664,
    height: 935,
    title: "江苏",
    description: "夜游网师园",
  },
  {
    id: "202308173",
    width: 1664,
    height: 935,
    title: "上海",
    description: "下班的路口",
  },
  {
    id: "202311291",
    width: 2160,
    height: 7014,
    title: "海南",
    description: "海南的交通",
  },
  {
    id: "202311292",
    width: 2160,
    height: 11824,
    title: "海南",
    description: "沙滩与椰子",
  },
  {
    id: "ForestPark1",
    width: 1080,
    height: 1080,
    title: "上海",
    description: "共青公园",
  },
  {
    id: "ForestPark2",
    width: 1080,
    height: 1860,
    title: "上海",
    description: "加班后深夜的灯牌",
  },
  {
    id: "ForestPark3",
    width: 1920,
    height: 1080,
    title: "上海",
    description: "共青公园",
  },
  {
    id: "ForestPark4",
    width: 1918,
    height: 1080,
    title: "上海",
    description: "共青公园",
  },
  {
    id: "ForestPark5",
    width: 1706,
    height: 960,
    title: "上海",
    description: "共青公园",
  },
  {
    id: "ForestPark6",
    width: 1920,
    height: 1080,
    title: "上海",
    description: "共青公园",
  },
  {
    id: "ForestPark7",
    width: 1920,
    height: 1080,
    title: "上海",
    description: "共青公园",
  },
  {
    id: "nanxiangtown1",
    width: 4032,
    height: 2268,
    title: "上海",
    description: "南翔古镇",
  },
  {
    id: "nanxiangtown2",
    width: 4032,
    height: 2268,
    title: "上海",
    description: "南翔古镇",
  },
  {
    id: "nanxiangtown3",
    width: 3676,
    height: 2070,
    title: "上海",
    description: "南翔古镇",
  },
  {
    id: "nanxiangtown4",
    width: 4032,
    height: 2268,
    title: "上海",
    description: "南翔古镇",
  },
  {
    id: "Shanghai_Wildlife_Park1",
    width: 2160,
    height: 9712,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "Shanghai_Wildlife_Park2",
    width: 2160,
    height: 7284,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "Shanghai_Wildlife_Park3",
    width: 2160,
    height: 3641,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "Shanghai_Wildlife_Park4",
    width: 2160,
    height: 4855,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "Shanghai_Wildlife_Park5",
    width: 2160,
    height: 7285,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "Shanghai_Wildlife_Park6",
    width: 2160,
    height: 7284,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "Shanghai_Wildlife_Park7",
    width: 2160,
    height: 6069,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "Shanghai_Wildlife_Park8",
    width: 2160,
    height: 4856,
    title: "上海",
    description: "野生动物园",
  },
  {
    id: "20240531110829",
    width: 1664,
    height: 935,
    title: "山东",
    description: "青岛的夏天",
  },
  {
    id: "20240531110834",
    width: 1664,
    height: 935,
    title: "山东",
    description: "青岛的夏天",
  },
  {
    id: "20240531110910",
    width: 1664,
    height: 935,
    title: "山东",
    description: "青岛的夏天",
  },
  {
    id: "20240531111017",
    width: 1664,
    height: 935,
    title: "山东",
    description: "青岛的夏天",
  },
];

// 使用 Set 进行自动去重，自动添加一个全选选项
const uniqueTitlesSet = new Set(unsplashPhotos.map((photo) => photo.title)).add(
  "全选"
);

// 提取相册标签
const extractedData = Array.from(uniqueTitlesSet).map((title) => ({
  value: title || "其他", // 如果 title 不存在，使用 '其他'
  title: title || "其他",
}));

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
  title: photo.title,
  //描述中自动添加相片大小
  description: (photo.description || "") + `\n${photo.width} x ${photo.height}`,
}));

const useLayoutEffect = typeof document !== "undefined" ? useEffect : useEffect;

function Filter({ children }) {
  return (
    <Grid item xs={12} sm={8} lg={6}>
      {children}
    </Grid>
  );
}

function SliderControl({ name, min, max, step, value, onChange, disabled }) {
  const [focused, setFocused] = useState(false);
  const darkTheme =
    useColorMode().colorMode === "dark" ? "secondary" : "primary";
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
        color={darkTheme}
        valueLabelDisplay="auto"
        marks={[
          { value: min, label: `${min}` },
          { value: max, label: `${max}` },
        ]}
        onChange={(e, value, activeThumb) =>
          onChange(e, typeof value === "number" ? value : value[0], activeThumb)
        }
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
  if (!context)
    throw new Error("useSettings must be used within a SettingsContext");
  return context;
}

function Settings({ children }) {
  const [layout, setLayout] = useState("columns");
  const [count, setCount] = useState(photos.length);
  const [targetRowHeight, setTargetRowHeight] = useState(200);
  const [columns, setColumns] = useState(5);
  const [spacing, setSpacing] = useState(30);
  const [padding, setPadding] = useState(30);
  const [width, setWidth] = useState(95);
  const [tag, settag] = useState("上海");

  useLayoutEffect(() => {
    const viewportSize = window.innerWidth;
    //如果要更改默认设置，在这里设定
    setColumns(viewportSize < 480 ? 2 : viewportSize < 900 ? 3 : 5);
    setSpacing(viewportSize < 480 ? 5 : viewportSize < 900 ? 10 : 20);
    setPadding(viewportSize < 480 ? 5 : viewportSize < 900 ? 10 : 20);
    setTargetRowHeight(
      viewportSize < 480 ? 100 : viewportSize < 900 ? 150 : 200
    );
  }, []);

  const settings = useMemo(
    () => ({
      // 如果选了其他，则筛选所有undefined和null,否则按tag筛选
      photos:
        tag === "其他"
          ? photos
              .filter(
                (photo) => photo.title === undefined || photo.title === null
              )
              .slice(0, count)
          : tag === "全选"
          ? photos.slice(0, count)
          : photos.filter((photo) => photo.title === tag).slice(0, count),
      layout,
      targetRowHeight,
      columns,
      spacing,
      padding,
      width,
    }),
    [layout, count, targetRowHeight, columns, spacing, padding, width, tag]
  );

  const darkTheme = createTheme({
    palette: { mode: useColorMode().colorMode === "dark" ? "dark" : "light" },
  });

  return (
    <SettingsContext.Provider value={settings}>
      <Paper
        variant="outlined"
        sx={{ mb: 4, p: 2, textAlign: "left" }}
        theme={darkTheme}
      >
        <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
          <ThemeProvider theme={darkTheme}>
            <Filter>
              <TextField
                select
                fullWidth
                label="Layout"
                variant="standard"
                margin="none"
                value={layout}
                color="warning"
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
              <SliderControl
                name="Spacing"
                min={0}
                max={50}
                value={spacing}
                onChange={(_, value) => setSpacing(value)}
              />
            </Filter>

            <Filter>
              <SliderControl
                name="Padding"
                min={0}
                max={50}
                value={padding}
                onChange={(_, value) => setPadding(value)}
              />
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

            <Filter>
              <TextField
                select
                fullWidth
                label="Tag"
                variant="standard"
                margin="none"
                value={tag}
                color="warning"
                onChange={(event) => settag(event.target.value)}
              >
                {extractedData.map(({ value, title }) => (
                  <MenuItem key={value} value={value}>
                    {title}
                  </MenuItem>
                ))}
              </TextField>
            </Filter>
          </ThemeProvider>
        </Grid>
      </Paper>

      {children}
    </SettingsContext.Provider>
  );
}

function Playground() {
  const { photos, layout, columns, targetRowHeight, spacing, padding, width } =
    useSettings();
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
    [spacing, padding]
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
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
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
