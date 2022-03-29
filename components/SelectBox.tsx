import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const useOutlinedInputStyles = makeStyles(() => ({
  notchedOutlineInput: {
    borderColor: "rgb(31, 120, 180) !important",
  },
}));

interface SelectBoxProps {
  data: any[];
  chooseData: any;
  setChooseData: (value: any) => void;
  icon?: any;
  label?: string;
  propertyName: string;
  multiple: boolean;
}
const SelectBox: React.FC<SelectBoxProps> = ({
  data,
  chooseData,
  setChooseData,
  label,
  icon,
  propertyName,
  multiple,
}) => {
  const outlinedInputClasses = useOutlinedInputStyles();
  const handleChange = (event: SelectChangeEvent<typeof chooseData>) => {
    const {
      target: { value },
    } = event;

    setChooseData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const getStyles = (name: string, chooseData: readonly string[]) => {
    // console.log(chooseData);
    // console.log(name);

    let bool = chooseData.indexOf(name) === -1;
    return {
      fontFamily: "iranYekan",
      margin: "10px",
      borderRadius: "10px",
      padding: "10px",
      color: bool ? "black" : "black",
      border: bool ? "2px solid white" : "2px solid #1f78b470",
      display: "flex",
      justifyContent: "end",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      overflow: "hidden",
    };
  };
  return (
    <FormControl sx={{ m: 1, width: "100%", pr: 2 }}>
      <Select
        className="font-iranYekan  "
        IconComponent={() => icon || null}
        multiple={multiple}
        displayEmpty
        value={chooseData}
        onChange={(e) => handleChange(e)}
        input={
          <OutlinedInput
            classes={{
              notchedOutline: outlinedInputClasses.notchedOutlineInput,
            }}
          />
        }
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span className="flex justify-end">{label}</span>;
          }
          // console.log(selected);
          // return <span className="flex justify-end">{label}</span>;

          return <div className="flex justify-end">{selected.join(", ")}</div>;
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="" className="flex justify-end">
          <em>{label}</em>
        </MenuItem>
        {data.map((item) => {
          return (
            <MenuItem
              key={item.id}
              value={item[propertyName]}
              style={getStyles(item[propertyName], chooseData)}
            >
              {item[propertyName]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default dynamic(() => Promise.resolve(SelectBox), { ssr: false });

// export default SelectBox;
