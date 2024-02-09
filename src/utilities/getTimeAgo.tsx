import { buildTimeAgo } from ".";

export const getTimeAgo = (timeAgo: string | number) => () => {
  return (
    <div className="flex items-stretch justify-center gap-1 flex-col py-2">
      <div className="flex items-center gap-1 justify-center text-sm">
        <i className="pi pi-clock"></i>
        <span>{buildTimeAgo(timeAgo)}</span>
      </div>
      <div className="flex items-center gap-1 justify-center text-sm">
        <i className="pi pi-calendar"></i>
        <span>{new Date(timeAgo).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
