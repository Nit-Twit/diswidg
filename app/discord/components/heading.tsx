import localFont from 'next/font/local'

const ggSansBold = localFont({ src: '../fonts/gg-sans-semi.ttf' })

export default function Heading({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className={ggSansBold.className}>{children}</div>
    );
  }
  
