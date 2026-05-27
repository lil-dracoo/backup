import {
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
  MenuItem,
  Paper,
  Popper,
  MenuList,
} from "@mui/material";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useLocation } from "react-router-dom";

interface SideBarMenuProps {
  collapsed: boolean;
  menuItems: any[];
  isDark: boolean;
  navigate: (path: string) => void;
}

const SideBarMenu = (
  props: SideBarMenuProps
) => {
  const {
    collapsed,
    menuItems,
    isDark,
    navigate,
  } = props;

  const location = useLocation();

  // ================= STATE =================

  const [openMenus, setOpenMenus] =
    useState<string[]>([]);

  // POPUP MENU KHI COLLAPSE

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(
      null
    );

  const [hoveredMenu, setHoveredMenu] =
    useState<any>(null);

  const closeTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!collapsed) {
      setAnchorEl(null);
      setHoveredMenu(null);
    }
  }, [collapsed]);

  // ================= HANDLE =================

  const handleNavigation = (
    path: string
  ) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path
    );
  };

  const isChildActive = (item: any) => {
    return item.children?.some(
      (child: any) =>
        child.path &&
        isActive(child.path)
    );
  };

  const toggleMenu = (
    menuText: string
  ) => {
    setOpenMenus((prev) =>
      prev.includes(menuText)
        ? prev.filter(
            (item) =>
              item !== menuText
          )
        : [...prev, menuText]
    );
  };

  // ================= POPUP =================

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    item: any
  ) => {
    if (closeTimeout.current) {
      clearTimeout(
        closeTimeout.current
      );
    }

    if (
      collapsed &&
      item.children
    ) {
      setAnchorEl(
        event.currentTarget
      );

      setHoveredMenu(item);
    }
  };

  const handlePopoverClose =
    () => {
      closeTimeout.current =
        setTimeout(() => {
          setAnchorEl(null);

          setHoveredMenu(null);
        }, 120);
    };

  const cancelPopoverClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  return (
    <Box
      sx={{
        py: 2,

        px: collapsed ? 1 : 1.5,
      }}
    >
      {menuItems.map(
        (item, index) => {
          const IconComponent =
            item.icon;

          const active =
            (item.path &&
              isActive(item.path)) ||
            isChildActive(item);

          const hasChildren =
            item.children &&
            item.children.length > 0;

          const isOpen =
            openMenus.includes(
              item.text
            );

          return (
            <Box key={index}>
              {/* MENU CHA */}

              <Tooltip
                title={item.text}
                placement="right"
                arrow
                disableHoverListener={
                  !collapsed
                }
                disableFocusListener={
                  !collapsed
                }
                disableTouchListener={
                  !collapsed
                }
              >
                <ListItemButton
                  onMouseEnter={(e) =>
                    handlePopoverOpen(
                      e,
                      item
                    )
                  }
                  onMouseLeave={() => {
                    if (
                      collapsed
                    ) {
                      handlePopoverClose();
                    }
                  }}
                  onClick={() => {
                    if (
                      hasChildren
                    ) {
                      if (
                        !collapsed
                      ) {
                        toggleMenu(
                          item.text
                        );
                      }
                    } else {
                      handleNavigation(
                        item.path
                      );
                    }
                  }}
                  sx={{
                    justifyContent:
                      collapsed
                        ? "center"
                        : "flex-start",

                    alignItems:
                      "center",

                    borderRadius:
                      "14px",

                    mb: 0.75,

                    py: 1.35,

                    px: collapsed
                      ? 1
                      : 2,

                    position:
                      "relative",

                    backgroundColor:
                      active
                        ? isDark
                          ? "rgba(37, 99, 235, 0.15)"
                          : "rgba(37, 99, 235, 0.08)"
                        : "transparent",

                    border: active
                      ? isDark
                        ? "1px solid rgba(37, 99, 235, 0.3)"
                        : "1px solid rgba(37, 99, 235, 0.14)"
                      : "1px solid transparent",

                    boxShadow:
                      active
                        ? "0 6px 18px rgba(37, 99, 235, 0.08)"
                        : "none",

                    transition:
                      "all 0.2s ease",

                    "&:hover": {
                      backgroundColor:
                        isDark
                          ? "rgba(15, 23, 42, 0.08)"
                          : "rgba(15, 23, 42, 0.04)",
                    },

                    "&::before":
                      active
                        ? {
                            content:
                              '""',

                            position:
                              "absolute",

                            left: 6,

                            top: "50%",

                            transform:
                              "translateY(-50%)",

                            width:
                              "4px",

                            height:
                              "24px",

                            background:
                              "linear-gradient(180deg,#2563eb,#7c3aed)",

                            borderRadius:
                              "999px",
                          }
                        : {},
                  }}
                >
                  {/* ICON */}

                  <ListItemIcon
                    sx={{
                      minWidth:
                        collapsed
                          ? 0
                          : 40,

                      justifyContent:
                        "center",

                      color: active
                        ? "#2563eb"
                        : isDark
                          ? "#94a3b8"
                          : "#64748b",

                      mr: collapsed
                        ? 0
                        : 2,
                    }}
                  >
                    <Badge
                      variant="dot"
                      invisible={
                        !active
                      }
                      sx={{
                        "& .MuiBadge-badge":
                          {
                            backgroundColor:
                              "#2563eb",

                            boxShadow:
                              isDark
                                ? "0 0 0 2px #1e293b"
                                : "0 0 0 2px #fff",
                          },
                      }}
                    >
                      <IconComponent />
                    </Badge>
                  </ListItemIcon>

                  {/* TEXT */}

                  {!collapsed && (
                    <>
                      <ListItemText
                        primary={
                          item.text
                        }
                        sx={{
                          "& .MuiTypography-root":
                            {
                              fontSize:
                                "0.9rem",

                              fontWeight:
                                active
                                  ? 700
                                  : 500,

                              color:
                                active
                                  ? isDark
                                    ? "#e2e8f0"
                                    : "#0f172a"
                                  : isDark
                                    ? "#cbd5e1"
                                    : "#334155",
                            },
                        }}
                      />

                      {/* ARROW */}

                      {hasChildren &&
                        (isOpen ? (
                          <ExpandLessIcon
                            sx={{
                              fontSize: 20,

                              color:
                                isDark
                                  ? "#94a3b8"
                                  : "#64748b",
                            }}
                          />
                        ) : (
                          <ExpandMoreIcon
                            sx={{
                              fontSize: 20,

                              color:
                                isDark
                                  ? "#94a3b8"
                                  : "#64748b",
                            }}
                          />
                        ))}
                    </>
                  )}
                </ListItemButton>
              </Tooltip>

              {/* POPUP MENU KHI COLLAPSE */}

              {collapsed &&
                hasChildren &&
                hoveredMenu?.text ===
                  item.text && (
                  <Popper
                    anchorEl={anchorEl}
                    open={Boolean(
                      anchorEl
                    )}
                    placement="right-start"
                    sx={{ zIndex: 1400 }}
                    modifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [8, -6],
                        },
                      },
                    ]}
                    onMouseEnter={
                      cancelPopoverClose
                    }
                    onMouseLeave={
                      handlePopoverClose
                    }
                  >
                    <Paper
                      sx={{
                        minWidth: 240,
                        borderRadius: 4,
                        overflow: "hidden",
                        background: isDark
                          ? "#0f172a"
                          : "#ffffff",
                        border: isDark
                          ? "1px solid rgba(148,163,184,0.14)"
                          : "1px solid rgba(226,232,240,1)",
                        boxShadow:
                          "0 20px 40px rgba(15, 23, 42, 0.22)",
                      }}
                    >
                      {/* TITLE */}

                      <Box
                        sx={{
                          px: 2,
                          py: 1.5,
                          fontSize:
                            "0.82rem",
                          fontWeight: 700,
                          color: isDark
                            ? "#94a3b8"
                            : "#64748b",
                          borderBottom: isDark
                            ? "1px solid rgba(148,163,184,0.12)"
                            : "1px solid rgba(226,232,240,1)",
                        }}
                      >
                        {item.text}
                      </Box>

                      {/* CHILD */}

                      <MenuList dense sx={{ py: 0.75 }}>
                        {item.children.map(
                          (
                            child: any,
                            childIndex: number
                          ) => {
                            const childActive =
                              isActive(
                                child.path
                              );

                            return (
                              <MenuItem
                                key={
                                  childIndex
                                }
                                onClick={() => {
                                  handleNavigation(
                                    child.path
                                  );

                                  setAnchorEl(null);
                                  setHoveredMenu(
                                    null
                                  );
                                }}
                                sx={{
                                  fontSize: 14,

                                  py: 1.25,

                                  mx: 1,

                                  my: 0.35,

                                  borderRadius: 2,

                                  color:
                                    childActive
                                      ? "#3b82f6"
                                      : isDark
                                        ? "#e2e8f0"
                                        : "#0f172a",

                                  fontWeight:
                                    childActive
                                      ? 700
                                      : 500,

                                  background:
                                    childActive
                                      ? isDark
                                        ? "rgba(59,130,246,0.12)"
                                        : "rgba(59,130,246,0.08)"
                                      : "transparent",

                                  "&:hover": {
                                    background:
                                      isDark
                                        ? "rgba(59,130,246,0.12)"
                                        : "rgba(59,130,246,0.08)",
                                  },
                                }}
                              >
                                {
                                  child.text
                                }
                              </MenuItem>
                            );
                          }
                        )}
                      </MenuList>
                    </Paper>
                  </Popper>
                )}

              {/* MENU CON KHI EXPAND */}

              {!collapsed &&
                hasChildren && (
                  <Collapse
                    in={isOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        ml: 2.5,

                        pl: 2,

                        borderLeft:
                          isDark
                            ? "1px solid rgba(148,163,184,0.12)"
                            : "1px solid rgba(100,116,139,0.12)",

                        mb: 1,
                      }}
                    >
                      {item.children.map(
                        (
                          child: any,
                          childIndex: number
                        ) => {
                          const childActive =
                            isActive(
                              child.path
                            );

                          return (
                            <ListItemButton
                              key={
                                childIndex
                              }
                              onClick={() =>
                                handleNavigation(
                                  child.path
                                )
                              }
                              sx={{
                                borderRadius:
                                  "12px",

                                py: 1,

                                px: 2,

                                mb: 0.5,

                                backgroundColor:
                                  childActive
                                    ? isDark
                                      ? "rgba(59,130,246,0.12)"
                                      : "rgba(59,130,246,0.08)"
                                    : "transparent",

                                "&:hover":
                                  {
                                    backgroundColor:
                                      isDark
                                        ? "rgba(15,23,42,0.08)"
                                        : "rgba(15,23,42,0.04)",
                                  },
                              }}
                            >
                              <ListItemText
                                primary={
                                  child.text
                                }
                                sx={{
                                  "& .MuiTypography-root":
                                    {
                                      fontSize:
                                        "0.84rem",

                                      fontWeight:
                                        childActive
                                          ? 700
                                          : 500,

                                      color:
                                        childActive
                                          ? "#3b82f6"
                                          : isDark
                                            ? "#cbd5e1"
                                            : "#475569",
                                    },
                                }}
                              />
                            </ListItemButton>
                          );
                        }
                      )}
                    </Box>
                  </Collapse>
                )}
            </Box>
          );
        }
      )}
    </Box>
  );
};

export default SideBarMenu;
