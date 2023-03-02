import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  projects: [],
  error: '',
};

export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
  const jwt = await AP.context.getToken()
    .then((token) => {
      return token
    });
    const result = await fetch(`/projects?jwt=${jwt}`, {
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
        return res.values.map(value => {
          return {label: value.name, value: value.key}
        });
      })
      .catch(err => console.error(err))
      return result;
    }
)

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload;
            state.error = '';
        });
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.projects = [];
            state.error = action.error.message;
        });
    }
});

export default projectSlice.reducer