import { Box} from "@mui/material";
import SearchTable from "./search";
import ButtonTable from "./button_tuy_chinh";
interface ISearchEmpProps {
  isDark: boolean;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
const Toolbar = (props: ISearchEmpProps) => {
  const { isDark, searchText, setSearchText, setOpenDrawer } = props;
  return (
    <Box
      sx={{
        p: 1.5,

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        gap: 2,

        flexWrap: "wrap",

        borderBottom: isDark
          ? "1px solid rgba(71,85,105,0.3)"
          : "1px solid #e2e8f0",

        background: isDark ? "#020617" : "#ffffff",
      }}
    >
      <SearchTable
        isDark={isDark}
        setSearchText={setSearchText}
        searchText={searchText}
      />

      <ButtonTable setOpenDrawer={setOpenDrawer} />
    </Box>
  );
};
export default Toolbar;
