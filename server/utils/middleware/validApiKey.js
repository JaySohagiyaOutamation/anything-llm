const { ApiKey } = require("../../models/apiKeys");
const { SystemSettings } = require("../../models/systemSettings");

async function validApiKey(request, response, next) {
  const multiUserMode = await SystemSettings.isMultiUserMode();
  response.locals.multiUserMode = multiUserMode;

  const auth = request.header("Authorization");
  console.log('auth: ', auth);
  const bearerKey = auth ? auth.split(" ")[1] : null;
  console.log('bearerKey: ', bearerKey);
  if (!bearerKey) {
    response.status(403).json({
      error: "No valid api key found.",
    });
    return;
  }

  if (!(await ApiKey.get({ secret: bearerKey }))) {
    response.status(403).json({
      error: "No valid api key found.",
    });
    return;
  }

  next();
}

module.exports = {
  validApiKey,
};
