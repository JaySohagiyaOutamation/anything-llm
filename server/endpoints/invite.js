const { EventLogs } = require("../models/eventLogs");
const { Invite } = require("../models/invite");
const { User } = require("../models/user");
const { reqBody } = require("../utils/http");
const { sendRecoveryCodesToEmail } = require("../utils/PasswordRecovery");

function inviteEndpoints(app) {
  if (!app) return;

  app.get("/invite/:code", async (request, response) => {
    try {
      const { code } = request.params;
      const invite = await Invite.get({ code });
      if (!invite) {
        response.status(200).json({ invite: null, error: "Invite not found." });
        return;
      }

      if (invite.status !== "pending") {
        response
          .status(200)
          .json({ invite: null, error: "Invite is no longer valid." });
        return;
      }

      response
        .status(200)
        .json({ invite: { code, status: invite.status }, error: null });
    } catch (e) {
      console.error(e);
      response.sendStatus(500).end();
    }
  });

  app.post("/invite/:code", async (request, response) => {
    try {
      const { code } = request.params;
      const { username, password,email } = reqBody(request);
      const invite = await Invite.get({ code });
      if (!invite || invite.status !== "pending") {
        response
          .status(200)
          .json({ success: false, error: "Invite not found or is invalid." });
        return;
      }

      const { user, error } = await User.create({
        username,
        password,
        email,
        role: "default",
      });
      if (!user) {
        console.error("Accepting invite:", error);
        response
          .status(200)
          .json({ success: false, error: "Could not create user." });
        return;
      }


      await Invite.markClaimed(invite.id, user);
      await EventLogs.logEvent(
        "invite_accepted",
        {
          username: user.username,
        },
        user.id
      );
      if (!!user) {
        try {
          console.log("Sending recovery codes to:", user.email);
          await sendRecoveryCodesToEmail(user.email);
          console.log("Recovery codes sent successfully.");
        } catch (error) {
          console.error("Error while sending recovery codes:", error);
        }
      }

      response.status(200).json({ success: true, error: null });
    } catch (e) {
      console.error(e);
      response.sendStatus(500).end();
    }
  });
}

module.exports = { inviteEndpoints };
