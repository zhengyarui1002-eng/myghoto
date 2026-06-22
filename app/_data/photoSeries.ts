export type PhotoSeries = {
  title: string;
  subtitle: string;
  folder: string;
  totalImages: number; // 告诉系统这个项目一共有几张图
};

export const photoSeries: Record<string, PhotoSeries> = {
  "across-museums": {
    title: "Across Museums",
    subtitle: "穿行美术馆",
    folder: "across-museums",
    totalImages: 12, // 
  },
  "nature-in-concrete": {
    title: "Nature in Concrete",
    subtitle: "混凝土中的自然",
    folder: "nature-in-concrete",
    totalImages: 5,  // 
  },
  "field-study-cathedrals": {
    title: "Field Study: Cathedrals",
    subtitle: "大教堂空间观察",
    folder: "field-study-cathedrals",
    totalImages: 8,  // 
  },
  "selected-works": {
    title: "Selected Works",
    subtitle: "精选作品",
    folder: "selected-works",
    totalImages: 38, // 
  },
};


export async function getPhotoSeriesImages(folder: string) {
  const series = photoSeries[folder];
  if (!series) return [];

  const imageFiles: string[] = [];
  
  // 你的专属 Cloudinary 线上地址前缀
  const cloudinaryBase = "https://res.cloudinary.com/de5ugt9ij/image/upload/f_auto,q_auto";

  // 自动化生成 1.jpg 到 38.jpg 的云端图片链接
  for (let i = 1; i <= series.totalImages; i++) {
    imageFiles.push(`${cloudinaryBase}/${folder}/${i}.jpg`);
  }

  return imageFiles;
}