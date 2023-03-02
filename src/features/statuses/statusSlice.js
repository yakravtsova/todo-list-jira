import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  statuses: [],
  error: '',
};

export const fetchStatuses = createAsyncThunk('status/fetchStatuses', async () => {
  const jwt = await AP.context.getToken()
    .then((token) => {
      return token
    });
    console.log('stat')
    const result = await fetch(`/statuses?jwt=${jwt}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      })
      .then(res => {
        return res.json();
      })
      .then(res => {
        return res.map(value => {
          return {label: value.name, value: `'${value.name}'`}
        });
      })
      .catch(err => console.error(err))
      return result;
    }
)

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStatuses.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchStatuses.fulfilled, (state, action) => {
            state.loading = false;
            state.statuses = action.payload;
            state.error = '';
        });
        builder.addCase(fetchStatuses.rejected, (state, action) => {
            state.loading = false;
            state.statuses = [];
            state.error = action.error.message;
        });
    }
});

export default statusSlice.reducer