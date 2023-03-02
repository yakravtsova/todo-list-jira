import React, { Fragment, useEffect } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import Select from '@atlaskit/select';
import Form, { Field, FormFooter, FormHeader, ErrorMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Spinner from '@atlaskit/spinner';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../src/features/projects/projectSlice';
import { fetchStatuses } from '../src/features/statuses/statusSlice';
import { fetchIssuesByQuery } from '../src/features/issues/issueSlice';


const SearchForm = ({setIsFirstSearch, setIssuesPerPage}) => {

    const dispatch = useDispatch();
    const project = useSelector(state => state.project);
    const status = useSelector(state => state.status);

    useEffect(() => {
      dispatch(fetchStatuses());
      dispatch(fetchProjects());
    }, []);

    const handleSubmit = (data) => {
      setIsFirstSearch();
      setIssuesPerPage(data.issuesPerPage);
      let queryString = [];
      for (let key in data) {
        if (data[key].length && key !== 'issuesPerPage') {
          const params = data[key].map(p => p.value).join(',');
          queryString = [...queryString, `${key}%20in%20(${params})`];
        }
      }
      queryString = queryString.length ? queryString.join('%20AND%20') : '';
      dispatch(fetchIssuesByQuery(queryString));
    };

    const validate = (value) => {
      if (value < 5) {
        return "LESS_THAN_FIVE"
      }
      if (value > 15) {
        return "MORE_THAN_FIFTEEN"
      }
      return;
    }

  return (
      <div
      style={{
        display: 'flex',
        width: '400px',
        margin: '0 auto 30px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px'
      }}
    >
      {project.loading && status.loading && <Spinner interactionName="load" size="large" />}
      {!project.loading && !status.loading && project.projects.length ? <Form onSubmit={(data) => handleSubmit(data)}>
        {({ formProps, reset }) => (
          <form
            {...formProps} noValidate
          >
            <FormHeader
              title="Set the search parameters"
            />

            <Field
              name="project"
              label="Select a project"
              defaultValue={[]}
            >
              {({ fieldProps: { id, ...rest } }) => (
                <Fragment>
                  <Select inputId={id} {...rest} options={project.projects} isMulti />
                </Fragment>
              )}
            </Field>
            <Field
              name="status"
              label="Select an issue status"
              defaultValue={[]}
            >
              {({ fieldProps: { id, ...rest } }) => (
                <Fragment>
                  <Select inputId={id} {...rest} options={status.statuses} isMulti />
                </Fragment>
              )}
            </Field>
            <Field name="issuesPerPage" label="Number of issues per page"  defaultValue="5" validate={validate} >
              {({ fieldProps, error }) => (
                <Fragment>
                  <Textfield {...fieldProps} type="number" min="5" max="15" />
                  {error === 'LESS_THAN_FIVE' && (
                    <ErrorMessage>
                      Value must be grater than or equal to 5
                    </ErrorMessage>
                  )}
                  {error === 'MORE_THAN_FIFTEEN' && (
                    <ErrorMessage>
                      Value must be less than or equal to 15
                    </ErrorMessage>
                  )}
                  </Fragment>
                )}
              </Field>
            <FormFooter>
              <ButtonGroup>
                <Button appearance="subtle" id="form-reset" onClick={() => reset()}>
                  Reset form
                </Button>
                <Button
                  appearance="primary"
                  id="set-search-data"
                  type="submit"
                >
                  Find issues
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form> : <div>You don't have any projects yet</div>}
    </div>
  );
};

export default SearchForm;