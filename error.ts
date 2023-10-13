import { Request, Response, NextFunction } from "express";
import { StatusEnum } from "./interface";

export enum NotificationErrorTypeEnum {
  UNAUTHORIZED = "Unauthorized",
  NOTIFICATION_ERROR = "Notification Error",
}

export class NotificationError extends Error {
  notificationErrorType: NotificationErrorTypeEnum;

  constructor(
    notificationErrorType: NotificationErrorTypeEnum,
    message?: string
  ) {
    super(message ?? notificationErrorType);
    this.notificationErrorType = notificationErrorType;
  }
}

export function errorHandlingMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    return;
  }
  let message = error.message;
  let statusCode = StatusEnum.INTERNAL_SERVER_ERROR;
  if (error instanceof NotificationError) {
    console.error(`Notification error: ${error.notificationErrorType}`);
    switch (error.notificationErrorType) {
      case NotificationErrorTypeEnum.UNAUTHORIZED:
        statusCode = StatusEnum.UNAUTHORIZED;
        break;
      case NotificationErrorTypeEnum.NOTIFICATION_ERROR:
        statusCode = StatusEnum.INTERNAL_SERVER_ERROR;
        break;
      default:
    }
    if (!message) {
      message = error.notificationErrorType;
    }
  }
  res.status(statusCode).json({
    error: true,
    message,
  });
}
