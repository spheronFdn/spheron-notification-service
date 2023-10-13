import { Request, Response, NextFunction } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Root } from "./interface";
import { NotificationError, NotificationErrorTypeEnum } from "./error";

const Service = {
  authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.query.auth as string;
    if (!token)
      throw new NotificationError(NotificationErrorTypeEnum.UNAUTHORIZED);

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      throw new NotificationError(NotificationErrorTypeEnum.UNAUTHORIZED);
    }
  },

  getNotificationMessage(message: Root) {
    const messageTypes: Record<string, string> = {
      ADDRESS_ACTIVITY:
        message.event.activity &&
        "Tokens transferred from `" +
          message.event.activity[0].fromAddress +
          "` to `" +
          message.event.activity[0].toAddress +
          "` with transaction hash: `" +
          message.event.activity[0].hash +
          "`",
      NFT_ACTIVITY:
        message.event.activity &&
        "NFT transferred from `" +
          message.event.activity[0].fromAddress +
          "` to `" +
          message.event.activity[0].toAddress +
          "` with transaction hash: `" +
          message.event.activity[0].hash +
          "`",
      MINED_TRANSACTION:
        message.event.transaction &&
        "Transaction with hash `" +
          message.event.transaction.hash +
          "` has been mined successfully.",
      DROPPED_TRANSACTION:
        message.event.transaction &&
        "Transaction with hash `" +
          message.event.transaction.hash +
          "` has been dropped.",
      NFT_METADATA_UPDATE:
        message.event.contractAddress &&
        "NFT metadata updated for contract `" +
          message.event.contractAddress +
          "`",
    };

    return messageTypes[message.type] || "";
  },

  async sendNotification(message: string) {
    try {
      const discordPayload = { content: message };
      const slackPayload = { text: message };
      await axios.post(process.env.DISCORD_WEBHOOK_URL, discordPayload);
      await axios.post(process.env.SLACK_WEBHOOK_URL, slackPayload);
    } catch (error) {
      throw new NotificationError(
        NotificationErrorTypeEnum.NOTIFICATION_ERROR,
        "❌ Failed to send notification."
      );
    }
  },
};

export default Service;
