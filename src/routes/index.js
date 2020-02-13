import React from "react";
import { Layout, UserPlus, Repeat, Users } from "react-feather";

import async from "../components/Async";

const Page404 = async(() => import("../pages/auth/Page404"));
const Default = async(() => import("../pages/dashboards/Default"));
const Customers = async(() => import("../pages/registrations/customers/Index"));
const FormCustomers = async(() =>
  import("../pages/registrations/customers/Template")
);
const Providers = async(() => import("../pages/registrations/Providers"));
const Destinators = async(() => import("../pages/registrations/Destinators"));
const Collections = async(() => import("../pages/demands/Collections"));
const Certificates = async(() => import("../pages/demands/Certificates"));
const Destinations = async(() => import("../pages/demands/Destinations"));

const dashboardsRoutes = {
  id: "Painel",
  path: "/dashboard",
  icon: <Layout />,
  containsHome: true,
  component: Default,
  children: null
};

const registrationsRoutes = {
  id: "Cadastros",
  path: "/registrations",
  icon: <UserPlus />,
  children: [
    {
      path: "/registrations/customers",
      name: "Clientes",
      component: Customers
    },
    {
      path: "/registrations/providers",
      name: "Fornecedores",
      component: Providers
    },
    {
      path: "/registrations/destinators",
      name: "Destinadores",
      component: Destinators
    }
  ]
};

const demandsRoutes = {
  id: "Demandas",
  path: "/demands",
  icon: <Repeat />,
  children: [
    {
      path: "/demands/collections",
      name: "Coletas",
      component: Collections
    },
    {
      path: "/demands/certificates",
      name: "Certificados",
      component: Certificates
    },
    {
      path: "/demands/destinations",
      name: "Destinações",
      component: Destinations
    }
  ]
};

const customersNewRoutes = {
  id: "New",
  path: "/registrations/customers/new",
  icon: null,
  component: FormCustomers,
  children: null
};

const customersEditRoutes = {
  id: "New",
  path: "/registrations/customers/edit/:id",
  icon: null,
  component: FormCustomers,
  children: null
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/404",
      name: "404 Página",
      component: Page404
    }
  ]
};

export const dashboard = [
  dashboardsRoutes,
  registrationsRoutes,
  customersNewRoutes,
  customersEditRoutes,
  demandsRoutes
];
export const auth = [authRoutes];

export default [
  dashboardsRoutes,
  registrationsRoutes,
  demandsRoutes,
  authRoutes
];
