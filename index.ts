import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Service from "./service";
import { Root, StatusEnum } from "./interface";
import {
  NotificationError,
  NotificationErrorTypeEnum,
  errorHandlingMiddleware,
} from "./error";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8111;

app.use(cors());
app.use(errorHandlingMiddleware);

app.post("/generate-token", async (req, res, next) => {
  try {
    const { secretKey } = req.body;
    if (secretKey === process.env.SECRET_KEY) {
      const token = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.status(StatusEnum.SUCCESS).json({ token });
    } else {
      throw new NotificationError(NotificationErrorTypeEnum.UNAUTHORIZED);
    }
  } catch (error) {
    next(error);
  }
});

app.post("/send-notification", Service.authenticate, async (req, res, next) => {
  try {
    const message: Root = req.body;
    const notificationMessage = message.text
      ? message.text
      : Service.getNotificationMessage(message);

    if (notificationMessage)
      await Service.sendNotification(notificationMessage);

    res
      .status(StatusEnum.SUCCESS)
      .json({ message: "✅ Notification sent successfully!" });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
