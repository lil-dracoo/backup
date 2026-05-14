import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  Typography,
} from "@mui/material";
interface IFromTuyChinhCotProps {
  isDark: boolean;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  columnVisibilityModel: any;
  setColumnVisibilityModel: React.Dispatch<React.SetStateAction<any>>;
  employeeColumns: any[];
}
const FromTuyChinhCot = (props: IFromTuyChinhCotProps) => {
  const {
    isDark,
    openDrawer,
    setOpenDrawer,
    columnVisibilityModel,
    setColumnVisibilityModel,
    employeeColumns,
  } = props;
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Box
        sx={{
          width: 320,

          p: 2,

          height: "100%",

          background: isDark ? "#020617" : "#ffffff",

          color: isDark ? "#f8fafc" : "#0f172a",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,

            fontWeight: 700,
          }}
        >
          Tùy chỉnh cột
        </Typography>

        {employeeColumns.map((column: any) => {
          const checked = columnVisibilityModel[column.field] !== false;

          return (
            <FormControlLabel
              key={column.field}
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => {
                    const newModel = {
                      ...columnVisibilityModel,

                      [column.field]: e.target.checked,
                    };

                    setColumnVisibilityModel(newModel);

                    localStorage.setItem(
                      "employeeGridColumns",

                      JSON.stringify(newModel),
                    );
                  }}
                />
              }
              label={column.headerName}
              sx={{
                display: "flex",

                mb: 1,
              }}
            />
          );
        })}
      </Box>
    </Drawer>
  );
};
export default FromTuyChinhCot;
