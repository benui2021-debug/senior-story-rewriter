export const metadata = {
  title: "Senior Story Rewriter",
  description: "시니어 사연 리라이팅 자동화 시스템",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
