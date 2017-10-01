import * as React from 'react';
import { IPasswordDB } from "../passwordDB/index";
import { getFunType, withPasswordDB } from "../helpers";
import { Button, Checkbox, Form, Container, Grid, Message } from 'semantic-ui-react'
import { reduxForm, Field, InjectedFormProps, SubmissionError } from 'redux-form';
import { compose } from "recompose";
import { Dispatch } from "react-redux";
import { RootState } from "../store/index";
import { GlobalActions } from "../store/global";

function selectFromDB(db: IPasswordDB) {
  return {
    login: db.login
  }
}

const selectFromDBType = getFunType(selectFromDB);

interface Props { }

interface State { }

interface FormData {
  username: string;
  password: string;
}

class LoginPresentational extends React.Component<typeof selectFromDBType & Props & InjectedFormProps<FormData, {}>, State> {
  render() {
    return (
      <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Form style={{width: '300px' }} onSubmit={this.props.handleSubmit}>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <Field component="input" id="username" autoFocus placeholder="Username" type="text" name="username" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Field component="input" id="password" placeholder="Password" type="password" name="password" />
          </Form.Field>
          {this.props.error && <Message negative>{this.props.error}</Message>}
          <Button
            type='submit'
            primary
            positive={this.props.submitSucceeded}
            negative={this.props.submitFailed}
            fluid
            loading={this.props.submitting}
            disabled={this.props.submitting}
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

function onSubmit(data: FormData, dispatch: Dispatch<RootState>, props: typeof selectFromDBType){
  return props.login(data.username, data.password).then(x => {
    if (!x) {
      throw new SubmissionError({ _error: "Username or password invalid" });
    }

    dispatch(GlobalActions.SetLoggedIn.create!({ isLoggedIn: true }));
  });
}

export const Login = compose(
  withPasswordDB<Props, typeof selectFromDBType>(selectFromDB),
  reduxForm({
    form: 'login',
    onSubmit
  })
)(LoginPresentational);
