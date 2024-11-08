const { reqBody } = require("../../../utils/http");
const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('895208350570-n1965so7sn576248vqotjummjo3pska1.apps.googleusercontent.com');

function apiAuthEndpoints(app) {
  if (!app) return;

  app.get("/v1/auth", [validApiKey], (_, response) => {
    /* 
    #swagger.tags = ['Authentication']
    #swagger.description = 'Verify the attached Authentication header contains a valid API token.'
    #swagger.responses[200] = {
      description: 'Valid auth token was found.',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            example: {
              authenticated: true,
            }
          }
        }           
      }
    }  
    #swagger.responses[403] = {
      schema: {
        "$ref": "#/definitions/InvalidAPIKey"
      }
    }
    */
    response.status(200).json({ authenticated: true });
  });

  app.post('/auth/google', async (req, res) => {
    const  {token}  = reqBody(req);
    console.log('token: ', token);
  
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }
  
    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "895208350570-n1965so7sn576248vqotjummjo3pska1.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();


      // Token is verified successfully
      res.status(200).json({ success: true,payload});
    } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }
  });
  
}

module.exports = { apiAuthEndpoints };
