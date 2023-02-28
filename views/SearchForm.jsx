import React, { Fragment, useEffect } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import Select from '@atlaskit/select';

import Form, { Field, FormFooter, FormHeader } from '@atlaskit/form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../src/features/projects/projectSlice';
import { fetchIssuesByQuery } from '../src/features/issues/issueSlice';


const SearchForm = () => {

    const dispatch = useDispatch();
    const project = useSelector(state => state.project);

    useEffect(() => {
      dispatch(fetchProjects());
    }, []);

    const status = [
      {label: "Done", value: "Done"},
      {label: "In progress", value: "'In Progress'"},
      {label: "Test", value: "Test"},
      {label: "To Do", value: "To Do"}
    ];

    const handleSubmit = (data) => {
      let queryString = [];
      for (let key in data) {
        if (data[key].length) {
          const params = data[key].map(p => p.value).join(',');
          queryString = [...queryString, `${key}%20in%20(${params})`];
        }
      }
      queryString = queryString.length ? queryString.join('%20AND%20') : '';
      dispatch(fetchIssuesByQuery(queryString));
    };

  return (
      <div
      style={{
        display: 'flex',
        width: '400px',
        margin: '0 auto',
        flexDirection: 'row',
      }}
    >
      {project.loading && <div>Loading...</div>}
      {!project.loading && <Form onSubmit={(data) => handleSubmit(data)}>
        {({ formProps }) => (
          <form
            {...formProps}
          >
            <FormHeader
              title="Выберите параметры поиска"
            />

            <Field
              name="project"
              label="Выберите проект"
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
              label="Выберите статус задачи"
              defaultValue={[]}
            >
              {({ fieldProps: { id, ...rest } }) => (
                <Fragment>
                  <Select inputId={id} {...rest} options={status} isMulti />
                </Fragment>
              )}
            </Field> 
            <FormFooter>
              <ButtonGroup>
                <Button appearance="subtle" id="create-repo-cancel">
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  id="create-repo-button"
                  type="submit"
                >
                  Create repository
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>}
    </div>
  );
};

export default SearchForm;