import { SiteFrame } from "../_components/SiteFrame";
import { photographer } from "../_data/portfolio";

export default function InfoPage() {
  return (
    <SiteFrame title="About">
      <section className="info-layout">
        <div className="info-statement">
          <p className="info-name-line">
            郑雅瑞 Yarui Zheng
          </p>
          <p>
            摄影师，以克制的观看方式展开影像实践，关注空间感与人与环境之间的互动关系。
          </p>
          <p>
            Photographer working through a restrained way of seeing, focusing on spatial perception and the interaction between people and their environment.
          </p>
        </div>
        <dl className="info-facts">
          <div>
            <dt>Base</dt>
            <dd>{photographer.city}</dd>
          </div>
          <div>
            <dt>Practice</dt>
            <dd>{photographer.focus}</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <a href={`mailto:${photographer.email}`}>{photographer.email}</a>
            </dd>
          </div>
        </dl>
      </section>
    </SiteFrame>
  );
}
