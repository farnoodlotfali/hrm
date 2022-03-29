import { makeStyles } from "@mui/styles";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { TextField } from "@mui/material";
import dynamic from "next/dynamic";

//utility
import { enToFaDigit } from "../utils/utility";

const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#1f78b4",
    },
    "&:hover $notchedOutline": {
      borderColor: "blue",
    },
    "&$focused $notchedOutline": {
      borderColor: "#1f78b4",
    },
  },
  //   focused: {},
  //   notchedOutline: {},
  notchedOutlineInput: {
    borderColor: "rgb(31, 120, 180) !important",
  },
}));

interface MobileTimePickerBoxProps {
  label: string;
  time: Date;
  setTime: (value: Date) => void;
}

const MobileTimePickerBox: React.FC<MobileTimePickerBoxProps> = ({
  label,
  time,
  setTime,
}) => {
  // const [Time, setTime] = useState<Date | null>(
  //   new Date("2018-01-01T00:00:00.000Z")
  // );
  const outlinedInputClasses = useOutlinedInputStyles();
  return (
    <MobileTimePicker
      value={time}
      label={"زمان " + label}
      onChange={(newValue) => {
        setTime(newValue!);
      }}
      cancelText={<span className="font-iranYekan">لغو</span>}
      toolbarTitle={<span className="font-iranYekan">ساعت {label}</span>}
      okText={<span className="font-iranYekan">ثبت</span>}
      renderInput={(params: any) => {
        var newObj: any = {};
        for (var i in params) {
          var value = params[i];

          newObj[i] = params[i];
          if (value?.value) {
            newObj[i].value = enToFaDigit(value?.value);
          }
        }

        return (
          <TextField
            {...params}
            InputProps={{
              classes: {
                notchedOutline: outlinedInputClasses.notchedOutlineInput,
              },
            }}
          />
        );
      }}
    />
  );
};

export default dynamic(() => Promise.resolve(MobileTimePickerBox), {
  ssr: false,
});
// export default MobileTimePickerBox;
