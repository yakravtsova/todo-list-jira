import DynamicTable from '@atlaskit/dynamic-table';
import { Checkbox } from '@atlaskit/checkbox';
import Button from '@atlaskit/button/standard-button';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import Badge from '@atlaskit/badge';

import { useSelector, useDispatch } from 'react-redux';
import {deleteIssue, checkIssue} from '../src/features/issues/issueSlice';

import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';

export default function App() {
  const issue = useSelector(state => state.issue);
  const dispatch = useDispatch();
  const [highlightedRows, setHighlightedRows] = useState([]);

  useEffect(() => {
    let rows = [];
    issue.issues.forEach((i, index) => {
      if (i.isChecked) {
        rows = [...rows, index]
      }
    });
    setHighlightedRows(rows)
  }, [issue.issues])

    //rows with Redux data
    const rows = issue.issues.map((issue, index) => {
      return {
        key : `issue-row-${issue.id}`,
        cells : [
          {
            key: 'issue-row-creator',
            content: (
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <img src={issue.avatar['24x24']} style={{borderRadius:'50%'}}/>
                <strong>{issue.name}</strong>
              </div>
            )
          },
          {
            key: 'issue-row-project',
            content: issue.project
          },
          {
            key: 'issue-row-summary',
            content: issue.summary
          },
          {
            key: 'issue-row-status',
            content: (
            <>
              <Badge>{issue.status}</Badge>
              <br/>
              <small>{issue.updated}</small>
            </>
            )
          },
          {
            key: 'issue-row-checkbox',
            content: (
            <Checkbox
              value="default checkbox"
              //label="Default checkbox"
              onChange={() => dispatch(checkIssue(index))}
              name="checkbox-default"
              testId="cb-default"
              isChecked={issue.isChecked}
            />
            )
          },
          {
            key: 'issue-row-delete',
            content: (
            <Button
              appearance="subtle"
              iconBefore={<TrashIcon size="small" />}
              onClick={() => dispatch(deleteIssue(issue.id))}
              ></Button>
              )
          }
        ]
      }
    });

    const caption = "TodoList Tasks";

    const head = {
      cells : [
        {
          key : 'issue-creator',
          content : 'Creator'
        },
        {
          key : 'issue-project',
          content : 'Project'
        },
        {
          key : 'issue-summary',
          content : 'Summary'
        },
        {
          key : 'issue-status',
          content : 'Status'
        },
        {
          key : 'issue-checkbox',
          content : "Checkbox",
          width : '1'
        },
        {
          key : 'issue-delete',
          content : 'Delete',
          width : '1'
        }
      ]
    };
  

  return (
    <div style={{
      padding : '24px',
      //width:'98%',
      //margin:'24px auto',
      boxSizing : 'border-box'
      }}>

      <SearchForm />
      {!issue.loading && issue.error ? <div>Error: {issue.error}</div> : null}
      {!issue.loading && 
        <DynamicTable
        caption={caption}
        head={head}
        rows={rows}
        rowsPerPage={10}
        defaultPage={1}
        loadingSpinnerSize="small"
        isLoading={issue.loading}
        emptyView={<h2>The table is empty and this is the empty view</h2>}
        highlightedRowIndex={highlightedRows}
    />}
      
    </div>)
}
