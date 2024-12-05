const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const client = new OAuth2Client("445488174246-uh811cmlrp3bg7vlj10snfml8jt8rffr.apps.googleusercontent.com");
const { User } = require("../../../models/user");
const { PrismaClient } = require('@prisma/client');
const { ROLES } = require("../../../utils/middleware/multiUserProtected");
const { WorkspaceUser } = require("../../../models/workspaceUsers");
const SupervisorDocumentsService = require("../../../models/supervisorDocumentsService");
const { reqBody } = require("../../../utils/http");
const prisma = new PrismaClient();

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

  // app.post('/auth/google', async (req, res) => {
  //   const { token } = req.body; // Ensure the token is coming from the request body
   
  //   console.log('Received token:', token);
   
  //   if (!token) {
  //     return res.status(400).json({ success: false, message: 'Token is required' });
  //   }
   
  //   try {
  //     // Verify the ID token with Google OAuth client
  //     const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: "445488174246-uh811cmlrp3bg7vlj10snfml8jt8rffr.apps.googleusercontent.com", // Your client ID
  //     });
   
  //     console.log('Verified ticket:', ticket);
  //     const payload = ticket.getPayload();
   
  //     // Optionally, you can fetch additional user info if needed
  //     const user = {
  //       email: payload.email,
  //       name: payload.name,
  //       picture: payload.picture,
  //       googleId: payload.sub, // Google ID for identifying the user uniquely
  //     };
   
  //     // Generate your custom JWT (app token) for the application
  //     const appToken = jwt.sign(
  //       { email: user.email, name: user.name, googleId: user.googleId },
  //       process.env.JWT_SECRET,
  //       { expiresIn: '1h' } // Expiration time (1 hour)
  //     );
   
  //     console.log('Generated appToken:', appToken);
   
  //     // Send the response with the generated JWT and user details
  //     return res.status(200).json({
  //       success: true,
  //       token: appToken,
  //       user,
  //     });
   
  //   } catch (error) {
  //     console.error('Error during authentication:', error);
  //     return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
  //   }
  // });

// app.post("/auth/microsoft", async (req, res) => {
//   const  token  = reqBody(req);

//   if (!token) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Google ID token is required" });
//   }

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience:
//         "445488174246-uh811cmlrp3bg7vlj10snfml8jt8rffr.apps.googleusercontent.com",
//     });

//     const payload = ticket.getPayload();
//     console.log('payload: ', payload);

//     if (!payload.email_verified) {
//       return res.status(403).json({
//         success: false,
//         message: "Email not verified by Google",
//       });
//     }

//     // Check if the user already exists using the User.get method
//     const existingUser = await User.get({ email: payload.email });

//     let user;
//     if (existingUser) {
//       user = existingUser;
//     } else {
//       // Create a new user if no existing user is found
//       const { user: newUser, error } = await User.create({
//         username: payload.name.toLowerCase().replace(/\s+/g, ""),
//         email: payload.email,
//         role: ROLES.default,
//       });

//       if (error) {
//         console.error("Error creating user:", error);
//         return res.status(500).json({
//           success: false,
//           message: "Failed to create a new user",
//           error,
//         });
//       }

//       user = newUser;
//     }

//     const { workspaceId, error: workspaceError } = await SupervisorDocumentsService.getWorkspaceIdByName("general");
//     console.log('workspaceId: ', workspaceId);

//     if (workspaceError) {
//       response.status(400).json({ error: workspaceError });
//       return;
//     }

//     const workspaceUserCreated = await WorkspaceUser.create(user.id, workspaceId);
//     if (!workspaceUserCreated) {
//       response.status(500).json({ error: "Failed to create workspace-user relationship" });
//       return;
//     }

//     // Generate JWT token for the authenticated user
//     const appToken = jwt.sign(
//       {
//         id: user.id,
//         name: user.username,
//         iat: Math.floor(Date.now() / 1000),
//         exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
//       },
//       process.env.JWT_SECRET,
//       { algorithm: "HS256" }
//     );

//     return res.status(200).json({
//       success: true,
//       token: appToken,
//       user,
//     });
//   } catch (error) {
//     console.error("Google authentication error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to authenticate with Google",
//       error: error.message,
//     });
//   }
// });

app.post("/auth/microsoft", async (req, res) => {
  const  token = reqBody(req);
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Microsoft ID token is required" });
  }

  try {
    // Verify the token with Microsoft API
    const microsoftResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
  
    if (!microsoftResponse.ok) {
      const errorDetail = await microsoftResponse.json();
      return res.status(403).json({
        success: false,
        message: "Invalid Microsoft token",
        error: errorDetail,
      });
    }
    const microsoftUser = await microsoftResponse.json();

    if (!microsoftUser || !microsoftUser.mail) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch user information from Microsoft",
      });
    }

    const email = microsoftUser.mail || microsoftUser.userPrincipalName;

    // Check if the user already exists
    const existingUser = await User.get({ email });

    let user;
    if (existingUser) {
      user = existingUser;
    } else {
      // Create a new user if no existing user is found
      const { user: newUser, error } = await User.create({
        username: microsoftUser.displayName.toLowerCase().replace(/\s+/g, ""),
        email,
        role: ROLES.default,
      });

      if (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to create a new user",
          error,
        });
      }

      user = newUser;
    }

    const { workspaceId, error: workspaceError } =
      await SupervisorDocumentsService.getWorkspaceIdByName("general");
    console.log("workspaceId: ", workspaceId);

    if (workspaceError) {
      return res.status(400).json({ error: workspaceError });
    }

    const workspaceUserCreated = await WorkspaceUser.create(user.id, workspaceId);
    if (!workspaceUserCreated) {
      return res.status(500).json({
        error: "Failed to create workspace-user relationship",
      });
    }

    // Generate JWT token for the authenticated user
    const appToken = jwt.sign(
      {
        id: user.id,
        name: user.username,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256" }
    );

    return res.status(200).json({
      success: true,
      token: appToken,
      user,
    });
  } catch (error) {
    console.error("Microsoft authentication error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate with Microsoft",
      error: error.message,
    });
  }
});

  
}

module.exports = { apiAuthEndpoints };
