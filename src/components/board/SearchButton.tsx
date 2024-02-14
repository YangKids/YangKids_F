import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface Props {
    onClick : React.MouseEventHandler<HTMLElement>
}

const SearchButton = (props : Props) => {


    return(
        <Button
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "0 6px 6px 0",
          marginRight : "0px"
        }}
        onClick={props.onClick}
      >
        <SearchOutlined />
      </Button>
    )
}

export default SearchButton;