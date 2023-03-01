import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    issues: [],
    error: ''
};

export const fetchIssuesByQuery = createAsyncThunk('issue/fetchIssuesByQuery', async (query) => {
    return await fetch(`/search?jql=${query}`, {
        method: "GET",
        'Accept': 'application/json'
      })
      .then(res => {
        return res.json();
      })
      .then(res => {
        return res.issues.map(issue => {
            const fields = issue.fields;
            const creator = fields.creator;
            return {
                id: issue.id,
                avatar: creator.avatarUrls,
                name: creator.displayName,
                summary: fields.summary,
                status: fields.status.name,
                updated: fields.updated,
                project: fields.project.name,
                isChecked: false
            }
        })
      })
      .catch(err => console.error(err))
    
}
);

export const selectIssues = (state, isFiltered) => {
    if (isFiltered) {
        return state.issues.filter(i => !i.isChecked)
    }
    return state.issues;
};

export const issueSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        deleteIssue: (state, action) => {
            const issueId = action.payload;
            state.issues = state.issues.filter(i => i.id !== issueId);
        },
        checkIssue: (state, action) => {
            const index = action.payload;
            const element = state.issues.splice(index, 1)[0];
            element.isChecked = !element.isChecked;
            state.issues = element.isChecked ? [...state.issues, element] : [element, ...state.issues];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIssuesByQuery.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchIssuesByQuery.fulfilled, (state, action) => {
            state.loading = false;
            state.issues = action.payload;
            state.error = '';
        });
        builder.addCase(fetchIssuesByQuery.rejected, (state, action) => {
            state.loading = false;
            state.issues = [];
            state.error = action.error.message;
        });
    }
});

export const {deleteIssue, checkIssue} = issueSlice.actions;
export default issueSlice.reducer