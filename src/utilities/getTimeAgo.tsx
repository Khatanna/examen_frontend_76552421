import { buildTimeAgo } from ".";

export const getTimeAgo = (timeAgo: string | number) => () => {
  return (
    <div className="flex items-center gap-1 ">
      <i className="pi pi-clock"></i>
      <span>{buildTimeAgo(timeAgo)}</span>
    </div>
  );
};
