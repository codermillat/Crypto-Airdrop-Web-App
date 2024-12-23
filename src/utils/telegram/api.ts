import axios from 'axios';
import { TelegramMessage } from './types';
import { handleApiError } from '../error';
import { getConfig } from '../config';

const { botToken } = getConfig();
const API_URL = `https://api.telegram.org/bot${botToken}`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// Rest of the file remains the same...