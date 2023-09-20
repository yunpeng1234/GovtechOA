import { Form, Input, Button } from "antd";
import { register, signIn } from "./api/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

interface RegisterFromProps {
  username: string;
  password: string;
}

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const RegisterPage = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onFinish = async (values: RegisterFromProps) => {
    const res = await register(values.username, values.password);
    console.log(res);
    if (res?.status == 200) {
      const sres = await signIn(values.username, values.password);
      console.log(sres);

      if (sres?.status == 200) {
        setUser(values.username);
        navigate("/");
        return;
      }
    } else {
      console.log(res?.message);
    }
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <a href="/login">Login</a>
    </div>
  );
};

export default RegisterPage;
