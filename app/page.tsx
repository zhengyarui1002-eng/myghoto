import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "./_components/SiteFrame";
import { works } from "./_data/portfolio";
// 🚀 1. 引入我们强大的图床自动化工具
import { getPhotoSeriesImages } from "./_data/photoSeries"; 

// 🚀 2. 注意这里加了一个 async，因为我们要从云端拿数据
export default async function HomePage() {
  const secondaryWorks = works;

  // 🚀 3. 直接获取精选作品（selected-works）的所有云端图片网址
  const allSelectedImages = await getPhotoSeriesImages("selected-works");
  
  // 📸 4. 挑出精选作品里的第 1 张图（如果你想换第 2 张，就把 0 改成 1）
  const homeFeaturedImage = allSelectedImages[0] || ""; 

  return (
    <SiteFrame
      eyebrow="Photographic index"
      title="Seeing space and existence."
      intro="A photographic practice that employs a restrained way of seeing to present the breathing space between images."
    >
      <section className="hero-work" aria-label="Featured work">
        <figure className="hero-image">
          {/* 🚀 5. 如果拿到了云端图片，就完美展示它 */}
          {homeFeaturedImage && (
            <Image
              src={homeFeaturedImage}
              alt="Selected Works Featured"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 70vw"
              className="object-cover"
            />
          )}
        </figure>
        <div className="hero-copy standalone-button">
          {/* 这里的跳转链接我帮你修正为了对应的精选作品页面路径 */}
          <Link className="text-link" href="/projects/selected-works">
            View selected works
          </Link>
        </div>
      </section>

      <section id="projects" className="work-index" aria-label="Projects">
        <div className="section-label">Projects</div>
        <div className="index-list">
          {secondaryWorks.map((work) => (
            <Link
              className="index-row"
              href={`/projects/${work.slug}`}
              key={work.id}
            >
              <span>{work.id}</span>
              <strong>{work.title}</strong>
              <small>{work.summary}</small>
            </Link>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}