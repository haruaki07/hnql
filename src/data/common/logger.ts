import consoleStamp from "console-stamp";

export type Logger = Console;

export function createLogger(): Logger {
  const logger = new console.Console(process.stdout, process.stderr);
  consoleStamp(logger, {
    stdout: process.stdout,
    stderr: process.stderr,
  });
  return logger;
}
