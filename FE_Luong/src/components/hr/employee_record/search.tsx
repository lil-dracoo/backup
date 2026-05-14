import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface ISearchEmpProps {
    isDark: boolean;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    searchText: string;
}
const SearchTable = (props: ISearchEmpProps) => {
  const { isDark, setSearchText, searchText } = props;
  return (
    <TextField
      placeholder="Tìm mã nhân viên, tên, phòng ban..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      size="small"
      sx={{
        minWidth: 320,

        "& .MuiOutlinedInput-root": {
          borderRadius: 3,

          background: isDark ? "rgba(30,41,59,0.8)" : "#f8fafc",

          color: isDark ? "#f8fafc" : "#0f172a",
        },

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: isDark ? "rgba(71,85,105,0.5)" : "#cbd5e1",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  mr: 1,

                  color: isDark ? "#cbd5e1" : "#64748b",
                }}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
export default SearchTable;
