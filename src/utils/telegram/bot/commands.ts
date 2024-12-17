import { debugLog } from '../debug';

export interface BotCommand {
  command: string;
  description: string;
}

export const COMMANDS: BotCommand[] = [
  { command: 'start', description: 'Start the bot and open WebApp' },
  { command: 'help', description: 'Show help information' },
  { command: 'settings', description: 'Open settings menu' }
];

export const getStartMessage = (): string => {
  return `
Welcome to PAWS Crypto! 🐾

Complete tasks and earn PAWS tokens. Tap the button below to start earning rewards.

Need help? Use /help to see available commands.
`;
};

export const getHelpMessage = (): string => {
  return `
Available commands:

${COMMANDS.map(cmd => `/${cmd.command} - ${cmd.description}`).join('\n')}

For support, contact @your_support_username
`;
};