import Link from "next/link";
import { navItems, photographer } from "../_data/portfolio";

type SiteFrameProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

export function SiteFrame({ eyebrow, title, intro, children }: SiteFrameProps) {
  return (
    <main className="site-shell">
      <aside className="site-sidebar" aria-label="Site navigation">
        <Link className="brand" href="/">
          <span>
            <strong>郑雅瑞</strong>
            <small>Yarui Zheng</small>
          </span>
        </Link>

        <nav className="side-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-meta">
          <span>{photographer.city}</span>
          <a href={`mailto:${photographer.email}`}>{photographer.email}</a>
        </div>
      </aside>

      <section className="site-content">
        <header className="page-heading">
          {eyebrow ? <p>{eyebrow}</p> : null}
          <h1>{title}</h1>
          {intro ? <div className="heading-intro">{intro}</div> : null}
        </header>
        {children}
      </section>
    </main>
  );
}
