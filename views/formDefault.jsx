import React, { Fragment } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import Button from '@atlaskit/button/standard-button';
import { Checkbox } from '@atlaskit/checkbox';

import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';


import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';


const FormDefaultExample = () => (
  <div
    style={{
      //display: 'flex',
      //width: '400px',
      //maxWidth: '100%',
      margin: '0 auto',
      //flexDirection: 'row',
    }}
  >
    <Form
      onSubmit={(data) => {
        console.log('form data', data);
        return new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
          data.username === 'error' ? { username: 'IN_USE' } : undefined,
        );
      }}
    >
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="TodoList Tasks"
            //description="* indicates a required field"
          />
          <FormSection>
            <Field
              aria-required={true}
              name="username"
              label="Username"
              defaultValue="dst12"
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField autoComplete="off" {...fieldProps} />
                  {!error && (
                    <HelperMessage>
                      You can use letters, numbers and periods.
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      This username is already in use, try another one.
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>

            <Field
              aria-required={true}
              name="selector"
            >
              {({ fieldProps: {id, ...rest}, error }) => (
                <Fragment>
                  <Select
                  {...rest}
                  isDisabled={false}
                    inputId="single-select-example"
                    className="single-select"
                    classNamePrefix="react-select"
                    options={[
                      { label: 'Adelaide', value: 'adelaide' },
                      { label: 'Brisbane', value: 'brisbane' },
                      { label: 'Canberra', value: 'canberra' },
                      { label: 'Darwin', value: 'darwin' },
                      { label: 'Hobart', value: 'hobart' },
                      { label: 'Melbourne', value: 'melbourne' },
                      { label: 'Perth', value: 'perth' },
                      { label: 'Sydney', value: 'sydney' },
                    ]}
                    placeholder="Choose a city"
                  />
                </Fragment>
              )}
            
            </Field>
            

            <Field
              aria-required={true}
              name="password"
              label="Password"
              defaultValue=""
              //isRequired
              validate={(value) =>
                value && value.length < 8 ? 'TOO_SHORT' : undefined
              }
            >
              {({ fieldProps, error, valid, meta }) => {
                return (
                  <Fragment>
                    <TextField type="password" {...fieldProps} />
                    {error && !valid && (
                      <HelperMessage>
                        Use 8 or more characters with a mix of letters, numbers
                        and symbols.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        Password needs to be more than 8 characters.
                      </ErrorMessage>
                    )}
                    {valid && meta.dirty ? (
                      <ValidMessage>Awesome password!</ValidMessage>
                    ) : null}
                  </Fragment>
                );
              }}
            </Field>
          </FormSection>

          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle">Cancel</Button>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
              >
                Sign up
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);

export default FormDefaultExample;