import { BreadCrumb } from "primereact/breadcrumb";
import { Link, Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      <BreadCrumb
        model={[
          {
            label: "Libros",
            url: "/libros",
            separator: false,
            icon: <i className="pi pi-book" style={{ fontSize: "1.2rem" }}></i>,
            template: (item) => {
              return (
                <Link
                  to={item.url!}
                  className="
        				flex gap-2 items-center
        				"
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            },
            className: location.pathname === "/libros" ? "text-orange-500" : "",
            visible: location.pathname === "/libros",
          },
          {
            label: "Encargado",
            separator: false,
            visible: location.pathname === "/encargado",
            url: "/encargado",
            icon: (
              <i className="pi pi-briefcase" style={{ fontSize: "1.2rem" }}></i>
            ),
            template: (item) => {
              return (
                <Link
                  to={item.url!}
                  className="
                flex gap-2 items-center
                "
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            },
            className:
              location.pathname === "/encargado" ? "text-orange-500" : "",
          },
        ]}
        home={{
          id: "home",
          icon: <i className="pi pi-home" style={{ fontSize: "1.2rem" }}></i>,
          url: "/",
          template: (item) => {
            return (
              <Link
                to={item.url!}
                className="
						flex gap-2 items-center
						"
              >
                {item.icon}
              </Link>
            );
          },
          className: location.pathname === "/" ? "text-orange-500" : "",
        }}
      />
      <Outlet />
    </div>
  );
};

export default MainLayout;
