import { Suspense } from "react";
import { SkeletonPage } from "../SkeletonPage";

export type LazyComponentProps = {
  Component: React.ComponentType<NonNullable<unknown>>;
};

const LazyComponent: React.FC<LazyComponentProps> = ({ Component }) => {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
