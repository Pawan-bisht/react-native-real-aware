import React from "react";
// import * as msal from "@azure/msal-browser";
import { UserAgentApplication, CacheLocation } from "msal";
const msalConfig = {
  auth: {
    clientId: "783373b5-2950-48ef-abe3-e1e8d266a548",
    authority:
      "https://login.microsoftonline.com/d3d0431a-dc1c-4be4-9c85-300233b90f36",
    redirectUri: "http://localhost:19006/",
  },
  cache: {
    cacheLocation: "sessionStorage", // session storage is more secure, but prevents single-sign-on from working. other option is 'localStorage'
    storeAuthStateInCookie: false,
  },
  defaultRequestConfiguration: {
    scopes: ["https://functionappra.azurewebsites.net/user_impersonation"],
  },
};
console.log(msalConfig);

const scopes = {
  scopes: ["https://functionappra.azurewebsites.net/user_impersonation"],
};

const userAgentApplication = new UserAgentApplication(msalConfig);
console.log(userAgentApplication);
const withAuthProvider = (WrappedComponent) => {
  class WithAuthProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isAuthenticated: false,
        user: null,
      };
    }

    componentDidMount() {
      // If MSAL already has an account, the user
      // is already logged in
      var account = userAgentApplication.getAccount();

      console.log(account);
      if (account) {
        this.setState({
          userAccount: account,
        });
        this.getAccessToken();
      } else {
        this.login();
      }
    }

    async login() {
      try {
        // Login via Redirect
        await userAgentApplication.loginRedirect(scopes);
        // After login, get the user's account
        var account = userAgentApplication.getAccount();
        this.setState({
          userAccount: account,
        });
        await this.getAccessToken();
      } catch (err) {
        console.log("login error: ", err);
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err),
        });
      }
    }

    async getAccessToken() {
      let accessToken = null;
      let isAuthenticated = false;
      let error = null;
      try {
        // Get the access token silently
        // If the cache contains a non-expired token, this function
        // will just return the cached token. Otherwise, it will
        // make a request to the Azure OAuth endpoint to get a token
        var silentResult = await userAgentApplication.acquireTokenSilent(
          scopes
        );
        //console.log("silentResult.accessToken", silentResult.accessToken);
        if (silentResult && silentResult.accessToken) {
          accessToken = silentResult.accessToken;
          isAuthenticated = true;
        }
      } catch (err) {
        // If a silent request fails, it may be because the user needs
        // to login or grant consent to one or more of the requested scopes
        if (this.isInteractionRequired(err)) {
          var interactiveResult =
            await userAgentApplication.acquireTokenRedirect(scopes);

          if (interactiveResult && interactiveResult.accessToken) {
            accessToken = interactiveResult.accessToken;
            isAuthenticated = true;
          }
        } else {
          console.log("getAccessToken error: ", err);
          error = this.normalizeError(err);
        }
      }

      this.setState({
        isAuthenticated: isAuthenticated,
        accessToken: accessToken,
        error: error,
      });

      return accessToken;
    }

    setErrorMessage(message, debug) {
      this.setState({
        error: { message: message, debug: debug },
      });
    }

    normalizeError(error) {
      var normalizedError = {};
      if (typeof error === "string") {
        var errParts = error.split("|");
        normalizedError =
          errParts.length > 1
            ? { message: errParts[1], debug: errParts[0] }
            : { message: error };
      } else {
        normalizedError = {
          message: error.message,
          debug: JSON.stringify(error),
        };
      }
      return normalizedError;
    }

    isInteractionRequired(error) {
      if (!error.message || error.message.length <= 0) {
        return false;
      }

      return (
        error.message.indexOf("consent_required") > -1 ||
        error.message.indexOf("interaction_required") > -1 ||
        error.message.indexOf("login_required") > -1 ||
        error.message.indexOf("AADSTS50058") > -1
      );
    }

    logout() {
      userAgentApplication.logout();
    }

    render() {
      return (
        <WrappedComponent
          error={this.state.error}
          isAuthenticated={this.state.isAuthenticated}
          userAccount={this.state.userAccount}
          accessToken={this.state.accessToken}
          login={() => this.login()}
          logout={() => this.logout()}
          getAccessToken={() => this.getAccessToken()}
          setError={(message, debug) => this.setErrorMessage(message, debug)}
          {...this.props}
          {...this.state}
        />
      );
    }
  }
  return WithAuthProvider;
};

export default withAuthProvider;
