import Photography from 'components/Photography/Photography';
import PhotoLayout from 'components/PhotoLayout/PhotoLayout';
import { useRouter } from 'next/router';

export default function PhotoPage() {
  const {
    query: { kind },
  } = useRouter();

  if (typeof kind !== 'string') return null;

  return (
    <PhotoLayout>
      <Photography path={kind} />
    </PhotoLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { kind: 'travel' } }, { params: { kind: 'automotive' } }, { params: { kind: 'portraits' } }],
    fallback: false,
  };
}
