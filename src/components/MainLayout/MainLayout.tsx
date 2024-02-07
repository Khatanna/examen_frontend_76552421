import { BreadCrumb } from "primereact/breadcrumb";
import { Link, Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      <BreadCrumb
        model={[
          {
            label: "Autores",
            url: "/autores",
            icon: (
              <i className="pi pi-users" style={{ fontSize: "1.2rem" }}></i>
            ),
            className:
              location.pathname === "/autores" ? "text-orange-500" : "",
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
          },
          {
            label: "Libros",
            url: "/libros",
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
          items: [
            {
              label: "Autores",
              url: "/autores",
              icon: (
                <i className="pi pi-users" style={{ fontSize: "1.2rem" }}></i>
              ),
              className:
                location.pathname === "/autores" ? "text-orange-500" : "",
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
            },
            {
              label: "Libros",
              url: "/libros",
              icon: (
                <i className="pi pi-book" style={{ fontSize: "1.2rem" }}></i>
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
                location.pathname === "/libros" ? "text-orange-500" : "",
            },
          ],
        }}
      />
      <Outlet />
    </div>
  );
};

export default MainLayout;
