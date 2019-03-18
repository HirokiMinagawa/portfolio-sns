<template>
  <div>
    <h3>新規登録 or ログイン</h3>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from "@/lib/firebase";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Auth",
  mounted() {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: () => {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          this.$emit("signInComplete");
          return false;
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      ]
    };
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>
