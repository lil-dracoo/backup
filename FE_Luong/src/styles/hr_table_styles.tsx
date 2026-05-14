export const getEmployeeTableStyles = (
  isDark: boolean,
) => ({
  flex: 1,

  minHeight: 0,

  overflow: "hidden",

  display: "flex",

  flexDirection: "column",

  // =========================
  // ANT WRAPPER
  // =========================

  "& .ant-table-wrapper": {
    height: "100%",
  },

  "& .ant-spin-nested-loading": {
    height: "100%",
  },

  "& .ant-spin-container": {
    height: "100%",

    display: "flex",

    flexDirection: "column",
  },

  "& .ant-table-container": {
    borderRadius: 0,
  },

  "& .ant-table-body": {
    overflowX: "auto !important",

    overflowY: "auto !important",

    scrollbarWidth: "thin",
  },

  // =========================
  // RESIZE
  // =========================

  "& .react-resizable": {
    position: "relative",
  },

  "& .react-resizable-handle": {
    position: "absolute",

    right: -3,

    top: 0,

    width: "14px",

    height: "100%",

    cursor: "col-resize",

    zIndex: 2,

    transition: "all 0.15s ease",

    background: "transparent",

    borderRight:
      "2px solid transparent",

    pointerEvents: "auto",

    userSelect: "none",

    touchAction: "none",
  },

  "& .react-resizable-handle:hover":
    {
      borderRight:
        "2px solid #3b82f6",

      background:
        "rgba(59,130,246,0.08)",
    },

  // =========================
  // TABLE
  // =========================

  "& .ant-table": {
    background: "transparent",

    color: isDark
      ? "#f8fafc"
      : "#0f172a",

    height: "100%",
  },

  "& .ant-table-content": {
    overflowX: "auto !important",
  },

  "& .ant-table-header": {
    position: "sticky",

    top: 0,

    zIndex: 20,

    backdropFilter:
      "blur(20px) saturate(180%)",

    WebkitBackdropFilter:
      "blur(20px) saturate(180%)",

    background: isDark
      ? "rgba(15,23,42,0.65)"
      : "rgba(255,255,255,0.65)",
  },

  // =========================
  // HEADER
  // =========================

  "& .ant-table-thead > tr > th": {
    background: isDark
      ? "rgba(15,23,42,0.72) !important"
      : "rgba(255,255,255,0.72) !important",

    color: isDark
      ? "#f8fafc !important"
      : "#0f172a !important",

    borderBottom: isDark
      ? "1px solid rgba(71,85,105,0.4)"
      : "1px solid #e2e8f0",

    fontWeight: 700,

    fontSize: "0.85rem",

    position: "relative",

    overflow: "hidden",

    backdropFilter: "blur(20px)",

    WebkitBackdropFilter:
      "blur(20px)",
  },

  // =========================
  // CELL
  // =========================

  "& .ant-table-cell": {
    position: "relative",
  },

  "& .ant-table-tbody > tr > td": {
    background: isDark
      ? "#1e293b"
      : "#ffffff",

    color: isDark
      ? "#e2e8f0 !important"
      : "#0f172a !important",

    borderBottom: isDark
      ? "1px solid rgba(71,85,105,0.15)"
      : "1px solid #e2e8f0",

    whiteSpace: "nowrap",

    textOverflow: "ellipsis",

    overflow: "hidden",
  },

  "& .ant-table-tbody > tr:hover > td":
    {
      background: isDark
        ? "#334155 !important"
        : "#f1f5f9 !important",
    },

  // =========================
  // FIXED COLUMN
  // =========================

  "& .ant-table-cell-fix-left": {
    background: isDark
      ? "#0f172a !important"
      : "#ffffff !important",

    position: "sticky !important",

    zIndex: 3,

    boxShadow: isDark
      ? "none"
      : "2px 0 0 #e2e8f0",
  },

  "& .ant-table-cell-fix-left .react-resizable-handle":
    {
      zIndex: 1,

      right: -2,
    },

  "& .ant-table-cell-fix-left-last .react-resizable-handle":
    {
      zIndex: 1,

      right: -2,
    },

  "& .ant-table-cell-fix-left::before":
    {
      display: "none !important",
    },

  "& .ant-table-cell-fix-left::after":
    {
      display: "none !important",
    },

  "& .ant-table-ping-left .ant-table-cell-fix-left-last::after":
    {
      display: "none !important",

      boxShadow:
        "none !important",
    },

  "& .ant-table-ping-left .ant-table-cell-fix-left-last::before":
    {
      display: "none !important",
    },

  // =========================
  // SCROLLBAR
  // =========================

  "& ::-webkit-scrollbar": {
    height: 10,

    width: 10,
  },

  "& ::-webkit-scrollbar-thumb": {
    background: isDark
      ? "#475569"
      : "#cbd5e1",

    borderRadius: 999,
  },

  "& ::-webkit-scrollbar-track": {
    background: "transparent",
  },

  // =========================
  // PAGINATION
  // =========================

  "& .ant-pagination": {
    padding: "12px 16px",

    margin: 0,
  },

  "& .ant-pagination-item": {
    background: isDark
      ? "#1e293b"
      : "#ffffff",

    borderColor: isDark
      ? "#334155"
      : "#cbd5e1",
  },

  "& .ant-pagination-item a": {
    color: isDark
      ? "#f8fafc"
      : "#0f172a",
  },

  "& .ant-pagination-item-active":
    {
      background: "#2563eb",

      borderColor: "#2563eb",
    },

  "& .ant-pagination-item-active a":
    {
      color: "#ffffff",
    },
});