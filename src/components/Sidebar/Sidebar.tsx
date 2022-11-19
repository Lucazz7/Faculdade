/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback, useContext, useState } from "react";
import {
  ModeIcon,
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLogo,
  SSidebar,
  SSidebarButton,
  STheme,
  SThemeLabel,
  SThemeToggler,
  STitleLogo,
  SToggleThumb,
} from "./styles";
import { AiOutlineHome, AiOutlineLeft, AiOutlineSetting } from "react-icons/ai";
import {
  MdDarkMode,
  MdLightMode,
  MdLogout,
  MdOutlineAnalytics,
} from "react-icons/md";
import {
  BsFillCloudLightningRainFill,
  BsFillPinMapFill,
  BsPeople,
} from "react-icons/bs";
import { ThemeContext } from "../../routes";
import logo from "../../Image/logozeus.png";
import title from "../../Image/titleZeus.png";
// import { auth } from '../../firebaseConfig/firebaseConfig';
import { useNavigate } from "react-router-dom";
import { getIdBlocks, getLookerBlock } from "../../Redux/redux-DashBoard";
import { useAppDispatch } from "../../hooks/useTypeSelector";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setTheme, theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useAppDispatch();

  //   const logout = useCallback(() => {
  //     auth
  //       .signOut()
  //       .then(function () {
  //         console.log("Successfully signed out.");
  //         localStorage.removeItem("user");
  //         navigate("/");
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         console.log("An error occurred");
  //       });
  //   }, [auth]);

  const map = useCallback(() => {
    dispatch(getLookerBlock({ isMapLookerOrMap: true }));
  }, [dispatch]);

  return (
    <SSidebar>
      <>
        <SSidebarButton
          onClick={() => setSidebarOpen((p) => !p)}
          style={!sidebarOpen ? { transform: "rotate(180deg)" } : {}}
        >
          <AiOutlineLeft />
        </SSidebarButton>
      </>
      <SLogo
        style={
          !sidebarOpen
            ? { transform: "rotate(-360deg)" }
            : { display: "inline-block" }
        }
      >
        <img src={logo} alt="logo" />
      </SLogo>
      <STitleLogo
        style={
          !sidebarOpen
            ? { scale: 0, display: "none" }
            : { display: "inline-block", marginLeft: "8px" }
        }
      >
        <img src={title} alt="logo" />
      </STitleLogo>
      <SDivider />
      {linksArray.map(({ icon, label, to }) => (
        <SLinkContainer
          key={label}
          style={
            !sidebarOpen ? { width: "fit-content", marginLeft: "10px" } : {}
          }
        >
          {label === "Home" ? (
            <SLink
              to={to}
              onClick={map}
              style={!sidebarOpen ? { width: "fit-content" } : {}}
            >
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && (
                <>
                  <SLinkLabel>{label}</SLinkLabel>
                </>
              )}
            </SLink>
          ) : (
            <SLink to={to} style={!sidebarOpen ? { width: "fit-content" } : {}}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && (
                <>
                  <SLinkLabel>{label}</SLinkLabel>
                </>
              )}
            </SLink>
          )}
        </SLinkContainer>
      ))}
      <SDivider />
      {secondaryLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer
          key={label}
          style={
            !sidebarOpen ? { width: "fit-content", marginLeft: "10px" } : {}
          }
        >
          {label === "Sair" ? (
            <SLink to={""} style={!sidebarOpen ? { width: "fit-content" } : {}}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
            </SLink>
          ) : (
            <SLink to={to} style={!sidebarOpen ? { width: "fit-content" } : {}}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
            </SLink>
          )}
        </SLinkContainer>
      ))}
      <SDivider />
      <STheme>
        {sidebarOpen && (
          <SThemeLabel>
            <ModeIcon>
              {theme === "dark" ? mode[0].icon : mode[1].icon}
            </ModeIcon>
            {theme === "dark" ? mode[0].label : mode[1].label}
          </SThemeLabel>
        )}

        <SThemeToggler
          onClick={() =>
            setTheme((p: string) => (p === "light" ? "dark" : "light"))
          }
          style={!sidebarOpen ? { marginLeft: "13px" } : {}}
        >
          <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
        </SThemeToggler>
      </STheme>
    </SSidebar>
  );
};

const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/dashboard",
  },
  {
    label: "Mapa",
    icon: <BsFillPinMapFill />,
    to: "/map",
  },
  {
    label: "Relatório",
    icon: <MdOutlineAnalytics />,
    to: "/relatorio",
  },
  {
    label: "Previsões",
    icon: <BsFillCloudLightningRainFill />,
    to: "/previsoes",
  },
  {
    label: "Perfil",
    icon: <BsPeople />,
    to: "/profile",
  },
];

const secondaryLinksArray = [
  {
    label: "Configurações",
    icon: <AiOutlineSetting />,
    to: "/configuracoes",
  },
  {
    label: "Sair",
    icon: <MdLogout />,
    to: "/",
  },
];

const mode = [
  {
    label: "Modo Claro",
    icon: <MdLightMode />,
  },
  {
    label: "Modo Escuro",
    icon: <MdDarkMode />,
  },
];

export default Sidebar;
