import * as React from 'react';
import { IPasswordDB } from "../passwordDB/index";
import { getFunType, withPasswordDB } from "../helpers";
import { Button, Checkbox, Form, Container, Grid, Message } from 'semantic-ui-react'
import { reduxForm, Field, InjectedFormProps, SubmissionError } from 'redux-form';
import { compose } from "recompose";
import { Dispatch, connect } from "react-redux";
import { RootState } from "../store/index";
import { GlobalThunks } from "../store/global";

function mapStateToProps(state: RootState) {
  return {
    isLoggedIn: state.global.isLoggedIn,
    search: state.global.search
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    setSearch: (what: string) => dispatch(GlobalThunks.Search(what))
  }
}

const mapStateToPropsType = getFunType(mapStateToProps);
const mapDispatchToPropsType = getFunType(mapDispatchToProps);

interface Props {}

interface State {}

interface FormData {
  username: string;
  password: string;
}

type AllProps = typeof mapDispatchToPropsType & typeof mapStateToPropsType & Props & InjectedFormProps<FormData, {}>;

class LoginPresentational extends React.Component<AllProps, State> {
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

function onSubmit(data: FormData, dispatch: Dispatch<RootState>, props: AllProps){
  return dispatch(GlobalThunks.Login(data.username, data.password)).then(res => {
    if (!res) {
      throw new SubmissionError({ _error: "Username or password invalid" });
    }
  });
}

export const Login = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'login',
    onSubmit
  })
)(LoginPresentational);