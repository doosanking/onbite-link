export type Folder = { id: string; name: string; count: number };

export type LinkItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  folderId: string;
  createdAt: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "reading", name: "읽을거리", count: 2 },
];

export const links: LinkItem[] = [
  { id: "1", title: "Next.js 공식 문서", description: "App Router, 서버 컴포넌트, 데이터 패칭 가이드", url: "https://nextjs.org/docs", folderId: "dev", createdAt: "2026-09-18" },
  { id: "2", title: "Tailwind CSS", description: "유틸리티 우선 CSS 프레임워크 문서", url: "https://tailwindcss.com", folderId: "dev", createdAt: "2026-09-17" },
  { id: "3", title: "React 문서", description: "React 19 새로운 기능과 레퍼런스", url: "https://react.dev", folderId: "dev", createdAt: "2026-09-15" },
  { id: "4", title: "TypeScript Handbook", description: "타입스크립트 핸드북과 튜토리얼", url: "https://www.typescriptlang.org/docs", folderId: "dev", createdAt: "2026-09-12" },
  { id: "5", title: "Figma", description: "협업 디자인 도구", url: "https://figma.com", folderId: "design", createdAt: "2026-09-10" },
  { id: "6", title: "Dribbble", description: "디자인 영감을 얻을 수 있는 커뮤니티", url: "https://dribbble.com", folderId: "design", createdAt: "2026-09-08" },
  { id: "7", title: "Hacker News", description: "개발자 뉴스와 토론", url: "https://news.ycombinator.com", folderId: "reading", createdAt: "2026-09-05" },
  { id: "8", title: "MDN Web Docs", description: "웹 기술 레퍼런스", url: "https://developer.mozilla.org", folderId: "reading", createdAt: "2026-09-01" },
];
