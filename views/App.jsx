import DynamicTable from '@atlaskit/dynamic-table';
import { Checkbox } from '@atlaskit/checkbox';
import Button from '@atlaskit/button/standard-button';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import Badge from '@atlaskit/badge';
import FormDefaultExample from './formDefault';
import { useDispatch, useSelector } from 'react-redux';

import React, { useState, useEffect } from 'react';
import { fetchIssues } from '../src/features/issues/issueSlice';

export default function App() {
  const [excitementLevel, setExcitementLevel] = React.useState(0);
  const [arrOfIssues, setArrOfIssues] = useState([]);
  const [arrOfProjects, setArrOfProjects] = useState([]);
  const dispatch = useDispatch();
  const issue = useSelector(state => state.issue);

  useEffect(() => {
    dispatch(fetchIssues());
  }, []);

  // useEffect(() => {
  //   async function fetchData(){
  //     const result = await fetch('/projects', {
  //       method: "GET",
  //       'Accept': 'application/json',
  //     })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => {
  //       setArrOfProjects(res.values);
  //     })
  //     .catch(err => console.error(err))
    
  //   }
  //   fetchData();
  // }, []);

    const pieceOfIssue = () => {
      return(
        <div></div>
      );
    }

    //testRows with Redux data
    const testRows = issue.issues.map((issue,index) => {
      return {
        key : `issue-row-${index}`,
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
              //onChange={}
              name="checkbox-default"
              testId="cb-default"
            />
            )
          },
          {
            key: 'issue-row-delete',
            content: (
            <Button
              appearance="subtle"
              iconBefore={<TrashIcon size="small" />}
              //onClick={}
              ></Button>
              )
          }
        ]
      }
    });

    const head = {
      cells : [
        {
          key : 'issue-summary',
          content : 'Summary'
        },
        {
          key : 'issue-creator',
          content : 'Creator'
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

    const testRows2 = [
      {
        key : `issue-row-1`,
        cells : [
          {
            key: 'issue-row-creator',
            content: (
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                
                <strong>issue.fields.creator.displayName</strong>
              </div>
            )
          },
          {
            key: 'issue-row-summary',
            content: 'issue.fields.summary'
          },
          {
            key: 'issue-row-status',
            content: (
            <>
              <Badge>issue.fields.status.name</Badge>
              <br/>
              <small>issue.fields.updated</small>
            </>
            )
          },
          {
            key: 'issue-row-checkbox',
            content: (
            <Checkbox
              value="default checkbox"
              //label="Default checkbox"
              //onChange={}
              name="checkbox-default"
              testId="cb-default"
            />
            )
          },
          {
            key: 'issue-row-delete',
            content: (
            <Button
              appearance="subtle"
              iconBefore={<TrashIcon size="small" />}
              //onClick={}
              ></Button>
              )
          }
        ]
      }
    ]
  

  return (
    <div style={{
      padding : '24px',
      //width:'98%',
      //margin:'24px auto',
      boxSizing : 'border-box'
      }}>

        <div>&nbsp;</div>

        {/* <FormDefaultExample /> */}

      <div>&nbsp;</div>
      <h1>TodoList Tasks</h1>
      <div>&nbsp;</div>

      

      <div>&nbsp;</div>

      <DynamicTable
        head={head}
        rows={testRows}
        rowsPerPage={5}
        defaultPage={1}
        loadingSpinnerSize="small"
        isLoading={issue.loading}
    />
    </div>)
}
