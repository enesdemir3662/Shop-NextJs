import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function AutoComplate() {
  const [values, setValues] = React.useState();

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={[
          { title: "a", year: "5" },
          { title: "ab", year: "56" },
        ]}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        onChange={(event, newValue) => {
          setValues(newValue);
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label="filterSelectedOptions"
              placeholder="Favorites"
            />
          </>
        )}
      />
      {values && values.map((val) => <pre>{JSON.stringify(val)}</pre>)}
    </Stack>
  );
}
