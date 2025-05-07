import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { captureVoiceAndPrintText } from "@/common/utils/voice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type SearchProps = {
  searchText: string;
};

export function Search({ searchText }: SearchProps) {
  return (
    <div className="filter-form__search-input-wrapper">
      <div className="filter-form__search-icon">
        <SearchOutlinedIcon />
      </div>
      <input
        className="input-default"
        type="text"
        placeholder={searchText}
        name="keyword"
        id="keyword"
      />
      <button
        className="btn-default"
        type="button"
        onClick={() => captureVoiceAndPrintText("keyword")}
      >
        <MicNoneOutlinedIcon />
      </button>
    </div>
  );
}
