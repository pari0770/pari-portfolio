import Header from '@/components/Header';
import ProjectReel from '@/components/ProjectReel';

export default function Home() {
  return (
    <main
      style={{
        position: 'relative',
        background: '#ffffff',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Header />
      <ProjectReel />
    </main>
  );
}
