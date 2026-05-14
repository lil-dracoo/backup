import { Button } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
const ButtonTable = (props: {setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { setOpenDrawer } = props;
    return (
        <Button
        variant="contained"
        startIcon={<ViewColumnIcon />}
        onClick={() => setOpenDrawer(true)}
        sx={{
          textTransform: "none",

          borderRadius: 3,

          px: 2,
        }}
      >
        Tùy chỉnh cột
      </Button>
    )
}
export default ButtonTable;