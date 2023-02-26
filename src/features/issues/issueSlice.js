import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";

const initialState = {
    loading: false,
    issues: [],
    error: '',
};

export const fetchIssues = createAsyncThunk('issue/fetchIssues', /*() => {
    return axios
        .get('/issues')
        .then(res => {
            res.issues.map(issue => {
            const fields = issue.fields;
            const creator = fields.creator;
            return {
                avatar: creator.avatarUrls,
                name: creator.displayName,
                summary: fields.summary,
                status: fields.status.name,
                updated: fields.updated,
            }
            }
        )})
}*/
    async () => {
        return await fetch('/issue', {
            method: "GET",
            'Accept': 'application/json',
          })
          .then(res => {
            return res.json();
          })
          .then(res => {
            return res.issues.map(issue => {
                const fields = issue.fields;
                const creator = fields.creator;
                return {
                    avatar: creator.avatarUrls,
                    name: creator.displayName,
                    summary: fields.summary,
                    status: fields.status.name,
                    updated: fields.updated,
                }
            })
          })
          .then(res => {
          //  console.log(res);
            return res;
          })
          .catch(err => console.error(err))
        
    }
)

export const issueSlice = createSlice({
    name: 'issue',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchIssues.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchIssues.fulfilled, (state, action) => {
            state.loading = false;
            state.issues = action.payload;
            state.error = '';
        });
        builder.addCase(fetchIssues.rejected, (state, action) => {
            state.loading = false;
            state.issues = [];
            state.error = action.error.message;
        });
    }
});

export default issueSlice.reducer