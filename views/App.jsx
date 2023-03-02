import DynamicTable from '@atlaskit/dynamic-table';
import { Checkbox } from '@atlaskit/checkbox';
import Button from '@atlaskit/button/standard-button';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import Badge from '@atlaskit/badge';
import FilterIcon from '@atlaskit/icon/glyph/filter';

import { useSelector, useDispatch } from 'react-redux';
import { checkIssue, selectIssues, deleteIssueById } from '../src/features/issues/issueSlice';

import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';

export default function App() {
  const issue = useSelector(state => state.issue);
  const dispatch = useDispatch();
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [ isFiltered, setIsFiltered ] = useState(false);
  const issuesList = useSelector(state => selectIssues(state.issue, isFiltered));
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const handleSetIsFirstSearch = () => {
    setIsFirstSearch(false);
  }

  useEffect(() => {
    let rows = [];
    issue.issues.forEach((i, index) => {
      if (i.isChecked) {
        rows = [...rows, index]
      }
    });
    setHighlightedRows(rows)
  }, [issue.issues]);

  const handleFilter = () => {
    setIsFiltered(!isFiltered);
  }

  const rows = issuesList.map((issue, index) => {
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
            onClick={() => dispatch(deleteIssueById(issue.id))}
            ></Button>
            )
        }
      ]
    }
  });

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

  const buttonAppearance = isFiltered ? 'link' : 'subtle-link';
  const buttonCaption = isFiltered ? 'Unfilter' : 'Filter';


  return (
    <div style={{
      padding : '24px',
      minHeight: '300px',
      margin:'0 auto',
      boxSizing : 'border-box'
      }}>

      <SearchForm setIsFirstSearch={handleSetIsFirstSearch} />
      {!issue.loading && issue.error ? <div>Error: {issue.error}</div> : null}
      {!isFirstSearch &&
        <>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h2>TodoList Tasks</h2>
            <Button
              onClick={handleFilter}
              iconAfter={<FilterIcon />}
              appearance={buttonAppearance}>
                {buttonCaption}
            </Button>
          </div>
            <DynamicTable
              head={head}
              rows={rows}
              defaultPage={1}
              loadingSpinnerSize="small"
              isLoading={issue.loading}
              emptyView={<h2>Nothing found</h2>}
              highlightedRowIndex={highlightedRows}
            />
        </>
        }
    </div>)
}