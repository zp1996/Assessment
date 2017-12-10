import { message } from 'antd';

export default function error({ msg, code }) {
  message.error(`${code}: ${msg}`, 1);
}
