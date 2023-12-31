# Spheron Notification Service
A flexible solution for setting up your own notification service for Discord and Slack channels. Users can clone this repository, configure it to their needs, and host it on Spheron Compute.

## Description
The Spheron Notification Service is built to give users full control over their notification system. It simplifies the process of setting up notifications and integrates seamlessly with Alchemy webhooks for accurate and timely message delivery.

### Why did we build this?
We built the Spheron Notification Service for the following reasons:
1. **Self Hosted:** We are addressing the need for a self-hosted and flexible notification system. By allowing users to host and configure the service on Spheron Compute, it provides a reliable solution for sending messages to Discord and Slack channels.
2. **Flexibility:** In the context of using Alchemy webhooks, it's important to note that while individuals can directly create Alchemy webhooks, it is often necessary to utilize an additional service to format the response object as custom text messages and then send it to their desired services.
4. **Security:** Adding an extra layer of service reduces the attack vector and enhances security. Your notifications stay safe and sound.

## Usage
To use the Spheron Notification Service, follow the provided instructions to configure and host the service on Spheron Compute. After setup, you can start sending messages to your Discord and Slack channels through the service.

1. Clone this repository: https://github.com/spheronFdn/spheron-notification-service.git
2. Run `npm install` to install dependencies.
3. Create a .env file in the client directory and Add the following:
```
# The port on which the Spheron Notification Service will run
PORT=xxxx

# The Discord Webhook URL for sending notifications to Discord channels
DISCORD_WEBHOOK_URL=xxxx

# The Slack Webhook URL for sending notifications to Slack channels
SLACK_WEBHOOK_URL=xxxx

# Secret key for authorization (adjust this as needed)
SECRET_KEY=xxxx

# Secret key for JWT token generation
JWT_SECRET=xxxx

# JWT token expiration time (e.g., "1h" for one hour, "1d" for one day)
JWT_EXPIRES_IN=xxxx
```
4. If you don't already have a Spheron account, you can create one [here](https://app.spheron.network/#/login).
5. Visit Spheron Compute docs and follow all the steps from [STEP 3](https://docs.spheron.network/server-guide/express/#step-3-set-default-platform-for-docker-build).
6. [Attach a Domain/Subdomain](https://docs.spheron.network/compute/instance/domain/) to your instance and you are good to go.

### Route definitions

**/generate-token**
- **Request Body:** {"secretKey": "your-secret-key"}
- **Response:** Returns a JWT token.

**/send-notification?auth=your-jwt-token**
- **Request Body (for custom messages):** {"text": "your-custom-text"}
- You can also directly attach this route to [Alchemy webhooks](https://dashboard.alchemy.com/webhooks) for sending notifications.

## How it works?
The Spheron Notification Service works by providing an API endpoint that allows you to send messages to connected Discord and Slack channels. When you hit the endpoint with the required parameters, the service formats and delivers the message to these channels.

## Help
For help, discussions or any other queries: [Join our Community](https://community.spheron.network/)

## Version History
* 0.1
    * Initial Release

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- https://docs.spheron.network/server-guide/express/
- https://docs.alchemy.com/reference/webhook-types
