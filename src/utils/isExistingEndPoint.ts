import routes from "../routes/routes";

const isExistiongEndPoint = (url: string) => {
  return routes.some((route) => route.test(url));
};

export default isExistiongEndPoint;
