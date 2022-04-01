import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
import { CheckSquare } from "react-feather";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

const useOutlinedInputStyles = makeStyles(() => ({
  notchedOutlineInput: {
    borderColor: "rgb(31, 120, 180) !important",
  },
}));

interface SelectBoxCardsProps {
  data: any[];
  chooseData: any;
  setChooseData: (value: any) => void;
  setSelectedId?: (value: any) => void;
}
const SelectBoxCards: React.FC<SelectBoxCardsProps> = ({
  data,
  chooseData,
  setChooseData,
  setSelectedId,
}) => {
  const outlinedInputClasses = useOutlinedInputStyles();
  const handleChange = (
    event: SelectChangeEvent<typeof chooseData>,
    val: any
  ) => {
    const {
      target: { value },
    } = event;

    setSelectedId && setSelectedId(val.props.id);

    setChooseData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const getStyles = (name: string, chooseData: readonly string[]) => {
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
        IconComponent={() => (
          <CheckSquare size={25} className="mr-3 text-firstColor-900" />
        )}
        multiple
        displayEmpty
        value={chooseData}
        onChange={(e, v) => {
          handleChange(e, v);
        }}
        input={
          <OutlinedInput
            classes={{
              notchedOutline: outlinedInputClasses.notchedOutlineInput,
            }}
          />
        }
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span className="flex justify-end">انتخاب کار</span>;
          }

          return <div className="flex justify-end">{selected.join(", ")}</div>;
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="" className="flex justify-end">
          <em>انتخاب کار</em>
        </MenuItem>
        {data.map((item) => {
          return (
            <MenuItem
              key={item.id}
              id={item.id}
              value={item.name}
              style={getStyles(item.name, chooseData)}
            >
              <div className="">
                <div className="text-right text-[11px] text-gray-500  ">
                  {item.board}
                </div>
                <div className="">{item.name}</div>
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default dynamic(() => Promise.resolve(SelectBoxCards), { ssr: false });

// export default SelectBox;
