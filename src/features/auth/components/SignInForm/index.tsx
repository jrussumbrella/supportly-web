import { Form, Input, Button, Alert } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from '../../../../contexts/AuthContext';
import { Error } from '../../../../types';
import { LoginFields } from '../../types';

const SignInForm = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: LoginFields) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);
      await login(values);
      history.push('/tickets');
    } catch (err) {
      const error: AxiosError<Error> = err;
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert type="error" style={{ marginBottom: 20 }} message={errorMessage} showIcon banner />
      )}

      <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={submitting}
            loading={submitting}
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInForm;
