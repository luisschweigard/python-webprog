import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { IExam } from "../models/exam";
import { IUser } from "../models/user";

axios.defaults.baseURL = "http://localhost:8000";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {} | string, config?: {}) => axios.post(url, body, config).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

export const Exams = {
  list: (onlyPassed: boolean = false): Promise<IExam[]> => requests.get(`/exams/?only_passed=${onlyPassed}`),
  details: (id: number): Promise<IExam> => requests.get(`/exams/${id}`),
  create: (exam: IExam) => requests.post("/exams", exam),
  update: (exam: IExam) => requests.put("/exams", exam),
  delete: (id: string) => requests.delete(`/exams/${id}`),
};

export const Auth = {
  register: (user: IUser) => requests.post("/auth/register", user),
  login: (username: string, password: string) => requests.post("/auth/token", qs.stringify({ username, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
}
